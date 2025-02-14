import { InkRunner, Utility, Processor } from "../inkrunner.js";

// TODO: convert processors into classes so users can change their options
// in their project file rather than modifying the defaults
// ... probably? i think this is a good idea anyway. maybe it's shit.
// they're technically already classes i guess. class instances? i dunno what it's called.

window.addEventListener("StoryActive", (event) => {
	InkRunner.instance.AddProcessor(delay, autoContinue, addClass, removeClass);
	InkRunner.instance.AddProcessor(clear, setContainer, removeContainer);
	InkRunner.instance.AddProcessor(resetStory);
});

const exampleProcessor = new Processor({
	name: "example", // this is useful for debugging. definitely use this.
	author: "", // this doesn't matter though. i'm not using it anywhere
	description: "", // same here. calico used them and it helped me keep track of what it is and who wrote it, but it's up to you.
	tag: "example", // this one is required for tags and variable processors
	type: Processor.Type.Tag,
	priority: 0, // defaults to 0. Infinity for highest priority (first), -Infinity for lowest priority (last)
	callback: async (params) => {}, // if you're doing time dependent stuff, make sure this is async (if not you should be fine.)
});

/**
 * delays the sequential processor promise chain
 * #delay: 1000 >> skippable:true
 */
const delay = new Processor({
	name: "Delay",
	author: "isyourguy",
	description: "Delays the processor chain. Can be skipped!",
	tag: "delay",
	type: Processor.Type.Tag,
	callback: async (params) => {
		let tag = params.tag;
		
		// this is a lot of stupid code to do something very simple
		await new Promise((resolve) => {
			console.log("delay",tag.value);
			const timeout = setTimeout(() => {
				endDelay();
			}, parseInt(tag.value));
			const skipDelay = (event) => {
				event.preventDefault();
				event.stopImmediatePropagation();
				endDelay();
			};
			const endDelay = () => {
				
				clearTimeout(timeout);
				removeEventListener("click", skipDelay);
				resolve();
			};
			if (tag.options && tag.options.skippable) {
				addEventListener("click", skipDelay);
			}
		});
	},
});

/**
 * continues the story automatically (best used immediately after a line of text or a choice with output text)
 * #continue
 */
const autoContinue = new Processor({
	name: "Continue",
	author: "isyourguy",
	description: "Continues when next able",
	tag: "continue",
	type: Processor.Type.Tag,
	priority: -Infinity, //last
	callback: async () => {
		const cont = () => {
			InkRunner.instance.Continue();
			removeCont();
		};
		const removeCont = () => {
			removeEventListener("TextRendered", cont);
			removeEventListener("ChoiceRendered", removeCont);
		};
		addEventListener("TextRendered", cont);
		addEventListener("ChoiceRendered", removeCont);
	},
});

//#region classes

/**
 * sets the class of the current text line, choice, or target id
 * #class: class1 class2 >> target:targetid
 */
const addClass = new Processor({
	name: "Add CSS Class",
	author: "isyourguy",
	description: "Add css class to current line (or target) (id)",
	tag: "addClass",
	type: Processor.Type.Tag,
	priority: 0,
	callback: async (params) => {
		// console.log("addClass",params)
		let tag = params.tag;
		let target = params.target;
		if (tag.options && tag.options.target) target = document.getElementById(tag.options.target);
		if (Utility.IsElement(target)) {
			target.classList.add(...tag.value.split(" "));
		} else if (Array.isArray(target)) {
			target.forEach((element) => element.classList.add(...tag.value.split(" ")));
		}
	},
});

const removeClass = new Processor({
	name: "Remove CSS Class",
	author: "isyourguy",
	description: "Add css class to current line (or target) (id)",
	tag: "removeClass",
	type: Processor.Type.Tag,
	priority: 0,
	callback: async (params) => {
		let tag = params.tag;
		let target = params.target;
		if (tag.options && tag.options.target) target = document.getElementById(tag.options.target);
		if (Utility.IsElement(target)) {
			target.classList.remove(...tag.value.split(" "));
		} else if (Array.isArray(target)) {
			target.forEach((element) => element.classList.remove(...tag.value.split(" ")));
		}
	},
});

//#endregion

//#region containers

/**
 * clears the active container
 * e.g. #clear: containerid
 */
const clear = new Processor({
	name: "Clear",
	author: "isyourguy",
	description: "Removes all elements in the current container",
	tag: "clear",
	type: Processor.Type.Tag,
	priority: 0, // see comments below
	callback: async (params, inkrunner) => {
		// not sure if i want a priority on this or not
		// as i'm writing this, it makes sense to do it first, but that's probably wrong.
		// for now, it's just 0 (no priority either way) but whatever.
		let tag = params.tag;
		let target = inkrunner.container;
		if (tag.value) {
			target = document.getElementById(tag.value);
			if (!target) {
				inkrunner.Warn(`Couldn't find container with id "${tag.value}. Clearing current container."`);
				target = inkrunner.container;
			}
		}
		target.innerHTML = "";
	},
});

/**
 * creates/sets the story container to the container id
 * #setContainer: containerid >> classes:class1 class2, parent:parentid
 */
const setContainer = new Processor({
	name: "Set/Create container",
	author: "isyourguy",
	description: "Change the current story container",
	tag: "setContainer",
	type: Processor.Type.Tag,
	callback: async (params, inkrunner) => {
		let tag = params.tag;
		let target = document.getElementById(tag.value);
		let isNewContainer = target || true;
		let parent = isNewContainer ? document.body : target.parentElement;

		// if we can't find an element with that id, create one
		if (target === null) {
			target = Object.assign(document.createElement("div"), { id: tag.value });
		}

		// if classes were provided, remove any existing ones and add these
		if (tag.options && tag.options.classes) {
			target.className = tag.options.classes;
		}

		// if a parent was provided use it, otherwise, use body
		if (tag.options && tag.options.parent) {
			parent = document.getElementById(tag.options.parent);
			if (!parent) {
				inkrunner.Warn(`Couldn't find element with id "${tag.options.parent}". Using body instead.`);
				parent = document.body;
			}
		}

		// if it's a new container (not added to the document)
		// or if we've supplied a parent, append the container
		if (!isNewContainer || (tag.options && tag.options.parent)) parent.append(target);

		// tell inkrunner about the new container
		inkrunner.SetContainer(target);
	},
});

/**
 * removes the containerid and resets to default
 * #removeContainer: containerid
 */
const removeContainer = new Processor({
	name: "Remove Inner Div",
	author: "isyourguy",
	description: "Remove a div and reset the story container",
	tag: "removeContainer",
	type: Processor.Type.Tag,
	callback: async (params, inkrunner) => {
		let tag = params.tag;
		let target = document.getElementById(tag.value);
		if (target !== null) {
			target.remove();
			inkrunner.ResetContainer();
		}
	},
});

//#endregion

/**
 * Resets the ink story state when the next Continue function completes
 * #resetStory
 */
const resetStory = new Processor({
	name: "Reset Story",
	author: "isyourguy",
	description: "Resets the ink story state when the Continue function completes",
	tag: "resetStory",
	type: Processor.Type.Tag,
	priority: -Infinity,
	callback: async (params) => {
		const resetStory = () => {
			InkRunner.instance.ResetStory();
			removeCallback();
		};
		const removeCallback = () => window.removeEventListener("ContinueComplete", resetStory);
		window.addEventListener("ContinueComplete", resetStory);
	},
});