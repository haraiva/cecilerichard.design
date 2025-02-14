import { InkRunner, Utility, Processor } from "../inkrunner.js";

window.addEventListener("StoryActive", (event) => {
	event.detail.inkrunner.AddProcessor(textWrapper);
});

// top level properties share the name with the params properties coming in from inkrunner
// makes it easier to cover both cases without a bunch of if statements
const options = {
	text: {
		irRole: "text",
		wrapper: "p",
		classes: [],
	},
	choices: {
		irRole: "choicebox",
		wrapper: "div",
		classes: [],
	},
};

// wraps text and choices in new elements
const textWrapper = new Processor({
	name: "Text wrapper",
	author: "isyourguy",
	description: "Wraps all text and choices into a default element",
	type: Processor.Type.AllElements,
	priority: Infinity, // first!
	callback: async (params) => {
		let role = params.type || "unknown";
		let firstElement = params.target[0];

		// create a new wrapper element and insert it before the first element in the target's parent
		let element = Utility.CreateElement(options[role].wrapper, { dataset: { irRole: options[role].irRole }, classList: options[role].classes.join(" ") });
		firstElement.parentNode.insertBefore(element, firstElement);

		// if the only element is a span with no children or attributes, get the innerText and put it in the wrapper
		// otherwise append the elements without modifying them
		if(params.target.length === 1 && firstElement.localName == "span" && firstElement.children.length === 0 && firstElement.attributes.length === 0) {
			element.append(firstElement.innerText);
			firstElement.remove();
		} else {
			element.append(...params.target);
		}

		if (role === "choices") {
			let removeChoiceWrapper = () => {
				element.remove();
				removeEventListener("ChoiceMade", removeChoiceWrapper);
			};
			addEventListener("ChoiceMade", removeChoiceWrapper);
		}

		params.target = [element];
		return params.target;
	},
});
