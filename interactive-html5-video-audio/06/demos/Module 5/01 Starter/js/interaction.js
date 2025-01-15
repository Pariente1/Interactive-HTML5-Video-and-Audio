//Variables

var audioFile = document.getElementById('audioFile');
var coverImg = document.getElementById('coverImg');
var bandNAme = document.getElementById('bandName');
var songNAme = document.getElementById('songName');
var playBtn = document.getElementById('playBtn');
var endTime = document.getElementById('end');
var startTime = document.getElementById('start');

var playBar = document.querySelector('.bar');
var playBarRemaining = document.querySelector('.unplayed-progress');
var playHead = document.querySelector('.playHead')


var duration;
var currentTime;

var currentAlbum = 0;

//json
var albumsList = {
    "albums": [
        {"song":"media/Audio_1.mp3", "albumCover":"media/album1.png","bandName": "Band name 1", "songName": "The Famouse song"},
        {"song":"media/Audio_2.mp3", "albumCover":"media/album2.png","bandName": "Band name 2", "songName": "The other Famouse song"},
    ]
}

//load
loadAlbum(currentAlbum);
duration = audioFile.duration;
endTime.innerHTML = formatTime(duration);

function loadAlbum(e){
    coverImg.src = albumsList.albums[e].albumCover;
    bandNAme.innerHTML = albumsList.albums[e].bandName;
    songNAme.innerHTML = albumsList.albums[e].songName;
}

// format time

function formatTime(e){
    var minutes = parseInt(e / 60, 10);
    var seconds = parseInt(e % 60);

    if (seconds < 9) {
        seconds = "0" + seconds;
    }

    var finalTime = minutes + ":" + seconds 

    return finalTime;
}

//back

function backAudio(){
   playAudio();

   currentAlbum = currentAlbum - 1;

   disableNextBack()

   loadAlbum(currentAlbum);
   audioFile.src = albumsList.albums[currentAlbum].song;
   playAudio();
}

function disableNextBack(){

    // Limitar el rango de currentAlbum
    currentAlbum = Math.max(0, Math.min(currentAlbum, albumsList.albums.length - 1));

    if (currentAlbum === albumsList.albums.length - 1) {
        nextBtn.classList.add('disabled');
    } else {
        nextBtn.classList.remove('disabled');
    }

    if (currentAlbum === 0) {
        backBtn.classList.add('disabled');
    } else {
        backBtn.classList.remove('disabled');
    }
}

// Play

function playAudio(){
    if (audioFile.paused){
        audioFile.play();
        playBtn.src= ('media/pause.png')
    } else {
        audioFile.pause();
        playBtn.src= ('media/play.png')
    }
}

// Next

function nextAudio(){

     // Limitar el rango de currentAlbum
     currentAlbum = Math.max(0, Math.min(currentAlbum, albumsList.albums.length - 1));
     
    playAudio();

    disableNextBack();
    currentAlbum = currentAlbum + 1;
    if (currentAlbum >= albumsList.albums.length) {
        /* alert('Last audio file'); */
    } else {
        loadAlbum(currentAlbum);
        audioFile.src = albumsList.albums[currentAlbum].song;
        playAudio();
    }
}

// update

audioFile.ontimeupdate = function(){
    currentTime = formatTime(audioFile.currentTime);
    startTime.innerHTML= currentTime;

    var percent = audioFile.currentTime / audioFile.duration * 100;

    updatePlayBarCSS(percent);
}

function updatePlayBarCSS(percent){
    playHead.style.left = percent + '%';
    playBarRemaining.style.left = percent + '%';

}

// Ended

audioFile.onended = function(){
    alert('audio has ended')
}