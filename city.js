"use script"

// 2D rendering context 저장하는 변수
let context = null;

// 게임 지도
let gameMap = [
    8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,  
	8, 0, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,11, 11, 11, 11, 11,11, 11, 11, 11, 11,11, 11, 11, 11, 11,11, 11, 11, 11, 11, 2, 8, 8, 8, 8,  
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

// 타일 크기
let tileW = 50, tileH = 50;
// 맵 크기
let mapW = 37, mapH = 34;
// 프레임 속도
let currentSecond = 0, frameCount = 0, framesLastSecond = 0, lastFrameTime = 0;

let tileEvents = {
	476: drawpath,
	479: rideboat
};

function drawpath(){
	gameMap[toIndex(33, 12)] = 5;
	gameMap[toIndex(34, 12)] = 5;
	gameMap[toIndex(35, 12)] = 5;
}
function rideboat(){
	// 배 닿았을 때 처리
	console.log("ride boat!");

}

let tileset = null;
let tilesetURL = "tile_city.png";
let tilesetLoaded = false;

let objectCollision = {
	none: 0,
	solid: 1
};
let objectTypes = {
	1: {
		name: "con",
		sprite: [{x:16,y:49,w:16,h:15}],
		offset: [0,0],
		collision : objectCollision.solid,
		zIndex : 1
	},
	2: {
		name: "key",
		sprite: [{x:80,y:81,w:16,h:15}],
		offset: [0,0],
		collision : objectCollision.solid,
		zIndex : 1
	}
};

function MapObject(nt){
	this.x = 0;
	this.y = 0;
	this.type = nt;
}
MapObject.prototype.placeAt = function(nx, ny){
	if(mapTileData.map[toIndex(this.x, this.y)].object==this){
		mapTileData.map[toIndex(this.x, this.y)].object = null;
	}
	
	this.x = nx;
	this.y = ny;
	
	mapTileData.map[toIndex(nx, ny)].object = this;
};

// 바닥 종류
let floorTypes = {
	solid: 0,
	path: 1,
	abstacle: 2, //막는 블록
	roadD: 5,
	roadR: 7,
};

// 타일 종류
let tileTypes = {
	0: { colour:"#5bbd24", floor:floorTypes.path, sprite:[{x:48,y:16,w:16,h:16}]},  // 왼위모서리
	1: { colour:"#5bbd24", floor:floorTypes.path, sprite:[{x:0,y:16,w:16,h:16}]},  // 왼아모서리
	2: { colour:"#5bbd24", floor:floorTypes.path, sprite:[{x:32,y:16,w:15,h:16}]}, // 오위모서리
	3: { colour:"#5bbd24", floor:floorTypes.path, sprite:[{x:16,y:16,w:15,h:16}]},  // 오아모서리

	4: { colour:"#5bbd24", floor:floorTypes.path, sprite:[{x:81,y:19,w:14,h:12}]},   // 아스팔트
	5: { colour:"#5bbd24", floor:floorTypes.path, sprite:[{x:96,y:17,w:15,h:14}]},    // 아스팔트 꽃

	6: { colour:"#5bbd24", floor:floorTypes.roadR, sprite:[{x:17,y:32,w:16,h:15}]},    // 횡단보도 세로
	7: { colour:"#286625", floor:floorTypes.roadD, sprite:[{x:64,y:32,w:15,h:15}]}, // 횡단보도 가로
	
	8: { colour:"#0080ff", floor:floorTypes.solid, sprite:[{x:32,y:32,w:0,h:0}]	},    // empty

	9: { colour:"#e8bd7a", floor:floorTypes.path, sprite:[{x:32,y:33,w:16,h:13}]},  // 왼
	10: { colour:"#e8bd7a", floor:floorTypes.path, sprite:[{x:48,y:32,w:15,h:15}]},  // 오
	11: { colour:"#e8bd7a", floor:floorTypes.path, sprite:[{x:64,y:16,w:15,h:16}]},  // 위
	12: { colour:"#e8bd7a", floor:floorTypes.path, sprite:[{x:0,y:32,w:15,h:16}]},    // 아

	13: { colour:"#e8bd7a", floor:floorTypes.solid, sprite:[{x:81,y:33,w:15,h:15}]}    // 배
};

function Tile(tx, ty, tt){
	this.x = tx;
	this.y = ty;
	this.type = tt;
	this.eventEnter	= null;
	this.object = null;
}

function TileMap(){
	this.map = [];
	this.w = 0;
	this.h = 0;
	this.levels	= 2;
}
TileMap.prototype.buildMapFromData = function(d, w, h){
	this.w = w;
	this.h = h;
	
	if(d.length!=(w*h)) { return false; }
	
	this.map.length	= 0;
	
	for(let y = 0; y < h; y++){
		for(let x = 0; x < w; x++){
			this.map.push( new Tile(x, y, d[((y*w)+x)]) );
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
	37: false,
	38: false,
	39: false,
	40: false
};

let viewport = {
	screen: [0,0],
	startTile: [0,0],
	endTile: [0,0],
	offset: [0,0],
	update: function(px, py) {
		this.offset[0] = Math.floor((this.screen[0]/2) - px);
		this.offset[1] = Math.floor((this.screen[1]/2) - py);

		let tile = [ Math.floor(px/tileW), Math.floor(py/tileH) ];
        

		this.startTile[0] = tile[0] - 1 - Math.ceil((this.screen[0]/2) / tileW);
		this.startTile[1] = tile[1] - 1 - Math.ceil((this.screen[1]/2) / tileH);

		if(this.startTile[0] < 0) { this.startTile[0] = 0; }
		if(this.startTile[1] < 0) { this.startTile[1] = 0; }

		this.endTile[0] = tile[0] + 1 + Math.ceil((this.screen[0]/2) / tileW);
		this.endTile[1] = tile[1] + 1 + Math.ceil((this.screen[1]/2) / tileH);

		if(this.endTile[0] >= mapW) { this.endTile[0] = mapW-1; }
		if(this.endTile[1] >= mapH) { this.endTile[1] = mapH-1; }
	}
};
// Character의 인스턴스 저장
let player = new Character();

function Character(){
	// 캐릭터가 현재 이동하고 있는 타일 좌표
	this.tileFrom	= [5,5];
	this.tileTo		= [5,5];
	//
	
	this.timeMoved	= 0; // 이동 시작 시간(밀리초)
	this.dimensions	= [44,44]; // 캐릭터 치수(픽셀 단위) 저장
	this.position	= [45,45]; // 캔버스에서 캐릭터 실제? 위치

	this.delayMove	= {};
	this.delayMove[floorTypes.path]	= 350;
	this.delayMove[floorTypes.roadD] = 150;
	this.delayMove[floorTypes.roadR] = 150;

	this.direction	= directions.sleep;
	this.sprites = {};
	this.sprites[directions.up]		= [{x:96,y:64,w:16,h:16}];
	this.sprites[directions.right]	= [{x:16,y:64,w:16,h:16}];
	this.sprites[directions.down]	= [{x:80,y:64,w:16,h:16}];
	this.sprites[directions.left]	= [{x:48,y:48,w:16,h:16}];
	
	this.sprites[directions.sleep] = [{x:112,y:49,w:15,h:15}];
}

// 지정한 타일에 직접 배치(이동)
Character.prototype.placeAt = function(x, y){
	this.tileFrom	= [x,y];
	this.tileTo		= [x,y];
	
	//( ([타일 너비] * [대상 x좌표]) + ( ([타일 너비] - [문자 너비]) / 2 )
	// , ( " 높이 ... )
	this.position	= [((tileW*x)+((tileW-this.dimensions[0])/2)),
		((tileH*y)+((tileH-this.dimensions[1])/2))];
};
Character.prototype.processMovement = function(t){
	// tileFrom(현재 타일)
	// 캐릭터가 움직이면 실제 위치를 찾음
	if(this.tileFrom[0]==this.tileTo[0] && this.tileFrom[1]==this.tileTo[1]) { return false; }

	let moveSpeed = this.delayMove[tileTypes[gameMap[toIndex(this.tileFrom[0],this.tileFrom[1])]].floor];

	// 현재 이동을 시작한 이후로 소요된 시간이 캐릭터가 타일 1개를 이동하는 데 걸리는 시간과 같거나 더 긴지 확인
	// => 캐릭터 위치를 대상 타일로 설정
	if((t-this.timeMoved)>=moveSpeed){
		this.placeAt(this.tileTo[0], this.tileTo[1]);

		let tileFloor = tileTypes[gameMap[toIndex(this.tileFrom[0], this.tileFrom[1])]].floor;

		if(tileFloor==floorTypes.roadD && this.canMoveDown()) { this.moveDown(t); }
		else if(tileFloor==floorTypes.roadR && this.canMoveRight()) { this.moveRight(t); }

		if(typeof tileEvents[toIndex(this.tileTo[0], this.tileTo[1])] != 'undefined'){
			tileEvents[toIndex(this.tileTo[0], this.tileTo[1])](this);
		}

		//let tileFloor = tileTypes[gameMap[toIndex(this.tileFrom[0], this.tileFrom[1])]].floor;

	}
	// 캐릭터가 이동하는 타일의 위치 계산
	else{
		this.position[0] = (this.tileFrom[0] * tileW) + ((tileW-this.dimensions[0])/2);
		this.position[1] = (this.tileFrom[1] * tileH) + ((tileH-this.dimensions[1])/2);

		if(this.tileTo[0] != this.tileFrom[0]){
			let diff = (tileW / moveSpeed) * (t-this.timeMoved);
			this.position[0]+= (this.tileTo[0]<this.tileFrom[0] ? 0 - diff : diff);
		}
		if(this.tileTo[1] != this.tileFrom[1]){
			let diff = (tileH / moveSpeed) * (t-this.timeMoved);
			this.position[1]+= (this.tileTo[1]<this.tileFrom[1] ? 0 - diff : diff);
		}

		this.position[0] = Math.round(this.position[0]);
		this.position[1] = Math.round(this.position[1]);
	}

	return true;
}
Character.prototype.canMoveTo = function(x, y){
	if(x < 0 || x >= mapW || y < 0 || y >= mapH) { return false; }
	if(typeof this.delayMove[tileTypes[gameMap[toIndex(x,y)]].floor]=='undefined') { return false; }
	if(mapTileData.map[toIndex(x,y)].object!=null){
		let o = mapTileData.map[toIndex(x,y)].object;
		if(objectTypes[o.type].collision==objectCollision.solid){
			return false;
		}
	}
	
	return true;
};
Character.prototype.canMoveUp = function() { return this.canMoveTo(this.tileFrom[0], this.tileFrom[1]-1); };
Character.prototype.canMoveDown = function() { return this.canMoveTo(this.tileFrom[0], this.tileFrom[1]+1); };
Character.prototype.canMoveLeft = function() { return this.canMoveTo(this.tileFrom[0]-1, this.tileFrom[1]); };
Character.prototype.canMoveRight = function() { return this.canMoveTo(this.tileFrom[0]+1, this.tileFrom[1]); };
Character.prototype.canMoveDirection = function(d) {
	switch(d){
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

Character.prototype.moveLeft = function(t) { this.tileTo[0]-=1; this.timeMoved = t; this.direction = directions.left; };
Character.prototype.moveRight = function(t) { this.tileTo[0]+=1; this.timeMoved = t; this.direction = directions.right; };
Character.prototype.moveUp = function(t) { this.tileTo[1]-=1; this.timeMoved = t; this.direction = directions.up; };
Character.prototype.moveDown = function(t) { this.tileTo[1]+=1; this.timeMoved = t; this.direction = directions.down; };
Character.prototype.moveDirection = function(d, t) {
	switch(d){
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

function toIndex(x, y){
	return((y * mapW) + x);
}

function getFrame(sprite, duration, time, animated){
	if(!animated) { return sprite[0]; }
	time = time % duration;

	for(x in sprite){
		if(sprite[x].end>=time) { return sprite[x]; }
	}
}

// 페이지 로드가 완료되면 실행할 함수
//  -canvas에 대한 그리기 컨텍스트를 context 변수에 할당 / 글꼴
window.onload = function(){
	context = document.getElementById('game').getContext("2d");
	requestAnimationFrame(drawGame);
	context.font = "bold 10pt sans-serif";

	window.addEventListener("keydown", function(e) {
		if(e.keyCode>=37 && e.keyCode<=40) { keysDown[e.keyCode] = true; }
	});
	window.addEventListener("keyup", function(e) {
		if(e.keyCode>=37 && e.keyCode<=40) { keysDown[e.keyCode] = false; }
	});

	viewport.screen = [document.getElementById('game').width, document.getElementById('game').height];

	tileset = new Image();
	tileset.onload = function() { tilesetLoaded = true; };
	tileset.src = tilesetURL;

	for(x in tileTypes){
		tileTypes[x]['animated'] = tileTypes[x].sprite.length > 1 ? true : false;

		if(tileTypes[x].animated){
			let t = 0;
			
			for(s in tileTypes[x].sprite){
				tileTypes[x].sprite[s]['start'] = t;
				t+= tileTypes[x].sprite[s].d;
				tileTypes[x].sprite[s]['end'] = t;
			}

			tileTypes[x]['spriteDuration'] = t;
		}
	}
	mapTileData.buildMapFromData(gameMap, mapW, mapH);

	let arr = [
		[4, 4], [5, 4], [6, 4], [4, 5], [4, 6], 
		[5, 5], [5, 6], [6, 5], [6, 6], [4, 8],
		[5, 8], [3, 10], [4, 10], [3, 11], [4, 11],
		[8, 8], [8, 9], [8, 10], [8, 11], [3, 3], 
		[6, 30], [11, 14], [12, 14], [12, 15], [12, 16],
		[12, 17], [12, 18], [12, 19], [12, 20], [12, 21],
		[12, 22], [12, 23], [12, 24], [12, 25], [12, 26],
		[12, 27], [12, 28], [12, 29], [12, 30], [13, 30],
		[14, 30], [15, 30], [16, 30],  [17, 30], [18, 30]
	];
	let coll = new Array(200);
	
	let j=3;
	let z=14;
	let r = 0;

	for(let i=0; i<coll.length; i++){
		coll[i] = new MapObject(1);
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
	}
	
	let keybox = new MapObject(2); 
	keybox.placeAt(21, 22);
};

// 지도 그리기 & 프레임 속도(느려지면 재귀 호출)
function drawGame(){
	// context 있는 지 확인 ..없으면 종료
	if(context==null) { return; }
	if(!tilesetLoaded) { requestAnimationFrame(drawGame); return; }

	let currentFrameTime = Date.now();
	let timeElapsed = currentFrameTime - lastFrameTime;

	// 프레임 카운트
	let sec = Math.floor(Date.now()/1000);
	// sec가 마지막 프레임과 동일한 경우 프레임 수 추가
	// else: framesLastSecond를 현재 프레임 카운트로 할당
	if(sec!=currentSecond){
		currentSecond = sec;
		framesLastSecond = frameCount;
		frameCount = 1;
	}
	
	else { frameCount++; }

	if(!player.processMovement(currentFrameTime)){
		if(keysDown[38] && player.canMoveUp())			{ player.moveUp(currentFrameTime); }
		else if(keysDown[40] && player.canMoveDown())	{ player.moveDown(currentFrameTime); }
		else if(keysDown[37] && player.canMoveLeft())	{ player.moveLeft(currentFrameTime); }
		else if(keysDown[39] && player.canMoveRight())	{ player.moveRight(currentFrameTime); }
	}

	viewport.update(player.position[0] + (player.dimensions[0]/2), player.position[1] + (player.dimensions[1]/2));

	// 배경색
	context.fillStyle = "#0080ff";
	// 
	context.fillRect(0, 0, viewport.screen[0], viewport.screen[1]);

	for(let z = 0; z< mapTileData.levels; z++){
		for(let y = viewport.startTile[1]; y <= viewport.endTile[1]; ++y){
			for(let x = viewport.startTile[0]; x <= viewport.endTile[0]; ++x){
				if(z==0){
					let tile = tileTypes[gameMap[toIndex(x,y)]];
					let sprite = getFrame(tile.sprite, tile.spriteDuration,
						currentFrameTime, tile.animated);
					context.drawImage(tileset,
						sprite.x, sprite.y, sprite.w, sprite.h,
						viewport.offset[0] + (x*tileW), viewport.offset[1] + (y*tileH), tileW, tileH);
				
				}
				let o = mapTileData.map[toIndex(x,y)].object;
				if(o!=null && objectTypes[o.type].zIndex==z){
					let ot = objectTypes[o.type];
					
					context.drawImage(tileset,
						ot.sprite[0].x, ot.sprite[0].y,
						ot.sprite[0].w, ot.sprite[0].h,
						viewport.offset[0] + (x*tileW) + ot.offset[0],
						viewport.offset[1] + (y*tileH) + ot.offset[1],
						50, 50);
				}
				
				
			}
		}
		if(z==1){
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
		
	requestAnimationFrame(drawGame);
}