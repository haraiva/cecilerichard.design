/**
 * @typedef {Object} JupiterDataWindow
 * @property {string} id
 * @property {string} title
 * @property {string} body
 * @property {string[]} classes
 * @property {boolean} pinned
 */

document.addEventListener("DOMContentLoaded", setup);

const WINDOW_DATA = new Map();

async function SHOW_TITLE(text) {
    await showTitle(text);
}

async function OPEN_WINDOW(id) {
    const data = WINDOW_DATA.get(id);
    setupWindow2(data);
    await openWindow(id);
}

async function CLOSE_WINDOW(id) {
    await closeWindow(document.getElementById(id));
}

async function PING_WINDOW(id) {
    await attentionWindow(id);
}

async function FADE_ALL_EXCEPT(...ids) {
    exclusiveWindow(...ids);
    await DELAY(1);
    CLOSE_ALL_EXCEPT(...ids);
    hideScreen();
}

function CLOSE_ALL_EXCEPT(...ids) {
    closeAll(...ids);
}

async function REPLACE_WINDOW(targetId, sourceId) {
    replaceWindow(targetId, sourceId);
}

const EVENTS = new Map();

function ADD_EVENT(id, func) {
    EVENTS.set(id, func);
}

function RUN_EVENT_AFTER_SEEN(event, ids) {
    return openedTrigger(...ids).then(() => EVENTS.get(event)());
}

function RUN_EVENT_AFTER_CLOSED(event, ids) {
    return closedTrigger(...ids).then(() => EVENTS.get(event)());
}

function RUN_EVENT(event) {
    return EVENTS.get(event)();
}

const DELAY = (seconds) => sleep(seconds * 1000);

const SOUNDS = new Map();

function ADD_MUSIC(id, src, volume=1, loop=true) {
    SOUNDS.set("audio/music/" + id, new Howl({ src: [src], volume, loop }));
}

function PLAY_CLIP(id) {
    SOUNDS.get(id).play();
}

function PLAY_MUSIC(id) {
    setMusic(SOUNDS.get(id));
}

async function FADE_MUSIC(duration) {
    fadeMusicOut(duration);
    return DELAY(duration);
}

let activeMusic;

function setMusic(nextMusic) {
    const prevMusic = activeMusic;

    if (prevMusic === nextMusic) return;
    if (prevMusic) prevMusic.stop();

    if (nextMusic) {
        nextMusic.play();
        nextMusic.fade(0, 0.1, 1000);
    }

    activeMusic = nextMusic;
}

function fadeMusicOut(duration=1) {
    if (activeMusic) {
        activeMusic.fade(activeMusic._volume, 0, duration*1000);
    }
}

/**
 * @param {HTMLElement} handleElement 
 * @param {HTMLElement} draggedElement
 * @param {HTMLElement} boundingElement 
 */
function makeDraggable(handleElement, draggedElement, boundingElement=undefined) {
    boundingElement = boundingElement ?? document.querySelector("html");
    let offset;

    handleElement.addEventListener('pointerdown', (event) => {
        if (event.target !== handleElement) return;
        event.preventDefault();

        const dx = draggedElement.offsetLeft - event.clientX;
        const dy = draggedElement.offsetTop - event.clientY;
        offset = [dx, dy];

        focusWindow(draggedElement);
    });

    window.addEventListener('pointerup', (event) => {
        offset = undefined;
    });

    window.addEventListener('pointermove', (event) => {
        if (!offset) return;

        const [dx, dy] = offset;
        const tx = event.clientX + dx;
        const ty = event.clientY + dy;

        let minX = tx;
        let minY = ty;

        const maxX = minX + draggedElement.clientWidth;
        const maxY = minY + draggedElement.clientHeight;

        const shiftX = Math.min(0, boundingElement.clientWidth - maxX);
        const shiftY = Math.min(0, boundingElement.clientHeight - maxY);

        minX = Math.max(0, minX + shiftX);
        minY = Math.max(0, minY + shiftY);

        draggedElement.style.left = minX + 'px';
        draggedElement.style.top = minY + 'px';

        PLAY_CLIP("audio/clips/move");
    });
}

async function flashElement(element, duration=.1) {
    element.classList.toggle("flash", true);
    await sleep(duration * 1000);
    element.classList.toggle("flash", false);
}

let prevZ = 0;

async function exclusiveWindow(...ids) {
    const screen = document.getElementById("screen");
    screen.style.setProperty("opacity", "100%");
    screen.style.removeProperty("pointer-events");
    focusWindow(screen);

    ids.forEach((id) => focusWindow(document.getElementById(id)));
}

async function hideScreen() {
    const screen = document.getElementById("screen");
    screen.style.setProperty("opacity", "0%");
    screen.style.setProperty("pointer-events", "none");
}

/**
 * @param {HTMLElement} windowElement 
 */
async function focusWindow(windowElement) {
    prevZ += 1;
    windowElement.style.setProperty("z-index", prevZ.toString());
    windowElement.classList.remove("attention");
}

async function attentionWindow(id) {
    PLAY_CLIP("audio/clips/notification");
    const windowElement = document.getElementById(id);
    windowElement.classList.add("attention");
}

const opened = new Set();
const closedWindows = new Set();

async function openWindow(id) {
    window.getSelection().removeAllRanges();

    const windowElement = document.getElementById(id);

    if (!windowElement) {
        return RUN_EVENT(id);
    }

    const reposition = windowElement.hidden === true;

    windowElement.hidden = false;

    if (reposition) {
        const boundingElement = document.querySelector("html");
        const cx = boundingElement.clientWidth / 2;
        const cy = boundingElement.clientHeight / 2;
        const w = windowElement.clientWidth;
        const h = windowElement.clientHeight;

        const ox = Math.random() * 512 - 256;
        const oy = Math.random() * 512 - 256;

        await moveWindow(windowElement, cx-w/2+ox, cy-h/2+oy);
    }

    await focusWindow(windowElement);
    await flashElement(windowElement);

    if (!opened.has(id)) {
        opened.add(id);
        firstOpen(id);
    }
}

async function moveWindow(windowElement, x, y) {
    windowElement.style.left = x + 'px';
    windowElement.style.top = y + 'px';
}

async function closeWindow(windowElement) {
    await flashElement(windowElement);
    windowElement.hidden = true;

    if (!closedWindows.has(windowElement.id)) {
        closedWindows.add(windowElement.id);
        firstClose(windowElement.id);
    }
}

async function closeAll(...except) {
    const exceptions = new Set(except.map((id) => document.getElementById(id)));

    document.querySelectorAll(".window").forEach((windowElement) => {
        if (exceptions.has(windowElement)) return;
        
        windowElement.hidden = true;
    });
}

function applyMacros(element) {
    element.innerHTML = element.innerHTML.replaceAll(/\[([^\]]+)\|([^\]]+)\]/g,'<a href="#$2">$1</a>');
    element.querySelectorAll("a").forEach((anchorElement) => {
        const href = anchorElement.getAttribute("href");
        if (href.startsWith("#")) {
            anchorElement.addEventListener("click", (event) => {
                PLAY_CLIP("audio/clips/click");
                event.preventDefault();
                event.stopPropagation();

                focusWindow(anchorElement.closest(".window"));
                openWindow(href.slice(1));
            });
        }
    });
}

function extractBody(parentElement) {
    applyMacros(parentElement);

    parentElement.querySelectorAll("img").forEach((imageElement) => {
        const wrapper = html("div", { "class": "img-tint" }); 
        imageElement.parentElement.replaceChild(wrapper, imageElement);
        wrapper.append(imageElement);
    });

    return parentElement.children;
}

function makeWindow(id) {
    const closeButton = html("button", { "class": "window-close" }, "✕");
    const titleElement = html("div", { "class": "window-title" });
    const bodyElement = html("div", { "class": "window-body" });
    const windowElement = html("div", { "class": "window" }, closeButton, titleElement, bodyElement);

    windowElement.id = id;
    windowElement.hidden = true;
    windowElement.addEventListener("mousedown", () => focusWindow(windowElement));
    
    makeDraggable(titleElement, windowElement);
    closeButton?.addEventListener("click", () => {
        PLAY_CLIP("audio/clips/click");
        closeWindow(windowElement);
    });

    bodyElement.addEventListener("scroll", () => {
        PLAY_CLIP("audio/clips/move");
        focusWindow(windowElement);
    });

    document.body.append(windowElement);

    return windowElement;
}

function replaceWindow(targetId, sourceId) {
    const target = document.getElementById(targetId);
    const source = document.getElementById(sourceId);

    target.querySelector(".window-body").replaceChildren(...source.querySelector(".window-body").children);
}

function preventSelect() {
    document.body.addEventListener("selectstart", (event) => {
        if (event.target != event.currentTarget) return; 
        event.preventDefault();
        // event.stopPropagation();
    });
}

async function setup() {
    confineWindows();
    preventSelect();

    await loadWindows("window-data");

    const eventData = document.getElementById("event-data");
    eventData.remove();
    addEventsFromDOM(eventData.content);

    const audioData = document.getElementById("audio-data");
    audioData.remove();
    audioData.content.querySelectorAll("audio").forEach((element) => {
        const audio = new Howl({ 
            src: element.getAttribute("src"), 
            volume: parseFloat(element.getAttribute("volume") ?? "1"),
            loop: element.hasAttribute("loop"),
        });
        SOUNDS.set(element.getAttribute("id"), audio);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "q" && event.ctrlKey) {
            openDebugWindow();
        }
    });

    await RUN_EVENT("events/start");
}

function openDebugWindow() {
    const window = setupWindow2({
        id: "debug",
        title: "[DEBUG]",
        body: "",
        classes: [],
        pinned: false,
    });


    const events = Array.from(EVENTS.keys());
    const eventOptions = events.map((id) => html("option", { value: id }, id));
    const eventSelect = html("select", { size: 4 }, ...eventOptions);

    const runEvent = html("button", {}, "run event");
    runEvent.addEventListener("click", () => RUN_EVENT(eventSelect.value));
    const eventButtons = html("div", { style: "display: flex; flex-direction: row; gap: .5em;"}, runEvent);

    const windows = Array.from(WINDOW_DATA.keys());
    const windowOptions = windows.map((id) => html("option", { value: id }, id));
    const windowSelect = html("select", { size: 4 }, ...windowOptions);

    const openWindowB = html("button", {}, "open window");
    openWindowB.addEventListener("click", () => OPEN_WINDOW(windowSelect.value));
    const closeWindowB = html("button", {}, "close window");
    closeWindowB.addEventListener("click", () => CLOSE_WINDOW(windowSelect.value));
    const windowButtons = html("div", { style: "display: flex; flex-direction: row; gap: .5em;"}, openWindowB, closeWindowB);

    const left = html("div", { style: "display: flex; flex-direction: column; gap: .5em; flex: 1;" }, eventSelect, eventButtons);
    const right = html("div", { style: "display: flex; flex-direction: column; gap: .5em; flex: 1;" }, windowSelect, windowButtons);

    const body = window.querySelector(".window-body");
    body.replaceChildren(left, right);

    openWindow("debug");
}

async function confineWindows() {
    window.requestAnimationFrame(confineWindows);
    
    const boundingElement = document.querySelector("html");
    const width = boundingElement.offsetWidth;
    const height = boundingElement.offsetHeight;

    document.querySelectorAll(".window").forEach((windowElement) => {
        const x = windowElement.offsetLeft;
        const y = windowElement.offsetTop;
        const w = windowElement.offsetWidth;
        const h = windowElement.offsetHeight; 

        let minX = x;
        let minY = y;

        const maxX = minX + w;
        const maxY = minY + h;

        const shiftX = Math.min(0, boundingElement.clientWidth - maxX);
        const shiftY = Math.min(0, boundingElement.clientHeight - maxY);

        minX = Math.max(0, minX + shiftX);
        minY = Math.max(0, minY + shiftY);

        windowElement.style.left = minX + 'px';
        windowElement.style.top = minY + 'px';
    });
}

/**
 * @param {HTMLElement} root
 * @returns {JupiterDataWindow[]}
 */
function loadWindowDatasFromDOM(root) {
    const elements = Array.from(root.querySelectorAll("div"));
    return elements.map((element) => {
        return {
            id: element.getAttribute("id"),
            title: element.getAttribute("title"),
            body: element.innerHTML,
            classes: Array.from(element.classList),
            pinned: element.hasAttribute("data-pinned"),
        };
    });
}

/**
 * @param {HTMLElement} root
 */
function addEventsFromDOM(root) {
    const scripts = Array.from(root.querySelectorAll("script"));
    scripts.forEach((element) => {
        const func = new AsyncFunction("", element.textContent);
        EVENTS.set(element.getAttribute("id"), func);
    });

    const triggers = Array.from(root.querySelectorAll("event-trigger"));
    triggers.forEach((element) => {
        const id = element.getAttribute("event");
        const opened = element.getAttribute("opened")?.split(" ") ?? [];
        const closed = element.getAttribute("closed")?.split(" ") ?? [];
        openedClosedTrigger(opened, closed).then(() => RUN_EVENT(id));
    });
}

async function loadWindows(id) {
    const template = document.getElementById(id);
    template.remove();

    const data = loadWindowDatasFromDOM(template.content);
    data.forEach((data) => WINDOW_DATA.set(data.id, data));
    data.forEach((data) => setupWindow2(data));
}

/**
 * @param {JupiterDataWindow} data 
 * @return {HTMLElement}
 */
 function setupWindow2(data) {
    if (document.getElementById(data.id)) return document.getElementById(data.id);

    const windowElement = makeWindow(data.id);

    windowElement.querySelector(".window-title").replaceChildren(data.title);
    windowElement.querySelector(".window-body").innerHTML = data.body;
    extractBody(windowElement.querySelector(".window-body"));
    windowElement.querySelector(".window-close").hidden = data.pinned;

    windowElement.title = data.title;
    windowElement.classList.add(...data.classes);

    return windowElement;
}

async function showTitle(title) {
    const screen = document.getElementById("title-board");
    screen.hidden = false;
    screen.style.setProperty("opacity", "100%");
    screen.style.setProperty("pointer-events", "initial");

    document.getElementById("title").textContent = title;

    await sleep(2000);
    
    screen.style.setProperty("opacity", "0%");
    screen.style.removeProperty("pointer-events");

    await sleep(1000);
}

const events = new EventTarget();

async function openedClosedTrigger(opened, closed) {
    return new Promise((resolve, reject) => {
        opened = new Set(opened);
        closed = new Set(closed);

        function check() {
            if (opened.size === 0 && closed.size === 0) {
                resolve();
                events.removeEventListener("opened", onOpened);
                events.removeEventListener("closed", onClosed);
            }
        }

        function onOpened({ detail: id }) {
            opened.delete(id);
            check();
        }

        function onClosed({ detail: id }) {
            closed.delete(id);
            check();
        }

        events.addEventListener("opened", onOpened);
        events.addEventListener("closed", onClosed);
    });
}

async function openedTrigger(...ids) {
    return new Promise((resolve, reject) => {
        const reqs = new Set(ids);

        function check({ detail: id }) {
            reqs.delete(id);
            if (reqs.size === 0) {
                resolve(id);
                events.removeEventListener("opened", check);
            }
        }

        events.addEventListener("opened", check);
    });
}

async function closedTrigger(...ids) {
    return new Promise((resolve, reject) => {
        const reqs = new Set(ids);

        function check({ detail: id }) {
            reqs.delete(id);
            if (reqs.size === 0) {
                resolve(id);
                events.removeEventListener("closed", check);
            }
        }

        events.addEventListener("closed", check);
    });
}

async function firstOpen(id) {
    events.dispatchEvent(new CustomEvent("opened", { detail: id }));
}

async function firstClose(id) {
    events.dispatchEvent(new CustomEvent("closed", { detail: id }));
}