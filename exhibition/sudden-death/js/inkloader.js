// TODO: this isn't a great solution. might need to come up with a better idea.
// issues:
// 1. importing modules is pretty shakey
//    it breaks code completion, it's a bit weird to import them on the user side
// 2. relies on specific download/import order
//    story, inkjs, modules, assets
// 3. does two separate download passes
//    since we need to download the story, run inkjs, get the compiled json, parse it, etc.
export class InkLoader {
	storyPath = "";
	options = {};
	preloadProcessors = [];
	preloadFiles = [];
	modules = {};
	/**
	 * @param {string} storyPath - Path to story (ink or json)
	 * @param {Object} options - InkRunner options
	 * @param {Array} preloadProcessors - Paths to processor js files
	 * @param {Array} preloadFiles - Other files to force preload
	 */
	constructor(storyPath, options = {}, preloadProcessors = [], preloadFiles = []) {
		if (!storyPath) console.error("No story path provided.");
		this.storyPath = storyPath;
		this.options = options;
		this.preloadProcessors = preloadProcessors;
		this.preloadFiles = preloadFiles;
	}
	async Load() {
		// create ui and update function
		let totalPercent = 0;
		const progressContainer = document.createElement("div");
		progressContainer.style.opacity = 1;
		progressContainer.dataset.irRole = "progressContainer";
		const progressBar = Object.assign(document.createElement("div", { role: "progressbar", ariaLabel: "Loading:", ariaValuemin: 0, ariaValuemax: 100, ariaValuenow: 0 }));
		progressBar.dataset.irRole = "progressBar";
		progressContainer.append(progressBar);
		document.body.append(progressContainer);

		// update aria value and css progress variables
		const updateLoadingUI = (progress) => {
			progressBar.ariaValuenow = parseFloat(progress);
			progressContainer.style.setProperty("--progressPercent", parseFloat(progress) + "%");
			progressContainer.style.setProperty("--progressDegrees", parseFloat(progress) * 3.6 + "deg");
			progressContainer.style.setProperty("--progressFloat", parseFloat(progress) / 10);
		};

		const closeLoadingUI = async (fadeout) => {
			progressContainer.style.transition = `opacity linear ${fadeout}ms 250ms`;
			setTimeout(() => (progressContainer.style.opacity = 0), 1);
			return new Promise((resolve) =>
				setTimeout(() => {
					progressContainer.remove();
					resolve();
				}, fadeout + 250 + 1)
			);
		};

		// // preload inkrunner & processors
		let initialPreloadFiles = [this.storyPath.trim(), "./js/inkrunner.js", ...this.preloadProcessors];
		for (let i = 0; i < initialPreloadFiles.length; i++) {
			initialPreloadFiles[i] = new URL(initialPreloadFiles[i].trim(), document.baseURI).pathname;
		}

		// preload inkjs, inkrunner & processors
		// let initialPreloadFiles = [this.storyPath.trim(), "./js/ink-full.js", "./js/inkrunner.js", ...this.preloadProcessors];
		// for (let i = 0; i < initialPreloadFiles.length; i++) {
		// 	initialPreloadFiles[i] = new URL(initialPreloadFiles[i].trim(), document.baseURI).pathname;
		// }

		let initialPreloadCheckPromises = [];
		initialPreloadFiles.forEach((path) => {
			initialPreloadCheckPromises.push(
				fetch(path, { method: "HEAD" }).then((res) => {
					if (!res.ok) console.error(`Tried to load non-existent module or story at "${path}"`);
				})
			);
		});

		// create initial preloader and progress event
		const initialPreloader = Preload();
		initialPreloader.onprogress = (event) => {
			// set percent up to 25%
			totalPercent = event.progress / 4;
			updateLoadingUI(totalPercent);
		};
		initialPreloader.oncomplete = (event) => {
			if (this.options.debug) console.log("InkLoader: Modules preload complete");
		};

		// when all initial files return OK, fetch them
		let initialPreloadPromise;
		await Promise.all(initialPreloadCheckPromises).then(() => {
			if (!this.options.debug) console.clear();
			initialPreloadPromise = initialPreloader.fetch(initialPreloadFiles);
		});

		await Promise.resolve(initialPreloadPromise);

		// dynamic module loading!!!!
		let modulePromises = [];
		for await (const file of initialPreloadFiles) {
			if (file.slice(-3) === ".js") {
				if (file.slice(-12) === "inkrunner.js") {
					modulePromises.push(
						new Promise(async (resolve) => {
							let keys = (await import(file)).preload();
							for (const key of keys) {
								({ [key]: this.modules[key] } = await import(file));
							}
							resolve();
						})
					);
				} else {
					modulePromises.push(import(file));
				}
			}
		}

		// wait until they're all imported
		await Promise.all(modulePromises);
		if (this.options.debug) console.log("InkLoader: Imported modules");
		const Utility = this.modules.Utility;

		// create inkrunner instance and load the story
		const inkrunner = new this.modules.InkRunner(this.storyPath, this.options);
		// if you're not loading files, this takes the longest
		const storyJson = await inkrunner.LoadInk().catch((e) => {
			// uh oh
			inkrunner.SetStatus(this.modules.InkRunner.Status.Error);
			inkrunner.Error(e);
		});

		// preload story assets and preload files
		let assetPreloadCheck = [];
		let assetPreloadCheckPromises = [];
		let assetPreloadFiles = [];

		// categorise manually preloaded files
		this.preloadFiles.forEach((path) => {
			let type = "unknown";
			Object.values(inkrunner.options.tagTypes).forEach((tagtype) => {
				if (tagtype.extensions.includes(Utility.FilePathExtension(path).extension)) type = tagtype.type;
			});
			assetPreloadCheck.push({ name: Utility.FilePathExtension(path).filename, path: path, type: type });
		});

		// find all matches of above tags in the provided ink json
		// split them into path, filename, and extension
		// if an extension isn't provided, add all possible permutations based on extensions provided by tag
		// add the file to a list of files to be checked
		// thanks again elliot for da regex 🙇
		let tags = [];
		if (inkrunner.options.tagTypes && Object.keys(inkrunner.options.tagTypes).length !== 0) {
			Object.values(inkrunner.options.tagTypes).forEach((tagtype) => tags.push(...tagtype.tags));
			for (const match of storyJson.matchAll(new RegExp(`"#","\\^((${tags.join("|")}).*?)","\\/#"`, "gi"))) {
				let tagObject = inkrunner.ProcessTagString(match[1]);
				if (tagObject === undefined) continue;
				let tagType = Object.entries(inkrunner.options.tagTypes).find(([key, value]) => value.tags.includes(tagObject.name))[1];
				let path = tagObject.value.indexOf("/") !== -1 ? Utility.FilePathExtension(tagObject.value).path : tagType.path;

				// stupid code to ensure the path string is relative
				path = path.slice(-1) === "/" ? path : path + "/";
				if (path[0] === "/") path = "." + path;
				if (/^[\w]{1}/.test(path)) path = "./" + path;

				// split the string into file name and extension
				let file = Utility.FilePathExtension(tagObject.value).filename;
				let exts = Utility.FilePathExtension(tagObject.value).extension !== "" ? [Utility.FilePathExtension(tagObject.value).extension] : tagType.extensions;
				exts.forEach((ext) => {
					let type = tagType.type ? tagType.type : "unknown";
					let url = new URL(path + file + ext, document.baseURI).pathname;
					assetPreloadCheck.push({ name: tagObject.value, path: url, type: type });
				});
			}
		}

		// create promise array to go through files (and possible extensions)
		// and check if they're okay (i.e. return HTTP 200)
		assetPreloadCheck = Utility.DeduplicateObjectArrayByKey(assetPreloadCheck, "path");
		assetPreloadCheck.forEach((file) => {
			assetPreloadCheckPromises.push(Utility.CheckURLOK(file.path).then((ok) => ok && assetPreloadFiles.push(file)));
		});

		// set up asset preloader and progress event
		const assetPreloader = Preload();
		let fileCheckPromises = [];
		assetPreloader.onprogress = (event) => {
			// previous total was 25%, so add up to 95% from there
			totalPercent = 25 + event.progress * 0.7;
			updateLoadingUI(totalPercent);

			// for each image file, create a promise to get the image height/width
			// and store alongside the img url
			// the browser has a cache for a reason so i may as well use it
			if (event.item.completion === 100) {
				// try to move this into individual modules
				// not even sure i can do this since i decided to use dynamic imports
				// god DAMN it i regret this now lol
				let file = assetPreloadFiles.find((file) => file.path === event.item.url);
				if (file) {
					switch (file.type) {
						case "image":
							fileCheckPromises.push({
								path: file.path,
								promise: new Promise((resolve) => {
									let img = new Image();
									img.src = file.path;
									img.onload = () => {
										file.width = img.width;
										file.height = img.height;
										img = null;
										resolve();
									};
								}),
							});
							break;
						case "video":
							fileCheckPromises.push({
								path: file.path.trim(),
								promise: new Promise((resolve) => {
									let vid = Utility.CreateElement("video", { src: file.path, preload: true });
									vid.onloadeddata = () => {
										file.width = vid.videoWidth;
										file.height = vid.videoHeight;
										vid = null;
										resolve();
									};
								}),
							});
							break;
						default:
							break;
					}
				}
			}
		};

		let assetPreloadPromise;
		await Promise.all(assetPreloadCheckPromises);
		if (this.options.debug) console.log("InkLoader: Asset download list compiled");
		if (!this.options.debug) console.clear();
		if (assetPreloadFiles.length > 0) assetPreloadPromise = assetPreloader.fetch(assetPreloadFiles.map((file) => file.path));

		// wait for all files to preload
		await Promise.resolve(assetPreloadPromise);
		if (this.options.debug) console.log("InkLoader: Asset preload complete");

		// await image width/height check
		await Promise.all(fileCheckPromises.map((e) => e.promise));
		if (this.options.debug) console.log("InkLoader: Asset metadata check complete");
		inkrunner.externalFiles = assetPreloadFiles;

		// all done!
		totalPercent = 100;
		updateLoadingUI(totalPercent);
		if (this.options.debug) console.log("InkLoader: Preload complete");
		await closeLoadingUI(250);
		window.dispatchEvent(new CustomEvent("PreloadComplete"), { detail: { files: assetPreloadFiles } });
		return this.modules.InkRunner.instance;
	}
}

/**
 * preload-it v1.4.0
 * (c) 2018 Andreu Pifarre
 * MIT License
 * https://github.com/andreupifarre/preload-it
 */
// prettier-ignore
function Preload(t) {return {state: [],loaded: !1,stepped: (t && t.stepped) || !0,onprogress: () => {},oncomplete: () => {},onfetched: () => {},onerror: () => {},oncancel: () => {},fetch: function (t) {return new Promise((e, o) => {this.loaded = t.length;for (let o of t)this.state.push({ url: o }),this.preloadOne(o, (t) => {this.onfetched(t);this.loaded--;0 == this.loaded && (this.oncomplete(this.state), e(this.state));});});},updateProgressBar: function (t) {let e = 0,o = this.stepped ? 100 * this.state.length : 0,n = 0;for (const t of this.state) t.completion && n++, this.stepped ? t.completion && (e += t.completion) : this._readyForComputation ? ((e += t.downloaded), (o += t.total)) : (e = o = 0);this._readyForComputation = n == this.state.length;const s = parseInt((e / o) * 100);isNaN(s) || this.onprogress({ progress: s, item: t });},preloadOne: function (t, e) {const o = new XMLHttpRequest();o.open("GET", t, !0), (o.responseType = "blob");const n = this.getItemByUrl(t);(n.xhr = o),(o.onprogress = (t) => {if (!t.lengthComputable) return !1;n.completion = parseInt((t.loaded / t.total) * 100);n.downloaded = t.loaded;n.total = t.total;this.updateProgressBar(n);}),(o.onload = (t) => {const s = t.target.response.type;const r = t.target.responseURL;n.fileName = r.substring(r.lastIndexOf("/") + 1);n.type = s;n.status = o.status;if (404 == o.status) (n.blobUrl = n.size = null), (n.error = !0), this.onerror(n);else {const e = new Blob([t.target.response], { type: s });(n.blobUrl = URL.createObjectURL(e)), (n.size = e.size), (n.error = !1);}e(n);}),o.send();},getItemByUrl: function (t) {for (var e of this.state) if (e.url == t) return e;},cancel: function () {for (var t of this.state) t.completion < 100 && (t.xhr.abort(), (t.status = 0));return this.oncancel(this.state), this.state;},};}
