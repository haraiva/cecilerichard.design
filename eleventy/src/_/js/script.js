console.log("HELLO");

const buttonLight = document.getElementById('lightToggle');
const lightIcon = document.getElementById('lighticon');
const emblem = document.getElementById('emblem');

// Get lightmode state from storage. Returns a string or null, which is annoying.
let lightMode = localStorage.getItem('lightmode');

if (lightMode == null) {
	// There's nothing in storage, so set a default value.
	localStorage.setItem('lightmode', false);
	lightMode = false;
} else {
	// If the string matches 'true', then convert it to a boolean.
	lightMode = lightMode == 'true';
	if (lightMode) toggleLightMode(lightMode);
}

buttonLight.addEventListener('click', () => {
	lightMode = !lightMode;
	localStorage.setItem('lightmode', lightMode);
	toggleLightMode(lightMode);
});

function toggleLightMode(isLight) {
	if (isLight) {
		document.body.classList.add('lightmode');
		lightIcon.classList.add('fa-moon');
		emblem.src = '/img/Emblem_Black_100px.png';
	} else {
		document.body.classList.remove('lightmode');
		lightIcon.classList.remove('fa-moon');
		emblem.src = '/img/Emblem_White_100px.png';
	}
}