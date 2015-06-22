$(function(){

	function loadWines(){
		$.getJSON("/wines").done(function(data){
			data.wines.forEach(function(wine){
				var html = wineHtml(wine);
				$('body').append(html);
			});
			console.log(data);
		});
	}

	function wineHtml(wine) {
		return '<div data-id="' + wine._id + '"><p><a href="/wines/' + wine._id + '/">' + wine.varietal + 
           '</a></p><p><img src="' + wine.image + '" alt="label image" height=200 width=200></p>' +
           '<p><a href="/wines/' + wine._id + '/edit">Edit </a></p></div>';
	}

	loadWines();

	$('#newWinelink').click(function(e) {
    e.preventDefault();

    var html = '<br /><form id="newwineform" action="/wines" method="POST">' +
               '<div class="form-group">' + 
               '<label for="varietal">Varietal: </label><input type="text" class="form-control" name="varietal" id="varietal" autofocus>' +
               '</div>' +
               '<div class="form-group">' +
               '<label for="vintage">Vintage: </label>' +
               '<input type="text" class="form-control" name="vintage" id="vintage">' +
               '</div>' +
               '<input type="submit" value="Add" class="btn btn-lg btn-success">' +
               '</form>';

    $('#logout').after(html);

    $('#newwineform').submit(function(e) {
      e.preventDefault();

      var varietal = $('#varietal').val();
      var vintage = $('#vintage').val();

      var data = {wine: {varietal: name, vintage: url}};

      $.ajax({
        type: 'POST',
        url: '/wines',
        data: data,
        dataType: 'json'
      }).done(function(data) {
   		var myhtml = wineHtml(data);
   		$('body').append(myhtml);
   		$('#newwineform').remove()
        console.log(data);
      });
    });
  });


})