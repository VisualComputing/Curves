function CurveHermite(size) {
    this.poly = null;
    this.cPoints = [];
    this.setup = function () {
        this.poly = new ControlPolygon(size, 0);
        for (var i = 0; i < size; i++) {
            this.cPoints.push(new TangentPoint(this.poly.points[i]));
        }
    };
    this.draw = function () {
        var actual, tPoint;
        for (var i = 0; i < this.poly.points.length; i++) {
            actual = this.poly.points[i];
            tPoint = this.cPoints[i];
            push();
            stroke(0, 120, 255);
            strokeWeight(2);
            line(actual.x, actual.y, tPoint.x, tPoint.y);
            tPoint.draw();
            pop();
            this.drawCurve();
        }
        actual = this.poly.points[this.poly.points.length - 1];
    };
    this.drawCurve = function () {
        var steps = 50;
        for (var i = 0; i < this.poly.points.length - 1; i++) {
            var prev = null;
            for (var st = 0; st <= steps; st++) {
                var result = new PVector(0, 0);
                var t = st / steps;
                var t3 = pow(t, 3);
                var t2 = pow(t, 2);
                result = result.add(result, result.mult(this.poly.points[i], 2 * t3 - 3 * t2 + 1));
                result = result.add(result, result.mult(this.cPoints[i], t3 - 2 * t2 + t));
                result = result.add(result, result.mult(this.poly.points[i + 1], -2 * t3 + 3 * t2));
                result = result.add(result, result.mult(this.cPoints[i + 1], t3 - t2));
                if (prev !== null) {
                    line(prev.x, prev.y, result.x, result.y);
                }
                prev = result;
            }
        }
    };

}


function TangentPoint(pt) {
    this.x = pt.x;
    this.y = pt.y - 10;
    this.r = 10;
    this.draw = function () {
        push();
        noStroke();
        fill(255, 0, 0);
        ellipse(this.x, this.y, this.r, this.r);
        pop();
    };
    this.grabsInput = function (x, y) {
        return(pow((x - this.x), 2) / pow(this.r, 2) + pow((y - this.y), 2) / pow(this.r, 2) <= 1);
    };

}