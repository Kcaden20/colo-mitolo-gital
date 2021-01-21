$( document ).ready(function() {

var bano = new Audio('assets/audio/bano.mp3');
var bump = document.getElementById('bump');
var grab = document.getElementById('grab');

grab.volume = .5;
bump.volume = .7;

$('#start-game').click(() =>{ 
    var introOverlay = document.getElementById('intro');
    introOverlay.classList.remove("display");
    introOverlay.classList.add('no-click'); 

    // Looping BG
    bano.play();
    bano.volume = .4;
    bano.addEventListener('timeupdate', function(){
        var buffer = .29
        if(this.currentTime > this.duration - buffer){
            this.currentTime = 0
            this.play()
        }
    }); 
});

$(function() {
    var bagObj = $('._obj');
    var leftH = $('._left h1');
    var rightH = $('._right h1');

// Switching Out Intial Text
bagObj.hover(
    function(){
        leftH.text(leftH.data("hover-text"));
        rightH.text(rightH.data("hover-text"));
        
        bump.play();
    }, function() {
        leftH.text(leftH.data("text-original"));
        rightH.text(rightH.data("text-original"));  
    }
);

$("._obj").on("mousedown", function () {
    $(this).addClass("mouseDown");
    grab.play();
}).on("mouseup", function () {
    $(this).removeClass("mouseDown");
});
// Object Hover 
    $(document).on("click mousemove", function(e) {
        var x = e.clientX;
        var y = e.clientY;
        var newposX = x - 300;
        var newposY = y - 300; 
        $(".circle").css("transform","translate3d("+newposX+"px,"+newposY+"px,0px)");
    });

// Changing Out The Background Text and The Images
    var clicks = 0;
    $('._obj').on("click", function(e) {

        //Disables Hovering, Clicking and Changes The Cursour 
        $(this).off('mouseenter mouseleave');
        $('._obj').addClass('no-click'); 
        $('body').addClass('cursor');
        $('p').addClass('display-none');


        //Click Counter to Switch Out Different Statements 
        if (clicks == '0') {
            leftH.text(leftH.data("object-one"));
            rightH.text(rightH.data("object-one"));
            $('.circle').css('visibility', 'visible');
            $('.circle').css('background-image', 'url(assets/map.jpg)');
            $('#bag').css('width', '15%');
            $('#finger').css('width', '4%');
        } else if(clicks == '1'){
            leftH.text(leftH.data("object-two"));
            rightH.text(rightH.data("object-two"));
            $('.circle').css('background-image', 'url(assets/cross_web.png)');
            $('#bag').css('width', '20%');
            $('#finger').css('width', '6%');
        } else if(clicks == '2') {
            leftH.text(leftH.data("object-three"));
            rightH.text(rightH.data("object-three"));
            $('.circle').css('background-image', 'url(assets/chainsaw_web.png)');
            $('#bag').css('width', '25%');
            $('#finger').css('width', '8%');
        } else if (clicks== '3') {
            window.open('memoria.html', '_self');
            leftH.text("¡Tenemos Que Irnos!");
            rightH.text("¡Nos Matan Si No!");

        } 

        // Adds Back Hovering, Clicking and Cursor 
        setTimeout(function(){
            $('._obj').removeClass('no-click'); 
            $('._obj').on('mouseenter mouseleave');
            leftH.text(leftH.data("text-original"));
            rightH.text(rightH.data("text-original"));
            $('.circle').css('background-image', 'none');
            $('body').removeClass('cursor');
            $('p').removeClass('display-none');

            bagObj.hover(
                function(){
                    leftH.text(leftH.data("hover-text"));
                    rightH.text(rightH.data("hover-text"));
                    bump.play();

                }, function() {
                    leftH.text(leftH.data("text-original"));
                    rightH.text(rightH.data("text-original"));  
                }
            );
        }, 7000);

        // Keeps the counter going below 4
        if (clicks < '3') {
        ++clicks;
        } else {
            clicks = 0;
            $('.circle').css('visibility', 'hidden');
            
        }
      });
  });

}); 