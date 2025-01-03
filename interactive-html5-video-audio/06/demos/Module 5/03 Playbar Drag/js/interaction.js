// Variables
var audioFile = document.getElementById('audioFile');
var coverImg = document.getElementById('coverImg');
var bandName = document.getElementById('bandName');
var songName = document.getElementById('songName');
var playBtn = document.getElementById('playBtn');
var startLabel = document.getElementById('start');
var endLabel = document.getElementById('end');
var backBtn = document.getElementById('backBtn');
var nextBtn = document.getElementById('nextBtn');

// Playbar & remaining time elements
var playBar = document.querySelector('.bar');
var playBarRemaining = document.querySelector('.unplayed-progress');

// Playhead -> Slider Thumb Control
var playHead = document.querySelector('.playHead');

// Playbar globals
var playHeadGrabbing = false;
var playBarClicked = false;
var playHeadNewLocation = 0;

// Time variables
var currentTime = 0;
var durationTime = 0;

// Main variables
var currentAlbum = 0;
var menuIn = true;
var infoSectionIn = true;

// JSON for albums
var albumsList = {
	"albums":[
		{ "song":"media/Audio_1.mp3", "albumCover":"media/album1.png", "bandName":"Band Name 1", "songTitle":"The Famouse Song"},
		{ "song":"media/Audio_2.mp3", "albumCover":"media/album2.png", "bandName":"Band Name 2", "songTitle":"The Other Song"}
	]
}

// On load
audioFile.onloadedmetadata = function(){
	// Load the first album on load
	loadAlbum(currentAlbum);
}

// Load album
function loadAlbum(e){
	coverImg.src = albumsList.albums[e].albumCover;
	bandName.innerHTML = albumsList.albums[e].bandName;
	songName.innerHTML = albumsList.albums[e].songTitle;

	if(currentAlbum >= 1){
		backBtn.classList.remove('disabled');
	} else{
		backBtn.classList.add('disabled');
	}

	// Disable next back
	disableNextBack();

	// Audio duration
	durationTime = formatTime(audioFile.duration);
	endLabel.innerHTML = durationTime;
}

// On Time Update
audioFile.ontimeupdate = function(){
	// Convert time
	currentTime = formatTime(audioFile.currentTime);
	// console.log(currentTime)
	startLabel.innerHTML = currentTime;

	var percent = audioFile.currentTime / audioFile.duration * 100;

    if(!playHeadGrabbing && !playBarClicked){
		updatePlayBarCSS(percent);
    	playHeadNewLocation = percent;
    }

	// Highlight 1
	if (currentTime >= "0:00" && currentTime <= "0:10") {
		document.getElementById('section1').classList.add('highlight')
	} else{
		document.getElementById('section1').classList.remove('highlight')
	}

	// Highlight 2
	if (currentTime >= "0:11" && currentTime <= "0:30") {
		document.getElementById('section2').classList.add('highlight')
	} else{
		document.getElementById('section2').classList.remove('highlight')
	}

	// Highlight 3
	if (currentTime >= "0:31" && currentTime <= "0:55") {
		document.getElementById('section3').classList.add('highlight')
	} else{
		document.getElementById('section3').classList.remove('highlight')
	}
}

function updatePlayBarCSS(percent) {
	playHead.style.left = percent + '%';
	playBarRemaining.style.left = percent + '%';
}

function updateAudioPosition(percent) {
	audioFile.currentTime = percent/100 * audioFile.duration;
}


function updatePlayHeadPosition(e) {
	var percent = getPlayHeadPosition(e);
	updatePlayBarCSS(percent);
}

/* Returns number from 0 - 100 representing percentage 
position of PlayHead thumb */
function getPlayHeadPosition(e) {
	var barRect = playBar.getBoundingClientRect();
	var x = e.clientX - barRect.left;
	var percent = x / barRect.width * 100;
	percent = Math.min(100, percent);
	percent = Math.max(0, percent);
	playHeadNewLocation = percent;
	return percent;
}

playHead.onmousedown = function(){
	playHeadGrabbing = true;
};

playBar.onmousedown = function(e){
	playHeadGrabbing = true;
	playBarClicked = true;
	playHead.style.left = getPlayHeadPosition(e) + '%';
	updatePlayHeadPosition(e);
	setTimeout(function(){
		playBarClicked = false;
	},100);
};

document.onmousemove = function(e){
	if(playHeadGrabbing){
		updatePlayHeadPosition(e);
	}
};

document.onmouseup = function(){
	playHeadGrabbing = false;
	updateAudioPosition(playHeadNewLocation);
};

// Play audio
function playAudio(){
	if (audioFile.paused) {
		audioFile.play();
		playBtn.src = ('media/pause.png')
	} else{
		audioFile.pause();
		playBtn.src = ('media/play.png')
	}
}

// Next & Back Audio
function nextAudio(){
	playAudio();

	currentAlbum = currentAlbum + 1;

	disableNextBack();

	if (currentAlbum >= albumsList.albums.length) {
		alert('No more');
	} else {
		loadAlbum(currentAlbum);

		audioFile.src = albumsList.albums[currentAlbum].song;
		playAudio();
	}
}

function backAudio(){
	playAudio();

	currentAlbum = currentAlbum - 1;

	loadAlbum(currentAlbum);

	disableNextBack();

	audioFile.src = albumsList.albums[currentAlbum].song;
	playAudio();
}

function disableNextBack(){
	if (currentAlbum == albumsList.albums.length - 1) {
		nextBtn.classList.add('disabled');
	} else{
		nextBtn.classList.remove('disabled');
	}

	if (currentAlbum == 0) {
		backBtn.classList.add('disabled');
	} else{
		backBtn.classList.remove('disabled');
	}
}

// Audio end
audioFile.onended = function(){
	playBtn.src = ('media/play.png')
}

// Figure out time
function formatTime(e){
	var minutes = parseInt(e / 60, 10);
    var seconds = parseInt(e % 60);

    if (seconds <=9){
    	seconds = "0"+seconds;
    }

	var finalTime = minutes+":"+ seconds;
	return finalTime
    
}

// Animate Menu
function animateMenu(){
	if (menuIn) {
		$('.menuArea').animate({left: "0"}, 500);
		menuIn = false;
	} else{
		$('.menuArea').animate({left: "-380px"}, 500);
		menuIn = true;
	}
}

// Animate info section
function animateInfoSection(){
	if (infoSectionIn) {
		$('.infoSection').animate({bottom: "0"}, 500);
		infoSectionIn = false;
	} else{
		$('.infoSection').animate({bottom: "-540px"}, 500);
		infoSectionIn = true;
	}
}

// Menu item selected
function menuSelected(e){
	currentAlbum = e;
	loadAlbum(e);
	animateMenu();
	audioFile.src = albumsList.albums[e].song;
	playAudio();
}