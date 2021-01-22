var i = 0;
var l = 0;
var selectionCount = document.querySelectorAll("h2");
var conserv = [ 1, 2, 7, 8, 9, 10, 11, 12, 13, 14]; 
var demo = document.getElementById('text-box');
var enter = document.getElementById('enter');
var timeOut = 3000;
var keyup_timeout;
var timeout_delay_in_ms = (selectionCount[0].outerText.length + 3) * 50;

var tomb = document.getElementById('tomb'); 
var house = document.getElementById('house');
var bakery = document.getElementById('bakery'); 
var credit = document.getElementById('credit'); 
var destroy = document.getElementById('destroy');
var type = document.getElementById('helper');
var memoria = new Audio('assets/audio/memoria.mp3');
var grab = document.getElementById('grab');
var body = document.getElementById('body');

destroy.volume = .4; 
type.volume = .5;
grab.volume = .3;



$('body').addClass('cursor-faded');
textClear();

$(document).one('click', function(e) {
  memoria.play();
  memoria.volume = .4;
memoria.addEventListener('timeupdate', function(){
    var buffer = .4
    if(this.currentTime > this.duration - buffer){
        this.currentTime = 0
        this.play()
    }
});
});
$(document).on("click mousemove keypress", function(e) {
  var x = e.clientX;
  var y = e.clientY;
  var newposX = x - 100;
  var newposY = y - 350;
  $('.circle').css('visibility', 'visible');
  $(".circle").css("transform","translate3d("+newposX+"px,"+newposY+"px,0px)");

});

var speed = 50;



$(document).on("mousedown", function () {
  $('body').addClass("mouseDown-faded");
}).on("mouseup", function () {
  $('body').removeClass("mouseDown-faded");
});

var progressClick = function(event){
  event.preventDefault()
  grab.play();
  $('.display-once').addClass('display-none');
  $('display-once').removeClass('display-once');
  clearTimeout(keyup_timeout);
  keyup_timeout = setTimeout(function() {
    textClear();
  }, net_timeout);

  finalClick();
};

body.addEventListener("click", progressClick);

function finalClick() {
  if(l == selectionCount.length) {
    setTimeout(() => { 
      $('body').removeClass('cursor-faded');
      $('body').removeClass('mouse-Down-faded');
      body.classList.remove('no-click');
      $('.circle').remove();
      classRemove(credit, 'display-none');
      body.removeEventListener("click", progressClick);
    }, 3000);
  }
}

function textClear() {
    demo.innerHTML = "";
    enter.classList.add('display-none');
    $('body').removeClass('cursor-faded-click');
    $('body').addClass('cursor-faded');
    body.classList.add('no-click');
    if(l < selectionCount.length) {
      switch(l) { 
        case 10: 
          bakery.src = "assets/panDes.png";
          destroy.play();
          break; 
        case 11:
          house.src = "assets/houseBroken.png";
          destroy.currentTime = 0;
          destroy.play();
          break;
        case 12:
          tomb.src = "assets/tombstoneDug.png";
          destroy.currentTime = 0;
          destroy.play();  
          break;
        case 14:
          classAdd(tomb, 'display-none');
          classAdd(house, 'display-none');
          classAdd(bakery, 'display-none'); 
          memoria.pause();
          break; 
      }
      

      if(conserv.includes(l)) {
      demo.classList.add('conservative');
      type = document.getElementById('conservative');

        enter.classList.add('float-right');
        enter.classList.add('blue');
      type.volume = .6;
    } else {
      demo.classList.remove('conservative');
      type = document.getElementById('helper');
      type.volume = .3;
      enter.classList.remove('float-right');
      enter.classList.remove('blue');
    }
    typeWriter()
    } 
}

function typeWriter() {
  if (l == selectionCount.length) {
    classRemove(credit, 'display-none');
  } else if (i < selectionCount[l].outerText.length) {
    demo.innerHTML += selectionCount[l].outerText.charAt(i);
    i++;
    net_timeout = 500 + timeout_delay_in_ms - (speed * i);
    type.play();
    setTimeout(typeWriter, speed);
  } else if (l < selectionCount.length) {

    enter.classList.remove('display-none');
    $('body').removeClass('cursor-faded');
    body.classList.remove('no-click');
    $('body').addClass('cursor-faded-click');
    type.pause();
    l++;
    if (l == selectionCount.length) {

    } else {
    timeout_delay_in_ms = (selectionCount[l].outerText.length + 3) * 50;
  }
    i = 0;

  } 

  
}



  function classAdd(x, y) {
    x.classList.add(y); 
  }

  function classRemove(x, y) {
    x.classList.remove(y)
  }
// function addLoop() {
//     setTimeout(function() {  
//      selectionCount[i].classList.add('display');
    //  switch(i) { 
    //   case 10: 
    //     bakery.src = "assets/panDes.png";
    //     destroy.play();
    //     break; 
    //   case 11:
    //     house.src = "assets/houseBroken.png";
    //     destroy.play();
    //     break;
    //   case 12:
    //     tomb.src = "assets/tombstoneDug.png";
    //     destroy.play();  
    //     break;
    //   case 14:
    //     classAdd(tomb, 'display-none');
    //     classAdd(house, 'display-none');
    //     classAdd(bakery, 'display-none'); 
    //     $('.circle').remove();
    //     memoria.pause();
    //     memoria.currentTime = 0;
    //     $('body').removeClass('cursor-faded');
    //     break; 
    //   case 15: 
//         timeOut = 6000;
//     }
//      if(selectionCount[i].classList.contains('display') == true && i < selectionCount.length) {
//         setTimeout(() => {
//             classRemove(selectionCount[i], 'display')
//             i++
//             addLoop();

//         }, timeOut - 500);
//      }
//     }, timeOut)

//     if(selectionCount.length == i) {
//       setTimeout(() => { 
//         classRemove(credit, 'display-none');
//       }, 3000);
//     }
//   }



//   addLoop();  
  
