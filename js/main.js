// THEME TOGGLE
const buttonLight = document.getElementById('lightswitch');
const lightIcon = document.getElementById('lighticon');
const emblem = document.getElementById('emblem');

if (theme == 'system') {
    theme = (window.matchMedia('(prefers-color-scheme: light)').matches) ? 'light' : 'dark';
}

setTheme(theme);

function setTheme(theme) {
    document.documentElement.dataset.theme = theme;

    // Update Icons/Emblems
    if (theme == 'dark') {
        lightIcon.classList.add('fa-moon');
        emblem.src = './img/Emblem_Black_100px.png';
    } else {
        lightIcon.classList.remove('fa-moon');
        emblem.src = './img/Emblem_White_100px.png';
    }
}

buttonLight.addEventListener('click', () => {
    theme = (theme == 'light') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    setTheme(theme);
});

function toggleVisibility(id) {
      var x = document.getElementById(id);
  if (x.style.display === "none") {
      x.style.display = "block";
      } else {
      x.style.display = "none";
  }
} 

function newsMessage() {
document.getElementById("news_message").innerHTML = "hello!";
}


function thankyou() {
    // Disable Form
    inputs = contactForm.querySelectorAll('input, select, textarea, button');
    for (i of inputs) {
        i.readOnly = true;
    }
    // Hide Button - you can do this instead!
    buttons = contactForm.querySelectorAll('button');
    for (b of buttons) {
        b.hidden = true;
    }
    
    // Append a ThankYou Message - with a class you can style.
    const response = document.createElement('p');
    response.classList.add('formResponse');
    response.innerText = "Thank you!";
    contactForm.appendChild(response);
}

contactForm = document.getElementById('contactform');
contactForm.addEventListener('submit', thankyou);