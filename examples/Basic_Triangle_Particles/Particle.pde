
class Particle
{
  final static float RAD = 4;
  final static float SPEED_MAX = 2.2;
  final static float DIST_MAX = 75;
  PVector speed = new PVector(random(-SPEED_MAX, SPEED_MAX), random(-SPEED_MAX, SPEED_MAX));
  PVector acc = new PVector(0, 0);
  PVector pos;
  //neighboors contains the particles within DIST_MAX distance, as well as itself
  ArrayList<Particle> neighboors;
  
  Particle()
  {
    pos = new PVector (random(width), random(height));
  }

  void move()
  {    
    pos.add(speed);
    
    acc.mult(0);
    
    if (pos.x < 0)       pos.x = width;
    if (pos.x > width)   pos.x = 0;
    if (pos.y < 0)       pos.y = height;
    if (pos.y > height)  pos.y = 0;
  }
  
  void display()
  {
    fill(255, 14);
    ellipse(pos.x, pos.y, RAD, RAD);
  }
}