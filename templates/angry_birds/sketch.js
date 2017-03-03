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

// declare the p5 variables
var canvas;


// ------------------ setup -----------------
function setup(){

	canvas = createCanvas(1280, 730);
	initMatterEnginge();





	// run the engine
	Engine.run(engine);

}

// ------------------ draw  -----------------

function draw(){



}

// ------------------ init matter engine -----------------
function initMatterEnginge(){
  // create the engine
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


}