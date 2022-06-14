document.addEventListener('DOMContentLoaded', function(event){
    let dataText = [ "숲에서 열쇠를 얻어 배를 탔다!", "도시...  숲.... 이젠 또 어디로 가는 걸까?", "이젠 정말 지친다...", "그 보물이라는게 정말 있긴 한걸까?", "내가 왜 이렇게 위험한 일을 해야하는 걸까?",
"보물을 찾고나면 삼촌에게 복수를 할 것이다.", "어....? 또 무언가가 보인다!", "저건..... 사막??????"];
    
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
      document.querySelector(".box").innerHTML = "<a class='start2' href='../html/index.html'>START</a>";
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