SC.initialize({
	client_id: "",
	redirect_uri: "http://localhost:3000/searchMusic/callback.html"
});

$(document).ready(function(){
		SC.stream('/tracks/293', function(sound){
			$('#start').click(function(e){
				e.preventDefault();
				sound.start();
			});
			$('#stop').click(function(e){
				e.preventDefault();
				sound.stop();
			});
		});
	});