//Variables

var audioFile = document.getElementById('audioFile');
var coverImg = document.getElementById('coverImg');
var bandNAme = document.getElementById('bandName');
var songNAme = document.getElementById('songName');

var currentAlbum = 0;

//json
var albumList = {
    "albums": [
        {"song":"media/Audio_1.mp3", "albumCover":"media/album1.png","bandNAme": "Band name 1", "songNAme": "The Famouse song"},
        {"song":"media/Audio_2.mp3", "albumCover":"media/album2.png","bandNAme": "Band name 2", "songNAme": "The other Famouse song"},
    ]
}

//load
audioFile.onloadedmetadata = function(){
    loadAlbum(currentAlbum);
}

function loadAlbum(e){
    coverImg.src = albumList.albums[e].albumCover;
    bandNAme.innerHTML = albumList.albums[e].bandNAme;
    songNAme.innerHTML = albumList.albums[e].songNAme;
}

//back

function backAudio(){
   
}

// Play

function playAudio(){
    if (audioFile.paused){
        audioFile.play();
    } else {
        audioFile.pause();
    }
}

// Next

function nextAudio(){
 
}

// Ended

audioFile.onended = function(){
    alert('audio has ended')
}