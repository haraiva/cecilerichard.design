const buttonLight = document.getElementById('lightToggle');
const lightIcon = document.getElementById('lighticon');
const emblem = document.getElementById('emblem');

if (theme == 'system') {
	theme = (window.matchMedia('(prefers-color-scheme: light)').matches) ? 'light' : 'dark';
}

document.documentElement.dataset.theme = theme;
setTheme(theme);

function setTheme(theme) {
	document.documentElement.dataset.theme = theme;

	// Update Icons/Emblems
	if (theme == 'light') {
		lightIcon.classList.add('fa-moon');
		emblem.src = '/img/Emblem_Black_100px.png';
	} else {
		lightIcon.classList.remove('fa-moon');
		emblem.src = '/img/Emblem_White_100px.png';
	}
}

buttonLight.addEventListener('click', () => {
	theme = (theme == 'light') ? 'dark' : 'light';
	localStorage.setItem('theme', theme);
	setTheme(theme);
});