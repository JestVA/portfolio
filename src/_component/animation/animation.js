var stars = [];
var numStars = 4;
var pause = false;

function setup() {
  //blendMode(MULTIPLY);
  createCanvas(windowWidth, windowHeight);
  for(var i = 0; i < numStars; i++) {
    stars[i] = new Web();
    stars[i].setup(random(width), random(height));
    
  }
}

function draw() {
  background(255);
  
  //draw a custom background
  fill(240, 200, 31, 200);
  beginShape()
  vertex(0, 0);
  vertex(width/2, height/2);
  vertex(0, height);
  endShape();
  
  fill(230, 43, 0, 200);
  beginShape()
  vertex(width, 0);
  vertex(width/2, height/2);
  vertex(width, height);
  endShape();
  
  fill(30, 188, 180, 200);
  beginShape()
  vertex(0, 0);
  vertex(width/2, height/2);
  vertex(width, 0);
  endShape();
  
  fill(44, 32, 140, 200);
  beginShape()
  vertex(0, height);
  vertex(width/2, height/2);
  vertex(width, height);
  endShape();
  
  // draw the stars
  for(var i = 0; i < numStars; i ++) {
    stars[i].update();
    stars[i].display();
  }

}

function mousePressed() {
  if(!pause) {
    noLoop();
    pause = !pause;
  } else {
    setup();
    loop();
    pause = !pause;
  }
}

// class
function Web() {
  this.x = [];
  this.y = [];
  this.numRings = 11;
  this.numSteps = 10;
  this.offset = [];
  this.color = [];
  
  this.posX;
  this.posY;
  
  this.setup = function(pos_x, pos_y) {
    this.posX = pos_x;
    this.posY = pos_y;
    this.color[0] = color(0);
    this.color[1] = color(255);
    
    for(var j = 0; j < this.numRings; j++) {
      this.x[j] = [];
      this.y[j] = [];
      //this.color[j] = color(random(50, 255), random(50, 140), random(50, 180), j*20);
    
      for(var i = 0; i < this.numSteps; i++) {
        this.offset[i] = random(100);
      }
    }
  };

  this.update = function() {
    noiseDetail(2, 0.8);
    for(var j = 0; j < this.numRings; j++) {
      for(var i = 0; i < this.numSteps; i++) {
        this.offset[i]+=0.001;
        this.x[j][i] = this.posX + ((j+1)*(noise(this.offset[i]/2)*50)) * cos(radians(i*36));
        this.y[j][i] = this.posY + ((j+1)*(noise(this.offset[i]/2)*50)) * sin(radians(i*36)); 
      }
    }
  };

  this.display = function() {
    noStroke();
    //stroke(255);
    //noFill();
    
    for(var j = this.numRings-1; j > 0; j--) {
      beginShape();
      //fill(this.color[j]);
      
      if(j % 2 == 0) {
        fill(this.color[0]);
      } else {
        fill(this.color[1]);
      }
      
      for(var i = 0; i < this.numSteps; i++) {
        vertex(this.x[j][i], this.y[j][i]);        
      }
      vertex(this.x[j][0], this.y[j][0]); //close the shape
      endShape();
      
      // for(var i = 0; i < this.numSteps; i++) {
      //   fill(255);
      //   ellipse(this.x[j][i], this.y[j][i], 5, 5);
      // }
    }
  
  };
}