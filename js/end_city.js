document.addEventListener('DOMContentLoaded', function (event) {
  let dataText = ["도시에서 열쇠를 얻어 배를 탔다!", "이 배는 어디로 가는걸까...?", "나는 어디로 가게 되는 걸까...?", "너무 무서워서 탈출하고 싶지만 삼촌이 두려워 어쩔 수가 없다.", "바다 냄새....",
    "어? 저건 뭐지?", "육지가 보인다!", "근데.. 저기는... 숲?????"];

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
      document.querySelector(".box").innerHTML = "<a class='start2' href='../html/index.html'>START</a>";
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