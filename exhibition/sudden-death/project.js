import { InkLoader } from "./js/inkloader.js";

const storyPath = "./ink/exhibition.ink";
const options = {
	debug: false,
};

// this is all the processors i've written so far
// only load the ones you're actually using (otherwise you're wasting bandwidth)
// good ones to start with are: defaultTags, textWrapper, containerTags, imageTags
const processorPaths = [
	"./js/processors/audioTags.js",
	// "./js/processors/containerTags.js",
	"./js/processors/classAnimation.js",
	"./js/processors/continueMarker.js",
	"./js/processors/defaultTags.js",
	"./js/processors/imageTags.js",
	"./js/processors/spanner.js",
	"./js/processors/textWrapper.js",
	// "./js/processors/typewriter.js",
	// "./js/processors/variableObserver.js",
	"./js/processors/videoTags.js",
	// "./js/processors/cssVariableTag.js",
	// "./js/processors/variableToCss.js",
	// "./js/processors/hotspots.js",
	"./js/processors/inlineClickables.js",
	"./js/processors/jupiterTags.js",
];

// this is the inkloader setup stuff
// probably don't modify this unless you know what you're doing
let InkRunner, Utility;
const inkrunner = await new InkLoader(storyPath, options, processorPaths).Load();
({ InkRunner: InkRunner, Utility: Utility } = await import("./js/inkrunner.js"));

Start();

// events.addEventListener("closed",(e)=>console.log("closed",e));

function Start() {
	Continue();
	addEventListener("click", (e) => {
		// stops jupiter window clicks from triggering continue
		if(!e.target.parentNode.classList.contains("window") && e.target.localName !== "a") Continue();
	});

	// space for continue, 1-9 for choices
	addEventListener("keydown", (e) => {
		if (e.key === " ") Continue();		
		if (inkrunner.CurrentStatus === InkRunner.Status.Waiting && /([\d]){1}/.test(e.key)) {
			inkrunner.Choose(parseInt(e.key) - 1);
		}
		// debug stuff
		if (options.debug && e.key === "i") console.log(inkrunner);
		if (options.debug && e.key === "s") console.log(inkrunner.story);
	});
}

function Continue() {
	inkrunner.Continue();
}

const JumpToKnot = (knot) => {
	inkrunner.JumpToKnot(knot, true);
	addEventListener("StoryEnded", ReturnToDefaultFlow);
};

const ReturnToDefaultFlow = () => {
	inkrunner.ChangeFlow();
	removeEventListener("StoryEnded", ReturnToDefaultFlow);
};
