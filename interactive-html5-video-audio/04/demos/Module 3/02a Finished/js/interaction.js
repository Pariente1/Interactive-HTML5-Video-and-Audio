// Variables
var initialPlay = false;
var menuIn = true;

// Page load function
function pageLoaded(){
	
}

// Video loaded
video1.onloadedmetadata = function(){
	
}

// On play
video1.onplay = function(){
	if (!initialPlay){
		initialPlay = true;
	}
}

video1.ontimeupdate = function(){
	console.log(Math.round(video1.currentTime))
}

// Mute Audio
function muteAudio(){
	if (!video1.muted) {
		video1.muted = true;
		document.getElementById('playBtn').style.backgroundImage = 'url(media/audio_mute.png)';
	} else {
		video1.muted = false;
		document.getElementById('playBtn').style.backgroundImage = 'url(media/audio_up.png)';
	}
}

// Animate in menu
function animateMenu(){
	if (menuIn) {
		$('.menu').animate({right: "0"}, 500);
		menuIn = false;
	} else{
		$('.menu').animate({right: "-405px"}, 500);
		menuIn = true;
	}
}
