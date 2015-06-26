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
            var searchResults =  '<div class="searchInfo" "container">' + 
                                  '<ul class="searchResults">' +
      
                                  '<li class="column"><img class="labelImage" "column" src='+ wine.Labels[0].Url +'></li>' +
                                  '<li class="fancyOne" "column"><a href="/wines/"'+ wine.id + '">' + wine.Name +'</a></li>' +
                                     // if(wine.Vineyard){ 
                                  '<li class="fancyTwo" "column"><b>Vineyard: </b>'+ wine.Vineyard.Name +'</li>' +
                                     // }
                                     // if(wine.Varietal){ 
                                  '<li class="fancyThree" "column"><b>Varietal: </b>'+ wine.Varietal.Name +'</li>' +
                                     // }
                                  '<li class="fancyFour" "column"><b>Rating: </b>'+ wine.Ratings.HighestScore +'</li>' +
                                  '<li>' +
                                   '<input type="submit" value="Add" class="btn btn-success btn-lg" id="playButton">'
                                 '<li>' +  
                                  '</ul>'
                                     

                         
              $('.wineData').after(searchResults)
              // playmusic();
            //console.log(searchResults);
            }
           });
          


           // console.log(data.wineData[0]);
           // console.log(data.wineData[0].Name);
           // console.log(data.wineData[0].Vineyard.Name)
           // console.log(data.wineData[0].Varietal.Name)
           // console.log(data.wineData[0].Ratings.HighestScore)
           
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
          },
          error: function(err){
            alert("SOMETHING WENT WRONG!")
            console.log(err)
          }
        });
      }

      


// }






      //     function play(){
      //     var widget;
      //     console.log("MEOW PLAYS!")

      //       function getData(){
      //         console.log("MEOW GET DATA")
      //         $.ajax({
      //           method: "GET",
      //           url: "/searchMusic",
      //           dataType: 'json',
      //           success: function(data){
                  
      //             $("#sc-widget").remove()
      //               var $iframe = '<iframe class="player" id="sc-widget" src=https://w.soundcloud.com/player/?url=' + data + '&auto_play=true" width="30%" height="125" scrolling="no" frameborder="no"></iframe>'
                  
      //             $("body").append($iframe)
      //                 console.log("I frame is working...")
                      
      //                 widget = SC.Widget(document.getElementById('sc-widget'))
      //                 widget.bind(SC.Widget.Events.FINISH, getData)
                      
      //                 widget.play()
                      
      //                 widget.setVolume(50);
      //                   var widgetIframe = document.getElementById('sc-widget');
                      
      //                 widget= SC.Widget(widgetIframe);
      //                 widget.bind(SC.Widget.Events.FINISH, function(){
      
      //                     getData();
      //                 });
              
      //               },
      //                 error: function(err){
      //                   alert("SOMETHING WENT WRONG!")
      //                   console.log(err)
      //               }
      //               });
      //               }

    
      //             }
      //             play();
      //     //e.preventDefault();
      //     //Find code to only enable the user to click once - google unregister an event attached to a button         


          
        
      //   });
      //   getData();
      // }

