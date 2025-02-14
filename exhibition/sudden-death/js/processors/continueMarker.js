import { InkRunner, Utility, Processor } from "../inkrunner.js";

// puts a nice continue marker after each line of text and removes it when choices appear
// is last in the queue, so will be impacted by #delays

window.addEventListener("StoryActive", (event) => {
	event.detail.inkrunner.AddProcessor(continueMarker);
});

const markerElement = Utility.CreateElement("div", { dataset: { irRole: "continue" } });

const continueMarker = new Processor({
	name: "Continue marker",
	author: "isyourguy",
	description: "Adds continue marker after text (but not choices)",
	type: Processor.Type.AllElements,
	priority: -Infinity, // last!
	callback: async (params, inkrunner) => {
		if (params.type === "text") {
			inkrunner.container.append(markerElement);
			return;
		}
		if (document.querySelector(`[data-ir-role="continue"`)) {
			markerElement.remove();
		}
	},
});
