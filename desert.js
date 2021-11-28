"use script"

// 2D rendering context 저장하는 변수
let context = null;

// 게임 지도
let gameMap = [
    9, 9, 9, 9, 9, 9, 9, 0, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 2, 9, 9, 9, 9, 9, 9, 9, 
	9, 14, 9, 9, 9, 0, 12, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 12, 2, 9, 9, 9, 9, 9,
	9 ,9 ,0 ,12 ,12 ,4 ,4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,12 ,12, 2, 9, 9,
	9 ,0 ,4 ,4 ,4 ,4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 2, 9, 
	0, 4 ,4 ,4 ,4 , 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 4, 2,
	10 ,4 ,4 ,4 ,4 ,4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 4, 11,
	10 ,4 ,4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 4, 11,
	10 ,4 ,4 ,4 ,4 ,4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 4, 11, 
	10 ,4 ,4 ,4 ,4 ,4, 4, 4, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 4, 4 ,4 ,4, 4, 4, 11, 
	10 ,4 ,4 ,4 ,4 ,4, 5, 5, 8, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 8, 5, 5, 4 ,4 ,4, 4, 4, 11,
	10 ,4 ,4 ,4 ,4 ,5, 5, 8, 8, 8, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 8, 8, 8, 8, 5, 4 ,4, 4, 4, 11,
	10 ,4 ,4 ,4 ,5 ,5, 8, 8, 8, 8, 8, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 8, 8 ,8 ,8, 8, 8, 5, 4, 4, 4, 11,
	10 ,4 ,4 ,4 ,5 ,5, 8, 8, 8, 8, 8, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 8, 8 ,8 ,8, 8, 8 ,8 ,8, 5, 4, 4, 11, 
	10 ,4 ,4 ,4 ,4 ,5, 5, 5, 8, 8, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5 ,5 ,5 ,8 ,8 ,8, 8, 8 ,5, 4, 4, 11, 
	10 ,4 ,4 ,4 ,4 ,4, 4, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 8, 8 ,8 ,8, 8, 8 ,8 ,8, 8 ,5, 4, 4, 11,
	10 ,4 ,4 ,4 ,4 ,4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 8, 8, 8 ,8 ,8, 8, 8 ,5 ,5, 4, 4, 11, 
	10 ,4 ,4 ,4 ,4 ,4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 8, 8 ,8 ,8, 8, 5 ,5 ,4, 4, 4, 11, 
	10 ,4 ,4 ,4 ,4 ,4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 8, 8, 8, 5, 5 ,4 ,4, 4, 4, 11, 
	10 ,4 ,4 ,4 ,4 ,4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 4 ,4 ,4, 4, 4, 11,
	10 ,4 ,4 ,4 ,4 ,4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 4, 4 ,4 ,4, 4, 4, 11,
	10 ,4 ,4 ,4 ,4 ,4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 4, 11, 
	10 ,4 ,4 ,4 ,4 ,4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 11, 
	10 ,4 ,4 ,4 ,4 ,4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 4, 11,
	10 ,4 ,4 ,4 ,4 ,4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 4, 11,  
	10 ,4 ,4 ,4 ,4 ,4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 4, 11,  
	10 ,4 ,4 ,4 ,4 ,4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 4, 11,  
	10 ,4 ,4 ,4 ,4 ,4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 4, 11, 
	10 ,4 ,4 ,4 ,4 ,4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 4, 11, 
	10 ,4 ,4 ,4 ,4 ,4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 4, 11, 
	10 ,4 ,4 ,4 ,4 ,5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 4, 11, 
	10 ,4 ,4 ,5 ,5 ,5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 4, 11, 
	10 ,4 ,5 ,5 ,8 ,8, 8, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 4, 11, 
	10 ,4 ,5 ,8 ,8 ,8, 8, 8, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 4, 11, 
	10 ,4 ,4 ,5,8 ,8, 8, 8, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 4, 11, 
	10 ,4 ,4 ,5 ,5 ,8, 8, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 4, 11,
	1 ,4 ,4 ,4 ,5 ,5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 4, 3, 
	9 ,1 ,4 ,4 ,4 ,4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 3, 9, 
	9 ,9 ,1 ,13 ,13 ,4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,13 ,13, 3, 9, 9, 
	9, 14, 9, 9, 9, 1, 13, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 13, 3, 9, 9, 9, 9, 9, 
	9, 9, 9, 9, 9, 9, 9, 1, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 3, 9, 9, 9, 9, 9, 9, 9,
];

let mapTileData = new TileMap();

// 타일 크기
let tileW = 50, tileH = 50;
// 맵 크기
let mapW = 40, mapH = 40;
let getkey = false;
let currentSecond = 0, frameCount = 0, framesLastSecond = 0, lastFrameTime = 0;

let tileEvents = {
	550 : touchbox,
	1351 : touchcave
};

function touchbox(){
	// 박스 닿았을 때 처리
	console.log("box");
	getkey = true;

}
function touchcave(){
	console.log("cave");

	if(getkey == true){
		// 키가 있을 때 게임 종료
	}
}

let tileset = null, caveset = null, speedset = null;
let tilesetURL = "tile_desert.png";
let cavesetURL = "cave.png";
//let speedsetURL = "cave.png";
let tilesetLoaded = false;

let objectCollision = {
	none: 0,
	solid: 1
};
let objectTypes = {
	1: {
		name: "bush",
		sprite: [{x:0,y:49,w:15,h:14}],
		offset: [0,0],
		collision : objectCollision.solid,
		zIndex : 1
	},
	2: {
		name: "broken", // 깨진 이미지
		sprite: [{x:32,y:32,w:16,h:16}],
		offset: [0,0],
		collision : objectCollision.none,
		zIndex : 1
	},
	3: {
		name: "stone",
		sprite: [{x:16,y:49,w:16,h:15}],
		offset: [0,0],
		collision : objectCollision.solid,
		zIndex : 1
	},
	4: {
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
	abstacle: 2, 
	grass: 3,
	sand: 4
};

// 타일 종류
let tileTypes = {
	0: { colour:"#5bbd24", floor:floorTypes.grass, sprite:[{x:49,y:17,w:16,h:14}]},  // 왼위모서리
	1: { colour:"#5bbd24", floor:floorTypes.grass, sprite:[{x:112,y:17,w:16,h:14}]},  // 왼아모서리
	2: { colour:"#5bbd24", floor:floorTypes.grass, sprite:[{x:96,y:16,w:14,h:16}]}, // 오위모서리
	3: { colour:"#5bbd24", floor:floorTypes.grass, sprite:[{x:97,y:32,w:16,h:15}]},  // 오아모서리

	4: { colour:"#5bbd24", floor:floorTypes.grass, sprite:[{x:81,y:18,w:11,h:16}]},   // 모래
	5: { colour:"#5bbd24", floor:floorTypes.sand, sprite:[{x:17,y:33,w:14,h:14}]},    // 진한 모래

	6: { colour:"#286625", floor:floorTypes.abstacle, sprite:[{x:0,y:48,w:16,h:15}]}, // 수풀
	7: { colour:"#e8bd7a", floor:floorTypes.path, sprite:[{x:16,y:48,w:16,h:15}]},    // 돌
	
	8: { colour:"#e8bd7a", floor:floorTypes.abstacle, sprite:[{x:50,y:34,w:13,h:11}]}, // 물

	9: { colour:"#0080ff", floor:floorTypes.solid, sprite:[{x:80,y:0,w:0,h:0}]	},    // empty

	10: { colour:"#e8bd7a", floor:floorTypes.grass, sprite:[{x:32,y:17,w:15,h:14}]},  // 왼
	11: { colour:"#e8bd7a", floor:floorTypes.grass, sprite:[{x:80,y:32,w:15,h:15}]},  // 오
	12: { colour:"#e8bd7a", floor:floorTypes.grass, sprite:[{x:64,y:16,w:16,h:15}]},  // 위
	13: { colour:"#e8bd7a", floor:floorTypes.grass, sprite:[{x:65,y:32,w:14,h:16}]},  // 아

	14: { colour:"#e8bd7a", floor:floorTypes.grass, sprite:[{x:0,y:17,w:16,h:14}]},    // 섬

	15: { colour:"#e8bd7a", floor:floorTypes.solid, sprite:[{x:32,y:33,w:16,h:14}]}    // 배
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
	this.levels	= 4;
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
// 방향키 값
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

let player = new Character();

function Character(){
	this.tileFrom	= [5,5];
	this.tileTo		= [5,5];
	this.timeMoved	= 0;
	this.dimensions	= [44,44];
	this.position	= [45,45];

	this.delayMove	= {};
	this.delayMove[floorTypes.path]	= 180;
	this.delayMove[floorTypes.grass]= 150;
	this.delayMove[floorTypes.sand]= 1100;

	this.direction	= directions.sleep;
	this.sprites = {};
	this.sprites[directions.up]		= [{x:97,y:64,w:15,h:16}];
	this.sprites[directions.right]	= [{x:16,y:64,w:15,h:16}];
	this.sprites[directions.down]	= [{x:81,y:65,w:15,h:15}];
	this.sprites[directions.left]	= [{x:48,y:49,w:16,h:15}];

	this.sprites[directions.sleep] = [{x:112,y:49,w:15,h:15}];
	
}
Character.prototype.placeAt = function(x, y){
	this.tileFrom	= [x,y];
	this.tileTo		= [x,y];
	this.position	= [((tileW*x)+((tileW-this.dimensions[0])/2)),
		((tileH*y)+((tileH-this.dimensions[1])/2))];
};
Character.prototype.processMovement = function(t){
	if(this.tileFrom[0]==this.tileTo[0] && this.tileFrom[1]==this.tileTo[1]) { return false; }

	let moveSpeed = this.delayMove[tileTypes[gameMap[toIndex(this.tileFrom[0],this.tileFrom[1])]].floor];


	if((t-this.timeMoved)>=moveSpeed){
		this.placeAt(this.tileTo[0], this.tileTo[1]);

		if(typeof tileEvents[toIndex(this.tileTo[0], this.tileTo[1])] != 'undefined'){
			tileEvents[toIndex(this.tileTo[0], this.tileTo[1])](this);
		}

		let tileFloor = tileTypes[gameMap[toIndex(this.tileFrom[0], this.tileFrom[1])]].floor;

	}
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

	caveset = new Image();
	caveset.src = cavesetURL;
	
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
				[7, 8], [10, 9], [11, 9], [11, 8], [12, 7],
				[6, 14], [5, 15], [38, 11], [37, 11], [37, 12],
			    [3, 29] , [4, 11], [6, 4], [3, 30], [2, 6],
				[36, 12], [35, 14], [37, 17], [38, 18], [45, 16],
				[2, 29], [7, 36], [7, 37], [8, 37], [8, 30], [31, 32]
			];
	let coll = new Array(160);

	for(let i = 0; i < coll.length; i++){
		for(let z = 0; z < 1; z++){
			if(i <= 140){
				coll[i] = new MapObject(1);	
			}
			else{
				coll[i] = new MapObject(3);
			}

			if(i <= 25){
				coll[i].placeAt(arr[i][z], arr[i][z+1]);
			}
			else if(i <= 80){
				let rand1 = Math.floor(Math.random()*12 ) + 18;
				let rand2 = Math.floor(Math.random()*12 ) + 6;

				//console.log(rand1 + " " + rand2);
				coll[i].placeAt(rand1, rand2);
			}
			else{
				let free1 = Math.floor(Math.random()*34 ) + 5;
				let free2 = Math.floor(Math.random()*35 ) + 4;

				//console.log(free1 + " " + free2);
				coll[i].placeAt(free1, free2);
			}
		}
	}

	let keybox = new MapObject(4); 
	keybox.placeAt(31, 13);

};

function drawGame(){
	if(context==null) { return; }
	if(!tilesetLoaded) { requestAnimationFrame(drawGame); return; }

	let currentFrameTime = Date.now();
	let timeElapsed = currentFrameTime - lastFrameTime;

	let sec = Math.floor(Date.now()/1000);
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

	context.fillStyle = "#ac612b";
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
			context.drawImage(caveset, 0, 0, 450, 450, viewport.offset[0] + 1500, viewport.offset[1] + 1500, 180, 180);
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