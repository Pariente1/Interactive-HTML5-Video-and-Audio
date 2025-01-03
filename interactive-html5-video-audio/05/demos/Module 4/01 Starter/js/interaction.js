// Variables
var initialPlay = false;
var menuIn = true;

// Time Variables
var currentTime;
var halfwayPoint;
var durationTime;

// Animate in menu
function animateMenu(){
	if (menuIn) {
		$('.menu').animate({right: "0"}, 500);
		menuIn = false;
	} else{
		$('.menu').animate({right: "-405px"}, 500);
		menuIn = true;
	}
}

// Jump to point
function jumpToPoint(time){
	
}

// Modal Show
$(document).on('show.bs.modal','#modal1', function () {
	// video1.pause();
});

// Modal Hide
$(document).on('hide.bs.modal','#modal1', function () {
	// video1.play();
});