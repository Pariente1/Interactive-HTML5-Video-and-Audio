// Time variables
var halfwayPoint;
var durationPoint;

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		height: '700',
		width: '100%',
		videoId: '9KOn7l8vrFg',
		events: {
			
		}
	});
}