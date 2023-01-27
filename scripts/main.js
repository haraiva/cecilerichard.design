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


function thankyouMessage() {
   document.getElementById("form").innerHTML = "Thank you!"
}