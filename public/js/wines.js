$(function() {
	
/********************** Add Wines to the DB, Single Page App ************************/
  function loadWines(){
		$.getJSON("/wines").done(function(data){
			data.wines.forEach(function(wine){ //wine comes from the app.js routes
				var html = wineHtml(wine);
				$('body').append(html);
			});
			
		});
	}

	function wineHtml(wine) {
		return '<br><div data-id="' + wine._id + '"><p><b>Winery:</b> <a href="/wines/' + wine._id + '/">' + wine.winery + 
           '</a></p><p><b>Varietal:</b> ' + wine.varietal + '</p><p><b>Vintage:</b> ' + wine.vintage + '</p>'
           '<p><a href="/wines/' + wine._id + '/edit">Edit </a></p></div>';
	}

	loadWines();

	$('#newWinelink').click(function(e) {

    e.preventDefault();

    var html = '<br><form id="newwineform" action="#" method="POST">' +
               '<div class="form-group">' + 
                //put on two lines, one for label and one for input
               '<label for="varietal">Varietal: </label><input type="text" class="form-control" name="varietal" id="varietal" autofocus>' +
               '</div>' +
               '<div class="form-group">' +
               '<label for="vintage">Vintage: </label>' +
               '<input type="number" class="form-control" name="vintage" id="vintage" autofocus>' +
               '</div>' +
               '<label for="winery">Winery: </label>' +
               '<input type="text" class="form-control" name="winery" id="winery" autofocus>' +
               '</div>' +
               '<br><input type="submit" value="Add" class="btn btn-lg btn-success">' +
               '</form>';

    $('body h2').after(html);

    $('#newwineform').submit(function(e) {
      e.preventDefault();

      var varietal = $('#varietal').val();
      var vintage = $('#vintage').val();
      var winery = $('#winery').val();

      var data = {wine: {varietal: varietal, vintage: vintage, winery: winery}};

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

 /**************************** Looking Up Wines from the Wine.com API ******************************/

  $('#newWineSearch').click(function(e) {

    e.preventDefault();

    var html = '<br><form id="newWineform" action="javascript:void(0)">' +
               '<div class="form-group">' + 
                //put on two lines, one for label and one for input
               '<label for="varietal">Varietal: </label><input type="text" class="form-control" name="varietal" id="varietal" autofocus>' +
               '</div>' +
               '<div class="form-group">' +
               '<label for="vintage">Vintage: </label>' +
               '<input type="number" class="form-control" name="vintage" id="vintage" autofocus>' +
               '</div>' +
               '<label for="winery">Winery: </label>' +
               '<input type="text" class="form-control" name="winery" id="winery" autofocus>' +
               '</div>' +
               '<br><input type="submit" value="Add" class="btn btn-lg btn-success">' +
               '</form>';

    $('h2').after(html);

    $('#newWineform').submit(function(e) {
      e.preventDefault();

      var varietal = $('#varietal').val();
      var vintage = $('#vintage').val();
      var winery = $('#winery').val()
      console.log(winery);
      console.log(varietal);
      

        $.ajax({
          method: "GET",
          url: "/searchWines",
          data: {
            varietal: varietal,
            vintage: vintage,
            winery: winery
            },
          dataType: 'json',
          success: function(data){
            $("#newWineSearch").remove()
            console.log(data);
          },
          error: function(err){
            alert("Not Working!")
            console.log(err)
          }
        });
      
    });
  });


});