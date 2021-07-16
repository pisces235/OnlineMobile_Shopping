// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the header
var header = document.getElementById("header");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
/*var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}*/

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

var a = document.getElementsByClassName('ct-show');
var button_show = document.getElementsByClassName('fa-plus-circle');



function resize() {
  for(var i = 0; i < button_show.length; i++){
    if (window.outerWidth <= 768) {
      a[0].style.display = "none";
      a[1].style.display = "none";
      return;
    }
  }
  a[0].style.display = "block";
  a[1].style.display = "block";
  
}

function show(i) {
  
    if (a[i].style.display == "block") {
      return a[i].style.display = "none";
    }
    return a[i].style.display = "block";
  
}
function close_message() {
  var message = document.getElementById("message-info");
  message.remove();
}