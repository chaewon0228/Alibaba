"use script"

// 2D rendering context 저장하는 변수
let context = null;

// 게임 지도
let gameMap = [
    9, 9, 9, 9, 9, 9, 9, 0, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 2, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 
	9, 14, 9, 9, 9, 0, 12, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 12, 2, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
	9 ,9 ,0 ,12 ,12 ,4 ,4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,12 ,12, 2, 9, 9, 9, 9, 9, 9, 9,
	9 ,0 ,4 ,4 ,4 ,4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 2, 9, 9, 9, 9, 9, 9,
	0, 4 ,4 ,4 ,4 , 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 4, 2, 9, 9, 9, 9, 9,
	10 ,4 ,4 ,4 ,4 ,4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 4, 11, 9, 9, 9, 9, 9,
	10 ,4 ,8 ,8 ,8 ,8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 4, 11, 9, 9, 9, 9, 9, 
	10 ,4 ,4 ,4 ,4 ,8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 4, 11, 9, 9, 9, 9, 9,
	10 ,4 ,4 ,4 ,4 ,8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 4 ,4 ,4, 4, 4, 11, 9, 9, 9, 9, 9, 
	10 ,4 ,4 ,4 ,4 ,8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5 ,4 ,4, 4, 4, 11, 9, 9, 9, 9, 9,
	10 ,4 ,4 ,4 ,4 ,8, 4, 4, 4, 4, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5 ,5 ,4, 4, 4, 11, 9, 9, 9, 9, 9,
	10 ,4 ,4 ,4 ,4 ,8, 4, 4, 4, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5 ,5 ,5, 4, 4, 11, 9, 9, 9, 9, 9, 
	10 ,4 ,4 ,4 ,4 ,8, 4, 4, 5, 5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5 ,5 ,5, 4, 4, 11, 9, 9, 9, 9, 9, 
	10 ,4 ,4 ,4 ,4 ,8, 4, 5, 5, 5, 5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5 ,5 ,4, 4, 4, 11, 9, 9, 9, 9, 9,
	10 ,4 ,4 ,4 ,4 ,8, 4, 5, 5, 5, 5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5 ,5 ,4, 4, 4, 11, 9, 9, 9, 9, 9, 
	10 ,4 ,4 ,4 ,4 ,8, 4, 5, 5, 5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5 ,4 ,4, 4, 4, 11, 9, 9, 9, 9, 9,
	10 ,4 ,4 ,4 ,4 ,8, 4, 4, 5, 5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 4, 11, 9, 9, 9, 9, 9, 
	10 ,4 ,4 ,4 ,4 ,8, 4, 4, 4, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 4, 11, 9, 9, 9, 9, 9, 
	10 ,4 ,4 ,4 ,4 ,8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 4, 11, 9, 9, 9, 9, 9, 
	10 ,4 ,4 ,4 ,4 ,8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 4, 11, 9, 9, 9, 9, 9, 
	10 ,4 ,4 ,4 ,4 ,8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 4, 11, 9, 9, 9, 9, 9, 
	10 ,4 ,4 ,4 ,4 ,8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8 ,8 ,8, 8, 8, 8, 9, 9, 9, 9, 15,
	10 ,4 ,4 ,4 ,4 ,4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 4, 11, 9, 9, 9, 9, 9, 
	10 ,4 ,4 ,4 ,4 ,4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 4, 11, 9, 9, 9, 9, 9, 
	10 ,4 ,4 ,4 ,4 ,4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 4, 11, 9, 9, 9, 9, 9, 
	10 ,4 ,4 ,4 ,4 ,4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 4, 11, 9, 9, 9, 9, 9, 
	10 ,4 ,4 ,4 ,4 ,4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 4, 11, 9, 9, 9, 9, 9, 
	10 ,4 ,4 ,4 ,4 ,4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 4, 11, 9, 9, 9, 9, 9, 
	10 ,4 ,4 ,4 ,4 ,4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 4, 11, 9, 9, 9, 9, 9, 
	10 ,4 ,4 ,4 ,4 ,4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 4, 11, 9, 9, 9, 9, 9, 
	10 ,4 ,4 ,4 ,4 ,4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 4, 11, 9, 9, 9, 9, 9,
	10 ,4 ,4 ,4 ,5 ,5, 5, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 4, 11, 9, 9, 9, 9, 9,
	10 ,4 ,4 ,4 ,5 ,5, 5, 5, 4, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 4, 11, 9, 9, 9, 9, 9, 
	10 ,4 ,4 ,4 ,5 ,5, 5, 5, 4, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 4, 11, 9, 9, 9, 9, 9, 
	10 ,4 ,4 ,4 ,4 ,5, 5, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 4, 11, 9, 9, 9, 9, 9,
	1 ,4 ,4 ,4 ,4 ,4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 4, 3, 9, 9, 9, 9, 9, 
	9 ,1 ,4 ,4 ,4 ,4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,4 ,4, 4, 3, 9, 9, 9, 9, 9, 9, 
	9 ,9 ,1 ,13 ,13 ,4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ,13 ,13, 3, 9, 9, 9, 9, 9, 9, 9, 
	9, 14, 9, 9, 9, 1, 13, 4, 4, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 13, 3, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
	9, 9, 9, 9, 9, 9, 9, 1, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 3, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9
];

// 타일 크기
let tileW = 50, tileH = 50;
// 맵 크기
let mapW = 45, mapH = 40;
let currentSecond = 0, frameCount = 0, framesLastSecond = 0, lastFrameTime = 0;

let tileset = null;
let tilesetURL = "tile_forest.png";
let tilesetLoaded = false;


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
	0: { colour:"#5bbd24", floor:floorTypes.grass, sprite:[{x:50,y:16,w:16,h:15}]},  // 왼위모서리
	1: { colour:"#5bbd24", floor:floorTypes.grass, sprite:[{x:48,y:32,w:16,h:15}]},  // 왼아모서리
	2: { colour:"#5bbd24", floor:floorTypes.grass, sprite:[{x:113,y:16,w:16,h:15}]}, // 오위모서리
	3: { colour:"#5bbd24", floor:floorTypes.grass, sprite:[{x:96,y:17,w:15,h:15}]},  // 오아모서리

	4: { colour:"#5bbd24", floor:floorTypes.grass, sprite:[{x:81,y:18,w:11,h:16}]},   // 잔디
	5: { colour:"#5bbd24", floor:floorTypes.sand, sprite:[{x:17,y:33,w:14,h:14}]},    // 모래

	6: { colour:"#286625", floor:floorTypes.abstacle, sprite:[{x:0,y:48,w:16,h:15}]}, // 수풀
	7: { colour:"#e8bd7a", floor:floorTypes.path, sprite:[{x:16,y:48,w:16,h:15}]},    // 돌
	
	8: { colour:"#e8bd7a", floor:floorTypes.path, sprite:[{x:0,y:33,w:15,h:14}]	},    // 길

	9: { colour:"#0080ff", floor:floorTypes.solid, sprite:[{x:0,y:96,w:0,h:0}]	},    // empty

	10: { colour:"#e8bd7a", floor:floorTypes.grass, sprite:[{x:32,y:17,w:15,h:14}]},  // 왼
	11: { colour:"#e8bd7a", floor:floorTypes.grass, sprite:[{x:80,y:32,w:15,h:15}]},  // 오
	12: { colour:"#e8bd7a", floor:floorTypes.grass, sprite:[{x:64,y:16,w:16,h:15}]},  // 위
	13: { colour:"#e8bd7a", floor:floorTypes.grass, sprite:[{x:64,y:32,w:16,h:15}]},  // 아

	14: { colour:"#e8bd7a", floor:floorTypes.grass, sprite:[{x:0,y:17,w:16,h:14}]},    // 섬
	15: { colour:"#e8bd7a", floor:floorTypes.solid, sprite:[{x:33,y:33,w:16,h:14}]}    // 배
};

// 방향
let directions = {
	up: 0,
	right: 1,
	down: 2,
	left: 3
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
	this.delayMove[floorTypes.grass]= 350;
	this.delayMove[floorTypes.sand]= 1100;

	this.direction	= directions.up;
	this.sprites = {};
	this.sprites[directions.up]		= [{x:96,y:64,w:16,h:16}];
	this.sprites[directions.right]	= [{x:16,y:64,w:16,h:16}];
	this.sprites[directions.down]	= [{x:80,y:64,w:16,h:16}];
	this.sprites[directions.left]	= [{x:48,y:48,w:16,h:16}];
	
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

	context.fillStyle = "#0080ff";
	context.fillRect(0, 0, viewport.screen[0], viewport.screen[1]);

	for(let y = viewport.startTile[1]; y <= viewport.endTile[1]; ++y){
		for(let x = viewport.startTile[0]; x <= viewport.endTile[0]; ++x){
			let tile = tileTypes[gameMap[toIndex(x,y)]];
			let sprite = getFrame(tile.sprite, tile.spriteDuration, currentFrameTime, tile.animated);
			context.drawImage(tileset,
				sprite.x, sprite.y, sprite.w, sprite.h,
				viewport.offset[0] + (x*tileW), viewport.offset[1] + (y*tileH), tileW, tileH);
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