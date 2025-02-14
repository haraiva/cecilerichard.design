import { InkRunner, Utility, Processor } from "../inkrunner.js";

// TODO: change references of "story" to "inkrunner"
// the "story" is technically the inkjs object
// so naming the inkrunner instance "story" as well is a bit confusing
// also maybe rewrite the add image tag - it's a little messy

window.addEventListener("StoryActive", (event) => {
	const path = "/images";
	// const extensions = [".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"];
	const extensions = [".png", ".gif"]; //lets keep it simple its just png and gif

	// add default path, file extensions, and tags
	event.detail.inkrunner.options.tagTypes.image = {
		type: "image", // from the root directory
		path: path,
		extensions: extensions,
		tags: ["addImage"],
	};

	// add processors
	event.detail.inkrunner.AddProcessor(addImage, removeImage, removeAllImages);
});

/**
 * adds an image to the target (or the story container)
 * #addImage: path or name >> classes:class1 class2, target:targetid, name:name
 */
const addImage = new Processor({
	name: "Add Image",
	author: "isyourguy",
	description: "Adds image to the document (id=img-filename)",
	tag: "addImage",
	type: Processor.Type.Tag,
	callback: (params, inkrunner) => {
		let tag = params.tag;
		let file = inkrunner.externalFiles.find((file) => file.name === tag.value);
		if (!file) {
			inkrunner.Warn(`Add Image: could not find image ${tag.value}`);
			return;
		}
		let name = Utility.FilePathExtension(tag.value).filename + Utility.FilePathExtension(tag.value).extension;
		if (tag.options && tag.options.name) name = tag.options.name;
		let img = document.querySelector(`img[data-ir-role="image"][data-ir-name="${name}"]`);
		if (img === null) {
			img = Utility.CreateElement("img", {
				src: file.path,
				dataset: { irRole: "image", irName: name },
				width: file.width,
				height: file.height,
			});
		}
		if (tag.options && tag.options.classes) img.classList.add(...tag.options.classes.split(" "));
		let target = inkrunner.container;
		if (tag.options && tag.options.target) target = document.getElementById(tag.options.target);
		target.append(img);
	},
});

/**
 * removes image
 * #removeImage: path or name (supplied by addImage)
 */
const removeImage = new Processor({
	name: "Remove Image",
	author: "isyourguy",
	description: "Removes image from the document",
	tag: "removeImage",
	type: Processor.Type.Tag,
	callback: async (params) => {
		let tag = params.tag;
		let name = tag.value;
		if (Utility.FilePathExtension(tag.value).extension) name = Utility.FilePathExtension(tag.value).filename + Utility.FilePathExtension(tag.value).extension;
		let img = document.querySelector(`img[data-ir-role="image"][data-ir-name="${name}"]`);
		if (img !== null) img.remove();
	},
});

/**
 * remove all images
 * #removeAllImages: targetId
 */
const removeAllImages = new Processor({
	name: "Remove All Images",
	author: "isyourguy",
	description: "Removes all images added by tags from the target (or story container if blank)",
	tag: "removeAllImages",
	type: Processor.Type.Tag,
	callback: async (params, inkrunner) => {
		let tag = params.tag;
		let target = inkrunner.container;
		if (tag.value) target = document.getElementById(tag.value);
		target.querySelectorAll(`img[data-ir-role="image"]`).forEach((element) => element.remove());
	},
});
