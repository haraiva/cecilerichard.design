import { InkRunner, Utility, Processor } from "../inkrunner.js";

window.addEventListener("StoryActive", (event) => {
	event.detail.inkrunner.AddProcessor(addAnimationClass);
});

/**
 * sets the class and --animation property of an element
 * and waits... basically.
 * #animClass: class >> target:targetid, time:1000, skippable:false, wait:false, remove:false
 * target - target id
 * time - how long to wait before continuing
 * skippable - can the animation be skipped
 * wait - wait until the animation is complete before continuing
 * remove - remove the class when the animation is complete
 */
const addAnimationClass = new Processor({
	name: "Add CSS Animation Class",
    author: "isyourguy",
	description: "Add CSS animationclass to current line (or target) (id)",
	tag: "animClass",
	type: Processor.Type.Tag,
    // priority:-1,
	callback: async (params) => {
		let tag = params.tag;
		let target = params.text;
		let time = 1000;
		let wait, remove, skippable;
		if (tag.options) {
			target = tag.options.target ? document.getElementById(tag.options.target) : target;
			time = tag.options.time ? parseFloat(tag.options.time) : time;
			wait = tag.options.wait ? tag.options.wait === "true" : false;
			remove = tag.options.remove ? tag.options.remove === "true" : false;
			skippable = tag.options.skippable ? tag.options.skippable === "true" : false;
		}
		if (Utility.IsElement(target)) target.classList.add(...tag.value.split(" "));
		target.style.setProperty("--animation", Utility.NumberToCSSTime(time));
		if (wait) {
			
			return new Promise((resolve) => {
                const endAnimation = () => {
                    target.style.removeProperty("--animation");
                    clearTimeout(timeout);
                    removeEventListener("click", endAnimation);
                    resolve();
                };
				let timeout = setTimeout(endAnimation, time);
				if (skippable) addEventListener("click", endAnimation);
			}).then(() => {
				if (remove) target.classList.remove(...tag.value.split(" "));
			});
		} else {
			// TODO: skipping animations that don't wait before proceeding doesn't seem to work
			const endAnimation = () => {
				target.style.removeProperty("--animation");
				clearTimeout(timeout);
				removeEventListener("click", endAnimation);
				if (remove) target.classList.remove(...tag.value.split(" "));
			};
			let timeout = setTimeout(endAnimation, time);	
			if (skippable) addEventListener("click", endAnimation);		
		}
	},
});