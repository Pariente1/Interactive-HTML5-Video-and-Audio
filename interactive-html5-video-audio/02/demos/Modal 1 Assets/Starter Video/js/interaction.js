// Variable 
var video1 = document.getElementById('video1');
var hotspot1 = document.getElementById('hotspot1');
var initialPlay = false;
var menuIn = false;
var showQuestion = false;

// Time variables
var currentTime = 0;
var halfwayPoint;
var durationPoint;

//Video Loaded
video1.onloadedmetadata = function(){
    durationPoint = Math.round(video1.duration);
    halfwayPoint = Math.round(video1.duration/2);
}

video1.onplay = function(){
    if (initialPlay == false){
        initialPlay = true;
    }
}

video1.onpause = function(){
    /* showModal('this is the new txt for the modal!!'); */
    }

video1.onended = function(){
    alert('video has ended');
}

// Toggle video
function toggleVideo(){
    if (!video1.paused){
        document.getElementById('play_pause').src = 'media/play.png';
        video1.pause();
    } else {
        document.getElementById('play_pause').src = 'media/pause.png';
        video1.play();
    }
}

//Mute audio
function muteAudio(){
    if (!video1.muted){
        video1.muted = true;
        document.getElementById('playBtn').style.backgroundImage = 'url(media/audio_mute.png)';
    } else {
        video1.muted = false;
        document.getElementById('playBtn').style.backgroundImage = 'url(media/audio.png)';
       
    }
}

//Animate Menu
function animateMenu(){
    if(!menuIn){
        $('.menu').animate({right:"0"}, 500);
        menuIn = true;
    } else {
        $('.menu').animate({right:"-405px"}, 500);
        menuIn = false;
        }
}

// Jump to Point
function jumpToPoint(time){
    var jumpTo = document.getElementById(time.id);
    video1.currentTime = jumpTo.dataset.jumpto;
}
   
function loadVideo(e){
    video1.src = e;
    animateMenu();
    video1.play();
}

// Time update
video1.ontimeupdate = function(){
    currentTime = Math.round(video1.currentTime);

    /* if(currentTime == 5){
        if (showQuestion == false){
            showQuestion = true;
            $('#myModal1').modal('show');
        }
    } */
/*     if (currentTime == halfwayPoint){
        $('#myModal1').modal('show');
    }
    if (currentTime >= 0 && currentTime <= 3){
        hotspot1.style.display = 'none';
    } else if (currentTime >= 4 && currentTime <= 10){
        hotspot1.style.display = 'block';
    } */
   if(currentTime == 3){
    document.getElementById('first').classList.add('animated');
    document.getElementById('first').classList.add('fadeInRight');
   }

   if(currentTime == 10){
    document.getElementById('second').classList.add('animated');
    document.getElementById('second').classList.add('fadeInRight');
   }

   if(currentTime == 20){
    document.getElementById('third').classList.add('animated');
    document.getElementById('third').classList.add('fadeInRight');
   }
}

//Hotspot
function showHotspot(){
    $('#myModal1').modal('show');
}

// page Loaded
function pageLoaded(){
}

function showModal(e){
    document.getElementById('modalText').innerHTML = e;
    $('#myModal1').modal('show');
}

$(document).on('show.bs.modal','#mymodal1', function(){
    video1.pause();
});

$(document).on('hide.bs.modal','#mymodal1', function(){
    video1.play();
});
