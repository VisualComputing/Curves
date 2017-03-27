
function ControlPoint(x, y) {
    this.radiusX = 20;
    this.radiusY = 20;
    this.position;
    this.x = x;
    this.y = y;
    if ((typeof (x) === "undefined")) {
        this.x = random(this.radiusX, width - this.radiusX);
    }
    if ((typeof (x) === "undefined")) {
        this.y = random(this.radiusY, height - this.radiusY);
    }
    this.grabsInput = function (x, y) {
        return(pow((x - this.x), 2) / pow(this.radiusX, 2) + pow((y - this.y), 2) / pow(this.radiusY, 2) <= 1);
    };

    this.draw = function () {
        push();
        strokeWeight(2);
        stroke(255, 255, 0);
        fill(this.grabsInput(mouseX, mouseY) ? 255 : 255, 255, 0, 125);
        ellipse(this.x, this.y, 2 * this.radiusX, 2 * this.radiusY);
        pop();
    };
}

function ControlPolygon(size) {
    this.points = [];
    for (var i = 0; i < size; i++) {
        this.points.push(new ControlPoint());
    }

    this.draw = function () {
        push();
        noStroke();
        beginShape(TRIANGLE_STRIP)
        fill(0, 0, 200, 220);
        for (var index = 0; index < this.points.length; index++) {
            var p = this.points[index];
            vertex(p.x, p.y);
        }
        endShape();
        var previous = null;
        stroke(255, 255, 0);
        strokeWeight(3);
        for (var index = 0; index < this.points.length; index++) {
            var current = this.points[index];
            current.draw();
            fill(255, 255, 0);
            text(index + "", current.x, current.y);
            if (previous !== null) {
                stroke(255, 0, 0);
                line(previous.x, previous.y, current.x, current.y);
            }
            previous = current;
        }
        pop();
    };
}

function PVector(x, y) {
    this.x = x;
    this.y = y;
    this.add = function (p1, p2) {
        return new PVector(p1.x + p2.x, p1.y + p2.y);
    };
    this.mult = function (p1, c) {
        return new PVector(p1.x * c, p1.y * c);
    };
}