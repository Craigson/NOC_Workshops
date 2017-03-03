import peasy.*;

int NUM_BOIDS = 500;
Flock flock;
int boundary = 500;
PVector origin;


PeasyCam cam;

// GUI
import controlP5.*;
int sliderValue = 100;
ControlP5 cp5;

void setup() {
  size(1024, 768, P3D);
  origin = new PVector(0,0,0);
    background(0);
  flock = new Flock();
  // Add an initial set of boids into the system
  for (int i = 0; i < NUM_BOIDS; i++) {
    Boid b = new Boid(0,0,0);
    flock.addBoid(b);
  }
  
  // setup camera
  cam = new PeasyCam(this,0,0,0,1500);
  cam.setMinimumDistance(50);
  cam.setMaximumDistance(1500);

}

void draw() {
  background(0);
  
  flock.run();
  
  // draw the bounding box
  pushMatrix();
  noFill();
  stroke(255,75);
  sphereDetail(16);
  sphere(boundary);
  popMatrix();
  
  println("fps: " + frameRate);
  println("numBoids: " + flock.boids.size());
}

// Add a new boid into the System
void mouseDragged() {
  //flock.addBoid(new Boid(0,0,0));
}

void keyPressed(){
  
   if (key == CODED) {
    if (keyCode == UP) {
       for (int i = 0; i < 10; i++){
         flock.addBoid(new Boid(0,0,0));
       }
     }
   }
}