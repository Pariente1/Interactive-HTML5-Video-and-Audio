// Variables
var currentAlbum = 0;

var coverImg = document.getElementById('coverImg');
var bandName = document.getElementById('bandName');
var songName = document.getElementById('songName');

var startLabel = document.getElementById('start');
var playBackSpeed = 1;
var speedId = document.querySelector('.speedId');

// Playbar & remaining time elements
var playBar = document.querySelector('.bar');
var playBarRemaining = document.querySelector('.unplayed-progress');

// Playhead -> Slider Thumb Control
var playHead = document.querySelector('.playHead');
var menuIn = true;
var infoSectionIn = true;

// Loop
var offLabel = document.getElementById('offLabel');

// JSON
var albumsList = {
	"albums":[
		{ "song":"media/audio.mp3", "albumCover":"media/album1.png", "bandName":"Band Name 1", "songTitle":"The Famous Song"},
		{ "song":"media/Audio_2.mp3", "albumCover":"media/album2.png", "bandName":"Band Name 2", "songTitle":"The Other Song"}
	]
}

function formatTime(e){
	var minutes = parseInt(e / 60, 10);
    var seconds = parseInt(e % 60);

    if (seconds <=9){
    	seconds = "0"+seconds;
    }

	var finalTime = minutes+":"+ seconds;
	return finalTime
    
}

// Play event
function playAudio(){
	// playBtn.src = ('media/play.png')
	// playBtn.src = ('media/pause.png')
}

function nextAudio(){
	playAudio();

	currentAlbum = currentAlbum + 1;

	disableNextBack();

	if (currentAlbum >= albumsList.albums.length) {
		alert('No more');
	} else {
		loadAlbum(currentAlbum);

		playAudio();
	}
}

function backAudio(){
	playAudio();

	currentAlbum = currentAlbum - 1;

	loadAlbum(currentAlbum);

	disableNextBack();

	playAudio();
}

// Change speed
function changeSpeed(){
	if(playBackSpeed == 1){
		playBackSpeed = 2;
		speedId.innerHTML = "2.0X";
	} else if (playBackSpeed == 2){
		playBackSpeed = 1;
		speedId.innerHTML = "1.0X";
	}
}

// Load album
function loadAlbum(e){
	coverImg.src = albumsList.albums[e].albumCover;
	bandName.innerHTML = albumsList.albums[e].bandName;
	songName.innerHTML = albumsList.albums[e].songTitle;
}

// Animate menu
function animateMenu(){
	if (menuIn) {
		$('.menuArea').animate({left: "0"}, 500);
		menuIn = false;
	} else{
		$('.menuArea').animate({left: "-380px"}, 500);
		menuIn = true;
	}
}

// Menu Selected
function menuSelected(e){
	currentAlbum = e;
	loadAlbum(e);
	animateMenu();
	playAudio();
}

function animateInfoSection(){
	if (infoSectionIn) {
		$('.infoSection').animate({bottom: "0"}, 500);
		infoSectionIn = false;
	} else{
		$('.infoSection').animate({bottom: "-540px"}, 500);
		infoSectionIn = true;
	}
}

// Disable next/back
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

// Loop Animation
function toggleLoop(){
	if (!loopOn) {
		loopOn = true;
		offLabel.innerHTML = "ON";
	} else{
		loopOn = false;
		offLabel.innerHTML = "OFF";
	}
}