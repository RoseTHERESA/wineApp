$(function() {
	 var widget;
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
		return '<br><div data-id="' + wine._id + '"><p><img src='+wine.image+'></p><a href="/wines/' + wine._id + '/">' + wine.winery + 
           '</a></p><p><b>Wine Name:</b> ' + wine.name + '</p><p><b>Varietal:</b> ' + wine.varietal + '</p>'
           '<p><a href="/wines/' + wine._id + '/edit">Edit </a></p></div>' +'<br><input type="submit" value="Add" id="play" class="btn btn-lg btn-success">' 
               '</form>'
	}

	loadWines();

	$('#newWinelink').click(function(e) {

    e.preventDefault();

    var html = '<br><form id="newwineform" action="#" method="POST">' +
               '<div class="form-group">' + 
                //put on two lines, one for label and one for input
               '<label for="varietal">Varietal: </label><select type="text" class="form-control" name="varietal" id="varietal" autofocus>' +
                  '<option value="Albariño">Albariño</option>' +
                  '<option value="Barbaresco">Barbaresco</option>' +
                  '<option value="Bardolino">Bardolino</option>' +
                  '<option value="Barolo">Barolo</option>' +
                  '<option value="Blanc de Blancs">Blanc de Blancs</option>' +
                  '<option value="Blanc de Noirs">Blanc de Noirs</option>' +
                  '<option value="Brunello">Brunello</option>' +
                  '<option value="Cabernet Franc">Cabernet Franc</option>' +
                  '<option value="Cabernet Sauvignon">Cabernet Sauvignon</option>' +
                  '<option value="Carignan">Carignan</option>' +
                  '<option value="Carmenere">Carmenere</option>' +
                  '<option value="Cava">Cava</option>' +
                  '<option value="Champagne">Champagne</option>' +
                  '<option value="Chardonnay">Chardonnay</option>' +
                  '<option value="Châteauneuf-du-Pape">Châteauneuf-du-Pape</option>' +
                  '<option value="Chenin Blanc">Chenin Blanc</option>' +
                  '<option value="Chianti">Chianti</option>' +
                  '<option value="Chianti Classico">Chianti Classico</option>' +
                  '<option value="Claret">Claret</option>' +
                  '<option value="Constantia">Constantia</option>' +
                  '<option value="Cortese">Cortese</option>' +
                  '<option value="Dolcetto">Dolcetto</option>' +
                  '<option value="Fumé Blanc">Fumé Blanc</option>' +
                  '<option value="Gewürztraminer">Gewürztraminer</option>' +
                  '<option value="Grappa">Grappa</option>' +
                  '<option value="Grenache">Grenache</option>' +
                  '<option value="Riesling">Riesling</option>' +
                  '<option value="Lambrusco">Lambrusco</option>' +
                  '<option value="Madeira">Madeira</option>' +
                  '<option value="Malbec">Malbec</option>' +
                  '<option value="Marsala">Marsala</option>' +
                  '<option value="Marsanne">Marsanne</option>' +
                  '<option value="Mead">Mead</option>' +
                  '<option value="Meritage">Meritage</option>' +
                  '<option value="Merlot">Merlot</option>' +
                  '<option value="Moscato">Moscato</option>' +
                  '<option value="Mourvedre">Mourvedre</option>' +
                  '<option value="Muscat">Muscat</option>' +
                  '<option value="Petit Verdot">Petit Verdot</option>' +
                  '<option value="Petite Sirah">Petite Sirah</option>' +
                  '<option value="Pinot Blanc">Pinot Blanc</option>' +
                  '<option value="Pinot Grigio">Pinot Grigio</option>' +
                  '<option value="Pinot Meunier">Pinot Meunier</option>' +
                  '<option value="Pinot Noir">Pinot Noir</option>' +
                  '<option value="Pinotage">Pinotage</option>' +
                  '<option value="Port">Port</option>' +
                  '<option value="Rosé">Rosé</option>' +
                  '<option value="Roussanne">Roussanne</option>' +
                  '<option value="Sangiovese">Sangiovese</option>' +
                  '<option value="Sauvignon Blanc">Sauvignon Blanc</option>' +
                  '<option value="Trebbiano">Trebbiano</option>' +
                  '<option value="Verdicchio">Verdicchio</option>' +
                  '<option value="Viognier">Viognier</option>' +
                  '<option value="Zinfandel">Zinfandel</option>' +
               '</select></div>' +
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

    $('#newWinelink').after(html);

    $('#newWineform').submit(function(e) {
      e.preventDefault();


      var varietal = $('#varietal').val();
      var vintage = $('#vintage').val();
      var winery = $('#winery').val()
     
      

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
           
           data.wineData.forEach(function(wine){
            if(wine.Labels){
            var searchResults =  '<div class="searchInfo" "container" id="wineSearchResults">' + 
                                  '<ul class="searchResults">' +
      
                                  '<li class="column"><img class="labelImage" "column" src='+ wine.Labels[0].Url +'></li>' +
                                  '<li class="fancyOne" "column"><a href="/wines/"'+ wine.id + '">' + wine.Name +'</a></li>' +
                                     // if(wine.Vineyard){ 
                                  '<li class="fancyTwo" "column"><b>Vineyard: </b>'+ wine.Vineyard.Name +'</li>' +
                                     // }
                                     // if(wine.Varietal){ 
                                  '<li class="fancyThree" "column" id="searchVarietal"><b>Varietal: </b>'+ wine.Varietal.Name +'</li>' +
                                     // }
                                  '<li class="fancyFour" "column"><b>Rating: </b>'+ wine.Ratings.HighestScore +'</li>' +
                                  '<li>' +
                                   '<input type="submit" value="Add" class="btn btn-success btn-lg" id="playButton">'
                                 '<li>' +  
                                  '</ul>' +
                                  '</div>'
                                     

                         
              $('#wineData').after(searchResults)
              $("#playButton").on("click", function(e){  

                  
                  var image = wine.Labels[0].Url
                  var name = wine.Name
                  var varietal = wine.Varietal.Name;
                  var vineyard = wine.Vineyard.Name;
                  // console.log(image);
                  // console.log(varietal);
                  // console.log(vineyard);
                    
                  var data = {wine: {varietal: varietal, name: name, vineyard: vineyard, image: image}};
                    console.log(data);
                        
                        $.ajax({ 
                          type: 'POST',
                          url: '/wines',
                          data: data,
                          dataType: 'json'
                        }).done(function(data) {
                          var myhtml = wineHtml(data);
                          $('body').append(myhtml);
                          console.log("ITS POSTING!!");
                        });
                        //loadWines();

                });
               
            }
           });q
          


           
          },
          error: function(err){
            alert("Not Working!")
            console.log(err)
          }

        });
        $("#newWineform").remove()
      
    });
  });
      // Right now #playButton does not exist on the page
      // so let's make the body responsible for listening to that
      // we use event delegation to make sure that when dynamically added elements
      // are clicked on, we can still listen for them!
        $('body').on("click", "#playButton", function(e){ 
          getData();
           
           // var varietal = $('#searchVarietal').val();
           // console.log(varietal);
           
        });

}); // CLOSE DOCUMENT.READY

      function getData(){
        $.ajax({
          method: "GET",
          url: "/searchMusic",
          dataType: 'json',
          success: function(data){
            $("#sc-widget").remove()
            var $iframe = '<iframe class="player" id="sc-widget" src=https://w.soundcloud.com/player/?url=' + data + '&auto_play=true" width="30%" height="125" scrolling="no" frameborder="no"></iframe>'
            $("body").append($iframe)
            widget = SC.Widget(document.getElementById('sc-widget'))
            widget.bind(SC.Widget.Events.FINISH, getData)
            widget.play()
            widget.setVolume(50);
          $('.searchInfo').remove();
          },
          error: function(err){
            alert("SOMETHING WENT WRONG!")
            console.log(err)
          }
        });
        
      }


      


