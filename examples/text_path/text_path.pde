// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Path Following
// Via Reynolds: // http://www.red3d.com/cwr/steer/PathFollow.html

// Using this variable to decide whether to draw all the stuff
boolean debug = true;

int NUM_POINTS = 10;

ArrayList<String> wordsList;

// A path object (series of connected points)
Path path;

// Two vehicles
Word word1;
Word word2;

void setup() {
  size(1280, 720);
  // Call a function to generate new Path object
  newPath();
  
  noiseSeed(millis());
  wordsList = new ArrayList<String>();
  
  wordsList.add("hello");
  wordsList.add("world");
  
  // Each vehicle has different maxspeed and maxforce for demo purposes
  word1 = new Word(wordsList.get(0), new PVector(0, height/2), 2, 0.04);
  word2 = new Word(wordsList.get(0), new PVector(0, height/2), 3, 0.1);
}

void draw() {
  background(255);
  // Display the path
  path.display();
  path.drawCurve();
  // The boids follow the path
  word1.follow(path);
  word2.follow(path);
  // Call the generic run method (update, borders, display, etc.)
  word1.run();
  word2.run();
  
  word1.borders(path);
  word2.borders(path);

  // Instructions
  //fill(0);
  //text("Hit space bar to toggle debugging lines.\nClick the mouse to generate a new path.", 10, height-30);
}

void newPath() {
  // A path is a series of connected points
  // A more sophisticated path might be a curve
  path = new Path();
  path.addPoint(-20, height/2);
  
  float spacing = width/NUM_POINTS;
  
  for (int i = 1; i < NUM_POINTS; i++){
    float n = noise(i + 1) * height/3;
    path.addPoint(i * spacing,n);
  }
  path.addPoint(width+20, height/2);
}

public void keyPressed() {
  if (key == ' ') {
    debug = !debug;
  }
}

public void mousePressed() {
  newPath();
}