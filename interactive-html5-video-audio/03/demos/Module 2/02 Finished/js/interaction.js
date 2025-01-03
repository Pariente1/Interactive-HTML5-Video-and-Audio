// Variable
var video1 = document.getElementById('video1');
var initialPlay = false;

// Video load
video1.onloadedmetadata = function(){
	
}

video1.onplay = function(){
	if (initialPlay == false) {
		initialPlay = true;
	}
}

video1.onpause = function(){
	// showModal('This is the new text for the modal!');
}

video1.onended = function(){
	alert('Video has ended!')
}

// Toggle Video
function toggleVideo(){
	if (!video1.paused) {
		document.getElementById('play_pause').src = 'media/play.png';
		video1.pause();
	} else{
		document.getElementById('play_pause').src = 'media/pause.png';
		video1.play();
	}
}

// Time update
video1.ontimeupdate = function(){
	console.log(Math.round(video1.currentTime))
}

// Page Loaded
function pageLoaded(){

}

function showModal(e){
	document.getElementById('modalText').innerHTML = e;
	$('#modal1').modal('show');
}

$(document).on('show.bs.modal','#modal1', function () {
	video1.pause();
});

$(document).on('hide.bs.modal','#modal1', function () {
	video1.play();
});