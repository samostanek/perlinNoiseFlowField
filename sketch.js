var inc = 0.3;
var Zoff = 0;
var scl = 20;
var cols, rows, flowField;
var ps;

function setup() {
  createCanvas(800, 800);
  pixelDensity(1);
  //frameRate(1);
  cols = width / scl;
  rows = height / scl;

  ps = [];
  for (let i = 0; i < 500; i++) {
    ps.push(new Particle(random(width), random(height)));
  }

  fps = createP();
}

function draw() {
  //background(255);

  flowField = [];
  let Xoff = 0;
  let Yoff = 0;

  fps.html(floor(frameRate()));

  for (let x = 0; x < cols; x++) {
    Xoff += inc;
    for (let y = 0; y < rows; y++) {
      let r = noise(Xoff, Yoff, Zoff) * TWO_PI;
      let v = p5.Vector.fromAngle(r);

      flowField.push(v);

      push();
      translate(x * scl, y * scl);
      rotate(v.heading());
      stroke(0, 50);
      //line(0, 0, scl / 1.3, 0);
      pop();

      Yoff += inc;
    }
    Yoff = 0;
  }
  Xoff = 0;
  Zoff += 0.01;

  for (let p of ps) {
    p.applyForce(flowField[floor(p.pos.x / scl) + floor(p.pos.y / scl) * cols]);
    p.update(true);
    p.render();
  }
}
