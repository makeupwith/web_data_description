// # cookieの設定
var limite = 1; //Cookieの期限（1日）
var nowdate = new Date(); //現在の日付データを取得
nowdate.setTime(nowdate.getTime() + limite*24*60*60*1000); 
var deadline = nowdate.toGMTString(); //GMT形式に変換して変数kigendateに格納
var expires = "expires=" + deadline + "; ";
var path = "path=/";
var dt = new Date('1999-12-31T23:59:59Z'); // 過去の日付をGMT形式に変換

// 初期値
var ipAddress = "10.0.1.1";

// Winodwがロードされた際
window.onload = function() {
  var session = new QiSession(this.ipAddress);

  // # cookieにIPアドレスが保存されていた場合、NAOとの接続を行う
  if(this.navigator.cookieEnabled) {
    console.log("cookieEnabled");
    if(document.cookie.indexOf("ip_nao") == -1) {
      console.log("nothing input ip address");
      session = new QiSession(ipAddress)
    }else {
      var cookies = document.cookie.split("; ");
      for(var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].split("=");
        switch(cookie[0]) {
          case "ip_nao" :
            ip_nao = cookie[1];
            console.log(ip_nao);
            session = new QiSession(ip_nao)
            var ip_input = document.getElementById('ip_nao');
            ip_input.innerHTML = ip_nao + " (以前の入力)";
            break;
        }
      }
    } 
  }

  // # NAOと接続
  session.socket().on('connect', function() {
    console.log("[CONNECTED]");
    var connect = document.getElementById('connect');
    connect.innerHTML = "接続中";
  }).on('disconnect', function() {
    console.log("[DISCONNECTED]");
    var connect = document.getElementById('connect');
    connect.innerHTML = "接続断"
  }).on('error', function() {
    console.log("[CONNECTION ERROR]")
    var connect = document.getElementById('connect');
    connect.innerHTML = "接続エラー"
  });

  // # IPアドレスの入力時
  $('#ip-btn').on('click', function() {
    var naoIp = $('#nao_ip').val();
    this.ipAddress = naoIp;
    session = new QiSession(naoIp);
    session.socket().on('connect', function() {
      console.log("[CONNECTED]");
      var connect = document.getElementById('connect');
      connect.innerHTML = "接続中";
    }).on('disconnect', function() {
      console.log("[DISCONNECTED]");
      var connect = document.getElementById('connect');
      connect.innerHTML = "接続断"
    }).on('error', function() {
      console.log("[CONNECTION ERROR]")
      var connect = document.getElementById('connect');
      connect.innerHTML = "接続エラー"
    });
    // ## IPアドレスをcookieに保存
    var cookievalue = "ip_nao=" + naoIp + "; ";
    document.cookie = cookievalue + expires + path; 
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
