function showModal(){
	$('#modal1').modal('show');
}

$(document).on('show.bs.modal','#modal1', function () {
	// Trigger code
});

$(document).on('hide.bs.modal','#modal1', function () {
	// Trigger code
});