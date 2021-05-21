function Pipe() {
    this.spacing = 150;
    this.top = random(height / 6, (3 / 4) * height);
    this.bottom = height - (this.top + this.spacing);
    this.x = width;
    this.w = 80;
    this.speed = 6;
  
    this.highlight = false;
  
    this.hits = function(bird) {
      if (bird.y < this.top || bird.y > height - this.bottom) {
        if (bird.x > this.x && bird.x < this.x + this.w) {
          this.highlight = true;
          return true;
        }
      }
      this.highlight = false;
      return false;
    };
  
    this.show = function(greenPipesImage1, redPipesImage1, greenPipesImage2, redPipesImage2) {
    // fill(255);
    if (this.highlight) {
        //rect(this.x, 0, this.w, this.top);
        //rect(this.x, height - this.bottom, this.w, this.bottom);
        image(redPipesImage2,this.x,0, this.w, this.top);
        image(redPipesImage1,this.x, height - this.bottom, this.w, this.bottom);
    } else {
        //rect(this.x, 0, this.w, this.top);
        //rect(this.x, height - this.bottom, this.w, this.bottom);
        image(greenPipesImage2,this.x,0, this.w, this.top);
        image(greenPipesImage1,this.x, height - this.bottom, this.w, this.bottom);
    }

    };
  
    this.update = function() {
      this.x -= this.speed;
    };
  
    this.offscreen = function() {
      if (this.x < -this.w) {
        return true;
      } else {
        return false;
      }
    };
  }