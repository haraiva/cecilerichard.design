import { InkRunner, Utility, Processor } from "../inkrunner.js";

// unfortunately because codecs are kinda cooked, we need to lay out some ground rules
// 1. we can't tell what a file's codec is from the outside. audio makes this even worse. no audio. (just use audio tags!)
// 2. no i'm not going to crack open every video just to figure this stuff out
// 3. instead, we're going to associate specific codecs with specific containers
// 4. but because i'm nice, i'm going to give you ffmpeg commands to convert to these formats :)

// here are some ffmpeg commands i used in another project - these 4 should cover most browsers and platorms
// if you want to get silly with it, use https://github.com/pixop/video-compare to compare against your source

// AV1 Main Profile Level 5.1 Tier Main BitDepth 8 (https://trac.ffmpeg.org/wiki/Encode/AV1)
// ffmpeg -i VIDEO-IN -c:v libaom-av1 -b:v 0 -crf 40 -level 5.1 -pix_fmt yuv420p -cpu-used 1 -sn -an VIDEO-OUT.mp4

// VP9 Profile 0 Level 4.1 BitDepth 8 (https://trac.ffmpeg.org/wiki/Encode/VP9)
// ffmpeg -i VIDEO-IN -c:v libvpx-vp9 -b:v 0 -crf 44 -level 4.1 -pix_fmt yuv420p -cpu-used 0 -deadline best -sn -an VIDEO-OUT.webm

// HEVC Main Profile Compability 0 Level 4.1 Tier Main (https://trac.ffmpeg.org/wiki/Encode/H.265)
// ffmpeg -i VIDEO-IN -c:v libx265    -b:v 0 -crf 28 -level 4.1 -pix_fmt yuv420p -preset veryslow -tag:v hvc1 -sn -an VIDEO-OUT.mov

// AVC Main Profile Level 4.2 (https://trac.ffmpeg.org/wiki/Encode/H.264)
// ffmpeg -i VIDEO-IN -c:v libx264    -b:v 0 -crf 28 -level 4.2 -pix_fmt yuv420p -preset veryslow -sn -an VIDEO-OUT.m4v

// codecs are indexed by extension to make it easier
// codec strings are based on the above ffmpeg commands (i think they're right anyway)
const codecs = {
	mp4: {
		name: "AV1",
		extension: ".mp4",
		codecstring: 'video/mp4; codecs="av01.0.13M.08',
		priority: 1,
	},
	webm: {
		name: "VP9",
		extension: ".webm",
		codecstring: 'video/webm; codecs="vp09.00.41.08"',
		priority: 2,
	},
	mov: {
		name: "H265/HEVC",
		extension: ".mov",
		codecstring: 'video/quicktime; codecs="hev1.1.0.L123.b0"',
		priority: 3,
	},
	m4v: {
		name: "H264",
		extension: ".m4v",
		codecstring: 'video/mp4; codecs="avc1.4d002a"',
		priority: 4,
	},
};

let supportedCodecs = {};

window.addEventListener("StoryActive", (event) => {
	const path = "video"; // from the root directory
	const extensions = [];

	// figure out supported codecs
	for (const key in codecs) {
		const vid = Utility.CreateElement("video", { dataset: { irRole: "video" } });
		if (vid.canPlayType(codecs[key].codecstring) === "probably") {
			supportedCodecs[key] = codecs[key];
			extensions.push(codecs[key].extension);
		}

		// if the browser says "probably" to one of them there's a good chance it'll be able to play it
		// so honestly... could probably just have this return the first one
		if (Object.keys(supportedCodecs).length === 1) break;
	}

	// tell inkrunner about them
	event.detail.inkrunner.options.tagTypes.video = {
		type: "video",
		path: path,
		extensions: extensions,
		tags: ["playVideo"],
	};

	// add processors
	event.detail.inkrunner.AddProcessor(playVideo, stopVideo);
});

// fetch preloaded videos
let videos = {};
addEventListener("StoryLoaded", (event) => {
	// go through all the preloaded video files and create a local record of them
	const loadedVideoFiles = event.detail.inkrunner.externalFiles.filter((file) => file.type === "video");
	loadedVideoFiles.forEach((file) => {
		let key = Utility.FilePathExtension(file.path).filename;
		if (videos[key] === undefined) videos[key] = { paths: [], element: undefined };
		videos[key].width = file.width;
		videos[key].height = file.height;
		videos[key].paths.push(file.path);
	});

	// create video element with associated source elements for each video
	// i don't -think- this should be a problem as far as cpu/ram goes?
	// TODO: check if this is a problem
	Object.keys(videos).forEach((key) => {
		videos[key].element = Utility.CreateElement("video", {
			dataset: {
				irRole: "video",
				irName: key,
			},
			muted: true,
			preload: "auto", // technically this preloads the entire video :)
			disableremoteplayback: true,
			xWebkitAirplay: "deny",
			disablepictureinpicture: true,
			playsinline: true,
			width: videos[key].width,
			height: videos[key].height,
		});
		videos[key].paths.forEach((path) => {
			let source = Utility.CreateElement("source", { src: path, type: supportedCodecs[Utility.FilePathExtension(path).extension.substring(1)].codecstring });
			videos[key].element.append(source);
		});
	});
});

/**
 * plays video
 * #playVideo: video >> target:targetid, loop:true, wait:false, remove:false
 * target - the id of the target HTML element (defaults to current inkrunner container)
 * loop - loop the video (default true)
 * wait - waits until the video is finished before finishing the constructor
 * remove - 
 */
const playVideo = new Processor({
	name: "Play video",
	author: "isyourguy",
	type: Processor.Type.Tag,
	tag: "playVideo",
	callback: async (params, inkrunner) => {
		let tag = params.tag;
		let loop = tag.options && tag.options.loop ? (tag.options.loop === "true" ? true : false) : true;
		let target = tag.options && tag.options.target ? document.getElementById(tag.options.target) : inkrunner.container;
		let wait = tag.options && tag.options.wait === "true" ? true : false;
		let remove = tag.options && tag.options.remove === "true" ? true : false;
		if ((wait || remove) && loop) {
			loop = false;
			inkrunner.Warn(`Tried to play video that waits/autoremoves, but the video is set to loop. Removing loop.`);
		}

		if (!videos[tag.value]) {
			inkrunner.Warn(`Couldn't find video "${tag.value}."`);
			return;
		}

		let video = videos[tag.value].element;

		if (target === undefined) {
			inkrunner.Warn(`Couldn't find element with id "${tag.options.target}". Appending video to current container.`);
			target = inkrunner.container;
		}

		// if the video is already playing... don't play it
		if (video.playing && video.parentNode === target) {
			inkrunner.Warn(`Video "${tag.value}" already playing.`);
			return;
		}

		// add the video to the target
		video.loop = loop;
		video.currentTime = 0;
		target.append(video);
		video.play();

		let endPromise = new Promise((resolve) => {
			const videoend = () => {
				video.removeEventListener("ended", (e) => videoend());
				if (remove) video.remove();
				resolve();
			};
			video.addEventListener("ended", (e) => videoend());
		});

		if (wait) {
			await endPromise;
		}
	},
});

/**
 * stops video
 * #stopVideo: video
 */
const stopVideo = new Processor({
	name: "Stop video",
	author: "isyourguy",
	type: Processor.Type.Tag,
	tag: "stopVideo",
	callback: (params, inkrunner) => {
		let tag = params.tag;

		if (!videos[tag.value]) {
			inkrunner.Warn(`Couldn't find video "${tag.value}."`);
			return;
		}

		let video = videos[tag.value].element;
		// this also pauses it, but doesn't reset the time
		video.remove();
	},
});
