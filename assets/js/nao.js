var ipAddress = "10.0.1.2";

$.get("https://ipinfo.io", function(res){
  ipAddress = res.ip;
}, "jsonp");

window.onload = function() {
  var ip = document.getElementById('ip');
  ip.innerHTML = ipAddress;

  var session = new QiSession(ipAddress);
  
  $('#ip-btn').on('click', function() {
    var naoIp = $('#nao_ip').val();
    session = new QiSession(naoIp);
    console.log(naoIp);
  });
  
  // var session = new QiSession("10.0.1.2");

  session.socket().on('connect', function() {
      console.log("connected!");
      var connect = document.getElementById('connect');
      connect.innerHTML = "接続中";
  });


  // --- NAOqi APIs ---
  // # Motion
  // ## ALMotion / rest()
  $('#rest-motion').on('click', function(){
    console.log('[REST]');
    session.service("ALMotion").done(function(tts) {
        tts.rest();
    }).fail(function(error) {
        console.log("Error!");
    });
  });
  // ## ALMotion / wakeUp()
  $('#wakeup-motion').on('click', function(){
    console.log('[WAKEUP]');
    session.service("ALMotion").done(function(tts) {
        tts.wakeUp();
    }).fail(function(error) {
        console.log("Error!");
    });
  });
  // ## ALRobotPosture / goToPosture(Sit)
  $('#sit').on('click', function(){
    session.service("ALRobotPosture").done(function(tts) {
        console.log('[SIT]');
        tts.goToPosture('Sit', 0.8);
    }).fail(function(error) {
        console.log("Error!");
    });
  });
  // ## ALRobotPosture / goToPosure(Stand)
  $('#stand').on('click', function(){
    session.service("ALRobotPosture").done(function(tts) {
        console.log('[STAND]');
        tts.goToPosture('Stand', 0.8);
    }).fail(function(error) {
        console.log("Error!");
    });
  });


  // # Audio
  // ## ALAnimatedSpeech
  $('#anime-speech').on('click', function(){
    console.log('[TEST]');
    var target = $('#anime-text').val();
    session.service("ALAnimatedSpeech").done(function(tts) {
        tts.say(target);
        console.log(target);
    }).fail(function(error) {
        console.log("Error!");
    });
  });

  // ## ALTextToSpeech
  $('#text-speech').on('click', function(){
      console.log('[TEST]');
      var target = $('#text').val();
      session.service("ALTextToSpeech").done(function(tts) {
          tts.say(target);
          console.log(target);
      }).fail(function(error) {
          console.log("Error!");
      });
  });

  // ## ALAudioDevice
  $('#set-volume').on('click', function(){
    console.log('[SET_VOLUME]');
    var target = $('#volume').val();
    var value = Number(target)
    session.service("ALAudioDevice").done(function(tts) {
        tts.setOutputVolume(value);
        console.log(target);
    }).fail(function(error) {
        console.log("Error!");
    });
  });


  // # Vision
  // ## ALPhotoCapture
  $('take-picture').on('click', function() {
    session.service("ALPhotoCapture").done(function(tts) {
      tts.takePicture("./", "picture", true);
    }).fail(function(error) {
      console.log("Error!");
    });
  }); 


};  
