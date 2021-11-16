"use strict";

let canvas, ctx; // 캔버스 변수
let dx = 0, dy = 0; // 이동할 좌표 변수
let keycode; // 키보드 입력 변수


let x = 20, y = 20; // 캐릭터 처음 위치
 let ellie_w = 16, ellie_h = 16; // 캐릭터 가로 세로 사이즈

let background = new Image(); // 사막 배경
background.src = "background1.png";

let ellie = new Image(); // 캐릭터 이미지
ellie.src = "image/front-stop.png";

let weapon_x, weapon_y;
let click_x, click_y;

let w = new Image();
w.src = "image/weapon.png";

let isWeaponShown = 0;
let weaponId;

let canvas_x, canvas_y;


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
    
    canvas_x = canvas.clientWidth;
    canvas_y = canvas.clientHeight;
    gamestart();
    setInterval(gamestart, 10);
    // gamestart 함수를 최초 실행 후 반복 실행
}

function gamestart() {
    moveEllie(); // 캐릭터 움직이기
    draw(); // 움직인 후 다시 그리기
}

function moveEllie() {
    if((x - ellie_w) + dx > 0 && x+dx+ellie_w < canvas.width) { // 캐릭터 x좌표가 0에서 1200 사이일 때
        x += dx;
    }
    if((y - ellie_h) + dy > 0 && y+dy+ellie_h < canvas.height) { // 캐릭터 y좌표가 0에서 590 사이일 때
        y += dy;
    }
}

function draw() {
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height); // 배경 그리기
    ctx.drawImage(ellie, x-ellie_w, y-ellie_h, ellie_w*2, ellie_h*2); // 캐릭터 그리기
    if(isWeaponShown == 1) {
        ctx.drawImage(w, click_x/2, click_y-(ellie_h*5), ellie_w*2, ellie_h*2);
    }
}

function weapon(event) {
    click_x = event.clientX;
    click_y = event.clientY;
    console.log(click_x + " "+click_y);
    
    clearTimeout(weaponId);
    isWeaponShown = 1;
    weaponId = setTimeout( () => {isWeaponShown = 0; }, 500);
}

function keydown() {
    keycode = event.keyCode;
    switch(keycode) {
        case 37: // left
            dx = -2; 
            ellie.src = "image/left-walk.png";
            break;
        case 38: // up
            dy = -2; 
            ellie.src = "image/behind-walk.png";
            break;
        case 39: // right
            dx = 2; 
            ellie.src = "image/right-walk.png";
            break; 
        case 40: // down
            dy = 2; 
            ellie.src = "image/front-walk.png";
            break;
    }
}

function keyup() {
    keycode=event.keyCode;
    switch(keycode){
        case 37: dx = 0; break;
        case 38: dy = 0; break;
        case 39: dx = 0; break;
        case 40: dy = 0; break;
    }
}