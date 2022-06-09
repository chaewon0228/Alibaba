document.addEventListener('DOMContentLoaded', function (event) {
    let dataText = ["도시의 보물 상자를 얻었다!"];
  
    function typeWriter(text, i, fnCallback) {
      if (i < (text.length)) {
        document.querySelector(".box").innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true"></span>';
  
        setTimeout(function () {
          typeWriter(text, i + 1, fnCallback)
        }, 100);
      }
      else if (typeof fnCallback == 'function') {
        setTimeout(fnCallback, 1000);
      }
    }
    function StartTextAnimation(i) {
      if (typeof dataText[i] == 'undefined') {
        document.querySelector(".box").innerHTML = "<a class='start2' href='../html/game_forest.html'>START</a>";
        setTimeout(function () {
          window.location.reload();
        }, 20000);
      }
      if (i < dataText[i].length) {
        typeWriter(dataText[i], 0, function () {
          StartTextAnimation(i + 1);
        });
      }
    }
    setTimeout(StartTextAnimation, 1000, 0);
  });
  
  
  
  document.addEventListener("click", function (event) {
    const audio = document.querySelector('#audio');
  
    function loadAudio() {
      let source = document.querySelector("#audioSource");
      source.src = '../sound/ship.wav';
      audio.load();
      playAudio();
    }
  
    function playAudio() {
      audio.volume = 0.2;
      audio.loop = true;
      audio.play();
    }
    loadAudio();
  
  });