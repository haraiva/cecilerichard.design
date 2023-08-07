class ZineReader extends HTMLElement {

	constructor() {
		super();

		// Create shadow root
		this.shadow = this.attachShadow({mode: 'open'});
		const shadow = this.shadow;

		// Create Document Elements
		const wrapper = document.createElement('div');
		wrapper.id = 'zine-reader';
		wrapper.setAttribute('class','wrapper');
		this.wrapper = wrapper;

		const viewer = document.createElement('div');
		viewer.setAttribute('class','viewer');

		//
		this.pages = [];
		this.currentPage = 0;

		// Stuff child elements into Viewer
		Array.from(this.children).forEach((child, index) => {
			const flip = index % 2 ? -1 : 1; // Odd = -1, Even = 1
			child.className = 'depth-' + Math.min(9, index);
			child.style.transform = 'translateX(100%) rotateY(0deg) scaleZ(' + flip + ') translateZ(-' + index + ')';
			viewer.appendChild(child);
			this.pages.push(child);
		});

		// UI
		const ui = document.createElement('div');
		ui.setAttribute('class','ui');

		const prevButton = document.createElement('button');
		prevButton.addEventListener('click', () => this.prev());
		prevButton.innerText = '<';
		ui.appendChild(prevButton);

		const nextButton = document.createElement('button');
		nextButton.addEventListener('click', () => this.next());
		nextButton.innerText = '>';
		ui.appendChild(nextButton);

		const pageIndicator = document.createElement('span');
		pageIndicator.id = 'indicator';
		pageIndicator.innerText = 'Page ' + this.currentPage + ' / ' + this.pages.length;
		ui.appendChild(pageIndicator);

		const fullscreenToggle = document.createElement('button');
		fullscreenToggle.addEventListener('click', () => this.toggleFullscreen());
		fullscreenToggle.innerText = "Fullscreen";
		ui.appendChild(fullscreenToggle);

		// Attach Style
		const styleLink = document.createElement('link');
		styleLink.setAttribute('rel', 'stylesheet');
		styleLink.setAttribute('href', '/css/zinereader.css');

		// Variables
		this.setup();

		shadow.appendChild(styleLink);
		wrapper.appendChild(viewer);
		wrapper.appendChild(ui);
		shadow.appendChild(wrapper);
	}

	setup(pages) {
		console.log('setup...');
		console.log('Pages', this.pages);
	}

	next() {
		console.log('next');
		if (this.currentPage >= this.pages.length - 1) return;
		let currentPage = this.currentPage;
		this.updatePageTransforms(currentPage, '-180deg', '0deg');

		this.updatePageDepth(currentPage - 5, 2);
		this.updatePageDepth(currentPage - 3, 1);
		this.updatePageDepth(currentPage + 1, 0);

		this.currentPage += 2;
		this.updateIndicator();
	}

	prev() {
		console.log('prev');
		if (this.currentPage <= 0) return;
		let currentPage = this.currentPage;
		this.updatePageTransforms(currentPage, '0deg', '-180deg');

		this.updatePageDepth(currentPage - 1, 0);
		this.updatePageDepth(currentPage + 1, 1);
		this.updatePageDepth(currentPage + 3, 2);

		this.currentPage -= 2;
		this.updateIndicator();
	}

	updatePageTransforms(page, search, replace) {
		this.getPages(page).forEach(page => {
			page.style.transform = page.style.transform.replace(search, replace);
		})
	}

	updatePageDepth(page, depth) {
		this.getPages(page).forEach(page => {
			page.className = page.className.replace(/depth-\d+/, 'depth-' + Math.min(depth, 9));
		})
	}

	getPages(page) {
		return [this.pages[page], this.pages[page - 1]].filter(i => i);
	}

	updateIndicator() {
		let indicator = this.shadow.getElementById('indicator');
		let currentPage = this.currentPage;
		let pageText = 'Page ' + this.currentPage + ' / ' + this.pages.length;
		if (indicator) indicator.innerText = pageText;
	}

	toggleFullscreen() {
		console.log("Toggle Fullscreen");
		console.log(this.wrapper);
		this.wrapper.classList.toggle('fullscreen');
	}
}

if (!customElements.get('zine-reader')) customElements.define('zine-reader', ZineReader);

//
const zineInstance = document.getElementsByTagName('zine-reader')[0];

// Keyboard input
document.addEventListener('keyup', function onKeyUp(key) {
    if (key.key === 'ArrowLeft' || key.key === 'a') {
        zineInstance.prev();
    } else if (key.key === 'ArrowRight' || key.key === 'd') {
        zineInstance.next();
    }
});
