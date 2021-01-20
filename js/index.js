var section1 = document.getElementById("section1");
var section2 = document.getElementById("section2");
var section3 = document.getElementById("section3");

document.onmousemove = function(event) {
        section1.style.height = event.clientY + 'px';
        section2.style.height = "calc(100% - " + (section1.offsetHeight + section3.offsetHeight - 10) + 'px'; 
        section3.style.height = "calc(100% - " + event.clientY + 'px';
}
