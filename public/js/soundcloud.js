(function(){
    var widget;

  	// var randomNumber = Math.floor(Math.random() * musicArrayLength)
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

    var widgetIframe = document.getElementById('sc-widget');
    widget       = SC.Widget(widgetIframe);

    // widget.bind(SC.Widget.Events.READY, function() {
    //   widget.bind(SC.Widget.Events.PLAY, function() {
    //     // get information about currently playing sound
    //     widget.getCurrentSound(function(currentSound) {
    //       //console.log('sound ' + currentSound.get('') + 'began to play');
    //     });
    //   });
      widget.bind(SC.Widget.Events.FINISH, function(){

        getData();

      });
      // get current level of volume
    //   widget.getVolume(function(volume) {
    //     //console.log('current volume value is ' + volume);
    //   });
    //   // set new volume level
      
    //   // get the value of the current position
    // });


	// })
  }());