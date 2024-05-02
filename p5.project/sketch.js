let img;
let segments = []; //Where we will store each segment
let numSegments = 50; // how mang segments to create
let drawSegments = false;

let imgDrwPrps = {aspect:0, width:0, height:0, xOffset:0, yOffset:0};

let canvasAspectRatio = 0;

let pixelColour;

function preload() {
   img = loadImage("assets/Mona.jpg");
}

function setup() {
  createCanvas(img.width, img.height);

  canvasAspectRation = width/height;
  imgDrwPrps.aspect = img.width/img.height;
  calculateImageDrawProps();
  
  
  //calculate width and height of segments
  let segWidth = img.width/numSegments;
  let segHeight = img.height/numSegments;
 
  //set up all the image segments
  for ( let yPos = 0; yPos < img.height; yPos += segHeight) { //vertical
    for (let xPos = 0; xPos < img.width; xPos += segWidth) { //horizontal
      let fillColor = img.get(xPos + segWidth/2, yPos + segHeight/2);
      let segment = new ImageSegment(xPos, yPos, segWidth, segHeight, fillColor); //create segment
      segment.calculateImageDrawProps();
      segments.push(segment); //add the segment to the end of the segments array
    }
  }


  pixelColour = color(0);
}

function calculateImageDrawProps() {
  if(imgDrwPrps.aspect > canvasAspectRatio) { //case where image is wider than canvas
    imgDrwPrps.width = width;
    imgDrwPrps.height = width/imgDrwPrps.aspect;
    imgDrwPrps.xOffset = 0;
    imgDrwPrps.yOffset = (height - imgDrwPrps.height) / 2;

  }else if (imgDrwPrps.aspect < canvasAspectRatio) { //case where image is taller than canvas
    imgDrwPrps.width = height * imgDrwPrps.aspect;
    imgDrwPrps.height = height;
    imgDrwPrps.xOffset = (width - imgDrwPrps.width) /2;
    imgDrwPrps.yOffset = 0

  }else if (imgDrwPrps.aspect == canvasAspectRatio) { //case where they are the same
    imgDrwPrps.width = width;
    imgDrwPrps.height = height;
    imgDrwPrps.xOffset = 0;
    imgDrwPrps.yOffset = 0;
  }
}
function draw() {
  if (drawSegments) {
    for (const segment of segments) {
      segment.draw();
    }
  } else {
    image(img, imgDrwPrps.xOffset, imgDrwPrps.yOffset, imgDrwPrps.width, imgDrwPrps.height);
  }
 
  
  stroke(255);
  fill(pixelColour);
  circle(mouseX, mouseY, 40);
}

function mouseMoved() {
  pixelColour = img.get(mouseX, mouseY);//read the colour under the mouse and assign to pixelcolour
}

function keyPressed() {
  if (key == " ") {
    drawSegments = !drawSegments;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  canvasAspectRatio = width/height;
  calculateImageDrawProps();

  segments.forEach(segment => {
    segment.calculateImageDrawProps();
  })
}

class ImageSegment {

  constructor(rowPos, colPos, fillColor) {
    this.rowPos = rowPosIn
    this.colPos = colPosIn


    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;
    this.fillColor = fillColor;
  }

  calculateImageDrawProps() {
    this.width = imgDrwPrps.width/numSegments;
    this.height = imgDrwPrps.height/numSegments;

    this.xPos = this.rowPos * this.width + imgDrwPrps.xOffset;
    this.yPos = this.colPos + this.height + imgDrwPrps.yOffset;
  }

  draw() {
    fill(this.fillColor);
    stroke(0);
    rect(this.xPos, this.yPos, this.width, this.height);
  }
}
