class Particle {
  constructor(x, y) {
    this.vel = createVector(0, 0);
    this.maxSpeed = 5;
    this.acc = createVector(0, 0);
    this.pos = createVector(x, y);
    this.prev = this.pos.copy();
    this.jump = false;
  }

  update(edges) {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);

    // Edges
    if (edges) {
      if (this.pos.x > width) {
        this.pos.x = 0;
        this.jump = true;
      }
      if (this.pos.x < 0) {
        this.pos.x = width;
        this.jump = true;
      }
      if (this.pos.y > height) {
        this.pos.y = 0;
        this.jump = true;
      }
      if (this.pos.y < 0) {
        this.pos.y = height;
        this.jump = true;
      }
    }
  }

  applyForce(f) {
    this.acc.add(f);
  }

  render() {
    noFill();
    stroke(0, 10);
    strokeWeight(1);
    if (!this.jump) {
      //point(this.pos.x, this.pos.y);
      line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);
    } else this.jump = false;
    //vertex(this.pos.x, this.pos.y);
    this.prev = this.pos.copy();
  }
}
