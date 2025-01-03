// Variables
var audioFile = document.getElementById('audioFile');
var coverImg = document.getElementById('coverImg');
var bandName = document.getElementById('bandName');
var songName = document.getElementById('songName');
var playBtn = document.getElementById('playBtn');
var backBtn = document.getElementById('backBtn');
var nextBtn = document.getElementById('nextBtn');
var endTime = document.getElementById('end');
var startTime = document.getElementById('start');

var playBar = document.querySelector('.bar');
var playBarRemaining = document.querySelector('.unplayed-progress');

var playHead = document.querySelector('.playHead');
var speedId = document.querySelector('.speedId');

var currentTime;
var duration;

var currentAlbum = 0;

var playBackSpeed = 1;

var menuIn = true;
var infoSectionIn = true;
var loopOn = false;

// JSON
var albumsList = {
	"albums":[
		{"song":"media/audio.mp3", "albumCover":"media/album1.png", "bandName":"Band Name 1", "songName": "The famous song"},
		{"song":"media/Audio_2.mp3", "albumCover":"media/album2.png", "bandName":"Band Name 2", "songName": "The other song"},
	]
}

// Load
audioFile.onloadedmetadata = function(){
	loadAlbum(currentAlbum);
	duration = audioFile.duration;
	endTime.innerHTML = formatTime(duration);
}

function loadAlbum(e){
	coverImg.src = albumsList.albums[e].albumCover;
	bandName.innerHTML = albumsList.albums[e].bandName;
	songName.innerHTML = albumsList.albums[e].songName;
}

function formatTime(e){
	var minutes = parseInt(e / 60, 10);
	var seconds = parseInt(e % 60);

	if (seconds <9) {
		seconds = "0" + seconds;
	}

	var finalTime = minutes + ":" + seconds
	return finalTime
}

// Back
function backAudio(){
	playAudio();

	currentAlbum = currentAlbum - 1;

	disableNextBack();

	loadAlbum(currentAlbum)
	audioFile.src = albumsList.albums[currentAlbum].song;
	playAudio();
}

// Play
function playAudio(){
	if (audioFile.paused) {
		audioFile.play();
		playBtn.src = ('media/pause.png');
	} else{
		audioFile.pause();
		playBtn.src = ('media/play.png');
	}
}

// Next
function nextAudio(){
	playAudio();

	currentAlbum = currentAlbum + 1;

	disableNextBack();

	if (currentAlbum >= albumsList.albums.length) {
		alert('Last audio file')
	} else{
		loadAlbum(currentAlbum);
		audioFile.src = albumsList.albums[currentAlbum].song;
		playAudio();
	}
}

function disableNextBack(){
	if (currentAlbum == albumsList.albums.length - 1) {
		nextBtn.classList.add('disabled')
	} else{
		nextBtn.classList.remove('disabled')
	}

	if (currentAlbum == 0) {
		backBtn.classList.add('disabled')
	} else{
		backBtn.classList.remove('disabled')
	}
}

// Change speed
function changeSpeed(){
	if (playBackSpeed == 1) {
		audioFile.playbackRate = 2;
		playBackSpeed = 2;
		speedId.innerHTML = '2.0X';
	} else{
		audioFile.playbackRate = 1;
		playBackSpeed = 1;
		speedId.innerHTML = '1.0X';
	}
}

// Animate Menu
function animateMenu(){
	if (menuIn){
		$('.menuArea').animate({left:"0"}, 500);
		menuIn = false;
	} else{
		$('.menuArea').animate({left:"-380px"}, 500);
		menuIn = true;
	}
}

// info Section
function animateInfoSection(){
	if (infoSectionIn){
		$('.infoSection').animate({bottom:"0"}, 500);
		infoSectionIn = false;
	} else{
		$('.infoSection').animate({bottom:"-580px"}, 500);
		infoSectionIn = true;
	}
}

// Change audio
function menuSelected(e){
	currentAlbum = e;
	loadAlbum(e);
	animateMenu();
	audioFile.src = albumsList.albums[e].song;
	playAudio;
}

// Update
audioFile.ontimeupdate = function(){
	currentTime = formatTime(audioFile.currentTime);
	startTime.innerHTML = currentTime;

	var percent = audioFile.currentTime / audioFile.duration * 100;

	updatePlayBarCSS(percent);

	// Update highlight
	if (currentTime >= "0:00" && currentTime <= "0:09") {
		document.getElementById('section1').classList.add('highlight');
	} else{
		document.getElementById('section1').classList.remove('highlight');
	}

	if (currentTime >= "0:11" && currentTime <= "0:30") {
		document.getElementById('section2').classList.add('highlight');
	} else{
		document.getElementById('section2').classList.remove('highlight');
	}

	if (currentTime >= "0:32" && currentTime <= "0:55") {
		document.getElementById('section3').classList.add('highlight');
	} else{
		document.getElementById('section3').classList.remove('highlight');
	}

	loopAnimation();
}

// Loop
function loopAnimation(){
	if (!audioFile.paused) {
		coverImg.classList.add('animated');
		coverImg.classList.add('pulse');
		coverImg.classList.add('infinite');
	} else{
		coverImg.classList.remove('animated');
		coverImg.classList.remove('pulse');
		coverImg.classList.remove('infinite');
	}
}

function updatePlayBarCSS(percent){
	playHead.style.left = percent + '%';
	playBarRemaining.style.left = percent + '%';
}

function toggleLoop(){
	if (!loopOn) {
		loopOn = true;
		document.getElementById('offLabel').innerHTML = "ON";
	} else{
		loopOn = false;
		document.getElementById('offLabel').innerHTML = "OFF";
	}
}

// Ended
audioFile.onended = function(){
	playBtn.src = ('media/play.png');
	audioFile.currentTime = 0;
	if (loopOn) {
		currentAlbum = currentAlbum + 1;
		loadAlbum(currentAlbum);
		audioFile.src = albumsList.albums[currentAlbum].song;
		playAudio();
	}
}