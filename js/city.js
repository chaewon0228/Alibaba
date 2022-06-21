"use script"

// 이 js파일에 주석을 달았습니다. 
// 설명이 포함되어 있습니다.

// 2D rendering context 저장하는 변수
let context = null;

// 게임 지도
let gameMap = [
	8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
	8, 0, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 2, 8, 8, 8, 8,
	8, 9, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 10, 8, 8, 8, 8,
	8, 9, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 10, 8, 8, 8, 8,
	8, 9, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 10, 8, 8, 8, 8,
	8, 9, 4, 4, 4, 4, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 10, 8, 8, 8, 8,
	8, 9, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 10, 8, 8, 8, 8,
	8, 9, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 5, 4, 4, 10, 8, 8, 8, 8,
	8, 9, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 10, 8, 8, 8, 8,
	8, 9, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 10, 8, 8, 8, 8,
	8, 9, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 10, 8, 8, 8, 8,
	8, 9, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 10, 8, 8, 8, 8,
	8, 9, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 10, 8, 8, 8, 13,
	8, 9, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 10, 8, 8, 8, 8,
	8, 9, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 10, 8, 8, 8, 8,
	8, 9, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 10, 8, 8, 8, 8,
	8, 9, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 10, 8, 8, 8, 8,
	8, 9, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 10, 8, 8, 8, 8,
	8, 9, 4, 4, 5, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 10, 8, 8, 8, 8,
	8, 9, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 4, 4, 10, 8, 8, 8, 8,
	8, 9, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 10, 8, 8, 8, 8,
	8, 9, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 10, 8, 8, 8, 8,
	8, 9, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 10, 8, 8, 8, 8,
	8, 9, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 10, 8, 8, 8, 8,
	8, 9, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 10, 8, 8, 8, 8,
	8, 9, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 4, 4, 4, 4, 4, 4, 4, 4, 10, 8, 8, 8, 8,
	8, 9, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 10, 8, 8, 8, 8,
	8, 9, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 10, 8, 8, 8, 8,
	8, 9, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 10, 8, 8, 8, 8,
	8, 9, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 10, 8, 8, 8, 8,
	8, 9, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 10, 8, 8, 8, 8,
	8, 9, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 10, 8, 8, 8, 8,
	8, 1, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 3, 8, 8, 8, 8,
	8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8

];

let mapTileData = new TileMap();
let audio = [];
let source;

let getkey = false;
// 타일 크기
let tileW = 100, tileH = 100;
// 맵 크기
let mapW = 37, mapH = 34;
// 프레임 속도
let currentSecond = 0, frameCount = 0, framesLastSecond = 0, lastFrameTime = 0;
let min_countDown = "", sec_countDown = "", time = 150, x;
let time_bar = 200;

let tileEvents = {
	476: drawpath,
	479: rideboat,
	872: touchbox,
	834: touchbox,
	836: touchbox,
	798: touchbox
};

function touchbox() {
	console.log("boxbox!");
	getkey = true;
	loadAudio(4);
	$('#spell_modal').modal('show');
	
}
function drawpath() {
	gameMap[toIndex(33, 12)] = 5;
	gameMap[toIndex(34, 12)] = 5;
	gameMap[toIndex(35, 12)] = 5;
}
function rideboat() {
	// 배 닿았을 때 처리
	console.log("ride boat!");
	if (getkey == true) {
		loadAudio(11);
		$(document).off("keydown");
		$(document).off("keyup");
		$('#inputName').modal('show');
		document.getElementById("input_coin").value = coin_cnt;
		//location.href = "../html/end_city.html";
	}
	else {
		loadAudio(10);
		$('#noKey').modal('show');
	}
}

let lives = 3;
let coin_cnt = 0;

let tileset = null;
let tilesetURL = "../image/tile_city_item.png";
let tilesetLoaded = false;

// 통과할 수 없는 solid 
let objectCollision = {
	none: 0,
	solid: 1
};
let objectTypes = {
	1: {
		name: "con",
		sprite: [{ x: 16, y: 49, w: 16, h: 15 }],
		offset: [0, 0],
		collision: objectCollision.solid,
		zIndex: 1
	},
	2: {
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
		sprite: [{x: 97, y: 32, w: 16, h: 16}],
		offset: [20, 10]
	}
}
function stack(id, ctc) {
	this.type = id;
	this.ctc = ctc;
}

//지도의 객체는 mapobject 클래스 인스턴스에 의해 추적/
function MapObject(nt) {
	this.x = 0;
	this.y = 0;
	this.type = nt;
}
// 지도에 개체를 배치해야 하는 nx, ny
MapObject.prototype.placeAt = function (nx, ny) {
	// 개체가 이미 지도 타일에 배치되어 있는 지 확인
	// 그렇다면 해당 연결을 제거
	if (mapTileData.map[toIndex(this.x, this.y)].object == this) {
		mapTileData.map[toIndex(this.x, this.y)].object = null;
	}
	// 그런 다음 이 객체의 x, y위치를 설정하고 mapTileData에서 해당 타일의
	// Tile.object 속성을 설정해 객체를 참조
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
	solid: 0, // 지나가지 못하는 블록
	path: 1, // 길
	abstacle: 2, // 막는 블록
	roadD: 5, // 가로 횡단보도
	roadR: 7, // 세로 횡단보도
};

// 타일 종류
let tileTypes = {
	0: { colour: "#5bbd24", floor: floorTypes.path, sprite: [{ x: 48, y: 16, w: 16, h: 16 }] },  // 왼위모서리
	1: { colour: "#5bbd24", floor: floorTypes.path, sprite: [{ x: 0, y: 16, w: 16, h: 16 }] },  // 왼아모서리
	2: { colour: "#5bbd24", floor: floorTypes.path, sprite: [{ x: 32, y: 16, w: 15, h: 16 }] }, // 오위모서리
	3: { colour: "#5bbd24", floor: floorTypes.path, sprite: [{ x: 16, y: 16, w: 15, h: 16 }] },  // 오아모서리

	4: { colour: "#5bbd24", floor: floorTypes.path, sprite: [{ x: 81, y: 19, w: 14, h: 12 }] },   // 아스팔트
	5: { colour: "#5bbd24", floor: floorTypes.path, sprite: [{ x: 96, y: 17, w: 15, h: 14 }] },    // 아스팔트 꽃

	6: { colour: "#5bbd24", floor: floorTypes.roadR, sprite: [{ x: 17, y: 32, w: 16, h: 15 }] },    // 횡단보도 세로
	7: { colour: "#286625", floor: floorTypes.roadD, sprite: [{ x: 64, y: 32, w: 15, h: 15 }] }, // 횡단보도 가로

	8: { colour: "#0080ff", floor: floorTypes.solid, sprite: [{ x: 32, y: 32, w: 0, h: 0 }] },    // empty

	9: { colour: "#e8bd7a", floor: floorTypes.path, sprite: [{ x: 32, y: 33, w: 16, h: 13 }] },  // 왼
	10: { colour: "#e8bd7a", floor: floorTypes.path, sprite: [{ x: 48, y: 32, w: 15, h: 15 }] },  // 오
	11: { colour: "#e8bd7a", floor: floorTypes.path, sprite: [{ x: 64, y: 16, w: 15, h: 16 }] },  // 위
	12: { colour: "#e8bd7a", floor: floorTypes.path, sprite: [{ x: 0, y: 32, w: 15, h: 16 }] },    // 아

	13: { colour: "#e8bd7a", floor: floorTypes.solid, sprite: [{ x: 81, y: 33, w: 15, h: 15 }] }    // 배
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
	// 장애물 개수만큼 for문 돌리기
	this.levels = 2;
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
// 방향키 값: false(이 키 중 어느 것도 안 눌림)
let keysDown = {
	65: false, // 왼 65
	87: false, // 위 87
	68: false, // 오른 68
	83: false // 아래 83
};

let viewport = {
	// 캔버스 너비 / 높이
	screen: [0, 0],
	// 표시되는 지도 왼쪽 상단 영역의 타일 좌표 
	startTile: [0, 0],
	// 표시되는 지도 오른쪽 하단 타일 좌표
	endTile: [0, 0],
	// 지도 타일 및 객체를 이동해야 하는 픽셀 단위로 뷰포트 객체를 작성
	offset: [0, 0],

	// 뷰포트 중심(px, py)
	// 뷰포트 객체는 저희가 볼 수 있는 영역의 중심이 되고자 하는 x와 y 위치라는
	// 두 가지 인수를 갖는 업데이트 방법을 가질 것이다.
	// 캔버스 폭 또는 높이의 절반에서 계산되는 x 및 y 오프셋을 설정
	update: function (px, py) {
		this.offset[0] = Math.floor((this.screen[0] / 2) - px);
		this.offset[1] = Math.floor((this.screen[1] / 2) - py);

		// Math.floor => 가장 가까운 정수로 내림(그릴 때 찢어지는 거 방지)
		// 이제 지정된 뷰포트 중심이 속하는 타일의 좌표를 찾습니다.
		// px값을 타일 폭으로 나눈 결과를 반올림하여 이를 수행하고 py도 동일
		// 이것을 사용해 첫번째 타일과 마지막 타일을 계산
		let tile = [Math.floor(px / tileW), Math.floor(py / tileH)];


		// 화면 폭의 절반에 들어갈 수 있는 최대 타일 수를 계산하고
		// 중앙 타일에서 그 수를 빼서 x축에서 첫번째 타일의 위치를 계산할 수 있다.
		// 타일이 화면에 완전히 표시되지 않고 부분적으로만 표시될 수 있도록 1을 뺐다.
		// y축도 동일하다
		this.startTile[0] = tile[0] - 1 - Math.ceil((this.screen[0] / 2) / tileW);
		this.startTile[1] = tile[1] - 1 - Math.ceil((this.screen[1] / 2) / tileH);

		// 그런 다음 x 및 y좌표가 0보다 작지 않은 지 확인
		// 이는 맵 경계에서 벗어나기 때문
		// 만약 존재한다면 0으로 설정(거기에 없는 것을 그리려고 하는 것이 의미x)
		if (this.startTile[0] < 0) { this.startTile[0] = 0; }
		if (this.startTile[1] < 0) { this.startTile[1] = 0; }

		// endtile은 이제 중앙 타일에 값을 추가하는 것을 제외하고 같은 방식으로 계산
		// 오른쪽 또는 아래쪽 가장자리를 넘어서 그리려고 하지 않는지 확인하기 위해
		// 좌표가 지도 폭과 높이보다 작은지 확인
		// 배열은 0부터 시작하므로 -1씩 빼줘야함. 
		// 그래서 마지막 x열은 mapW-1 행은 mapH-1임
		this.endTile[0] = tile[0] + 1 + Math.ceil((this.screen[0] / 2) / tileW);
		this.endTile[1] = tile[1] + 1 + Math.ceil((this.screen[1] / 2) / tileH);

		if (this.endTile[0] >= mapW) { this.endTile[0] = mapW - 1; }
		if (this.endTile[1] >= mapH) { this.endTile[1] = mapH - 1; }
	}
};
// Character의 인스턴스를 player에 저장
let player = new Character();

function Character() {
	// 캐릭터가 현재 이동하고 있는 타일 좌표
	this.tileFrom = [5, 5];
	this.tileTo = [5, 5];
	// "

	// 캐릭터 사이즈
	this.timeMoved = 0;       // 이동 시작 시간(밀리초)
	this.dimensions = [94, 94]; // 캐릭터 치수(픽셀 단위) 저장
	this.position = [95, 95]; // 캔버스에서 캐릭터 실제? 위치

	// 타일 속도 조절
	this.delayMove = {};
	this.delayMove[floorTypes.path] = 350;
	this.delayMove[floorTypes.roadD] = 150;
	this.delayMove[floorTypes.roadR] = 150;

	// 캐릭터의 시작 방향 (누워있는 이미지)
	this.direction = directions.sleep;

	// 캐릭터용 스프라이트
	// 각 방향에 대한 항목을 추가 (배열)
	this.sprites = {};
	this.sprites[directions.up] = [{ x: 97, y: 65, w: 15, h: 16 }];
	this.sprites[directions.right] = [{ x: 16, y: 64, w: 16, h: 16 }];
	this.sprites[directions.down] = [{ x: 81, y: 65, w: 15, h: 15 }];
	this.sprites[directions.left] = [{ x: 48, y: 49, w: 15, h: 15 }];
	// 시작 방향
	this.sprites[directions.sleep] = [{ x: 112, y: 49, w: 15, h: 15 }];
}

// 지정한 타일에 직접 배치(이동)
Character.prototype.placeAt = function (x, y) {
	this.tileFrom = [x, y];
	this.tileTo = [x, y];

	//( ([타일 너비] * [대상 x좌표]) + ( ([타일 너비] - [문자 너비]) / 2 )
	// , ( " 높이 ... )
	this.position = [((tileW * x) + ((tileW - this.dimensions[0]) / 2)),
	((tileH * y) + ((tileH - this.dimensions[1]) / 2))];
};
Character.prototype.processMovement = function (t) {
	// tileFrom(현재 타일)
	// 캐릭터가 움직이면 실제 위치를 찾음
	if (this.tileFrom[0] == this.tileTo[0] && this.tileFrom[1] == this.tileTo[1]) { return false; }

	//캐릭터가 이동하는(tileFrom)지도 타일의 floorType에 해당하는 새로운 movespeed 변수에 딜레이무브를 할당
	let moveSpeed = this.delayMove[tileTypes[gameMap[toIndex(this.tileFrom[0], this.tileFrom[1])]].floor];

	// 현재 이동을 시작한 이후로 소요된 시간이 캐릭터가 타일 1개를 이동하는 데 걸리는 시간과 같거나 더 긴지 확인
	// => 캐릭터 위치를 대상 타일로 설정
	if ((t - this.timeMoved) >= moveSpeed) {
		this.placeAt(this.tileTo[0], this.tileTo[1]);

		//캐릭터가 현재 서 있는 지도 타일의 floortype를 변수에 저장
		let tileFloor = tileTypes[gameMap[toIndex(this.tileFrom[0], this.tileFrom[1])]].floor;

		// 캐릭터가 해당 횡단보도의 방향으로 이동할 수 있는지와 
		// 횡단보도 타일에 위치에 있는 지 확인하고
		// 그렇다면 해당 방향으로 캐릭터를 이동한다.
		// requestAnimationFrame를 이용해 drawGame을 인자로 재귀호출함
		// 따라서 해당 횡단보도 타일이 끝날 때까지 캐릭터는 해당 방향으로 이동함.

		// 가로 횡단보도 -> 아래 방향으로 이동
		if (tileFloor == floorTypes.roadD && this.canMoveDown()) { this.moveDown(t); }
		// 세로 횡단보도 -> 오른쪽 방향으로 이동
		else if (tileFloor == floorTypes.roadR && this.canMoveRight()) { this.moveRight(t); }

		if (typeof tileEvents[toIndex(this.tileTo[0], this.tileTo[1])] != 'undefined') {
			tileEvents[toIndex(this.tileTo[0], this.tileTo[1])](this);
		}

		//let tileFloor = tileTypes[gameMap[toIndex(this.tileFrom[0], this.tileFrom[1])]].floor;

	}
	// 캐릭터가 이동하는 타일의 위치 계산
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
// 캐릭터가 이동하려는 타일의 x/y 위치를 가져옴
Character.prototype.canMoveTo = function (x, y) {

	// x 및 y 좌표가 지도 경계 내에 있는 지 확인
	// 없으면 캐릭터가 이동할 수 없으므로 false 반환
	if (x < 0 || x >= mapW || y < 0 || y >= mapH) { return false; }

	// 캐릭터가 대상 타일의 floorType에 대해 할당된 값이 없을 경우 false
	if (typeof this.delayMove[tileTypes[gameMap[toIndex(x, y)]].floor] == 'undefined') { return false; }

	// 오프젝트타임이 솔리드 인지 확인
	if (mapTileData.map[toIndex(x, y)].object != null) {
		let o = mapTileData.map[toIndex(x, y)].object;
		if (objectTypes[o.type].collision == objectCollision.solid) {
			return false;
		}
	}

	return true;
};

// canMoveTo 메서드를 호출해 이동하려는 방향에 따라 수정된 x 또는 y값과 함께
// 캐릭터의 현재 위치(tileFrom)을 인수로 전달하고 결과 반환
Character.prototype.canMoveUp = function () { return this.canMoveTo(this.tileFrom[0], this.tileFrom[1] - 1); };
Character.prototype.canMoveDown = function () { return this.canMoveTo(this.tileFrom[0], this.tileFrom[1] + 1); };
Character.prototype.canMoveLeft = function () { return this.canMoveTo(this.tileFrom[0] - 1, this.tileFrom[1]); };
Character.prototype.canMoveRight = function () { return this.canMoveTo(this.tileFrom[0] + 1, this.tileFrom[1]); };
Character.prototype.canMoveDirection = function (d) {
	// 방향값을 인수로 
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
// 게임시간(밀리초) 인수로 사용하고 tileTo x또는 대상 방향에 필요한 y 속성
// tileMoved 값도 전달된 게임 시간으로 업데이트
Character.prototype.moveLeft = function (t) {
	this.tileTo[0] -= 1; this.timeMoved = t; this.direction = directions.left;
	if (this.sprites[directions.left][0].x == 65) this.sprites[directions.left][0].x = 81;
	else this.sprites[directions.left][0].x = 65;
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

Character.prototype.get = function () {
	// 캐릭터가 서 있는 타일의 placedCoin에 대한 참조
	let is = mapTileData.map[toIndex(this.tileFrom[0], this.tileFrom[1])].coinStack;

	if(is != null) {
		loadAudio(3)
		mapTileData.map[toIndex(this.tileFrom[0], this.tileFrom[1])].coinStack = null;
		coin_cnt++;
		console.log('코인 획득✨');
	}
	return true;
}

// 좌표 구하는 함수
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

// 몬스터 이미지
let bat = new Image();
bat.src = '../image/fly.png';
let clickPosition = [];
let weaponId;

// 몬스터 클래스
class Monster {
	constructor() {
		this.isFly = 0;
		this.delayMove = {};
		this.delayMove[floorTypes.path] = 180;

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
				context.drawImage(bat, 30, this.isFly * 110 + 30, 60, 60, this.position[0], this.position[1], tileW + 5, tileH + 5);
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
				context.drawImage(bat, 0, this.isFly * 50, 60, 60, this.position[0], this.position[1], tileW + 5, tileH + 5);
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
}, 3000);

let isWeaponShown;
let coll;

// 페이지 로드가 완료되면 실행할 함수
// ( canvas에 대한 그리기 컨텍스트를 context 변수에 할당 / 글꼴 )
window.onload = function () {

	context = document.getElementById('game').getContext("2d");
	document.getElementById('game').width = window.innerWidth;
	document.getElementById('game').height =  window.innerHeight;
	console.log(innerWidth + " " + innerHeight);

	// full screen인지 확인
	$(window).resize(function () {
		context = document.getElementById('game').getContext("2d");
		
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

	// 사운드 처리
	let body = document.querySelector("body");
	for (let i = 0; i < 15; i++) {
		let au = new Audio();
		audio.push(au);
	}
	// 사운드 경로
	audio[9].src = '../sound/background.mp3';
	audio[1].src = '../sound/break_plastic.wav';
	audio[0].src = '../sound/attack.ogg';
	audio[4].src = '../sound/item.wav';
	audio[2].src = '../sound/laugh.ogg';
	audio[5].src = '../sound/gameover.wav';
	audio[3].src = '../sound/get_coin.ogg';
	audio[10].src = '../sound/error.mp3';
	audio[11].src = '../sound/success.mp3';
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

	// 캔버스 크기를 확인하고 뷰포트 개체의 화면 속성에 저장
	viewport.screen = [window.innerWidth, window.innerHeight];

	tileset = new Image();
	// 타일이 로드 됐는지 확인하여 실행
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

	// 장애물 배열
	// 고정되어 있는 장애물
	let arr = [
		[4, 4], [4, 5], [4, 6], [7, 6], [7, 7],
		[7, 8], [6, 4], [5, 10], [6, 6], [4, 8],
		[5, 8], [3, 10], [4, 10], [8, 8], [8, 9],
		[8, 10], [12, 3], [13, 4], [14, 5], [15, 6],
		[16, 7], [17, 8], [18, 9], [19, 10], [15, 3],
		[16, 4], [17, 5], [18, 6], [19, 7], [23, 3],
		[25, 3], [27, 3], [29, 3], [30, 4], [30, 6],
		[30, 8], [30, 10], [28, 10], [26, 10], [24, 10],
		[4, 14], [6, 30], [21, 21], [22, 22], [20, 22]
	];

	// 장애물 배열
	coll = new Array(160);

	let row = 14, col = 3;
	for (let i = 0; i < coll.length; i++) {
		// 꼬깔 생성
		coll[i] = new MapObject(1);
	}
	for (let i = 0; i < coll.length; i++) {
		if (i < 45) {
			coll[i].placeAt(arr[i][0], arr[i][1]);
		}
		else if (i < 96) {
			if (row == 31) {
				row = 14;
				col += 2;
			}
			coll[i].placeAt(col, row);
			row++;
		}
		else {
			// 랜덤으로 배치되는 장애물

			let rand1 = Math.floor(Math.random() * 19) + 11;
			let rand2 = Math.floor(Math.random() * 16) + 14;

			//console.log(rand1 + " " + rand2);
			coll[i].placeAt(rand1, rand2);
		}

	}

	/*
	let j=3;
	let z=14;
	let r = 0;
		if(i<51){
			coll[i].placeAt(j, z);
			if(z == 30){
				j += 2;
				z = 14;
			}
			z++;
		}
		else if(i<80){
			let rand1 = Math.floor(Math.random()*7 ) + 12;
			let rand2 = Math.floor(Math.random()*7 ) + 3;
			//console.log(rand1 + " " + rand2);
			coll[i].placeAt(rand1, rand2);
		}
		else if(i<90){
			let rand1 = Math.floor(Math.random()*7 ) + 23;
			let rand2 = Math.floor(Math.random()*7 ) + 3;
			//console.log(rand1 + " " + rand2);
			coll[i].placeAt(rand1, rand2);
		}
		else if(i<120){
			let rand1 = Math.floor(Math.random()*16 ) + 11;
			let rand2 = Math.floor(Math.random()*12 ) + 17;
			//console.log(rand1 + " " + rand2);
			coll[i].placeAt(rand1, rand2);
		}
		else{
			let k = 0;  
			if(r == 45){
				break;
			}
			coll[i].placeAt(arr[r][k], arr[r][k+1]);
			r++;
		}
	*/

	// 보물상자 생성 및 위치
	let keybox = new MapObject(2);
	keybox.placeAt(21, 22);

	// coin 생성 및 위치
	let c;
	let rand1, rand2;
	for(let i = 0; i < 50; i++) {
		c = new placedCoin(1, 1);
		rand1 = Math.floor((Math.random() * ((mapW - 10) - 3)) + 3);
		rand2 = Math.floor((Math.random() * ((mapH - 10) - 8)) + 8);

		if(rand2 == 12 || rand1 == 9 || rand1 == 21){
			rand1++;
			rand2 += 2;
		} 
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



// 지도 그리기 & 프레임 속도(느려지면 재귀 호출)
function drawGame() {
	// context 있는 지 확인 ..없으면 종료
	if (context == null) { return; }
	if (!tilesetLoaded) {
		requestAnimationFrame(drawGame);
		return;
	}

	let currentFrameTime = Date.now();
	let timeElapsed = currentFrameTime - lastFrameTime;

	// 프레임 카운트
	let sec = Math.floor(Date.now() / 1000);
	// sec가 마지막 프레임과 동일한 경우 프레임 수 추가
	// else: framesLastSecond를 현재 프레임 카운트로 할당
	if (sec != currentSecond) {
		currentSecond = sec;
		framesLastSecond = frameCount;
		frameCount = 1;
	}
	else {
		frameCount++;
	}

	if (!player.processMovement(currentFrameTime)) {
		if (keysDown[87] && player.canMoveUp()) { player.moveUp(currentFrameTime); }
		else if (keysDown[83] && player.canMoveDown()) { player.moveDown(currentFrameTime); }
		else if (keysDown[65] && player.canMoveLeft()) { player.moveLeft(currentFrameTime); }
		else if (keysDown[68] && player.canMoveRight()) { player.moveRight(currentFrameTime); }
		player.get();
	}

	// drawgame 함수에서는 이동이 처리되면 뷰포트를 업데이트함
	// 캐릭터가 이동한 후 호출
	// 뷰포트 중심을 x, y, (플레이어x + 플레이어 너비/2), (플레이어y + 플레이어 높이/2)
	// 플레이어 상단/왼쪽 위치와 플레이어 너비/높이의 절반으로 설정
	viewport.update(player.position[0] + (player.dimensions[0] / 2), player.position[1] + (player.dimensions[1] / 2));

	// 배경색 (바다)
	context.fillStyle = "#0080ff";
	// 그리기를 시작하기 전 0,0에서 캔버스 너비, 뷰포트 화면 속성에서 가져온 높이까지
	// 위에 색으로 캔버스를 덮어서 마지막 프레임에서 캔버스의 모든 항목을 지움
	context.fillRect(0, 0, viewport.screen[0], viewport.screen[1]);


	//drawImage(타일 이미지, 타일 스프라이트의 x, 타일 스프라이트의 y 위치, w, h, 캔버스의 타일, 뷰포트 오프셋, 타일 너비 크기, 타일 높이 크기)

	for (let z = 0; z < mapTileData.levels; z++) {
		//타일을 그리기 위한 / 0에서 지도 가장자리(mapW,mapH)까지 그리는 대신
		// startTile에서 시작하고 endTile에서 끝나야함
		for (let y = viewport.startTile[1]; y <= viewport.endTile[1]; ++y) {
			for (let x = viewport.startTile[0]; x <= viewport.endTile[0]; ++x) {
				// 바닥 타일을 그리는 코드는 변경되지 않은 상태로 유지되지만 
				// 바닥 타일이 레벨 0에서만 그려지도록
				if (z == 0) {
					// 타일타입 저장, 게임맵 배열의 현제 x,y 위치
					let tile = tileTypes[gameMap[toIndex(x, y)]];
					let sprite = getFrame(tile.sprite, tile.spriteDuration, currentFrameTime, tile.animated);

					// 타일 이미지, 타일 스프라이트의 x,y 위치, w,h,캔버스의 타일, 뷰포트 오프셋, 타일위드 ..
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
							sprite[0].w + 50, sprite[0].h + 52);
							
					}
				}

				// 현재 타일에 개체가 있는지 확인
				// 그렇다면 오브젝트타입스 항목의 zIndex가 현재 그리는 수준과 같으면
				// 이 개체에 대한 스프라이트를 그림(장애물)
				let o = mapTileData.map[toIndex(x, y)].object;
				if (o != null && objectTypes[o.type].zIndex == z) {
					let ot = objectTypes[o.type];

					// 장애물 그리기
					context.drawImage(tileset,
						ot.sprite[0].x, ot.sprite[0].y,
						ot.sprite[0].w, ot.sprite[0].h,
						viewport.offset[0] + (x * tileW) + ot.offset[0],
						viewport.offset[1] + (y * tileH) + ot.offset[1],
						tileW - 10, tileH - 10);
				}


			}
		}
		// 현재 레벨이 1이면 캐릭터를 그림
		if (z == 1) {
			// 플레이어의 방향을 고려해 플레이어 스프라이트 데이터에 대한 참조를 가져옴
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
				gameMap[toIndex(coll[i].x, coll[i].y)] = 4;
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
					// 	if(i != timerId) clearTimeout(i);
					// 	else timerId = x;
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
	if (lives <= 0) {
		gameover();
		return;
	}
	if (getkey == true) text();



	// coin 그리기


	coinset = new Image();
	coinset.onload = function () {
		coinsetLoaded = true;
	}
	coinset.src = coinsetURL;
	context.drawImage(coinset, viewport.screen[0] - 120, 36, 62, 67);

	context.textAlign = "right";
	context.font = "bold 55px malgun gothic"
	context.fillStyle = "#ffffff";
	context.fillText(coin_cnt + " X ", viewport.screen[0] - 130, 90);
	context.strokeStyle = "black";
	context.lineWidth = 0.5;
	context.strokeText(coin_cnt + " X ", viewport.screen[0] - 130, 90);

	context.textAlign = "left";
	context.font = "bold 80px malgun gothic"
	context.fillStyle = "#ffffff";
	context.fillText(min_countDown + " : " + sec_countDown, viewport.screen[0] / 2 - 115, 115);
	context.strokeStyle = "black";
	context.lineWidth = 2;
	context.strokeText(min_countDown + " : " + sec_countDown, viewport.screen[0] / 2 - 115, 115);
	
	context.fillStyle = '#ddd';
	context.fillRect(viewport.screen[0] / 2 - 108, 140, 200, 10);

	context.fillStyle = '#ffd400';
	context.strokeStyle = 'black';
	context.lineWidth = 2;
	context.strokeRect(viewport.screen[0] / 2 - 108, 140, time_bar, 10);
	context.fillRect(viewport.screen[0] / 2 - 108, 140, time_bar, 10);

	requestAnimationFrame(drawGame);
}

function timerCount(){

	x = setInterval(function () {
        min_countDown = parseInt(time / 60);
        sec_countDown = time % 60;
        
		if(sec_countDown < 10) {
			sec_countDown = "0" + sec_countDown;
		}
		// process bar
        if(time_bar > 0){
        	time_bar -= time_bar / time;
        }
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
	context.fillText('OBTAINED A KEY!   go to the boat.', 50, viewport.screen[1] - 30);
}

function replay() {
	location.href = "../html/game_city.html";
}
function back() {
	location.href = "../html/map.html";
}
