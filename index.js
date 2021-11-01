"use strict";

let canvas, ctx;
let dx = 0, dy = 0;
let keycode;

let x = 600, y = 300;
let ellie_w = 16, ellie_h = 16;

let background = new Image();
background.src = "background1.png";

let ellie = new Image();
ellie.src = "image/front-stop.png";

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

function Init() {
    canvas = document.getElementById("c1");
    ctx = canvas.getContext("2d");

    gamestart();
    setInterval(gamestart, 10);
}

function gamestart() {
    moveEllie();
    draw();
}

function moveEllie() {
    if((x - ellie_w) + dx > 0 && x+dx < 1200) {
        x += dx;
    }
    if((y - ellie_h) + dy > 0 && y+dy < 590) {
        y += dy;
    }
}

function draw() {
    ctx.drawImage(background, 0, 0, 1200, 590);
    ctx.drawImage(ellie, x-ellie_w, y-ellie_h, ellie_w*2, ellie_h*2);
}

function keydown() {
    keycode = event.keyCode;
    switch(keycode) {
        case 37: dx = -15; break;
        case 38: dy = -5; break;
        case 39: dx = 15; break; 
        case 40: dy = 5; break;
    }
}

function keyup() {
    keycode=event.keyCode;
    switch(keycode){
        case 37: dx = 0; break;
        case 38: dy = 0; break;
        case 39: dx=0; break;
        case 40: dy = 0; break;
    }
}