import { InkRunner, Utility, Processor } from "../inkrunner.js";

window.addEventListener("StoryActive", (event) => {
	event.detail.inkrunner.AddProcessor(hotspots);
});

// TODO: write this
const hotspots = new Processor({
	name: "Hotspots",
    author: "isyourguy",
	description: "Create clickable hotspots for choices",
	// tag: "setVar",
	type: Processor.Type.ChoiceElement,
	callback: async (params, inkrunner) => {
        //
        // console.log(params.choices[0]);
    },
});
