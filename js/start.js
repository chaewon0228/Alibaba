document.addEventListener('DOMContentLoaded', function(event){
    let dataText = [ "내 이름은 알리!", "지금 자취방을 알아보는데 돈이 부족해 ㅠㅠ", "어..? 이 종이는 뭐지?", "대박! 보물지도야!", "속는 셈치고 보물을 찾으러 가볼까?"];
    
  function typeWriter(text, i, fnCallback) {
    if (i < (text.length)) {
      document.querySelector(".box").innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';

      setTimeout(function() {
        typeWriter(text, i + 1, fnCallback)
      }, 100);
    }
    else if (typeof fnCallback == 'function') {
      setTimeout(fnCallback, 1000);
    }
  }
    function StartTextAnimation(i) {
      if (typeof dataText[i] == 'undefined') {
      document.querySelector(".box").innerHTML = "<a class='start2' href='../html/game_city.html'>START</a>";
        setTimeout(function() {
          window.location.reload();
        }, 20000);
      }
    if (i < dataText[i].length) {
      typeWriter(dataText[i], 0, function(){
        StartTextAnimation(i + 1);
      });
    }
  }
  setTimeout(StartTextAnimation, 1000, 0);
});

document.addEventListener("click", function(event) {
  const audio = document.querySelector('#audio');
  
  function loadAudio() {
    let source = document.querySelector("#audioSource");
    source.src = '../sound/typing.wav';
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