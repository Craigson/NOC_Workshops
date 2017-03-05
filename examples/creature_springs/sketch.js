// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Reference to physics world
var physics;

var p1;
var p2;

var myCreature, anotherCreature;

function setup() {
  createCanvas(640,360);

  // Initialize the physics
  physics=new VerletPhysics2D();
  physics.addBehavior(new GravityBehavior(new Vec2D(0,0.5)));

  // Set the world's bounding box
  physics.setWorldBounds(new Rect(0,0,width,height));
  
  // Make two particles
  p1 = new Particle(new Vec2D(width/2,20));
  p2 = new Particle(new Vec2D(width/2+160,20));
  // Lock one in place
  // p1.lock();

  // Make a spring connecting both Particles
  var spring=new VerletSpring2D(p1,p2,160,0.01);

  // Anything we make, we have to add into the physics world
  physics.addParticle(p1);
  physics.addParticle(p2);
  physics.addSpring(spring);

  myCreature = new Creature(createVector(width/2, height/2), 40);
  anotherCreature = new Creature(createVector(width/2, height/4), 40);

  myCreature.init();
  anotherCreature.init();
}

function draw() {

  // Update the physics world
  physics.update();

  background(51);

  // Draw a line between the particles
  stroke(200);
  strokeWeight(2);
  line(p1.x,p1.y,p2.x,p2.y);

  // Display the particles
  p1.display();
  p2.display();

  // Move the second one according to the mouse
  if (mouseIsPressed) {
    p2.lock();
    p2.x = mouseX;
    p2.y = mouseY;
    p2.unlock();
  } 

  myCreature.draw();
  anotherCreature.draw();
}


var Creature = function(_position, _radius){

  this.position = _position;
  this.radius = _radius;
  this.numSegments = 12;
  this.points = [];
  this.centroid;
  this.particles = [];
  this.springStrength = 0.03;

  this.init = function(){

    var theta = 0;

    var centerParticle = new Particle( new Vec2D(this.position.x,this.position.y) );
    physics.addParticle(centerParticle);

    // centerParticle.lock();
    
    this.centroid = centerParticle;

    var increment = TWO_PI / this.numSegments;

    for ( var i = 0; i < this.numSegments; i++){

      theta = i * increment;

      var x = this.radius * cos ( theta );
      var y = this.radius * sin ( theta );

      x += this.position.x;
      y += this.position.y;

      var tempParticle = new Particle(new Vec2D(x,y));
      var spring = new VerletSpring2D(centerParticle, tempParticle ,this.radius,this.springStrength);

      this.particles.push(tempParticle);

      physics.addParticle(tempParticle);
      physics.addSpring(spring);

      this.points[i] = createVector(x,y);

      if (i != 0 ){
        var distanceBetween = this.points[i].dist(this.points[i-1]);

        var neighbourSpring = new VerletSpring2D(tempParticle, this.particles[i-1] ,distanceBetween,this.springStrength);
        physics.addSpring(neighbourSpring);

      }
      

    }

    var lastSpring = new VerletSpring2D(this.particles[0], this.particles[this.particles.length-1],distanceBetween,this.springStrength);
    physics.addSpring(lastSpring);


  }

  this.draw = function(){

    for (var i = 0; i < this.numSegments; i++){

      // fill(255,0,0);
      noFill();
      // ellipse(this.points[i].x, this.points[i].y, 5,5 );  
      // 
      // this.particles[i].display();
      beginShape();
      for (var i = 0; i < this.particles.length; i++){

        vertex(this.particles[i].x, this.particles[i].y);
        line(this.centroid.x, this.centroid.y, this.particles[i].x, this.particles[i].y);

      }

      vertex(this.particles[0].x, this.particles[0].y);

      endShape();


    }


  }







}




