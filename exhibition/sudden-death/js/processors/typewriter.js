import { InkRunner, Utility, Processor } from "../inkrunner.js";

window.addEventListener("StoryActive", (event) => {
	event.detail.inkrunner.AddProcessor(typewriter);
});

// TODO: rewrite this...
// i need a better way of doing text animations
// something that works with other processors
const typewriter = new Processor({
	name: "Typewriter animation",
	description: "Adds text over time",
	type: Processor.Type.TextElement,
	priority: -Infinity, // put it riiiiight at the end of the call stack
	callback: async (params) => {
		let reducedmotion = window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
		if (reducedmotion) return;

		const textSpeed = 20;
		let originalHTML = [];
		// let parent = params.text[0].parentNode;
		let parent = params.target[0].parentNode;
		console.log(params.target[0]);

		params.target.forEach((text) => {
			originalHTML.push(text.cloneNode(true));
		});

		// convert #text elements into spans
		for (let i = 0; i < params.target.length; i++) {
			if (!Utility.IsElement(params.target[i])) {
				const newElement = Utility.CreateElement("span", { innerText: params.target[i].data });
				parent.insertBefore(newElement, params.target[i]);
				params.target[i].remove();
				params.target[i] = newElement;
			}
		}

		// find all the nodes (including text nodes)
		// this is fucking unhinged
		let nodeArray = [];
		const pushNodes = (childNodes) => {
			childNodes.forEach((node) => {
				if (!nodeArray.includes(node)) nodeArray.push(node);
				if (node.childNodes) pushNodes(node.childNodes);
			});
		};
		params.target.forEach((element) => pushNodes(element.childNodes));

		// go through the original node list and get all the text nodes
		// then, create "hide/show" spans (so the text wrapping isn't broken)
		// and remove the original text nodes from the window
		let textArray = [];
		nodeArray.forEach((node) => {
			if (node.nodeType === 3) {
				let hideSpan, showSpan;
				hideSpan = Object.assign(document.createElement("span"), { id: "hideSpan" });
				showSpan = Object.assign(document.createElement("span"), { id: "showSpan" });
				Object.assign(hideSpan.style, { whiteSpace: "pre-wrap", opacity: 0 });
				Object.assign(showSpan.style, { whiteSpace: "pre-wrap" });
				hideSpan.innerText = node.nodeValue;
				node.parentNode.insertBefore(hideSpan, node.nextSibling);
				node.parentNode.insertBefore(showSpan, node.nextSibling);
				node.remove();
				textArray.push([showSpan, hideSpan]);
			}
		});

		// go through each set of "hide/show" spans and create some animations,
		// which are just anonymous methods that return promises
		let animArray = [];
		let intervalArray = [];
		let skipAnimation = false;
		textArray.forEach((node) => {
			if (Array.isArray(node)) {
				let showSpan = node[0];
				let hideSpan = node[1];
				animArray.push(() => {
					return new Promise((resolve, reject) => {
						let index = 0;
						let interval = setInterval(
							(textLength) => {
								if (index < textLength) {
									if (skipAnimation) {
										clearInterval(interval);
										resolve();
									}
									index++;
									showSpan.innerText += hideSpan.innerText.substring(0, 1);
									hideSpan.innerText = hideSpan.innerText.substring(1);
								} else {
									hideSpan.remove();
									clearInterval(interval);
									resolve();
								}
							},
							textSpeed,
							hideSpan.innerText.length
						);
						intervalArray.push(interval);
					});
				});
			}
		});

		return new Promise(async (resolve) => {
			// rebuilds the params.target to the original version
			const endAnimation = (event) => {
				if (event) {
					event.stopPropagation();
					event.stopImmediatePropagation();
					event.preventDefault();
				}
				intervalArray.forEach((interval) => clearInterval(interval));
				skipAnimation = true;
				originalHTML.forEach((text) => parent.append(text));
				params.target.forEach((text) => text.remove());
				params.target = originalHTML;
				textArray = null;
				removeEventListener("click", endAnimation);
				removeEventListener("keydown", endAnimation);
				intervalArray.forEach((interval) => clearInterval(interval));
				resolve();
			};

			// bind it to mouse click
			setTimeout(() => {
				addEventListener("click", endAnimation);
				addEventListener("keydown", endAnimation);
			}, 100);

			// go through each animation in the animation array
			// and call the methods sequenctially
			let promiseArray = [];
			for (const anim of animArray) {
				if (skipAnimation) continue;
				promiseArray.push(await anim());
			}

			// when all the promises are done, clean up and resolve
			return Promise.all(promiseArray).then(() => {
				endAnimation();
			});
		});
	},
});
