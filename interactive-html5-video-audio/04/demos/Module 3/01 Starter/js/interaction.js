// Variables
var initialPlay = false;

// Page load function
function pageLoaded(){
	
}

// Video loaded
video1.onloadedmetadata = function(){
	
}

// On play
video1.onplay = function(){
	if (!initialPlay){
		initialPlay = true;
	}
}

video1.ontimeupdate = function(){
	console.log(Math.round(video1.currentTime))
}