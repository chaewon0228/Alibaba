"use script"

// 2D rendering context 저장하는 변수
let context = null;

// 게임 지도
let gameMap = [
	9, 9, 9, 9, 9, 9, 9, 0, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 2, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
	9, 14, 9, 9, 9, 0, 12, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 12, 2, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
	9, 9, 0, 12, 12, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 12, 12, 2, 9, 9, 9, 9, 9, 9, 9,
	9, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 9, 9, 9, 9, 9, 9,
	0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 9, 9, 9, 9, 9,
	10, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 11, 9, 9, 9, 9, 9,
	10, 4, 8, 8, 8, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 11, 9, 9, 9, 9, 9,
	10, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 11, 9, 9, 9, 9, 9,
	10, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 4, 4, 4, 4, 4, 11, 9, 9, 9, 9, 9,
	10, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 4, 4, 4, 4, 11, 9, 9, 9, 9, 9,
	10, 4, 4, 4, 4, 8, 4, 4, 4, 4, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 4, 4, 4, 11, 9, 9, 9, 9, 9,
	10, 4, 4, 4, 4, 8, 4, 4, 4, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 4, 4, 11, 9, 9, 9, 9, 9,
	10, 4, 4, 4, 4, 8, 4, 4, 5, 5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 4, 4, 11, 9, 9, 9, 9, 9,
	10, 4, 4, 4, 4, 8, 4, 5, 5, 5, 5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 4, 4, 4, 11, 9, 9, 9, 9, 9,
	10, 4, 4, 4, 4, 8, 4, 5, 5, 5, 5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 4, 4, 4, 11, 9, 9, 9, 9, 9,
	10, 4, 4, 4, 4, 8, 4, 5, 5, 5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 4, 4, 4, 4, 11, 9, 9, 9, 9, 9,
	10, 4, 4, 4, 4, 8, 4, 4, 5, 5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 11, 9, 9, 9, 9, 9,
	10, 4, 4, 4, 4, 8, 4, 4, 4, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 11, 9, 9, 9, 9, 9,
	10, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 11, 9, 9, 9, 9, 9,
	10, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 11, 9, 9, 9, 9, 9,
	10, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 11, 9, 9, 9, 9, 9,
	10, 4, 4, 4, 4, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 15,
	10, 4, 4, 4, 4, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 11, 9, 9, 9, 9, 9,
	10, 4, 4, 4, 4, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 11, 9, 9, 9, 9, 9,
	10, 4, 4, 4, 4, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 11, 9, 9, 9, 9, 9,
	10, 4, 4, 4, 4, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 11, 9, 9, 9, 9, 9,
	10, 4, 4, 4, 4, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 11, 9, 9, 9, 9, 9,
	10, 4, 4, 4, 4, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 11, 9, 9, 9, 9, 9,
	10, 4, 4, 4, 4, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 11, 9, 9, 9, 9, 9,
	10, 4, 4, 4, 4, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 11, 9, 9, 9, 9, 9,
	10, 4, 4, 4, 4, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 11, 9, 9, 9, 9, 9,
	10, 4, 4, 4, 5, 5, 5, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 11, 9, 9, 9, 9, 9,
	10, 4, 4, 4, 5, 5, 5, 5, 4, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 11, 9, 9, 9, 9, 9,
	10, 4, 4, 4, 5, 5, 5, 5, 4, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 11, 9, 9, 9, 9, 9,
	10, 4, 4, 4, 4, 5, 5, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 11, 9, 9, 9, 9, 9,
	1, 4, 4, 4, 4, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 9, 9, 9, 9, 9,
	9, 1, 4, 4, 4, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 9, 9, 9, 9, 9, 9,
	9, 9, 1, 13, 13, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 13, 13, 3, 9, 9, 9, 9, 9, 9, 9,
	9, 14, 9, 9, 9, 1, 13, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 13, 3, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
	9, 9, 9, 9, 9, 9, 9, 1, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 3, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9
];

let mapTileData = new TileMap();

// 타일 크기
let tileW = 100, tileH = 100;
// 맵 크기
let mapW = 45, mapH = 40;
let getkey = false;
let currentSecond = 0, frameCount = 0, framesLastSecond = 0, lastFrameTime = 0;
let min_countDown = "", sec_countDown = "", time = 150, x;
let audio = [];

let tileEvents = {
	984: drawpath,
	1288: touchbox,
	1290: touchbox,
	1244: touchbox,
	1334: touchbox,
	987: rideboat
};

function drawpath() {
	gameMap[toIndex(40, 21)] = 8;
	gameMap[toIndex(41, 21)] = 8;
	gameMap[toIndex(42, 21)] = 8;
	gameMap[toIndex(43, 21)] = 8;
}
function touchbox() {
	// 박스 닿았을 때 처리
	console.log("box");
	getkey = true;
	loadAudio(4);
	$('#spell_modal').modal('show');

}
function rideboat() {
	console.log("boatboat!!");

	if (getkey == true) {
		// 키가 있을 때 게임 종료
		loadAudio(8);
		$(document).off("keydown");
		$(document).off("keyup");
		$('#inputName').modal('show');
		document.getElementById("input_coin").value = coin_cnt;
	}
	else{
		loadAudio(7);
		$('#noKey').modal('show');
	}
}

let lives = 3;
let coin_cnt = 0;

let tileset = null;
let tilesetURL = "../image/tile_forest_item.png";
let tilesetLoaded = false;

let objectCollision = {
	none: 0,
	solid: 1
};

let objectTypes = {
	1: {
		name: "bush",
		sprite: [{ x: 0, y: 49, w: 15, h: 14 }],
		offset: [0, 0],
		collision: objectCollision.solid,
		zIndex: 1
	},
	2: {
		name: "broken", // 깨진 이미지
		sprite: [{ x: 32, y: 32, w: 16, h: 16 }],
		offset: [0, 0],
		collision: objectCollision.none,
		zIndex: 1
	},
	3: {
		name: "stone",
		sprite: [{ x: 16, y: 49, w: 16, h: 15 }],
		offset: [0, 0],
		collision: objectCollision.solid,
		zIndex: 1
	},
	4: {
		name: "key",
		sprite: [{ x: 80, y: 81, w: 16, h: 15 }],
		offset: [0, 0],
		collision: objectCollision.solid,
		zIndex: 1
	}
};

// coin item
let coinType = {
	1: {
		name: "Coin",
		sprite: [{x: 113, y: 33, w: 16, h: 16}],
		offset: [20, 10]
	}
}
function stack(id, ctc) {
	this.type = id;
	this.ctc = ctc;
}

function MapObject(nt) {
	this.x = 0;
	this.y = 0;
	this.type = nt;
}
MapObject.prototype.placeAt = function (nx, ny) {
	if (mapTileData.map[toIndex(this.x, this.y)].object == this) {
		mapTileData.map[toIndex(this.x, this.y)].object = null;
	}

	this.x = nx;
	this.y = ny;

	mapTileData.map[toIndex(nx, ny)].object = this;
};
MapObject.prototype.getX = function () {
	return this.x;
}
MapObject.prototype.getY = function () {
	return this.y;
}

// 바닥 종류
let floorTypes = {
	solid: 0,
	path: 1,
	abstacle: 2,
	grass: 3,
	sand: 4
};

// 타일 종류
let tileTypes = {
	0: { colour: "#5bbd24", floor: floorTypes.grass, sprite: [{ x: 50, y: 16, w: 16, h: 15 }] },  // 왼위모서리
	1: { colour: "#5bbd24", floor: floorTypes.grass, sprite: [{ x: 48, y: 32, w: 16, h: 15 }] },  // 왼아모서리
	2: { colour: "#5bbd24", floor: floorTypes.grass, sprite: [{ x: 113, y: 16, w: 16, h: 15 }] }, // 오위모서리
	3: { colour: "#5bbd24", floor: floorTypes.grass, sprite: [{ x: 96, y: 17, w: 15, h: 14 }] },  // 오아모서리

	4: { colour: "#5bbd24", floor: floorTypes.grass, sprite: [{ x: 81, y: 18, w: 11, h: 16 }] },   // 잔디
	5: { colour: "#5bbd24", floor: floorTypes.sand, sprite: [{ x: 17, y: 33, w: 14, h: 14 }] },    // 모래

	6: { colour: "#286625", floor: floorTypes.abstacle, sprite: [{ x: 0, y: 48, w: 16, h: 15 }] }, // 수풀
	7: { colour: "#e8bd7a", floor: floorTypes.path, sprite: [{ x: 16, y: 48, w: 16, h: 15 }] },    // 돌

	8: { colour: "#e8bd7a", floor: floorTypes.path, sprite: [{ x: 0, y: 33, w: 15, h: 14 }] },    // 길

	9: { colour: "#0080ff", floor: floorTypes.solid, sprite: [{ x: 0, y: 96, w: 0, h: 0 }] },    // empty

	10: { colour: "#e8bd7a", floor: floorTypes.grass, sprite: [{ x: 32, y: 17, w: 15, h: 14 }] },  // 왼
	11: { colour: "#e8bd7a", floor: floorTypes.grass, sprite: [{ x: 80, y: 32, w: 15, h: 15 }] },  // 오
	12: { colour: "#e8bd7a", floor: floorTypes.grass, sprite: [{ x: 64, y: 16, w: 16, h: 15 }] },  // 위
	13: { colour: "#e8bd7a", floor: floorTypes.grass, sprite: [{ x: 64, y: 32, w: 16, h: 15 }] },  // 아

	14: { colour: "#e8bd7a", floor: floorTypes.grass, sprite: [{ x: 0, y: 17, w: 16, h: 14 }] },    // 섬
	15: { colour: "#e8bd7a", floor: floorTypes.solid, sprite: [{ x: 33, y: 33, w: 15, h: 14 }] },    // 배
	16: { colour: "#e8bd7a", floor: floorTypes.grass, sprite: [{ x: 96, y: 33, w: 15, h: 14 }] }    // 배
};

function Tile(tx, ty, tt) {
	this.x = tx;
	this.y = ty;
	this.type = tt;
	this.eventEnter = null;
	this.object = null;
	this.coinStack = null;
}

function TileMap() {
	this.map = [];
	this.w = 0;
	this.h = 0;
	this.levels = 4;
}
TileMap.prototype.MapData = function (d, w, h) {
	this.w = w;
	this.h = h;

	if (d.length != (w * h)) { return false; }

	this.map.length = 0;

	for (let y = 0; y < h; y++) {
		for (let x = 0; x < w; x++) {
			this.map.push(new Tile(x, y, d[((y * w) + x)]));
		}
	}

	return true;
};

// 방향
let directions = {
	up: 0,
	right: 1,
	down: 2,
	left: 3,
	sleep: 4
};
// 방향키 값
let keysDown = {
	65: false, // 왼 65            65 68 83 87
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
	this.tileFrom = [5, 5];
	this.tileTo = [5, 5];
	this.timeMoved = 0;
	this.dimensions = [94, 94];
	this.position = [95, 95];

	this.delayMove = {};
	this.delayMove[floorTypes.path] = 180;
	this.delayMove[floorTypes.grass] = 350;
	this.delayMove[floorTypes.sand] = 1100;

	this.direction = directions.sleep;
	this.sprites = {};
	this.sprites[directions.up] = [{ x: 97, y: 65, w: 15, h: 16 }];
	this.sprites[directions.right] = [{ x: 16, y: 64, w: 16, h: 16 }];
	this.sprites[directions.down] = [{ x: 81, y: 65, w: 15, h: 15 }];
	this.sprites[directions.left] = [{ x: 48, y: 49, w: 16, h: 15 }];

	this.sprites[directions.sleep] = [{ x: 112, y: 49, w: 15, h: 15 }];

}
Character.prototype.placeAt = function (x, y) {
	this.tileFrom = [x, y];
	this.tileTo = [x, y];
	this.position = [((tileW * x) + ((tileW - this.dimensions[0]) / 2)),
	((tileH * y) + ((tileH - this.dimensions[1]) / 2))];
};
Character.prototype.processMovement = function (t) {
	if (this.tileFrom[0] == this.tileTo[0] && this.tileFrom[1] == this.tileTo[1]) { return false; }

	let moveSpeed = this.delayMove[tileTypes[gameMap[toIndex(this.tileFrom[0], this.tileFrom[1])]].floor];


	if ((t - this.timeMoved) >= moveSpeed) {
		this.placeAt(this.tileTo[0], this.tileTo[1]);

		if (typeof tileEvents[toIndex(this.tileTo[0], this.tileTo[1])] != 'undefined') {
			tileEvents[toIndex(this.tileTo[0], this.tileTo[1])](this);
		}

		let tileFloor = tileTypes[gameMap[toIndex(this.tileFrom[0], this.tileFrom[1])]].floor;


	}
	else {
		this.position[0] = (this.tileFrom[0] * tileW) + ((tileW - this.dimensions[0]) / 2);
		this.position[1] = (this.tileFrom[1] * tileH) + ((tileH - this.dimensions[1]) / 2);

		if (this.tileTo[0] != this.tileFrom[0]) {
			let diff = (tileW / moveSpeed) * (t - this.timeMoved);
			this.position[0] += (this.tileTo[0] < this.tileFrom[0] ? 0 - diff : diff);
		}
		if (this.tileTo[1] != this.tileFrom[1]) {
			let diff = (tileH / moveSpeed) * (t - this.timeMoved);
			this.position[1] += (this.tileTo[1] < this.tileFrom[1] ? 0 - diff : diff);
		}

		this.position[0] = Math.round(this.position[0]);
		this.position[1] = Math.round(this.position[1]);
	}

	return true;
}
Character.prototype.canMoveTo = function (x, y) {
	if (x < 0 || x >= mapW || y < 0 || y >= mapH) { return false; }
	if (typeof this.delayMove[tileTypes[gameMap[toIndex(x, y)]].floor] == 'undefined') { return false; }
	if (mapTileData.map[toIndex(x, y)].object != null) {
		let o = mapTileData.map[toIndex(x, y)].object;
		if (objectTypes[o.type].collision == objectCollision.solid) {
			return false;
		}
	}

	return true;
};
Character.prototype.canMoveUp = function () { return this.canMoveTo(this.tileFrom[0], this.tileFrom[1] - 1); };
Character.prototype.canMoveDown = function () { return this.canMoveTo(this.tileFrom[0], this.tileFrom[1] + 1); };
Character.prototype.canMoveLeft = function () { return this.canMoveTo(this.tileFrom[0] - 1, this.tileFrom[1]); };
Character.prototype.canMoveRight = function () { return this.canMoveTo(this.tileFrom[0] + 1, this.tileFrom[1]); };
Character.prototype.canMoveDirection = function (d) {
	switch (d) {
		case directions.up:
			return this.canMoveUp();
		case directions.down:
			return this.canMoveDown();
		case directions.left:
			return this.canMoveLeft();
		default:
			return this.canMoveRight();
	}
};

Character.prototype.moveLeft = function (t) {
	this.tileTo[0] -= 1; this.timeMoved = t; this.direction = directions.left;
	if (this.sprites[directions.left][0].x == 64) this.sprites[directions.left][0].x = 81;
	else this.sprites[directions.left][0].x = 64;
	if (weapon.size != weaponSize[1]) {
		weapon.position[0] = viewport.offset[0] + player.position[0] + 20;
		weapon.position[1] = viewport.offset[1] + player.position[1] + 10;
	}
};
Character.prototype.moveRight = function (t) {
	this.tileTo[0] += 1; this.timeMoved = t; this.direction = directions.right;
	if (this.sprites[directions.right][0].x == 16) this.sprites[directions.right][0].x = 0;
	else this.sprites[directions.right][0].x = 16;
	if (weapon.size != weaponSize[1]) {
		weapon.position[0] = viewport.offset[0] + player.position[0] - 5;
		weapon.position[1] = viewport.offset[1] + player.position[1] + 10;
	}
};
Character.prototype.moveUp = function (t) {
	this.tileTo[1] -= 1; this.timeMoved = t; this.direction = directions.up;
	if (this.sprites[directions.up][0].x == 97) this.sprites[directions.up][0].x = 48;
	else this.sprites[directions.up][0].x = 97;
	if (weapon.size != weaponSize[1]) {
		weapon.position[0] = viewport.offset[0] + player.position[0] + 10;
		weapon.position[1] = viewport.offset[1] + player.position[1] + 10;
	}
};
Character.prototype.moveDown = function (t) {
	this.tileTo[1] += 1; this.timeMoved = t; this.direction = directions.down;
	if (this.sprites[directions.down][0].x == 81) this.sprites[directions.down][0].x = 32;
	else this.sprites[directions.down][0].x = 81;
	if (weapon.size != weaponSize[1]) {
		weapon.position[0] = viewport.offset[0] + player.position[0] + 10;
		weapon.position[1] = viewport.offset[1] + player.position[1] - 10;
	}
};
Character.prototype.moveDirection = function (d, t) {
	switch (d) {
		case directions.up:
			return this.moveUp(t);
		case directions.down:
			return this.moveDown(t);
		case directions.left:
			return this.moveLeft(t);
		default:
			return this.moveRight(t);
	}
};

// coin 줍기
Character.prototype.get = function () {
	// 캐릭터가 서 있는 타일의 placedCoin에 대한 참조
	let is = mapTileData.map[toIndex(this.tileFrom[0], this.tileFrom[1])].coinStack;

	if(is != null) {
		// loadAudio(3)
		mapTileData.map[toIndex(this.tileFrom[0], this.tileFrom[1])].coinStack = null;
		coin_cnt++;
		console.log('코인 획득✨');
		loadAudio(6);
	}
	return true;
}

function toIndex(x, y) {
	return ((y * mapW) + x);
}

function getFrame(sprite, duration, time, animated) {
	if (!animated) { return sprite[0]; }
	time = time % duration;

	for (x in sprite) {
		if (sprite[x].end >= time) { return sprite[x]; }
	}
}

let bat = new Image();
bat.src = '../image/butterfly.png';
let clickPosition = [];
let weaponId;

class Monster {
	constructor() {
		this.isFly = 0;
		this.delayMove = {};
		this.delayMove[floorTypes.path] = 180;
		this.delayMove[floorTypes.grass] = 350;
		this.delayMove[floorTypes.sand] = 1100;
		this.position = [Math.floor(Math.random() * screen.width), Math.floor(Math.random() * screen.height)];
		this.direction = directions.up;
		this.distance = Math.floor(Math.random() * 150) + 30;
		this.move = function () {
			if (this.canMoveX() == false) {
				this.direction = directions.up;
			}
			if (this.canMoveY() == false) {
				this.direction = directions.right;
			}
			// if(typeof this.delayMove[tileTypes[gameMap[toIndex(this.position[0]/50,this.position[1])/50]].floor]=='undefined') { this.distance = Math.floor(Math.random() * 150) + 30; }
			if (this.distance >= 0) {
				switch (this.direction) {
					case directions.up:
						this.position[1] -= 3;
						break;
					case directions.down:
						this.position[1] += 3;
						break;
					case directions.left:
						this.position[0] -= 3;
						break;
					case directions.right:
						this.position[0] += 3;
				}
				this.distance--;
				context.drawImage(bat, 0, this.isFly * 46, 50, 46, this.position[0], this.position[1], tileW, tileH - 4);
			}
			else {
				this.distance = Math.floor(Math.random() * 150) + 30;
				let d = Math.floor(Math.random() * 4);
				switch (d) {
					case 0: this.direction = directions.up; break;
					case 1: this.direction = directions.down; break;
					case 2: this.direction = directions.left; break;
					case 3: this.direction = directions.right; break;
				}
				context.drawImage(bat, 0, this.isFly * 50, 50, 50, this.position[0], this.position[1], tileW + 5, tileH + 5);
			}
			//clearTimeout(this.flying);
			this.flying = setTimeout(() => {
				if (this.isFly == 0) this.isFly = 1;
				else this.isFly = 0;
			}, 1000);

		};
		this.canMoveX = function () {
			if ((this.position[0] < 0 && this.direction == directions.left) || (this.position[0] > screen.width && this.direction == directions.right)) return false;
			return true;
		}
		this.canMoveY = function () {
			if ((this.position[1] < 0 && this.direction == directions.up) || (this.position[1] > screen.height && this.direction == directions.down)) return false;
			return true;
		}
	}
}

let monsters = [];
let monsterCnt = 20;
let isMonsterShown = 0;

setTimeout(() => {
	for (let i = 0; i < monsterCnt; i++) {
		monsters[i] = new Monster();
	}
	isMonsterShown = 1;
}, 1500);

let isWeaponShown;
let coll;

window.onload = function () {
	context = document.getElementById('game').getContext("2d");
	document.getElementById('game').width = window.innerWidth;
	document.getElementById('game').height =  window.innerHeight;
	console.log(innerWidth + " " + innerHeight);

	// full screen인지 확인
	$(window).resize(function () {
        if ((screen.availHeight || screen.height - 30) <= window.innerHeight) {
            console.log('Fullscreen');
        }
        else {
            console.log('Not Fullscreen');
			alert('🚨 전체화면[F11]로 실행해주세요 🚨');
        }
    });

	requestAnimationFrame(drawGame);
	context.font = "bold 10pt sans-serif";

	let body = document.querySelector("body");
	
	for (let i = 0; i < 10; i++) {
		let au = new Audio();
		audio.push(au);
	}
	audio[9].src = '../sound/background.mp3';
	audio[1].src = '../sound/bush.wav';
	audio[0].src = '../sound/attack.ogg';
	audio[4].src = '../sound/item.wav';
	audio[3].src = '../sound/break_rock.wav';
	audio[2].src = '../sound/laugh.ogg';
	audio[5].src = '../sound/gameover.wav';
	audio[6].src = '../sound/get_coin.ogg';
	audio[7].src = '../sound/error.mp3';
	audio[8].src = '../sound/success.mp3'

	window.addEventListener("keydown", function (e) {
		if (e.keyCode >= 65 && e.keyCode <= 87) { keysDown[e.keyCode] = true; }
		if (isMusinPlay == 0) {
			loadAudio(9);
			isMusinPlay = 1;
		}
	});
	window.addEventListener("keyup", function (e) {
		if (e.keyCode >= 65 && e.keyCode <= 87) { keysDown[e.keyCode] = false; }
	});

	body.addEventListener("click", function (e) {
		// for (let i = 0; i < weaponId; i++) {
		// 	clearTimeout(i);
		// }
		clickPosition[0] = e.screenX;
		clickPosition[1] = e.screenY;
		weapon.size = weaponSize[1];
		weapon.position[0] = clickPosition[0] - tileW / 2;
		weapon.position[1] = clickPosition[1] - tileW / 2;
		weaponId = setTimeout(() => {
			weapon.size = weaponSize[0];
			if (player.direction == directions.up) {
				weapon.position[0] = viewport.offset[0] + player.position[0] + 10;
				weapon.position[1] = viewport.offset[1] + player.position[1] + 10;
			}
			else if (player.direction == directions.left) {
				weapon.position[0] = viewport.offset[0] + player.position[0] + 20;
				weapon.position[1] = viewport.offset[1] + player.position[1] + 10;
			}
			else if (player.direction == directions.right) {
				weapon.position[0] = viewport.offset[0] + player.position[0] - 5;
				weapon.position[1] = viewport.offset[1] + player.position[1] + 10;
			}
			else if (player.direction == directions.down) {
				weapon.position[0] = viewport.offset[0] + player.position[0] + 10;
				weapon.position[1] = viewport.offset[1] + player.position[1] - 10;
			}
			clickPosition[0] = 0;
			clickPosition[1] = 0;
			target = null;
		}, 500);
	});

	viewport.screen = [window.innerWidth, window.innerHeight];

	tileset = new Image();
	tileset.onload = function () { tilesetLoaded = true; };
	tileset.src = tilesetURL;

	for (x in tileTypes) {
		tileTypes[x]['animated'] = tileTypes[x].sprite.length > 1 ? true : false;

		if (tileTypes[x].animated) {
			let t = 0;

			for (s in tileTypes[x].sprite) {
				tileTypes[x].sprite[s]['start'] = t;
				t += tileTypes[x].sprite[s].d;
				tileTypes[x].sprite[s]['end'] = t;
			}

			tileTypes[x]['spriteDuration'] = t;
		}
	}
	mapTileData.MapData(gameMap, mapW, mapH);

	let arr = [
		[13, 9], [12, 9], [12, 10], [12, 11], [11, 10],
		[8, 13], [7, 15], [6, 15], [7, 16], [14, 15],
		[14, 16], [13, 17], [4, 31], [4, 34], [3, 32],
		[8, 33], [7, 34], [34, 8], [34, 9], [33, 9],
		[35, 10], [37, 13], [35, 14], [30, 15], [31, 16],
		[30, 25], [31, 26], [31, 27], [30, 27], [29, 27],
		[28, 27], [30, 28], [30, 29], [29, 29], [28, 29],
		[27, 30], [31, 30], [31, 31], [32, 30], [32, 31]
	];
	coll = new Array(200);


	for (let i = 0; i < coll.length; i++) {
		if (i <= 185) {
			coll[i] = new MapObject(1);
		}
		else {
			coll[i] = new MapObject(3);
		}
	}

	for (let i = 0; i < coll.length; i++) {
		if (i < 40) {
			coll[i].placeAt(arr[i][0], arr[i][1]);
		}
		else if (i < 55) {
			let rand1 = Math.floor(Math.random() * 4) + 17;
			let rand2 = Math.floor(Math.random() * 4) + 6;

			//console.log(rand1 + " " + rand2);
			coll[i].placeAt(rand1, rand2);
		}
		else if (i < 70) {
			let rand1 = Math.floor(Math.random() * 5) + 25;
			let rand2 = Math.floor(Math.random() * 5) + 19;

			//console.log(rand1 + " " + rand2);
			coll[i].placeAt(rand1, rand2);
		}
		else if (i < 90) {
			let rand1 = Math.floor(Math.random() * 5) + 8;
			let rand2 = Math.floor(Math.random() * 5) + 22;

			//console.log(rand1 + " " + rand2);
			coll[i].placeAt(rand1, rand2);
		}
		else if (i < 160) {
			let rand1 = Math.floor(Math.random() * 9) + 17;
			let rand2 = Math.floor(Math.random() * 9) + 26;

			//console.log(rand1 + " " + rand2);
			coll[i].placeAt(rand1, rand2);
		}
		else {
			let free1 = Math.floor(Math.random() * 34) + 5;
			let free2 = Math.floor(Math.random() * 35) + 4;

			//console.log(free1 + " " + free2);
			coll[i].placeAt(free1, free2);
		}
	}

	let keybox = new MapObject(4);
	keybox.placeAt(29, 28);

	// coin 생성 및 위치
	let c;
	let rand1, rand2;
	for(let i = 0; i < 50; i++) {
		c = new placedCoin(1, 1);

		rand1 = Math.floor((Math.random() * ((mapW - 10) - 3)) + 3);
		rand2 = Math.floor((Math.random() * ((mapH) - 8)) + 8);

		c.placeAt(rand1, rand2);
	}
	timerCount();
};

// coin 배치 
function placedCoin(id, ctc) {
	this.type = id;
	this.ctc = ctc; // coinType 항목 수
	this.x = 0;
	this.y = 0;
}
placedCoin.prototype.placeAt = function (nx, ny) {
	if (mapTileData.map[toIndex(this.x, this.y)].coinStack == this) {
		mapTileData.map[toIndex(this.x, this.y)].coinStack = null;
	}
	this.x = nx;
	this.y = ny;

	mapTileData.map[toIndex(nx, ny)].coinStack = this;
}

let isAttackable = 1;
let attackId;
let target = null;
let isMusinPlay = 0;
let shadow = 200;

let coinset = null;
let coinsetURL = "../image/coin.png";
let coinsetLoaded = false;

let width = window.innerWidth;

function drawGame() {
	if (context == null) { return; }
	if (!tilesetLoaded) { requestAnimationFrame(drawGame); return; }

	let currentFrameTime = Date.now();
	let timeElapsed = currentFrameTime - lastFrameTime;

	let sec = Math.floor(Date.now() / 1000);
	if (sec != currentSecond) {
		currentSecond = sec;
		framesLastSecond = frameCount;
		frameCount = 1;
	}
	else { frameCount++; }

	if (!player.processMovement(currentFrameTime)) {
		if (keysDown[87] && player.canMoveUp()) { player.moveUp(currentFrameTime); }
		else if (keysDown[83] && player.canMoveDown()) { player.moveDown(currentFrameTime); }
		else if (keysDown[65] && player.canMoveLeft()) { player.moveLeft(currentFrameTime); }
		else if (keysDown[68] && player.canMoveRight()) { player.moveRight(currentFrameTime); }
		player.get();
	}

	viewport.update(player.position[0] + (player.dimensions[0] / 2), player.position[1] + (player.dimensions[1] / 2));

	context.fillStyle = "#0080ff";
	context.fillRect(0, 0, viewport.screen[0], viewport.screen[1]);

	for (let z = 0; z < mapTileData.levels; z++) {
		for (let y = viewport.startTile[1]; y <= viewport.endTile[1]; ++y) {
			for (let x = viewport.startTile[0]; x <= viewport.endTile[0]; ++x) {
				if (z == 0) {
					let tile = tileTypes[gameMap[toIndex(x, y)]];
					let sprite = getFrame(tile.sprite, tile.spriteDuration,
						currentFrameTime, tile.animated);
					context.drawImage(tileset,
						sprite.x, sprite.y, sprite.w, sprite.h,
						viewport.offset[0] + (x * tileW), viewport.offset[1] + (y * tileH), tileW, tileH);

				}
				else if(z == 1){
					let isCoin = mapTileData.map[toIndex(x, y)].coinStack;

					if(isCoin != null){
						let sprite = coinType[isCoin.type].sprite;

						// coin 그리기
						context.drawImage(tileset, sprite[0].x, sprite[0].y,
							sprite[0].w, sprite[0].h,
							viewport.offset[0] + (x*tileW) + coinType[isCoin.type].offset[0],
							viewport.offset[1] + (y*tileH) + coinType[isCoin.type].offset[1],
							sprite[0].w + 50, sprite[0].h + 54);
							
					}
				}

				let o = mapTileData.map[toIndex(x, y)].object;
				if (o != null && objectTypes[o.type].zIndex == z) {
					let ot = objectTypes[o.type];

					context.drawImage(tileset,
						ot.sprite[0].x, ot.sprite[0].y,
						ot.sprite[0].w, ot.sprite[0].h,
						viewport.offset[0] + (x * tileW) + ot.offset[0],
						viewport.offset[1] + (y * tileH) + ot.offset[1],
						tileW - 10, tileH - 10);
				}


			}
		}
		if (z == 1) {
			let sprite = player.sprites[player.direction];
			context.drawImage(tileset,
				sprite[0].x, sprite[0].y,
				sprite[0].w, sprite[0].h,
				viewport.offset[0] + player.position[0],
				viewport.offset[1] + player.position[1],
				player.dimensions[0], player.dimensions[1]);
		}

	}

	let sprite = player.sprites[player.direction];
	context.drawImage(tileset,
		sprite[0].x, sprite[0].y, sprite[0].w, sprite[0].h,
		viewport.offset[0] + player.position[0], viewport.offset[1] + player.position[1],
		player.dimensions[0], player.dimensions[1]);

	if (target == null) {
		for (let i = 0; i < coll.length; i++) {
			if (clickPosition[0] >= viewport.offset[0] + coll[i].getX() * tileW && clickPosition[0] <= viewport.offset[0] + coll[i].getX() * tileW + tileW && clickPosition[1] >= viewport.offset[1] + coll[i].getY() * tileH && clickPosition[1] <= viewport.offset[1] + coll[i].getY() * tileH + tileH) {
				console.log("object");
				loadAudio(coll[i].type);
				target = i;
				mapTileData.map[toIndex(coll[i].x, coll[i].y)] = 0;
				gameMap[toIndex(coll[i].x, coll[i].y)] = 16;
				break;
			}
		}
	}

	if (isMonsterShown == 1) {
		for (let i = 0; i < monsters.length; i++) {
			monsters[i].move();
			// clearTimeout(monsters[i].flying);
			if (clickPosition[0] >= monsters[i].position[0] && clickPosition[0] <= monsters[i].position[0] + tileW && clickPosition[1] >= monsters[i].position[1] && clickPosition[1] <= monsters[i].position[1] + tileH) {
				loadAudio(0);
				console.log("kill");
				monsters[i] = null;
				monsters[i] = new Monster();
			}


		}
		if (isAttackable == 1) {
			for (let i = 0; i < monsters.length; i++) {
				if (Math.sqrt(Math.pow((monsters[i].position[0] + tileW / 2) - (viewport.offset[0] + player.position[0] + 8), 2) + Math.pow((monsters[i].position[1] + tileH / 2) - (viewport.offset[1] + player.position[1] + 8), 2)) < Math.sqrt(2000)) {
					isAttackable = 0;
					lives--;
					loadAudio(2);
					console.log(lives);
					// for (let i = 0; i < attackId; i++) {
					// 	clearTimeout(i);
					// }
					attackId = setTimeout(() => { isAttackable = 1; }, 2500);
					break;
				}

			}
		}


	}

	/////////////////////

	// draw darkness shading
	if (getkey == true) shadow *= 1.5;
	for (let i = 0; i < viewport.screen[0]; i += 12) {
		for (let j = 0; j < viewport.screen[1]; j += 12) {
			let opacity = Math.min((Math.sqrt(Math.pow((i) - (viewport.offset[0] + player.position[0] + 8), 2) + Math.pow((j) - (viewport.offset[1] + player.position[1] + 8), 2)) - (tileW * 2 + 50)) / shadow, 1);
			context.fillStyle = "rgba(0,0,0," + opacity + ")";
			context.fillRect(i, j, 12, 12);
		}
	}
	context.drawImage(tileset, 0, 5 * 16 + 1, 16, 16, weapon.position[0], weapon.position[1], weapon.size, weapon.size);
	/*
	if(isWeaponShown == 1) {
		// context.drawImage(tileset, 0, 5*16+1, 16, 16, clickPosition[0]-tileW/2, clickPosition[1]-tileH/2, 70, 70);
		context.drawImage(tileset, 0, 5*16+1, 16, 16, weapon.position[0], weapon.position[1], weapon.size, weapon.size);
		clearTimeout(weaponId);
		
		weaponId = setTimeout( () => {isWeaponShown = 0; }, 300);
	}
	*/


	// printLives
	for (let i = 0; i < 3; i++) {
		if (i + 1 <= lives) {
			// 채워진 하트
			context.drawImage(tileset, 3 * 16, 5 * 16 + 1, 16 - 1, 16, tileW * i + 20, 20, tileW, tileH - 1);
		}
		else {
			// 비워진 하트
			context.drawImage(tileset, 1 * 16, 5 * 16 + 1, 16, 16, tileW * i + 20, 20, tileW, tileH);
		}
	}
	if (getkey == true) text();
	if (lives <= 0) { gameover(); return; }

	// coin 그리기
	

	coinset = new Image();
	coinset.onload = function () {
		coinsetLoaded = true;
	}
	coinset.src = coinsetURL;
	context.drawImage(coinset, viewport.screen[0] - 120, 36, 62, 67);

	context.textAlign = "right";
	context.font = "50px malgun gothic"
	context.fillStyle = "#ffffff";
	context.fillText(coin_cnt + " X ", viewport.screen[0] - 130, 89);

	context.textAlign = "left";
	context.font = "bold 80px malgun gothic"
	context.fillStyle = "#ffffff";
	context.fillText(min_countDown + " : " + sec_countDown, viewport.screen[0] / 2 - 115, 115);
	
	requestAnimationFrame(drawGame);
}

function timerCount(){

	x = setInterval(function () {
        min_countDown = parseInt(time / 60);
        sec_countDown = time % 60;
        
        time--;
		timerId = x;

        if (time < 0) {
            clearInterval(x);
            lives = 0;
        }
    }, 1000);
}

// gameover
function gameover() {
	loadAudio(5);
	let gameoverText = document.getElementById("gameover");
	let gameoverButton = document.getElementById("container");
	gameoverText.style.display = "block";
	gameoverButton.style.display = "flex";

	context.fillStyle = "rgba(0,0,0,0.8)";
	context.fillRect(0, 0, viewport.screen[0], viewport.screen[1]);
	return;
}

let weaponSize = [40, 75];
let weapon = {
	position: [0, 0],
	size: weaponSize[0]
}
function loadAudio(id) {
	audio[id].load();
	playAudio(id);
}

function playAudio(id) {
	audio[id].volume = 0.2;
	audio[id].loop = false;
	if (id == 9) audio.loop = true;
	audio[id].play();
}
function text() {
	context.font = '55px arcade';
	context.fillStyle = "black";
	context.fillText('OBTAINED A KEY!   go to the boat.', 50, screen.height - 30);
}

function replay() {
	location.href = "../html/game_forest.html";
}
function back() {
	location.href = "../html/map.html";
}
