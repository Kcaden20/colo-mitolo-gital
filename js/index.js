var background = document.getElementById('background');
var section1 = document.getElementById("section1");
var section2 = document.getElementById("section2");
var section3 = document.getElementById("section3");

var timesPerSecond = 15; // how many times to fire the event per second
var wait = false;
var updateHeight = function(event) {
    
    if (!wait) {
    if((event.clientY / 100) <= 6 && (event.clientY / 100) >= 1 ) { 
        section1.style.height = event.clientY + 'px'; 
    }

    if(((section1.offsetHeight + section3.offsetHeight - 10) / 100) <= 9.1 && ((section1.offsetHeight + section3.offsetHeight - 10) / 100) >= 1.2 ) { 
        section2.style.height = "calc(100% - " + (section1.offsetHeight + section3.offsetHeight) + 'px'; 
    }

    if((event.clientY / 100) <= 9.1 && (event.clientY / 100) >= 6.8 ) {   section3.style.height = "calc(100% - " + event.clientY + 'px';
    }

    wait = true; 
    background.removeEventListener('mousemove', updateHeight);
    
    setTimeout(function () {
        wait = false;
        background.addEventListener('mousemove', updateHeight);
    }, 1000 / timesPerSecond);
}

}; 


    background.addEventListener('mousemove', updateHeight, false);

