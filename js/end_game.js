document.addEventListener('DOMContentLoaded', function(event){
    let dataText = [ "사막 동굴에서 열쇠를 얻었다!", "삼촌 : 엘리야 수고했다 ㅎㅎ 자! 이제 그럼 열쇠를 주렴.", "삼촌. 장난하세요? 절대 안드릴거에요.", "삼촌 : 뭐? 에이 그러지말고 엘리야...^^ 삼촌이 용돈 많이 줄게!", "됐고요. 열쇠 없으니까 삼촌 절대 보물 못 얻어요. ㅎㅎ",
"삼촌 : 너 그럴거니? 집은 어떻게 갈건데? 삼촌이 비행기 태워줄게 ", "저 알아서 갈게요, 삼촌. 안녕히 가세요.", "삼촌 : 너.... 너.... 열쇠 내놓으라고!!!!", "(뒤돌아서 당당하게 걸어간다.)"];
    
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
      document.querySelector(".box").innerHTML = "<p class='start2'>TO    BE    CONTINUED</p>";
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
    source.src = '../sound/egypt.mp3';
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