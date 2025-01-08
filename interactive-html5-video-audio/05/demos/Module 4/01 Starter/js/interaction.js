// Variables
var initialPlay = false;
var menuIn = true;

// Time Variables
var currentTime;
var halfwayPoint;
var durationTime;

var video1;

//video js ready
videojs('video1').ready(function(){
	video1 = videojs('video1');



	/* this.on('timeupdate', function(){
		console.log(Math.round(this.currentTime()));
	}); */

	video1.markers({
		markerStyle:{
			'width':'20px',
			'height': '20px',
			'border-radius': '20px',
			'background-color': 'blue'
		},
		markers: [
			{time:5, text:'First marker'},
			{time:10, text:'Second marker'},
		],
		onMarkerClick: function(marker) {
			alert(marker.text);
		},
		onMarkerReached: function(marker){
			if(marker.text == "First marker"){
				$('#modal1').modal('show');

			}
		}
	})
});

function updateTime(time){
	video1.currentTime(time);
	video1.play();
}

function muteAudio(){
	var isVolumeMuted = video1.muted();

	if (isVolumeMuted){
		video1.muted(false);
	} else {
		video1.muted(true);
	}
}

function togglePlay(){
	var isPaused = video1.paused();
	var isPlaying = !video1.paused();

	if(isPaused){
		video1.play();
	} else {
		video1.pause();
	}
}


// Animate in menu
function animateMenu(){
	video1.play();
/* 	if (menuIn) {
		$('.menu').animate({right: "0"}, 500);
		menuIn = false;
	} else{
		$('.menu').animate({right: "-405px"}, 500);
		menuIn = true;
	} */
}

// Jump to point
function jumpToPoint(time){
	
}

// Modal Show
$(document).on('show.bs.modal','#modal1', function () {
	video1.pause();
});

// Modal Hide
$(document).on('hide.bs.modal','#modal1', function () {
	video1.play();
});