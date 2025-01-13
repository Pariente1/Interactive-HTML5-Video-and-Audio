//Variables

var audioFile = document.getElementById('audioFile');
var coverImg = document.getElementById('coverImg');
var bandNAme = document.getElementById('bandName');
var songNAme = document.getElementById('songName');
var playBtn = document.getElementById('playBtn');

var currentAlbum = 0;

//json
var albumList = {
    "albums": [
        {"song":"media/Audio_1.mp3", "albumCover":"media/album1.png","bandName": "Band name 1", "songName": "The Famouse song"},
        {"song":"media/Audio_2.mp3", "albumCover":"media/album2.png","bandName": "Band name 2", "songName": "The other Famouse song"},
    ]
}

//load
loadAlbum(currentAlbum);



function loadAlbum(e){
    coverImg.src = albumList.albums[e].albumCover;
    bandNAme.innerHTML = albumList.albums[e].bandName;
    songNAme.innerHTML = albumList.albums[e].songName;
}

//back

function backAudio(){
   
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
 
}

// Ended

audioFile.onended = function(){
    alert('audio has ended')
}