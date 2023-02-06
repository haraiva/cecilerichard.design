function toggleTheme(x) {
   x.classList.toggle("fa-circle");
   var element = document.querySelector(":root");
   element.classList.toggle("lightmode");
   var image = document.getElementById('emblem');
   if (image.src.match("White")) {
      image.src = "./img/Emblem_Black_100px.png";
   } else {
      image.src = "./img/Emblem_White_100px.png"
   }
}

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
        i.disabled = true;
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