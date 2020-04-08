/**
	Arrowhead Co. - Object3D.js

	>>> A constructor for solids.
	>>> Similar to primitives.js for Engine3D.
	>>> Used for EngineMECH.
**/

	/*GLOBALS*/

var Object3D = {};

	/*METHODS*/

Object3D.Cuboid = function(x,  y,  z,
						   xl, yl, zl, col,
						   ax, ay, az,
						   id, method, mode){

	mode = mode === undefined ? true : mode;
	col =  col || 
		[255,
		 255,
		 255,
		 255],

	xl /= 2;
	yl /= 2;
	zl /= 2;

	ax = ax || 0;
	ay = ay || 0;
	az = az || 0;

	let rotation =    new Vector(ax, ay, az);

	Engine3D.create(
		new Primitive(
			new Vector(x - xl, y - yl, z - zl),
			new Vector(x - xl, y + yl, z - zl),
			new Vector(x + xl, y + yl, z - zl),
			new Vector(x + xl, y - yl, z - zl)
		),
		new Primitive(
			new Vector(x + xl, y - yl, z - zl),
			new Vector(x + xl, y + yl, z - zl),
			new Vector(x + xl, y + yl, z + zl),
			new Vector(x + xl, y - yl, z + zl)
		),
		new Primitive(
			new Vector(x + xl, y - yl, z + zl),
			new Vector(x + xl, y + yl, z + zl),
			new Vector(x - xl, y + yl, z + zl),
			new Vector(x - xl, y - yl, z + zl)
		),
		new Primitive(
			new Vector(x - xl, y - yl, z + zl),
			new Vector(x - xl, y + yl, z + zl),
			new Vector(x - xl, y + yl, z - zl),
			new Vector(x - xl, y - yl, z - zl)
		),
		new Primitive(
			new Vector(x - xl, y + yl, z - zl),
			new Vector(x - xl, y + yl, z + zl),
			new Vector(x + xl, y + yl, z + zl),
			new Vector(x + xl, y + yl, z - zl)
		),
		new Primitive(
			new Vector(x + xl, y - yl, z + zl),
			new Vector(x - xl, y - yl, z + zl),
			new Vector(x - xl, y - yl, z - zl),
			new Vector(x + xl, y - yl, z - zl),
		),
		new Vector(x, y, z),
		col,
		rotation,
		mode
	);

	xl *= 2;
	yl *= 2;
	zl *= 2;

	EngineMECH.create(
		x,  y,  z,
		xl, yl, zl,
		id, method,
	);
};

Object3D.Cube = function(x,  y,  z, s, col,
						 ax, ay, az,
						 id, method, mode){

	Object3D.Cuboid(x,  y,  z,
					s,  s,  s, col,
					ax, ay, az,
					id, method, mode);
};
