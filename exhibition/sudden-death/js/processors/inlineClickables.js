import { InkRunner, Utility, Processor } from "../inkrunner.js";

window.addEventListener("StoryActive", (event) => {
	InkRunner.instance.AddProcessor(clickable);
});

const clickEvents = {
	example: {
		removeWhenClicked: false,
		removeOnContinue: true,
		class: "",
		created: (params) => {},
		clicked: (params) => {
			console.log(params.element, params.args);
		},
	},
	// ooooooh this is very clever 😈
	// looks just like twine!
	// unfortunately you can't have multiple bits that link to the same choice.
	// could probably modify this to replace it with the next text that comes out of inkrunner...
	// but i won't. you can modify this to do that if you like.
	choice: {
		removeWhenClicked: true,
		created: (params) => {
			// find the matching choice, copy all attributes, and remove the original
			if (params.args.length !== 1) InkRunner.instance.Error(`Inline Clickable: too many args for choice function. Expects 1, gave ${params.args.length}`);
			const getChoice = () => {
				let choices = InkRunner.instance.container.querySelectorAll(`[data-ir-choice-index="${parseInt(params.args[0]) - 1}"]`);
				if (choices.length === 0) {
					InkRunner.instance.Warn(`Inline Clickable: no choices with index "${params.args[0]}"`);
					let text = document.createRange().createContextualFragment(params.element.textContent).childNodes[0];
					params.element.parentNode.insertBefore(text, params.element);
					params.element.remove();
					return;
				}
				let choice = choices[0];
				params.element.dataset.irRole = "choice";
				params.element.dataset.irChoiceText = choice.dataset.irChoiceText;
				params.element.dataset.irChoiceIndex = choice.dataset.irChoiceIndex;
				params.element.inkdata = choice.inkdata;
				if (choice.parentNode && choice.parentNode.dataset.irRole === "choicebox" && choice.parentNode.children.length === 1) choice.parentNode.remove();
				choice.remove();
				removeEventListener("ChoiceTagsComplete", getChoice);
			};
			addEventListener("ChoiceTagsComplete", getChoice);
		},
		clicked: (params) => {
			let text = document.createRange().createContextualFragment(params.element.textContent).childNodes[0];
			params.element.parentNode.insertBefore(text, params.element);
			InkRunner.instance.Choose(parseInt(params.element.dataset.irChoiceIndex));
			params.element.remove();
		},
	},
	// REMOVE THIS IN THE ITCH BUILD!!!!
	jWindow: {
		removeWhenClicked: true,
		removeOnContinue: true,
		clicked: (params) => {
			params.args.forEach((w) => {
				OPEN_WINDOW(w);
			});
		},
	},
};

// looks through elements for text that matches [text::function(arg1,arg2,etc...)] and replaces them
// with a clickable <a> element that fires the matching callback in the clickEvents object
const clickable = new Processor({
	name: "inline clickable",
	author: "isyourguy",
	description: "uses a weird syntax to let you attach javascript to inline text as clickable <a> elements",
	type: Processor.Type.TextElement,
	priority: 0,
	callback: async (params) => {
		const regex = new RegExp(/\[(.*?)::(.*?)\]/, `g`);
		const process = (element) => {
			for (let child of element.childNodes) process(child);
			if (element.nodeName === "#text") {
				const matches = [...element.textContent.matchAll(regex)];
				if (!matches.length) return;
				matches.forEach((match) => {
					let fName = match[2].split("(")[0];
					if (!Object.keys(clickEvents).includes(fName)) return;
					let replaceString = `<a ${clickEvents[fName].class ? 'class="' + clickEvents[match[2]].class + '"' : " "}function="${match[2]}" data-ir-role="clickable">${match[1]}</a>`;
					element.textContent = element.textContent.replace(match[0], replaceString);
				});
				let frag = document.createRange().createContextualFragment(element.textContent.trim());
				for (let child of frag.childNodes) {
					if (child.nodeName === "#text" || !child.getAttribute("function")) continue;
					let funcMatch = child.getAttribute("function").match(/\s?([^ (]+)\(?([^)]*)?\)?/);
					let fName = funcMatch[1];
					let fArgs = funcMatch[2] ? funcMatch[2].split(",") : [];
					child.removeAttribute("function");
					let remove = () => {
						let text = document.createRange().createContextualFragment(child.textContent).childNodes[0];
						child.parentNode.insertBefore(text, child);
						child.remove();
					};
					let click = (e) => {
						e.stopPropagation();
						clickEvents[fName].clicked?.({ element: child, args: fArgs });
						if (clickEvents[fName].removeWhenClicked && !clickEvents[fName].removeOnContinue) remove();
					};
					let continueEvent = () => {
						remove();
						removeEventListener("StoryContinuing", continueEvent);
					};
					clickEvents[fName].created?.({ element: child, args: fArgs });
					child.addEventListener("click", click);
					if (clickEvents[fName].removeOnContinue) addEventListener("StoryContinuing", continueEvent);
				}
				Array.from(frag.childNodes).forEach((child) => {
					element.parentNode.insertBefore(child, element);
				});
				element.remove();
				frag = null;
			}
		};

		params.target.forEach((e) => {
			process(e);
		});
	},
});
