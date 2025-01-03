// Variable
var audioFile = document.getElementById('audioFile');
var currentAlbum = 0;
var platBtn = document.getElementById('playBtn')
var currentTime;
var duration;

var startTime = document.getElementById('start');
var endTime = document.getElementById('end');

var playBar = document.querySelector('.bar');
var playBarRemaining = document.querySelector('.unplayed-progress');
var playHead = document.querySelector('.playHead')

// Objects
var coverImg = document.getElementById('coverImg')
var bandName = document.getElementById('bandName')
var songName = document.getElementById('songName')

// JSON
var albumsList = {
	"albums":[
		{"song":"media/Audio_1.mp3", "albumCover":"media/album1.png", "bandName": "Band Name 1", "songTitle": "The Famouse Song"},
		{"song":"media/Audio_2.mp3", "albumCover":"media/album2.png", "bandName": "Band Name 2", "songTitle": "The Other Song"},
	]
}

audioFile.onloadedmetadata = function(){
	duration = audioFile.duration;
	endTime.innerHTML = formatTime(duration);
	loadAlbum(currentAlbum);
}

// Load Function
function loadAlbum(e){
	coverImg.src = albumsList.albums[e].albumCover;
	bandName.innerHTML = albumsList.albums[e].bandName;
	songName.innerHTML = albumsList.albums[e].songTitle;
}

// Back Audio
function backAudio(){
	playAudio();

	currentAlbum = currentAlbum - 1;

	loadAlbum(currentAlbum)

	disableNextBack();

	audioFile.src = albumsList.albums[currentAlbum].song;
	playAudio();
}

// Play Audio
function playAudio(){
	if (audioFile.paused) {
		audioFile.play();
		playBtn.src = ('media/pause.png');
	} else{
		audioFile.pause();
		playBtn.src = ('media/play.png');
	}
}

// Next Audio
function nextAudio(){
	playAudio();

	currentAlbum = currentAlbum + 1;

	disableNextBack();

	if (currentAlbum >= albumsList.albums.length) {
		alert('This is the last one')
	} else{
		loadAlbum(currentAlbum)
		audioFile.src = albumsList.albums[currentAlbum].song;
		playAudio();
	}
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

// Time update
audioFile.ontimeupdate = function(){
	currentTime = formatTime(audioFile.currentTime);
	console.log(currentTime);
	startTime.innerHTML = currentTime;

	// Update progress
	var percent = audioFile.currentTime / audioFile.duration *100;
	updatePlayBarCSS(percent);
}

function updatePlayBarCSS(percent){
	playHead.style.left = percent + '%';
	playBarRemaining.style.left = percent + '%';
}

// Format that time
function formatTime(e){
	var minutes = parseInt(e / 60, 10) ;
	var seconds = parseInt(e % 60);

	if (seconds <=9) {
		seconds = '0' + seconds;
	}
	var finalTime = minutes + ":" + seconds;
	return finalTime;
}

// Ended
audioFile.onended = function(){
	alert('Audio has ended!')
}