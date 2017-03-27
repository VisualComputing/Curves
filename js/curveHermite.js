function CurveHermite(size) {
    this.poly = null;
    this.cPoints = [];
    this.setup = function () {
        this.poly = new ControlPolygon(size, false);
        for (var i = 0; i < size; i++) {
            this.cPoints.push(new TangentPoint(this.poly.points[i]));
        }
    };
    this.draw = function () {
        var actual, tPoint;
        for (var i = 0; i < this.poly.points.length; i++) {
            actual = this.poly.points[i];
            tPoint = this.cPoints[i];
            line(actual.x, actual.y, tPoint.x, tPoint.y);
            tPoint.draw();
        }
        actual = this.poly.points[this.poly.points.length - 1];
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

}