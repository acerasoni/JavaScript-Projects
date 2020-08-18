class follower {
  
 constructor() {
   this.x = 200;
   this.y = 200;
   this.lines = new Array();

   // Add lines in all directions
   for(var i = 0; i < 501; i += 5) {
    this.lines.push(new border(this.x, this.y, 0, i));
    this.lines.push(new border(this.x, this.y, i, 0));   
    this.lines.push(new border(this.x, this.y, 500, i));
    this.lines.push(new border(this.x, this.y, i, 500));       
   }
    
    // Follow the mouse
    addEventListener('mousemove', e => {
    this.x = e.offsetX;
    this.y = e.offsetY;
          
    // Update lines
    this.lines.forEach( (line) => {
     line.x1 = e.offsetX;
      line.y1 = e.offsetY;
    });
    
    }
  );
 }
  
  draw(borders) {
    // Draw the follower
    strokeWeight(10);
    point(this.x, this.y);
    strokeWeight(1);

    // Iterate the lines to check if they intersect
    this.lines.forEach( (line) => {
      var shortestDistance;
      var shortestIntersection;
      
      borders.forEach( (border) => {
         var intersection = follower.checkLineIntersection(line.x1, line.y1, line.x2, line.y2, border.x1, border.y1, border.x2, border.y2);
        
       if(intersection !== false) { 
         var distance = p5.Vector.dist(createVector(intersection.x, intersection.y), createVector(this.x, this.y));
         
         if(shortestIntersection === undefined) {
           shortestDistance = distance;
           shortestIntersection = intersection;
         } else if 
              (distance <= shortestDistance) {
                shortestDistance = distance;
           shortestIntersection = intersection;
         }
         }
       
      });
      
      if(shortestIntersection === undefined) {
        line.draw();
      } else {
          line.drawHalted(shortestIntersection); 
      }
    });
    
  }
  
  // http://paulbourke.net/geometry/pointlineplane/javascript.txt
  static checkLineIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {

  // Check if none of the lines are of length 0
	if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
		return false
	}

	var denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))

  // Lines are parallel
	if (denominator === 0) {
		return false
	}

	let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
	let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator

  // is the intersection along the segments
	if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
		return false
	}

  // Return a object with the x and y coordinates of the intersection
	let x = x1 + ua * (x2 - x1)
	let y = y1 + ua * (y2 - y1)

	return {x, y}
}

}