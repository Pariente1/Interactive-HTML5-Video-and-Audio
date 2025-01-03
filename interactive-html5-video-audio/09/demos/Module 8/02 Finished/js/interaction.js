// Time variables
var currentTime = 0;
var halfwayPoint;
var durationPoint;

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var video = "U9t-slLl30E";

var videotime = 0;
var timePaused;

// YouTube Function
var player;

function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		height: '700',
		width: '100%',
		videoId: '9KOn7l8vrFg',
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}

function onPlayerReady(event) {
	
	console.log(player.getDuration());

	function updateTime() {
	    var oldTime = videotime;
	    if(player && player.getCurrentTime) {
	      videotime = player.getCurrentTime();
	    }
	    if(videotime !== oldTime) {
	      onProgress(videotime);
	    }
  	}
  	//Set interval for every milisecond
  	timeupdater = setInterval(updateTime, 100);
}

function onProgress(currentTime) {
	if (currentTime >= 5) {
		$('#modal1').modal('show');
		player.pauseVideo();
	}
}

function onPlayerStateChange(event) {
	if (event.data == 1){ //Playing
		// Code for when video plays
	} else if (event.data == 2){ //Paused
		// Code to happen during paused
		timePaused = Math.round(player.getCurrentTime())
		console.log(timePaused)
	} else if (event.data == 0){ //Ended
		triggerCompletion();
	};
};

function triggerCompletion(){
	alert('Complete!')
}