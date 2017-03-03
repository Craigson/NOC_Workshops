// init global objects for matter engine
var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Composite = Matter.Composite;
var Mouse = Matter.Mouse;
var MouseConstraint = Matter.MouseConstraint;
var Events = Matter.Events;
var Constraint = Matter.Constraint;
var engine; // this is our physics engine

// define constants for environment
const FLOOR_HEIGHT = 60;
const FLOOR_WIDTH = 60;
const FLOOR_THICKNESS = 10;
const BOX_SIZE = 30;

// declare game objects
var canvas;
var tower;
var launcherLocation;
var ground;
var birds;
var bird;
var constraint;
var mouseConstraint;
var catapult;

var box_texture;
var bird_texture;


function setup(){

	canvas = createCanvas(1280, 720);
	imageMode(CENTER);
	bird_texture = loadImage('images/bird.png');
	box_texture = loadImage('images/box.png');



	  // create an engine
	  engine = Engine.create();

	  // setup the mouse constraints
	  var mouse = Mouse.create(canvas.elt);
	  var mouseParams = {
	    mouse: mouse,
	    constraint: {
	      stiffness: 2,
	    }
	  }

	  mouseConstraint = MouseConstraint.create(engine, mouseParams);
	  mouseConstraint.mouse.pixelRatio = pixelDensity();
	  World.add(engine.world, mouseConstraint);

	  // set the location where the birds will be launched from
	  launcherLocation = createVector(250, height - FLOOR_THICKNESS - 150);

	  // create the bird
	  bird = new Bird();
	  bird.init(launcherLocation);

      birds = [];
      birds.push(bird);


	  // create the slingshot
      	catapult = Constraint.create({ 
            pointA: launcherLocation, 
            bodyB: bird.shape, 
            stiffness: 0.1
        });
        World.add(engine.world, [catapult])

	  // create the tower
	  tower = new Tower(5* width/6, 12, 4);
	  tower.init();

	  // create ground
	  ground = Bodies.rectangle(width/2, height - FLOOR_THICKNESS/2, width, FLOOR_THICKNESS, {
	    isStatic: true
	  });

	  World.add(engine.world, ground);

	  // run the engine
	  Engine.run(engine);

}


function draw(){
	background(20);

	tower.render();
	bird.render();


	  // Ground vertices
	  var vertices = ground.vertices;
	  beginShape();
	  fill(127);
	  for (var i = 0; i < vertices.length; i++) {
	    vertex(vertices[i].x, vertices[i].y);
	  }
	  endShape();
}

function mouseReleased(){

	if( mouseConstraint.body != null ){

		catapult.bodyB = null;

		var distX = launcherLocation.x - mouseConstraint.body.position.x;
		var distY = launcherLocation.y - mouseConstraint.body.position.y;
		console.log(distX, distY);
		var forceX = map(distX, 0, 200, 0, 0.2);
		var forceY = map(distY, 0, 200, 0, 0.2);
		mouseConstraint.body.force = { 
			x:forceX,
			y:forceY
		};
	}

}


var Tower = function(xPosition, rows, columns){
	this.position = xPosition;
	this.boxes = [];

	this.init = function(){

	  // create the tower
	  for (var i = 0; i < rows ; i++){

	  	for (var j = 0; j < columns; j++){

	  		// create the box in its current grid position
	  		var box = Bodies.rectangle(this.position + BOX_SIZE/2+ 5 + j*BOX_SIZE, height - FLOOR_THICKNESS - BOX_SIZE/2 - i * BOX_SIZE , BOX_SIZE, BOX_SIZE, {
	            // slop: 0.1,
            	// friction: 0.5,
            	// frictionStatic: 0.5
	  		} );
	  		this.boxes.push(box); // add it to the box array
	  		console.log('creating box');

	  	}
	  }

	  // add all of the bodies to the world
	  World.add(engine.world, this.boxes);

	} // end of init

	this.render = function(){

		for (var i = 0; i < this.boxes.length; i++){
			 // boxB vertices
			  // var vertices = this.boxes[i].vertices;
			  // fill(255);
			  // beginShape();
			  // for (var j = 0; j < vertices.length; j++) {
			  //   vertex(vertices[j].x, vertices[j].y);
			  // }
			  // endShape();
			  // 
			  push();
			  translate(this.boxes[i].position.x,this.boxes[i].position.y);
			  image(box_texture, 0,0, BOX_SIZE, BOX_SIZE);
			  pop();
		}

	} // end of render

} // end of Tower

var Bird = function(){
	this.position;
	this.shape;
	this.texture;

	this.init = function(launchLoc, path) {
		this.position = launchLoc;
		// console.log(this.position);
		this.shape = Bodies.polygon(this.position.x, this.position.y, 3, 24, {
			density: 0.003,
		});
		World.add(engine.world, [this.shape]);
	}

	this.render = function(){
	  // var vertices = this.shape.vertices;
	  // fill(255,255,0);
	  // beginShape();
	  // for (var j = 0; j < vertices.length; j++) {
	  //   vertex(vertices[j].x, vertices[j].y);
	  // }
	  // endShape();
	  push();
	  translate(this.shape.position.x, this.shape.position.y);
	  image(bird_texture, 0, 0, 40,40);
	  pop();
	}
} // end of bird

