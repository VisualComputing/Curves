
function ControlPoint(x, y, index, type) {
    this.radiusX = 20;
    this.radiusY = 20;
    this.position;
    this.x = x;
    this.y = y;
    this.index = index;
    this.type = type;
    if ((typeof (x) === "undefined")) {
        this.x = random(this.radiusX, width - this.radiusX);
    }
    if ((typeof (x) === "undefined")) {
        this.y = random(this.radiusY, height - this.radiusY);
    }
    this.grabsInput = function (x, y) {
        return(pow((x - this.x), 2) / pow(this.radiusX, 2) + pow((y - this.y), 2) / pow(this.radiusY, 2) <= 1);
    };

    this.dist = function (p1, p2) {
        return new PVector(p1.x - p2.x, p1.y - p2.y);
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

function ControlPolygon(size, showShape) {
    this.points = [];
    if ((typeof (showShape) === "undefined")) {
        this.showShape = 1;
    } else {
        this.showShape = 0;
    }
    var type = "NORMAL";
    for (var i = 0; i < size; i++) {
        if (showShape === 2) {
            if (i % 3 === 0) {
                type = "CENTER";
            }
            if (i % 3 === 2 && i - 2 >= 0 && i + 2 < size) {
                type = "LEFT";
            }
            if (i % 3 === 1 && i - 2 >= 0 && i + 1 < size) {
                type = "RIGHT";
            }
        }
        this.points.push(new ControlPoint(
                undefined
                , undefined
                , i
                , type));
    }

    this.draw = function () {
        push();
        if (showShape === 1) {
            noStroke();
            beginShape(TRIANGLE_STRIP)
            fill(0, 0, 200, 220);
            for (var index = 0; index < this.points.length; index++) {
                var p = this.points[index];
                vertex(p.x, p.y);
            }
            endShape();
        }
        var previous = null;
        stroke(255, 255, 0);
        strokeWeight(3);
        for (var index = 0; index < this.points.length; index++) {
            var current = this.points[index];
            current.draw();
            fill(255, 255, 0);
            if (showShape !== 0) {
                noStroke();
                fill(0);
                text(index + "", current.x, current.y);
                if (previous !== null) {
                    stroke(255, 0, 0);
                    line(previous.x, previous.y, current.x, current.y);
                }
            } else {
                fill(0);
                text("pk" + index, current.x, current.y);
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