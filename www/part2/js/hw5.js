	var counter = -1;
  var nop = function() { };

	if (!navigator.geolocation) {
	    navigator.geolocation = {};
	}
	if (!navigator.geolocation.getCurrentPosition) {
	    navigator.geolocation.getCurrentPosition = nop;
	}

  function hello() {
    navigator.geolocation.getCurrentPosition(function(position) {
      document.getElementById('location').innerHTML = position.coords.latitude + ", " + position.coords.longitude;
    });
  }

  function init()
  {
    navigator.geolocation.getCurrentPosition(function(position) {
      counter = counter + 1;
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude
      var accuracy = position.coords.accuracy;
      var speed = position.coords.speed;
      var altitude = position.coords.altitude;
      var altitudeAccuracy = position.coords.altitudeAccuracy;

      if(latitude === null)
        latitude = "null";
      if(longitude === null)
        longitude = "null";
      if(accuracy === null)
        accuracy = "null";
      if(speed === null)
        speed = "null";
      if(altitude === null)
        altitude = "null";
      if(altitudeAccuracy === null)
        altitudeAccuracy = "null";
      


      $('#data').find('tbody').append($('<tr>')
        .append($('<td>').html(counter)).
        append($('<td>').html(latitude)).
        append($('<td>').html(longitude)).
        append($('<td>').html(accuracy)).
        append($('<td>').html(speed)).
        append($('<td>').html(altitude)).
        append($('<td>').html(altitudeAccuracy))
    )}
    )
    

  }


  
  function successCallback(position) {
    document.getElementById('location').innerHTML = position.coords.latitude + ", " + position.coords.longitude + ": last updated at " + position.timestamp;
    var updateDiv = document.getElementById('updateDiv')
    updateDiv.style.visibility = 'visible';
    setTimeout(function() {
      updateDiv.style.visibility = 'hidden';
    }, 200);
  }

  function errCallback(err) {
      var message = err.message;
      var code = err.code;
      document.getElementById('location').innerHTML = "Erorr: " + code + ", " + err.message;
      //code = 0 => UNKNOWN_ERROR, 1 => PERMISSION_DENIED, 2 => POSITION_UNAVAILABLE, 3 => TIMEOUT
  }

  // optional for geolocation.watchPosition
  var options = { 
      enableHighAccuracy: true,
      maximumAge: 250,
      timeout: 10000
  };

  var watchId;
  function start()
  {
    if(($('p').html()) === "Start watching position")
    {
      $('p').html("Stop watching position")
      watchId = navigator.geolocation.watchPosition(init, errCallback, options);
    }
    else if(($('p').html()) === "Stop watching position")
    {
      $('p').html("Start watching position")
      navigator.geolocation.clearWatch(watchId);    
    }
    
  }

  // function stop() 
  // {
  //   $('p').html("Start watching this position")
  //   navigator.geolocation.clearWatch(watchId);
  // }

	