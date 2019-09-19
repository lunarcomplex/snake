// scene controller
//
//
//
//

function main(){

	gameLoop();

	//####################################################################################################
	// The Main Game Loop
	//
	//
	//####################################################################################################
	function gameLoop(){
		var now = Date.now();
		delta = now-then;

		updateInputs();
		updateObjects();
		updateGraphics();

		then = now;
		requestAnimationFrame(gameLoop);
	}

	//####################################################################################################
	// updateInputs, check player input and apply that input, collisions etc. will be checked in updateObjects
	//
	//
	//####################################################################################################
	function updateInputs(){
		// player input

		// player movement
		// a, left
		if(keyboard.keys_down[65]){
			player.direction = 2;
		}
		// d, right
		if(keyboard.keys_down[68]){
			player.direction = 3;
		}
		// w, up
		if(keyboard.keys_down[87]){
			player.direction = 0;
		}
		// s, down
		if(keyboard.keys_down[83]){
			player.direction = 1;
		}
	}

	//####################################################################################################
	// updateObjects, update all objects, player collisions, actions, enemies, bullets, etc.
	//
	//
	//####################################################################################################
	function updateObjects(){

		// coloring changing effect
		if(color.turning == "r"){color.blue--}else
		if(color.turning == "rg"){color.green++}else
		if(color.turning == "g"){color.red--}else
		if(color.turning == "gb"){color.blue++}else
		if(color.turning == "b"){color.green--}else
		if(color.turning == "br"){color.red++}
		if(color.red == 255 && color.blue == 255){color.turning = "r"}else
		if(color.red == 255 && color.blue == 0 && color.green < 255){color.turning = "rg"}else
		if(color.green == 255 && color.red == 255){color.turning = "g"}else
		if(color.green == 255 && color.red == 0 && color.blue < 255){color.turning = "gb"}else
		if(color.blue == 255 && color.green == 255){color.turning = "b"}else
		if(color.blue == 255 && color.green == 0 && color.red < 255){color.turning = "br"}

		// update single second counter
		single_second_counter += delta;
		if(single_second_counter >= 100){
			single_second_counter = 0;
			
			// update player movement every second
			if(single_second_counter == 0){
				if(player.direction == 0){// up
					player.y -= tile_size;
				}else
				if(player.direction == 1){// down
					player.y += tile_size;
				}else
				if(player.direction == 2){// left
					player.x -= tile_size;
				}else
				if(player.direction == 3){// right
					player.x += tile_size;
				}
			}

			// check player colision against borders, stop them and reset velocities
			// for player's x
			if(player.x < 0+tile_size/2){// left border
				player.x = 0+tile_size/2;
			}else
			if(player.x+player.w > screen_size.w-tile_size/2){// right border
				player.x = screen_size.w-player.w-tile_size/2;
			}
			// for player's y
			if(player.y < 0+tile_size/2){// top border
				player.y = 0+tile_size/2;
			}else
			if(player.y+player.h > screen_size.h-tile_size/2){// bottom border
				player.y = screen_size.h-player.h-tile_size/2;
			}

			// update any world food against the player
			for(var i = 0; i < world.food.length; i++){
				if(world.food[i].type == "food"){
					if(player.x == world.food[i].x
					&& player.y == world.food[i].y){
						world.food.splice(i, 1);
						spawnFood();
					}
				}
			}

			// update any world animations
			for(var i = 0; i < world.animations.length; i++){
				world.animations[i].duration--;
				if(world.animations[i].duration <= 0){
					world.animations.splice(i, 1);
					continue;
				}
			}
		}

		// update the camera location
		camera.x += Math.floor((player.x-camera.x)/16);
		camera.y += Math.floor((player.y-camera.y)/16);
	}

	//####################################################################################################
	// updateGraphics, update the screen to display the newest frame
	//
	//
	//####################################################################################################
	function updateGraphics(){
		// clear the canvases
		for(var i = 0; i < layer.length; i++){
			layer[i].context.clearRect(0, 0, layer[i].canvas.width, layer[i].canvas.height);
		}

		// gameplay graphics!
		if(scene == "game"){
			displayGame();

			// // player health bar
			// drawSquare(layer[0], 0, 0, screen_size.w, 24, 72, 72, 72, 1);
			// if(player.hp > player.hp_MAX/2){// green to yellow
			// 	drawSquare(layer[0], 3, 3, (screen_size.w-6)*(player.hp/100), 18, Math.floor(255*((player.hp_MAX-player.hp)/(player.hp_MAX/2))), 255, 0, 1);
			// }else{// yellow to red
			// 	drawSquare(layer[0], 3, 3, (screen_size.w-6)*(player.hp/100), 18, 255, Math.floor(255*((player.hp)/(player.hp_MAX/2))), 0, 1);
			// }

			// // player xp bar
			// drawSquare(layer[0], 0, 24, screen_size.w, 12, 72, 72, 72, 1);
			// drawSquare(layer[0], 3, 26,
			// 	screen_size.w-(screen_size.w*((xp_needed_for_level[player.level+1]-player.xp)/(xp_needed_for_level[player.level+1]-xp_needed_for_level[player.level]))),
			// 	8, 64, 255, 255, 1);

			// // player run energy bar
			// drawSquare(layer[0], 0, 36, screen_size.w, 12, 72, 72, 72, 1);
			// drawSquare(layer[0], 3, 38,
			// 	screen_size.w*(player.run_energy/player.run_MAX),
			// 	8, 255, 255, 64, 1);

		}else
		if(scene == "menu"){
			displayGame();// so when toggleing to the menu you can still see the game in the background

			// maybe add some slightly transparent box over the gameplay in the background

			displayMenu();
		}

		// Game graphics
		//----------------------------------------------------------------------------------------------------
		function displayGame(){
			// accounting for player's x & y offsets:
			// var new_x = ((screen_size.w/2)-(player.w/2))-player.x+camera.x;
			// var new_y = ((screen_size.h/2)-(player.h/2))-player.y+camera.y;
			// new values 
			var new_x = (screen_size.w/2)-camera.x;
			var new_y = (screen_size.h/2)-camera.y;

			// // field grid
			// // vertical
			// for(var i = 0; i < Math.floor(screen_size.w/tile_size); i++){
			// 	drawLine(layer[0], i*tile_size+new_x+tile_size/2, 0+new_y+tile_size/2, i*tile_size+new_x+tile_size/2, screen_size.h+new_y-tile_size/2, 2, 255, 255, 255, 0.5);
			// }
			// // horizonal
			// for(var i = 0; i < Math.floor(screen_size.h/tile_size); i++){
			// 	drawLine(layer[0], 0+new_x+tile_size/2, i*tile_size+new_y+tile_size/2, screen_size.w+new_x- tile_size/2, i*tile_size+new_y+tile_size/2, 2, 255, 255, 255, 0.5);
			// }

			// // field tiles
			// for(var y = 0; y < Math.floor(screen_size.h/tile_size); y++){
			// 	for(var x = 0; x < Math.floor(screen_size.w/tile_size); x++){
			// 		drawSquare(layer[0], x*tile_size+new_x+2, y*tile_size+new_y+2, tile_size-2, tile_size-2, 255, 255, 255, 0.25);
			// 	}
			// }

			// field borders
			drawLine(layer[0], 0+new_x+tile_size/2, 0+new_y+tile_size/2, screen_size.w+new_x-tile_size/2, 0+new_y+tile_size/2, 3, 255, 255, 255, 1);// top line
			drawLine(layer[0], 0+new_x+tile_size/2, screen_size.h+new_y-tile_size/2, screen_size.w+new_x-tile_size/2, screen_size.h+new_y-tile_size/2, 3, 255, 255, 255, 1);// bottom line
			drawLine(layer[0], 0+new_x+tile_size/2, 0+new_y+tile_size/2, 0+new_x+tile_size/2, screen_size.h+new_y-tile_size/2, 3, 255, 255, 255, 1);// left line
			drawLine(layer[0], screen_size.w+new_x-tile_size/2, 0+new_y+tile_size/2, screen_size.w+new_x-tile_size/2, screen_size.h+new_y-tile_size/2, 3, 255, 255, 255, 1);// right line

			// world.food
			for(var i = 0; i < world.food.length; i++){
				if(world.food[i].type == "food"){
					drawSquare(layer[1], world.food[i].x+new_x, world.food[i].y+new_y, world.food[i].w, world.food[i].h, world.food[i].r, world.food[i].g, world.food[i].b, 1);		
				}
			}

			// world.animations
			for(var i = 0; i < world.animations.length; i++){
				if(world.animations[i].type == "food"){
					
				}
			}

			// player
			drawSquare(layer[1], player.x+new_x, player.y+new_y, player.w, player.h, 255, 255, 255, 1);

			// visual aim direction line
			// drawLine(layer[0], player.x+player.w/2+new_x, player.y+player.h/2+new_y, mouse.x, mouse.y, 2, 255, 255, 255, 1);
		}

		// Menu graphics
		//----------------------------------------------------------------------------------------------------
		function displayMenu(){

		}

		// displays useful information ont he screen (used for debugging)
		if(info_overlay){
			displayText(layer[3], Math.floor(1000/delta), 2, 2, "left", "top", 255, 255, 0, 1, 20, "Helvetica", true, 0);
			displayText(layer[3], "player x, y: " + player.x + ", " + player.y, 2, 1*tile_size+2, "left", "top", 255, 255, 0, 1, 20, "Helvetica", true, 0);
			displayText(layer[3], "camera x, y: " + camera.x + ", " + camera.y, 2, 2*tile_size+2, "left", "top", 255, 255, 0, 1, 20, "Helvetica", true, 0);
		}
	}

}// END of main()