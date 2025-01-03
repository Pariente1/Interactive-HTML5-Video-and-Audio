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

var loopOn = false;

// Loop
var offLabel = document.getElementById('offLabel');

// JSON
var albumsList = {
	"albums":[
		{ "song":"media/audio.mp3", "albumCover":"media/album1.png", "bandName":"Band Name 1", "songTitle":"The Famous Song"},
		{ "song":"media/Audio_2.mp3", "albumCover":"media/album2.png", "bandName":"Band Name 2", "songTitle":"The Other Song"}
	]
}

var sound1 = new Howl({
	src:['../media/audio.mp3'],
	onload: function(){
		
	},
	onend: function(){
		sound2.play('section2');
	}
})

var sound2 = new Howl({
	src:['../media/Audio_2.mp3'],
	sprite: {
		section1: [0, 3000],
		section2: [4000, 10000],
		section3: [12000, 20000]
	}
})

var backgroundAudio = new Howl({
	src:['../media/Audio_1.mp3'],
	volume: 0.2,
})

backgroundAudio.on('fade', function(){
	backgroundAudio.stop();
	playBtn.src = ('media/play.png');
})

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
	console.log(sound1.duration());
	if (sound1.playing()) {
		sound1.pause();
		playBtn.src = ('media/play.png')
	} else{
		sound1.play();
		playBtn.src = ('media/pause.png')
	}
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
		sound1.rate(2);
		playBackSpeed = 2;
		speedId.innerHTML = sound1.rate() + ".0X";
	} else if (playBackSpeed == 2){
		sound1.rate(1);
		playBackSpeed = 1;
		speedId.innerHTML = sound1.rate() + ".0X";
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
		sound1.loop(true);
		loopOn = true;
		offLabel.innerHTML = "ON";
	} else{
		sound1.loop(false);
		loopOn = false;
		offLabel.innerHTML = "OFF";
	}
}