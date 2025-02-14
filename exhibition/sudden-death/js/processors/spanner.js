import { InkRunner, Utility, Processor } from "../inkrunner.js";

window.addEventListener("StoryActive", (event) => {
	event.detail.inkrunner.AddProcessor(spanner);
});

let spannerList = [
	// text wrapped in asterisks is converted to italics
	{
		startString: "*",
		endString: "*",
		element: "i",
		leaveBrackets: false,
	},
	{
		startString: "<y>",
		endString: "</y>",
		classes: ["yellow"],
	},
	{
		startString: "<r>",
		endString: "</r>",
		classes: ["red"],
	},
	{
		startString: "<b>",
		endString: "</b>",
		classes: ["blue"],
	},
	{	
		startString: "<PIK>:<",
		endString: ">",
		classes: ["Team", "Pikers"],
	},
	{	
		startString: "<HOU>:<",
		endString: ">",
		classes: ["Team", "Hounds"],
	},
	{	
		startString: "<TIME>:<",
		endString: ">",
		classes: ["Time"],
	},
	{	
		startString: "<QUARTER>:<",
		endString: ">",
		classes: ["Quarter"],
	},
	{
		startString: "SCENE<",
		endString: ">",
		classes: ["scene"],
	},
	{
		startString: "ACTOR<",
		endString: ">",
		classes: ["actor"],
	},
	{
		startString: "LINE<",
		endString: ">",
		classes: ["line"],
	},
	{
		startString: ":<",
		endString: ">",
		classes: ["message"],
	},
	{
		startString: "<Flo",
		endString: ">:",
		classes: ["username", "Flo"],
	},
	{
		startString: "<Phoebe",
		endString: ">:",
		classes: ["username", "Phoebe"],
	},
	{
		startString: "<Jordan",
		endString: ">:",
		classes: ["username", "Jordan"],
	},
];

// careful with this...
// i tried to escape characters but 🤷
const processSpanner = (spanner, text) => {
	const elementName = spanner.element ? spanner.element : "span";
	const ss = Utility.EscapeString(spanner.startString);
	const es = Utility.EscapeString(spanner.endString);
	const regex = new RegExp(`${ss}(.*?)${es}`, `g`);
	const match = regex.exec(text);
	let attr = "";
	if(!match) return text;
	if (match) attr = spanner.matchToAttr && spanner.attribute ? `data-${spanner.attribute}="${match[1]}"` : "";
	const classes = spanner.classes ? ` class="${spanner.classes.join(" ")}"` : "";
	let replaceText = "";
	if (spanner.removeMatch) {
		replaceText = `<${elementName} ${attr} ${classes}>`;
		replaceText += text.replaceAll(regex, "").trim();
		replaceText += `</${elementName}>`;
	} else {
		replaceText = `<${elementName} ${attr} ${classes}>` + `${spanner.leaveBrackets ? `${spanner.startString}$1${spanner.endString}` : `$1`}` + `</${elementName}>`;
		replaceText = text.replaceAll(regex, replaceText);
	}
	return replaceText;
};

const spanner = new Processor({
	name: "Spanner",
	author: "isyourguy",
	description: "Finds a matching pair of characters and wraps the text between them in a span",
	type: Processor.Type.RawText,
	priority: -100,
	callback: async (params) => {
		spannerList.forEach((spanner) => {
			params.target = processSpanner(spanner, params.target);
		});
		return params.target;
	},
});
