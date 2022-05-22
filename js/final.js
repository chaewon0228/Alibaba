"use script"

let context = null;
let gameMap = [
	0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,4,4,4,4,4,4,4,4,4,
	0, 2, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 0, 4,4,4,4,4,4,4,4,4,4,
	0, 2, 3, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 0, 4,4,4,4,4,4,4,4,4,4,
	0, 2, 3, 1, 4, 4, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 0, 4,4,4,4,4,4,4,4,4,4,
	0, 2, 3, 1, 1, 4, 4, 1, 2, 3, 3, 2, 1, 1, 2, 1, 0, 0, 0, 0, 4,4,4,4,4,4,4,4,4,4,
	0, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 2, 2, 2, 2, 1, 1, 1, 1, 0, 4,4,4,4,4,4,4,4,4,4,
	0, 1, 1, 1, 1, 2, 4, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0, 4,4,4,4,4,4,4,4,4,4,
	0, 1, 1, 1, 1, 2, 4, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0, 4,4,4,4,4,4,4,4,4,4,
	0, 1, 1, 1, 1, 2, 4, 4, 4, 4, 4, 1, 1, 1, 2, 2, 2, 2, 1, 0, 4,4,4,4,4,4,4,4,4,4,
	0, 1, 1, 1, 1, 2, 3, 2, 1, 1, 4, 1, 1, 1, 1, 3, 3, 2, 1, 0, 4,4,4,4,4,4,4,4,4,4,
	0, 1, 2, 2, 2, 2, 1, 2, 1, 1, 4, 1, 1, 1, 1, 1, 3, 2, 1, 0, 4,4,4,4,4,4,4,4,4,4,
	0, 1, 2, 3, 3, 2, 1, 2, 1, 1, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 4,4,4,4,4,4,4,4,4,4,
	0, 1, 2, 3, 3, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0, 4,4,4,4,4,4,4,4,4,4,
	0, 1, 2, 3, 4, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0, 1, 2, 1, 0, 4,4,4,4,4,4,4,4,4,4,
	0, 3, 2, 3, 4, 4, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 2, 1, 0, 4,4,4,4,4,4,4,4,4,4,
	0, 3, 2, 3, 4, 4, 3, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 3, 0, 4,4,4,4,4,4,4,4,4,4,
	0, 3, 2, 3, 4, 1, 3, 2, 1, 3, 1, 1, 1, 2, 1, 1, 1, 2, 3, 0, 4,4,4,4,4,4,4,4,4,4,
	0, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 1, 1, 2, 2, 2, 2, 2, 3, 0, 4,4,4,4,4,4,4,4,4,4,
	0, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 4, 0, 4,4,4,4,4,4,4,4,4,4,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,4,4,4,4,4,4,4,4,4
];
// 타일 크기
let tileW = 50, tileH = 50;
// 맵 크기
let mapW = 30, mapH = 20;
let currentSecond = 0, lastFrameTime = 0;

let tileset = null, tilesetURL = "../image/tile_desert.png", tilesetLoaded = false;

let floorTypes = {
	solid: 0,
	path: 1,
	water: 2
};
let tileTypes = {
	0: { colour: "#5bbd24", floor: floorTypes.path, sprite: [{ x: 49, y: 17, w: 16, h: 14 }] },  // 왼위모서리
	1: { colour: "#5bbd24", floor: floorTypes.path, sprite: [{ x: 112, y: 17, w: 16, h: 14 }] },  // 왼아모서리
	2: { colour: "#5bbd24", floor: floorTypes.path, sprite: [{ x: 96, y: 16, w: 14, h: 16 }] }, // 오위모서리
	3: { colour: "#5bbd24", floor: floorTypes.path, sprite: [{ x: 97, y: 32, w: 16, h: 15 }] },  // 오아모서리

	4: { colour: "#5bbd24", floor: floorTypes.path, sprite: [{ x: 81, y: 18, w: 11, h: 16 }] },   // 모래
	5: { colour: "#5bbd24", floor: floorTypes.sand, sprite: [{ x: 17, y: 33, w: 14, h: 14 }] },    // 진한 모래

	6: { colour: "#286625", floor: floorTypes.abstacle, sprite: [{ x: 0, y: 48, w: 16, h: 15 }] }, // 수풀
	7: { colour: "#e8bd7a", floor: floorTypes.path, sprite: [{ x: 16, y: 48, w: 16, h: 15 }] },    // 돌

	8: { colour: "#e8bd7a", floor: floorTypes.abstacle, sprite: [{ x: 50, y: 34, w: 13, h: 11 }] }, // 물

	9: { colour: "#0080ff", floor: floorTypes.solid, sprite: [{ x: 80, y: 0, w: 0, h: 0 }] },    // empty

	10: { colour: "#e8bd7a", floor: floorTypes.path, sprite: [{ x: 32, y: 17, w: 15, h: 14 }] },  // 왼
	11: { colour: "#e8bd7a", floor: floorTypes.path, sprite: [{ x: 80, y: 32, w: 15, h: 15 }] },  // 오
	12: { colour: "#e8bd7a", floor: floorTypes.path, sprite: [{ x: 64, y: 16, w: 16, h: 15 }] },  // 위
	13: { colour: "#e8bd7a", floor: floorTypes.path, sprite: [{ x: 65, y: 32, w: 14, h: 16 }] },  // 아

	14: { colour: "#e8bd7a", floor: floorTypes.path, sprite: [{ x: 0, y: 17, w: 16, h: 14 }] },    // 섬

	15: { colour: "#e8bd7a", floor: floorTypes.solid, sprite: [{ x: 32, y: 33, w: 16, h: 14 }] },   // 배
	16: { colour: "#e8bd7a", floor: floorTypes.path, sprite: [{ x: 32, y: 32, w: 15, h: 16 }] }    // 깨진
};

let directions = {
	up: 0,
	right: 1,
	down: 2,
	left: 3,
	sleep: 4
};

let keysDown = {
	65: false, // 왼 65
	87: false, // 위 87
	68: false, // 오른 68
	83: false // 아래 83
};

let viewport = {
	screen: [0, 0],
	startTile: [0, 0],
	endTile: [0, 0],
	offset: [0, 0],
	update: function (px, py) {
		this.offset[0] = Math.floor((this.screen[0] / 2) - px);
		this.offset[1] = Math.floor((this.screen[1] / 2) - py);

		let tile = [Math.floor(px / tileW), Math.floor(py / tileH)];

		this.startTile[0] = tile[0] - 1 - Math.ceil((this.screen[0] / 2) / tileW);
		this.startTile[1] = tile[1] - 1 - Math.ceil((this.screen[1] / 2) / tileH);

		if (this.startTile[0] < 0) { this.startTile[0] = 0; }
		if (this.startTile[1] < 0) { this.startTile[1] = 0; }

		this.endTile[0] = tile[0] + 1 + Math.ceil((this.screen[0] / 2) / tileW);
		this.endTile[1] = tile[1] + 1 + Math.ceil((this.screen[1] / 2) / tileH);

		if (this.endTile[0] >= mapW) { this.endTile[0] = mapW - 1; }
		if (this.endTile[1] >= mapH) { this.endTile[1] = mapH - 1; }
	}
};

let player = new Character();

function Character() {
	this.tileFrom	= [5,5];
	this.tileTo		= [5,5];
	this.timeMoved = 0;
	this.dimensions = [44, 44];
	this.position = [45, 45];

	this.delayMove = 350;

	this.direction = directions.sleep;
	this.sprites = {};
	this.sprites[directions.up]		= [{x:97,y:64,w:15,h:16}];
	this.sprites[directions.right]	= [{x:16,y:64,w:15,h:16}];
	this.sprites[directions.down]	= [{x:81,y:65,w:15,h:16}];
	this.sprites[directions.left]	= [{x:65,y:49,w:15,h:15}];

	this.sprites[directions.sleep] = [{x:112,y:49,w:15,h:15}];
}
Character.prototype.placeAt = function (x, y) {
	this.tileFrom = [x, y];
	this.tileTo = [x, y];
	this.position = [((tileW * x) + ((tileW - this.dimensions[0]) / 2)),
	((tileH * y) + ((tileH - this.dimensions[1]) / 2))];
};
Character.prototype.processMovement = function (t) {
	if (this.tileFrom[0] == this.tileTo[0] && this.tileFrom[1] == this.tileTo[1]) { return false; }

	if ((t - this.timeMoved) >= this.delayMove) {
		this.placeAt(this.tileTo[0], this.tileTo[1]);
	}
	else {
		this.position[0] = (this.tileFrom[0] * tileW) + ((tileW - this.dimensions[0]) / 2);
		this.position[1] = (this.tileFrom[1] * tileH) + ((tileH - this.dimensions[1]) / 2);

		if (this.tileTo[0] != this.tileFrom[0]) {
			let diff = (tileW / this.delayMove) * (t - this.timeMoved);
			this.position[0] += (this.tileTo[0] < this.tileFrom[0] ? 0 - diff : diff);
		}
		if (this.tileTo[1] != this.tileFrom[1]) {
			let diff = (tileH / this.delayMove) * (t - this.timeMoved);
			this.position[1] += (this.tileTo[1] < this.tileFrom[1] ? 0 - diff : diff);
		}

		this.position[0] = Math.round(this.position[0]);
		this.position[1] = Math.round(this.position[1]);
	}

	return true;
}
Character.prototype.canMoveTo = function (x, y) {
	if (x < 0 || x >= mapW || y < 0 || y >= mapH) { return false; }
	if (tileTypes[gameMap[toIndex(x, y)]].floor != floorTypes.path) { return false; }
	return true;
};
Character.prototype.canMoveUp = function () { return this.canMoveTo(this.tileFrom[0], this.tileFrom[1] - 1); };
Character.prototype.canMoveDown = function () { return this.canMoveTo(this.tileFrom[0], this.tileFrom[1] + 1); };
Character.prototype.canMoveLeft = function () { return this.canMoveTo(this.tileFrom[0] - 1, this.tileFrom[1]); };
Character.prototype.canMoveRight = function () { return this.canMoveTo(this.tileFrom[0] + 1, this.tileFrom[1]); };

Character.prototype.moveLeft = function (t) { this.tileTo[0] -= 1; this.timeMoved = t; this.direction = directions.left; };
Character.prototype.moveRight = function (t) { this.tileTo[0] += 1; this.timeMoved = t; this.direction = directions.right; };
Character.prototype.moveUp = function (t) { this.tileTo[1] -= 1; this.timeMoved = t; this.direction = directions.up; };
Character.prototype.moveDown = function (t) { this.tileTo[1] += 1; this.timeMoved = t; this.direction = directions.down; };

function toIndex(x, y) {
	return ((y * mapW) + x);
}

window.onload = function () {
	context = document.getElementById('game').getContext("2d");
	requestAnimationFrame(drawGame);
	context.font = "bold 10pt sans-serif";

	window.addEventListener("keydown", function (e) {
		if(e.keyCode>=65 && e.keyCode<=87) { keysDown[e.keyCode] = true; }
	});
	window.addEventListener("keyup", function (e) {
		if(e.keyCode>=65 && e.keyCode<=87) { keysDown[e.keyCode] = false; }
	});

	viewport.screen = [document.getElementById('game').width,
	document.getElementById('game').height];

	tileset = new Image();
	tileset.onerror = function () {
		context = null;
		alert("tile 로딩 실패");
	};
	tileset.onload = function () { tilesetLoaded = true; };
	tileset.src = tilesetURL;
};

function drawGame() {
	if (context == null) { return; }
	if (!tilesetLoaded) { requestAnimationFrame(drawGame); return; }

	let currentFrameTime = Date.now();

	if (!player.processMovement(currentFrameTime)) {
		if(keysDown[87] && player.canMoveUp())			{ player.moveUp(currentFrameTime); }
		else if(keysDown[83] && player.canMoveDown())	{ player.moveDown(currentFrameTime); }
		else if(keysDown[65] && player.canMoveLeft())	{ player.moveLeft(currentFrameTime); }
		else if(keysDown[68] && player.canMoveRight())	{ player.moveRight(currentFrameTime); }
	}

	viewport.update(player.position[0] + (player.dimensions[0] / 2),
		player.position[1] + (player.dimensions[1] / 2));

	context.fillStyle = "#000000";
	context.fillRect(0, 0, viewport.screen[0], viewport.screen[1]);

	for (let y = viewport.startTile[1]; y <= viewport.endTile[1]; ++y) {
		for (let x = viewport.startTile[0]; x <= viewport.endTile[0]; ++x) {
			let tile = tileTypes[gameMap[toIndex(x, y)]];
			context.drawImage(tileset,
				tile.sprite[0].x, tile.sprite[0].y, tile.sprite[0].w, tile.sprite[0].h,
				viewport.offset[0] + (x * tileW), viewport.offset[1] + (y * tileH),
				tileW, tileH);
		}
	}

	let sprite = player.sprites[player.direction];
	context.drawImage(tileset,
		sprite[0].x, sprite[0].y, sprite[0].w, sprite[0].h,
		viewport.offset[0] + player.position[0], viewport.offset[1] + player.position[1],
		player.dimensions[0], player.dimensions[1]);


	lastFrameTime = currentFrameTime;
	requestAnimationFrame(drawGame);
}