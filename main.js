/**
	Arrowhead Co. EngineMECH.js

	>>> Handles collisions.
	>>> Performs the mechanical part of the game.
	>>> Has a library of utility functions.
**/

	/*GLOBALS*/

var BUFFER = 0.01;

var EngineMECH = {
	objects : [],
};

	/*METHODS*/

EngineMECH.revert = function(){
	this.objects = [];
};

EngineMECH.create = function(x, y, z, xl, yl, zl, id, method){
	this.objects.push({
		x : x,  y : y,  z : z,
		w : xl, h : yl, l : zl,

		id : 	 id,
		method : method,
	});
};

EngineMECH.collisionAdjust = function(object, adjustable, jump){
	let canJump = false;

	if(
		adjustable.x < object.x + object.w / 2 + adjustable.w / 2 - BUFFER && 
		adjustable.x > object.x - object.w / 2 - adjustable.w / 2 + BUFFER &&
		adjustable.y < object.y + object.h / 2 + adjustable.h / 2 - BUFFER && 
		adjustable.y > object.y - object.h / 2 - adjustable.h / 2 + BUFFER &&
		adjustable.z < object.z + object.l / 2 + adjustable.l / 2 - BUFFER && 
		adjustable.z > object.z - object.l / 2 - adjustable.l / 2 + BUFFER){

		if(adjustable.x 	 <  object.x + object.w / 2 + adjustable.w / 2 - BUFFER &&
		   adjustable.prev.x >= object.x + object.w / 2 + adjustable.w / 2 - BUFFER){

			adjustable.x = object.x + object.w / 2 + adjustable.w / 2 - BUFFER;
		} else 
		if(adjustable.x		 >  object.x - object.w / 2 - adjustable.w / 2 + BUFFER &&
		   adjustable.prev.x <= object.x - object.w / 2 - adjustable.w / 2 + BUFFER){

			adjustable.x = object.x - object.w / 2 - adjustable.w / 2 + BUFFER;
		} else
		if(adjustable.z		 <  object.z + object.l / 2 + adjustable.l / 2 - BUFFER &&
		   adjustable.prev.z >= object.z + object.l / 2 + adjustable.l / 2 - BUFFER){

			adjustable.z = object.z + object.l / 2 + adjustable.l / 2 - BUFFER;
		} else
		if(adjustable.z		 >  object.z - object.l / 2 - adjustable.l / 2 + BUFFER &&
		   adjustable.prev.z <= object.z - object.l / 2 - adjustable.l / 2 + BUFFER){

			adjustable.z = object.z - object.l / 2 - adjustable.l / 2 + BUFFER;
		} else
		if(adjustable.y		 <  object.y + object.h / 2 + adjustable.h / 2 - BUFFER &&
		   adjustable.prev.y >= object.y + object.h / 2 + adjustable.h / 2 - BUFFER){

			adjustable.y = object.y + object.h / 2 + adjustable.h / 2 - BUFFER;
		} else 
		if(adjustable.y		 >  object.y - object.h / 2 - adjustable.h / 2 + BUFFER &&
		   adjustable.prev.y <= object.y - object.h / 2 - adjustable.h / 2 + BUFFER){

			adjustable.y = object.y - object.h / 2 - adjustable.h / 2 + BUFFER;
			canJump = true;
		}

		if(jump){
			return {
				collide : true,
				canJump : canJump,
			};
		} else {
			return true;
		}
	}

	if(jump){
		return {
			collide : false,
			canJump : canJump,
		};
	} else {
		return false;
	}
};

EngineMECH.cuboidCollision = function(cuboid, point){
	if(
		point.x < cuboid.x + cuboid.w && cuboid.x < point.x &&
		point.y < cuboid.y + cuboid.h && cuboid.y < point.y && 
		point.z < cuboid.z + cuboid.l && cuboid.z < point.z){
		
		return true;
	}

	return false;
};

EngineMECH.sphereCollision = function(sphere, point){
	if(
		(point.x - sphere.x) * (point.x - sphere.x) + 
		(point.y - sphere.y) * (point.y - sphere.y) + 
		(point.z - sphere.z) * (point.z - sphere.z) < 
		sphere.r * sphere.r){

		return true;
	}

	return false;
};

EngineMECH.cuboidVcuboid = function(cuboid1, cuboid2){
	if(
		(cuboid1.x < cuboid2.x + cuboid2.w || cuboid2.x < cuboid1.x + cuboid1.w) &&
		(cuboid1.y < cuboid2.y + cuboid2.h || cuboid2.y < cuboid1.y + cuboid1.h) &&
		(cuboid1.z < cuboid2.z + cuboid2.l || cuboid2.z < cuboid1.z + cuboid1.l)){

		return {
			collide : true,
			canJump : false,
		};
	}

	return false;
};

EngineMECH.sphereVsphere = function(sphere1, sphere2){
	if(
		(sphere1.x - sphere2.x) * (sphere1.x - sphere2.x) + 
		(sphere1.y - sphere2.y) * (sphere1.y - sphere2.y) + 
		(sphere1.z - sphere2.z) * (sphere1.z - sphere2.z) < 
		(sphere1.r + sphere2.r) * (sphere1.r * sphere2.r)){

		return true;
	}

	return false;
};

EngineMECH.none = function(){
	return false;
};

EngineMECH.run = function(reference){
	let collide = false,
		canJump = false,
		current = "";

	for(let i = 0; i < this.objects.length; i++){
		let info = this[
				   this.objects[i].method](
				   this.objects[i], reference, true);

		current += this.objects[i].id;

		if(info){
			if(info.collide){
				collide = true;

				if(info.canJump){
					canJump = true;
				}
			}
		}
	}

	if(canJump){
		reference.canJump = true;
	}
	if(collide){
		reference.collide = true;
	} else {
		reference.collide = false;
	}

	if(collide){
		return current;
	} else {
		return false;
	}
};
