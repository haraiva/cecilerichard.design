import { InkRunner, Utility, Processor } from "../inkrunner.js";

window.addEventListener("StoryActive", () => {
	InkRunner.instance.AddProcessor(jevent, jwindow, jreset);
});

// jEvent: event/e1,event/e2 window1,window2,window3 >> action:run|runAfterSeen|runAfterClosed
// DON'T use spaces in event or window names!!!!!!!
const jevent = new Processor({
	name: "jEvent",
	tag: "jEvent",
	type: Processor.Type.Tag,
	priority: 0,
	callback: async (p) => {
		if (!p.tag.value) InkRunner.instance.Warn("jupitertag: no events provided");
		let events = p.tag.value.indexOf(" ") === -1 ? p.tag.value.split(",") : p.tag.value.split(" ")[0].split(",");
		let windows = p.tag.value.indexOf(" ") === -1 ? [] : p.tag.value.split(" ")[1].split(",");
		events.forEach((e) => (!EVENTS.has(e) ? InkRunner.instance.Error(`jupitertag: event "${e}" does not exist`) : null));
		windows.forEach((w) => (!WINDOW_DATA.has(w) ? InkRunner.instance.Error(`jupitertag: window "${w}" does not exist`) : null));
		try {
			if (p.tag.options.action) {
				switch (p.tag.options.action) {
					case "run":
						events.forEach(async (e) => await RUN_EVENT(e));
						break;
					case "runAfterSeen":
						if (windows.length === 0) InkRunner.instance.Warn(`jupitertag: tried to runAfterSeen event ${events.toString()} with no windows`);
						events.forEach(async (e) => await RUN_EVENT_AFTER_SEEN(e, windows));
						break;
					case "runAfterClosed":
						if (windows.length === 0) InkRunner.instance.Warn(`jupitertag: tried to runAfterClosed event ${events.toString()} with no windows`);
						events.forEach(async (e) => await RUN_EVENT_AFTER_CLOSED(e, windows));
						break;
					default:
						InkRunner.instance.Warn(`jupitertag: unknown action ${p.tag.options.action}`);
						break;
				}
			} else {
				InkRunner.instance.Warn("jupitertag: no event action provided");
			}
		} catch (e) {
			InkRunner.instance.Warn("jupitertag: event tag break (maybe jupiter wasn't loaded?)");
		}
	},
});

// jWindow: window1,window2 >> action:open|close|ping|fadeAll|fadeAllExcept|closeAll|closeAllExcept|replace
// DON'T use spaces in event or window names!!!!!!!
const jwindow = new Processor({
	name: "jWindow",
	tag: "jWindow",
	type: Processor.Type.Tag,
	priority: 0,
	callback: async (p) => {
		if (!p.tag.value && p.tag.options.action !== "closeAllExcept") InkRunner.instance.Warn("jupitertag: no window provided");
		let wString = p.tag.value ? p.tag.value.trim() : "";
		let windows = wString !== "" ? p.tag.value.split(",") : [];
		windows.forEach((w) => (!WINDOW_DATA.has(w) ? InkRunner.instance.Error(`jupitertag: window "${w}" does not exist`) : null));
		try {
			if (p.tag.options.action) {
				switch (p.tag.options.action) {
					case "open":
						windows.forEach(async (w) => await OPEN_WINDOW(w));
						break;
					case "close":
						windows.forEach(async (w) => await CLOSE_WINDOW(w));
						break;
					case "ping":
						windows.forEach(async (w) => await PING_WINDOW(w));
						break;
					case "fadeAllExcept":
					case "fadeAll":
						windows.length > 0 ? await FADE_ALL_EXCEPT(windows) : await FADE_ALL_EXCEPT();
						break;
					case "closeAllExcept":
					case "closeAll":
						windows.length > 0 ? CLOSE_ALL_EXCEPT(windows) : CLOSE_ALL_EXCEPT();
						break;
					case "replace":
						if (windows.length !== 2) {
							InkRunner.instance.Warn("jupitertag: tried to replace but didn't provide 2 windows");
							break;
						}
						await REPLACE_WINDOW(windows[0], windows[1]);
						break;
					default:
						InkRunner.instance.Warn(`jupitertag: unknown action ${p.tag.options.action}`);
						break;
				}
			} else {
				InkRunner.instance.Warn("jupitertag: no window action provided");
			}
		} catch (e) {
			InkRunner.instance.Warn("jupitertag: window tag break (maybe jupiter wasn't loaded?)");
		}
	},
});

// #jReset >> fade:0.1 (default)
const jreset = new Processor({
	name: "jReset",
	tag: "jReset",
	type: Processor.Type.Tag,
	priority: 0,
	callback: async (p) => {
		let fade = p.tag.options && p.tag.options.fade ? parseFloat(p.tag.options.fade) : 0.1;
		FADE_MUSIC(fade);
		CLOSE_ALL_EXCEPT();
		opened.clear();
		closedWindows.clear();
	},
});
