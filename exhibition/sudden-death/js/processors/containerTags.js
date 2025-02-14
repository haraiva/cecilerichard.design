import { InkRunner, Utility, Processor } from "../inkrunner.js";

window.addEventListener("StoryActive", (event) => {
	// add processors
	event.detail.inkrunner.AddProcessor(clearTag, setContainer, removeContainer);
});

/**
 * clears the active container
 * e.g. #clear: containerid
 */
const clearTag = new Processor({
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
