"use strict";

let canvas, ctx; // 캔버스 변수
let dx = 0, dy = 0; // 이동할 좌표 변수
let keycode; // 키보드 입력 변수

let x = 600, y = 300; // 캐릭터 처음 위치
 let ellie_w = 16, ellie_h = 16; // 캐릭터 가로 세로 사이즈
 let tileX, tileY;
let keyUpPressed, keyDownPressed, keyLeftPressed, keyRightPressed;

let tile = new Image();
tile.src = "tiles.png";

let background = new Image(); // 사막 배경
background.src = "background1.png";

let ellie = new Image(); // 캐릭터 이미지
ellie.src = "image/front-stop.png";

/*
const audio = document.querySelector('#audio');
const btn = document.getElementById('audioButton');

function loadAudio() {
    let source = document.querySelector("#audioSource");
    source.src = 'vampire.wav';
    audio.load();
    playAudio();
}

function playAudio() {
    audio.volume = 0.2;
    audio.loop = true;
    audio.play();
}

btn.addEventListener('click', loadAudio);
*/

function Init() { // body가 브라우저에 올라올 때 실행되는 함수
    canvas = document.getElementById("c1");
    ctx = canvas.getContext("2d");

    gamestart();
    setInterval(gamestart, 10);
    // gamestart 함수를 최초 실행 후 반복 실행
}

function gamestart() {
    ctx.drawImage(background, 0, 0, 1200, 590);
    moveEllie(); // 캐릭터 움직이기
    draw(); // 움직인 후 다시 그리기
}

function moveEllie() {
    if((x - ellie_w) + dx > 0 && x+dx < 1200) { // 캐릭터 x좌표가 0에서 1200 사이일 때
        x += dx;
    }
    if((y - ellie_h) + dy > 0 && y+dy < 590) { // 캐릭터 y좌표가 0에서 590 사이일 때
        y += dy;
    }
}

function draw() {
     // 배경 그리기
    ctx.drawImage(tile, 16*tileX, 16*tileY, 16, 16, x-ellie_w, y-ellie_h, ellie_w*2, ellie_h*2); // 캐릭터 그리기
}

function keydown() {
    keycode = event.keyCode;
    switch(keycode) {
        case 37: // left
            dx = -2; 
            if(tileX == 4) {
                tileX = 0;
            }
            else
                tileX = 4;
            
            tileY = 4;
            break;
        case 38: // up
            dy = -2;
            tileX = 3;
            tileY = 4; 
            break;
        case 39: // right
            dx = 2; 
            tileX = 4;
            tileY = 4; 
            break; 
        case 40: // down
            dy = 2; 
            tileX = 2;
            tileY = 4; 
            break;
    }
}

function keyup() {
    keycode=event.keyCode;
    switch(keycode){
        case 37: 
            dx = 0; 
            tileX = 0;
            tileY = 4;
            break;
        case 38: 
            dy = 0; 
            tileX = 6;
            tileY = 4;
            break;
        case 39: 
            dx = 0;
            tileX = 0;
            tileY = 4; 
            break;
        case 40: 
            dy = 0;
            tileX = 5;
            tileY = 4;
            break;
    }
}