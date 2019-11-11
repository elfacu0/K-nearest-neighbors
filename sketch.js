let ko = 3;
let k = ko;
let kn = [];
let c = "#00FF00";
let dots = [];
let radio = 20;
let startLoop = false;

const canvasOffset = document.querySelector(".buttons");
const KvalueBox = document.querySelector("#Kvalue");
KvalueBox.addEventListener("change", function () {
  ko = this.value;
});
const canvaSize = document.querySelector(".canvas");
function setup() {
  createCanvas(windowWidth, windowHeight - canvasOffset.offsetHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight - canvasOffset.offsetHeight);
}


function verde() {
  c = "#00FF00";
}

function white() {
  c = "#FFFFFF";
}

function suprise() {
  c = "#000000";
}

function circleSize() {
  radio = parseInt(document.getElementById("dotSize").value);
}

function draw() {
  background(220);
  dots.forEach(i => i.draw());
  if (startLoop) {
    start();
  }
}

class dot {
  constructor(x, y, r, c) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;
  }

  draw() {
    fill(color(this.c));
    circle(this.x, this.y, this.r);
  }

}

function mouseClicked() {
  if (mouseY > 0 && mouseX > 0) {
    dots.push(new dot(mouseX, mouseY, radio, c));
  }
}


function calculateKn(dots, p2) {
  k = ko;
  dots.forEach(p1 => {
    if (p2.c == "#000000" && p1.c != "#000000") {
      kn.push([dist(p1.x, p1.y, p2.x, p2.y), p1.c]);
    }
  });
  k = dots.length < k ? dots.length : k;
  kn.sort((a, b) => (a[0] > b[0]) ? 1 : -1)
  kn = kn.splice(0, k);
  let verdes = 0;
  kn.forEach(i => {
    verdes += i[1] == "#00FF00" ? 1 : 0;
  });
  if (verdes > Math.floor(k / 2)) {
    p2.c = "#00FF00";
  } else {
    p2.c = "#FFFFFF";
  }
  kn = [];
}

function start() {
  let aux = "#000000";
  dots.forEach(i => {
    if (i.c == aux) {
      calculateKn(dots, i);
    }
  });
}

function deleteAll() {
  dots = [];
}

function allIn() {
  startLoop = true;
}

function pause() {
  startLoop = false;
}

function addRandomPoints() {
  for (let i = 0; i < 10; i++) {
    dots.push(new dot(random(0, windowWidth), random(0, windowHeight), radio, c));
  }
}