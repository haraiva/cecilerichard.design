import { InkRunner, Utility, Processor } from "../inkrunner.js";

window.addEventListener("StoryActive", (event) => {
	event.detail.inkrunner.AddProcessor(setCssVar);
});

// #setVar: varname:value >> target:id
// no target means root
const setCssVar = new Processor({
	name: "Set CSS variable",
	author: "isyourguy",
	description: "Set a CSS variable from ink",
	tag: "setVar",
	type: Processor.Type.Tag,
	callback: async (params, inkrunner) => {
		let tag = params.tag;

        // split tag.value into variable and value
		let variable = tag.value.split(":")[0].trim();
		let value = tag.value.split(":").length > 1 ? tag.value.split(":")[1].trim() : undefined;

		if (variable === "") {
			inkrunner.Warn(`setVar tag: No variable provided.`);
			return;
		}
		if (value === undefined) {
			inkrunner.Warn(`setVar tag: No value provided for CSS variable "${variable}".`);
			return;
		}

        // figure out what our target is
		let target = tag.options && tag.options.target ? document.getElementById(tag.options.target) : document.documentElement;
		if (target === null) {
			inkrunner.Warn(`setVar tag: No element found with id "${tag.options.target}". Setting to :root.`);
			target = document.documentElement;
		}

        // append css variable prefix
		while (/^--/.test(variable) === false) variable = `-${variable}`;

		target.style.setProperty(variable, value);
	},
});
