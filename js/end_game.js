function story() {
  let dataText = ["용케 여기까지 왔군... 다들 중간에 포기하던데 말이야..", "끈기와 도전 정신이 대단하구만.", "앞으로도 그렇게 살아가길 바라네.", "여기 보물을 주도록 하지."];

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
        document.querySelector(".box").innerHTML = "<p class='start2'>TO    BE    CONTINUED</p>";
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
}

function changeImage() {
  document.getElementById("cave").src = '../gif/gold_cave.gif';
  document.getElementById("cave").width = window.innerWidth;
  document.getElementById("cave").height = window.innerHeight;
  
  story();
}

var laughAudio = new Audio();
var egyptAudio = new Audio();
laughAudio.loop = false;
egyptAudio.loop = true;

laughAudio.src = '../sound/clear_laugh.mp3'
egyptAudio.src = '../sound/egypt.mp3'

document.addEventListener("click", function (event) {
  const audio = document.querySelector('#audio');

  laughAudio.play();
  egyptAudio.play();

});

setTimeout(changeImage, 1700);