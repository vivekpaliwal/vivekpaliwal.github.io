  $("button").bind('click', function(event) {
      /* Act on the event */
      var parentWrapperId = this.parentElement.id;
      var floatValue = this.innerText;

      if (parentWrapperId == "purpleBoxControls") {
          $('#purple').css('float', floatValue);
          $('#purple h4').html("float :" + floatValue)
      }
      if (parentWrapperId == "redBoxControls") {
          $('#red').css('float', floatValue);
          $('#red h4').html("float :" + floatValue)
      }

  });