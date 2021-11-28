document.addEventListener('DOMContentLoaded', function(event){
    let dataText = [ "어...? 여긴 어디지....?", "분명 삼촌이랑 길에서 만나서 이야기하고 있었던 것 같은데....?", "삼촌 : 이제 정신이 드니?", "네... 삼촌. 여긴 어디에요?", "삼촌 : 엘리야. 내가 전에 말했던 보물 기억나니?",
"네..? 그 고대 왕이 숨겨놓았다던 그 보물이요...?", "삼촌 : 그래 맞아. 내가 어제 그 지도를 발견했어.", "대박이네요... 근데 여긴 어디에요?", 
"삼촌 : 근데 그 보물이 있는 곳이 좀 위험해 보이더라고. 그래서 너를 보낼거야.", "네? 저를요? 삼촌이 가시면 되잖아요.", "삼촌 : 나는 할 일이 많은 사람이라서 다치면 안되거든. 너는.. 뭐 상관없을것 같네 ㅎㅎ 그럼 잘 다녀와! ^^",
"(삼촌이 나를 어디론가 밀어버린다.)", "어어....어어!....!!! "];
    
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
      document.querySelector(".box").innerHTML = "<a class='start2' href='index.html'>START</a>";
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
    source.src = 'sound/typing.wav';
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