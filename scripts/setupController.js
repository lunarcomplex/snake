// setup controller
//
//
//
//

//####################################################################################################
// Initialize Main Game Values
//
//
//####################################################################################################

var screen_size = {w: 1280, h: 720};// 32 x 18
var tile_size = 20;
var delta = 0;
var then = Date.now();
var info_overlay = true;
var single_second_counter = 0;
var ten_second_counter = 0;
var scene = "game"; // game, menu

//####################################################################################################
// Initialize Main Game Objects
//
//
//####################################################################################################

// camera object
var camera = {
	x: 0,
	y: 0
};

// world object
var world = {
	food: [],
	items: [],// powerups, health packs, etc.
	animations: []// can be used for any type of animation, death, hit, etc.
};

// player object
var player = {
	hp: 100,
	hp_MAX: 100,
	level: 1,
	xp: 0,// experience
	x: 0,// top left corner
	y: 0,// top left corner
	w: 20,
	h: 20,
	direction: 0,// up, down, left, right
	trail: []// the snake bits
};
// adjust player location to the middle of the field
player.x = screen_size.w/2-player.w/2;
player.y = screen_size.h/2-player.h/2;

// for rainbow coloring effect
var color = {
	red: 0,
	green: 255,
	blue: 255,
	turning: "b"
};

//####################################################################################################
// Initialize Game Window and Layers
//
//
//####################################################################################################

var layer = [];

// used for things under the player
layer[0] = {canvas: null, context: null};
layer[0].canvas = document.getElementById("under_canvas");
layer[0].context = layer[0].canvas.getContext("2d");

// used for things at the same level as player
layer[1] = {canvas: null, context: null};
layer[1].canvas = document.getElementById("main_canvas");
layer[1].context = layer[1].canvas.getContext("2d");

// used for things above/over the player
layer[2] = {canvas: null, context: null};
layer[2].canvas = document.getElementById("over_canvas");
layer[2].context = layer[2].canvas.getContext("2d");

// used for the hud above everything, debug too maybe
layer[3] = {canvas: null, context: null};
layer[3].canvas = document.getElementById("hud_canvas");
layer[3].context = layer[3].canvas.getContext("2d");

// hidden main_canvas (for altering images / changing colors / keying)
var hidden_canvas = document.getElementById("hidden_canvas");
var hidden_context = hidden_canvas.getContext("2d");
	hidden_canvas.width = 0;
	hidden_canvas.height = 0;

for(var i = 0; i < layer.length; i++){
	layer[i].canvas.width = screen_size.w;
	layer[i].canvas.height = screen_size.h;
}

// adjust screen/game window size(s)
var game_window = document.getElementById("game_window");
updateScreenSize();

addEventListener("resize", function(e){updateScreenSize()});

function updateScreenSize(){
	game_window.style["margin-left"] = ((window.innerWidth-layer[0].canvas.width)/2) + "px";
}

//####################################################################################################
// Some Database / List stuff
//
//
//####################################################################################################

// enemies
var foods_list = {
	food: {
		type: "food",
		x: 0,
		y: 0,
		w: 20,
		h: 20,
		r: 255,
		g: 96,
		b: 96
	}
};

// animations (also on screen text, xp, items, etc.)
var animations_list = {
	food: {
		type: "food",
		x: 0,
		y: 0,
		duration: 100
	}
}

//####################################################################################################
// Helpful functions
//
//
//####################################################################################################
for(var i = 0; i < 1; i++){
	spawnFood();
}

function spawnFood(){
	var tempFood = JSON.parse(JSON.stringify(foods_list["food"]));

	tempFood.x = Math.floor((Math.random()*(screen_size.w-tile_size))/tile_size)*tile_size+tile_size/2;
	tempFood.y = Math.floor((Math.random()*(screen_size.h-tile_size))/tile_size)*tile_size+tile_size/2;

	world.food.push(tempFood);
}

//####################################################################################################
// Initialize Keyboard and Mouse
//
//
//####################################################################################################
var keyboard = {
	keys_down: []
};
addEventListener("keydown", function(e){keyboard.keys_down[e.keyCode] = true}, false);
addEventListener("keyup", function(e){keyboard.keys_down[e.keyCode] = false}, false);