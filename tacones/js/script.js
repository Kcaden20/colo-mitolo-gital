
$( document ).ready(function() {

	var intro = ["a lot will be said about her disappearance"];
	var introComp = [];
	var prompts = [
		"she had been kidnapped",
		"her home was destroyed in the earthquake",
		"she left the mountains and could not find her way back",
		"her fathers visa finally went through",
		"she became a famous artist",
		"she made a bakery in queens her home",
		"her man could not keep his job and she left with him",
		"she wanted a better life for her son",
		"after building a new life she was happier now"
	];

	var chosenPrompts = [];
	var multiplier = -1;
	var slidePixel = 0;
	var slideBG = 0;
	var promptSlide = 0;
	var time = 4000;
	var resetCounter = 0;
	var tipCounter = 0;

	// Audio
	var audioNumber = 0;
	var night = new Audio('assets/audio/night.mp3');
	var nature = new Audio('assets/audio/nature.mp3');
	var noise = new Audio('assets/audio/noise.mp3');
	var city = new Audio('assets/audio/city.mp3');
	var bakery = new Audio('assets/audio/bakery.mp3');
	var ominous = new Audio('assets/audio/ominous.mp3');


	var elems = $("div[class*='-bg']");
	//TEXT INPUT

		$('#start-game').click(() =>{

			var inputReady = true;
			var input = $('.404-input');

			playAudio(night, .4);

			var introOverlay = document.getElementById('start');
			introOverlay.classList.add("display-none");

			setTimeout(function(){
				$('#viewportScroll').removeClass('display-none');
				}, 300);

			setTimeout(function(){
			$('#intro-senora').removeClass('display-none');
			}, 1000);

			setTimeout(function(){
				$('#intro-prompt').removeClass('display-none');
				input.focus();
			}, 2000);



		$('.container').on('click', function(e){
			input.focus();
			$('.new-output').removeClass('not-focused');
			event.stopPropagation();
		});

		input.on('keyup', function(e){
		$('.new-output').text(input.val());
		});

		$('.four-oh-four-form').on('submit', function(e){
		e.preventDefault();
		var val = $(this).children($('.404-input')).val().replace(/['"]+/g, '').toLowerCase();
		var href;
		var input = $('.404-input');
		var message = "";


		if (intro.includes(val) && introComp.length == 0) {
			multiplier = 1;
			message = '"Que son las cosas que van a decir?" I asked. Mi mami said people will say..'
			addOverlay(val);
			slideAcross(0);
			updateTerminal(message);
			introComp.push(val);

			$('#intro-senora').addClass('display-none');
			$('#after-senora').addClass('after-senora-rest');
			$('#after-senora').removeClass('display-none');

			$('input').one("keypress", function () {
				$('#after-senora').removeClass('after-senora-rest');
			});

			var removeIntro = document.getElementById('intro-prompt');
			var addKidnapped = document.getElementById('kidnapped');
			var backGround = document.getElementById('backgroundScroll');

			removeIntro.classList.add('display-none');
			removeIntro.classList.remove('rock');

			$('.hint').removeClass('rock');
			$('#test').removeClass('introTerminal');
			addKidnapped.classList.remove('display-none');
			addKidnapped.classList.add('rock');

			slidePixel = 0;
			slideBG = 0;
			$('#backgroundScroll').css('width', '100vw');
			switchAudio(night, city, .4);


		} else if (prompts.includes(val) && introComp.includes(intro[0])) {
			if(prompts.includes(val) && chosenPrompts.includes(val)) {
				message = '"Mami! Usted ya dijo eso!" Yo grite. She laughed and continued saying that...'
				addOverlay(val);
				updateTerminal(message);
				promptSlide = slidePixel;
				slidePixel = 0;
				slideBG = 0;
				$('#backgroundScroll').css('width', '100vw');
				slideAcross(0);

			} else {
				message = '"y que mas?" I asked. People will say that...'
				addOverlay(val);
				updateTerminal(message);
				chosenPrompts.push(val);
				promptSlide = slidePixel;
				slidePixel = 0;
				slideBG = 0;
				slideAcross(0);
				$('#backgroundScroll').css('width', '100vw');
			}

		} else {
			resetForm();
		}

		if(chosenPrompts.length == 9) {
			var winState = document.getElementById('win-state');
			var terMinal = document.getElementById('test');
			winState.classList.remove('display-none');
			terMinal.classList.add('display-none');
			$('.viewport div').css('color', 'grey');
			$('.senora').addClass('display-none');
			$('.container').addClass('display-none-one');
			$('.viewport').addClass('display-none-one');

			setTimeout(function(){
				night.pause();
				nature.pause();
				noise.pause();
				city.pause();
				bakery.pause()
				ominous.pause()

			}, time);



		}

		updateScroll();

		});

		function addOverlay(z) {
			$('#overlay').removeClass('display-none');
			var foundPrompt = z.toLowerCase().trim().split(/\s+/).join('-').substring(0,5);
			$('#overlay').addClass(foundPrompt);

			var backGround = document.getElementById('backgroundScroll');
			var backgroundClass = foundPrompt + '-bg'
			var backgroundColor = document.getElementById('backgroundColor');

			var elems = $("div[class*='-bg']");


			elems.attr('class', function(_, old){
				return $.grep(old.split(/ +/), function(v){
					 return !v.match(/-bg$/);
				}).join(' ');
			})

			backGround.classList.add(backgroundClass);
			backgroundColor.classList.add(backgroundClass);


			switch(foundPrompt) {
				case 'she-h':
				  addRemove('kidnapped','earthquake');
				  break;
				case 'her-h':
					addRemove('earthquake','mountains');
					switchAudio(city, nature, .4);
					break;
				case 'she-l':
					addRemove('mountains','visa');
					switchAudio(nature, noise, .4);
				  break;
				case 'her-f':
					addRemove('visa', 'artist');
				  break;
				case 'she-b':
					addRemove('artist', 'bakery');
					switchAudio(noise, bakery, .4);
				  break;
				case 'she-m':
					addRemove('bakery', 'badcop');
					switchAudio(bakery, ominous, .4);
				  break;
				case 'her-m':
					addRemove('badcop', 'son');
					switchAudio(ominous, noise, .4);
				  break;
				case 'she-w':
					addRemove('son', 'herself');
					switchAudio(noise, nature, .4);
				  break;
				case 'after':
				  addRemove('herself', 'kidnapped');
				  switchAudio(nature, city, .4);
				  break;
				default:
			  }

			  function addRemove(x, y) {
				var first = document.getElementById(x);
				var second = document.getElementById(y);

				first.classList.add('opacity-light');
				first.classList.remove('rock');

				second.classList.add('rock');
				second.classList.remove('display-none')
			}


			setTimeout(function(){
				$('#overlay').addClass('display-none');
				$('#overlay').removeClass(foundPrompt);
			}, time);

		}
		// VIEWPORT
		function slideAcross(y){
			$('.rock').css('transform', 'translateX('+ y + 'px)');
			$('#backgroundScroll').css('transform', 'translateX('+ y + 'px)');

		}

		// TERMINAL
		function updateTerminal(x){
            $('.new-output').removeClass('new-output');
            input.val('');
            $('.terminal').append('<p class="prompt">' + x + '</p><p class="prompt output new-output"></p>');

            var p = $('.new-output');
            $('.new-output').velocity(
                'scroll'
            ), {duration: 100}
        }


		function updateScroll(){
			var element = document.getElementById("test");
			var scrollDown = element.scrollHeight;
			element.scrollTop = scrollDown - 100;
		}

		function resetForm(){
			var message = "Eso no fue una de las razones. They're just floating by..."
			var input = $('.404-input');
			$('.rock').css('transform', 'translateX('+ 0 + 'px)');
			$('#backgroundScroll').css('transform', 'translateX('+ 0 + 'px)');
			$('.new-output').removeClass('new-output');
			input.val('');
			$('.terminal').append('<p class="prompt">' + message + '</p><p class="prompt output new-output"></p>');
			var p = $('.new-output');


			$('.new-output').velocity(
				'scroll'
			), {duration: 100}

			slidePixel = 0;
			slideBG = 0;
			$('#backgroundScroll').css('width', '100vw');


			if(resetCounter == 2 && introComp.length == 0) {

				if(tipCounter == 1) {
					var hints = [
						'Need a hint on what to type? The answer is floating by...',
						'Need another hint? Walk backwards (backspace/delete) until the quote disappears off the left side of the browser!'
					]

					alert(hints[getRandomInt(2)]);
				} else {
					alert('Need a hint on what to type? The answer is floating by...');
				}
				tipCounter = 1;
				resetCounter = 0;
			} else if (resetCounter == 3 && introComp.length == 1){
				var hints = [
					'No need for the quotes or punctuation!',
					'Watch out for typos!',
					'Hit backspace to bring the quote back into view!'
				]

				alert(hints[getRandomInt(3)]);
				resetCounter = 0;
			} else {
				resetCounter++
			}

		}

		$('input').one("keypress", function () {
			$('.senora').removeClass('senora-rest');
			$('.senora').addClass('senora-step-two');
		});


		//KEYSTROKES
		$('input').on("keypress", function (e) {
			slidePixel = slidePixel - (20 * multiplier);
			slideBG = slideBG - (15 * multiplier);
			slideBGWidth = document.getElementById('backgroundScroll').offsetWidth;

			$('.rock').css('transform', 'translateX('+ slidePixel + 'px)');
			$('#backgroundScroll').css('width', slideBGWidth + 20);
			$('#intro-senora').toggleClass('senora-walking');
			$('#after-senora').toggleClass('after-senora-walking-two');

			toggleHeels();

		});

		$('input').keyup(function(e){
			if(e.keyCode == 8) {
				slidePixel = slidePixel + (20 * multiplier);
				slideBG = slideBG + (15 * multiplier);
				slideBGWidth = document.getElementById('backgroundScroll').offsetWidth;
				browserWidth = $(window).width();


				if(slideBGWidth > browserWidth) {
					$('#backgroundScroll').css('width', slideBGWidth - 20);
					$('#intro-senora').toggleClass('senora-walking');
					$('#after-senora').toggleClass('after-senora-walking-two');
					toggleHeels();
				}

				$('.rock').css('transform', 'translateX('+ slidePixel + 'px)');

			}
		});

				// Heels Audio
				function toggleHeels(){
					var heelZero = document.getElementById('heel-zero');
					var heelOne = document.getElementById('heel-one');
					var heelTwo = document.getElementById('heel-two');

					heelZero.volume = .5;
					heelOne.volume = .5;
					heelTwo.volume = .5;

					switch(audioNumber) {
						case 0:
							heelZero.play();
							break;
						case 1:
							heelOne.play();
							break;
						case 2:
							heelTwo.play()
							break;
					}
					audioNumber = Math.floor(Math.random() * 3);
				}

						// TEXT
		function textEffect(line){
			var alpha = [';', '.', ',', ':', ';', '~', '`'];
			var animationSpeed = 10;
			var index = 0;
			var string = line.text();
			var splitString = string.split("");
			var copyString = splitString.slice(0);

			var emptyString = copyString.map(function(el){
				return [alpha[Math.floor(Math.random() * (alpha.length))], index++];
			})
			emptyString = shuffle(emptyString);
			$.each(copyString, function(i, el){
				var newChar = emptyString[i];
				toUnderscore(copyString, line, newChar);

				setTimeout(function(){
				  fromUnderscore(copyString, splitString, newChar, line);
				},i * animationSpeed);
			  })
		}

		function toUnderscore(copyString, line, newChar){
			copyString[newChar[1]] = newChar[0];
			line.text(copyString.join(''));
		}

		function fromUnderscore(copyString, splitString, newChar, line){
			copyString[newChar[1]] = splitString[newChar[1]];
			line.text(copyString.join(""));
		}

		function shuffle(o){
			for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
			return o;
		};

		function playAudio(x, y) {
			x.play();
			x.volume = .4;
			x.addEventListener('timeupdate', function(){
				var buffer = y;
				if(this.currentTime > this.duration - buffer){
					this.currentTime = 0
					this.play()
				}
			});
		}

		function switchAudio(x, y, z) {
			setTimeout(function(){
				x.pause();
				playAudio(y, z);
			}, time);
		}

		function getRandomInt(max) {
			return Math.floor(Math.random() * Math.floor(max));
		  }

		});


	});
