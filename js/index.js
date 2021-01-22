var background = document.getElementById('background');
var section1 = document.getElementById("section1");
var section2 = document.getElementById("section2");
var section3 = document.getElementById("section3");
var cumbia = document.getElementById("cumbia");

var audio = document.getElementById('audio');
var isPlaying = false;

function togglePlay() {
    cumbia.volume = .5;
    isPlaying ? cumbia.pause() : cumbia.play();
  };
  
  cumbia.onplaying = function() {
      isPlaying = true;
      audio.innerHTML = "Mute Audio"
    };
    cumbia.onpause = function() {
      isPlaying = false;
      audio.innerHTML = "Unmute Audio"
    };
    

var timesPerSecond = 15; // how many times to fire the event per second
var wait = false;

var updateHeight = function(event) {
    var percentage = Math.floor(event.clientY / window.innerHeight * 100);

    if (!wait) {
    if(percentage <= 60 && percentage >= 10) { 
        section1.style.height = event.clientY + 'px'; 
        section2.style.height = "calc(100% - " + (section1.offsetHeight + section3.offsetHeight) + 'px'; 

    }
    if(percentage >= 70) {
        section2.style.height = event.clientY - section1.offsetHeight + 'px'; 
        section3.style.height = "calc(100% - " + (section1.offsetHeight + section2.offsetHeight) + 'px'; 
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






