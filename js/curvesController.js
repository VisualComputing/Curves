// global variables
// modes: 0 natural cubic spline; 1 Hermite;
// 2 Catmull-Rom; 3 (degree 7) Bezier; 4 Cubic Bezier
var mode = 0;

var grabber = null;
var drawGridCtrl = true;
var drawCtrl = true;

var cFit = new CurveFit();
var cAprox = new CurveAprox();
var poly;

function setup(idx) {
    var holder = document.getElementById('sketch-holder-' + idx);
    if (holder) {
        holder.innerHTML = "";
        var canvas = createCanvas(800, 300);
        canvas.parent('sketch-holder-' + idx);
        textSize(20);
        smooth();
        drawGridCtrl = true;
        drawCtrl = true;
        cFit.setup();
        cAprox.setup();
    }

}

function drawGrid(gScale) {
    push();
    strokeWeight(1);
    var i;
    for (i = 0; i <= width / gScale; i++) {
        stroke(0, 0, 0, 20);
        line(i * gScale, 0, i * gScale, height);
    }
    for (i = 0; i <= height / gScale; i++) {
        stroke(0, 0, 0, 20);
        line(0, i * gScale, width, i * gScale);
    }
    pop();
}

function draw() {
    background('grey');
    if (drawGridCtrl) {
        drawGrid(10);
    }
    if (mode == 3) {
        poly = cFit.poly;
    } else if (mode == 5) {
        poly = cAprox.poly;
    }
    if (poly) {
        poly.draw();
    }
    drawMode(mode);
}

function drawMode(mode) {
    text("mode: " + mode, width - 100, 30);
    noFill();
    strokeWeight(3);
    stroke(0, 255, 0);
    switch (mode) {
        case 3:
            cFit.draw();
            break;
        case 5:
            cAprox.draw();
            break;
    }
}


function keyPressed() {
    if (key === ' ')
    {
        mode = mode === 3 ? 5 : 3;
    }
    if (key == 'G')
    {
        drawGridCtrl = !drawGridCtrl;
    }
    if (key == 'C')
    {
        drawCtrl = !drawCtrl;
    }
}

function mousePressed() {
    if (drawCtrl) {
        for (var i = 0; i < poly.points.length; i++) {
            var p = poly.points[i];
            if (grabber === null) {
                if (p.grabsInput(mouseX, mouseY)) {
                    grabber = p;
                }
            }
        }
    } else {
        grabber = null;
    }
}

function mouseDragged() {
    if (grabber != null) {
        grabber.x = mouseX;
        grabber.y = mouseY;
    }
}

function mouseReleased() {
    grabber = null;
}
