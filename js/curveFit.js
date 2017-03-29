function CurveFit(size) {
    this.poly = null;
    this.setup = function () {
        this.poly = new ControlPolygon(size,0);
    };
    this.draw = function () {
        beginShape();
        var actual;
        actual = this.poly.points[0];
        curveVertex(actual.x, actual.y);
        for (var i = 0; i < this.poly.points.length; i++) {
            actual = this.poly.points[i];
            curveVertex(actual.x, actual.y);
        }
        actual = this.poly.points[this.poly.points.length - 1];
        curveVertex(actual.x, actual.y);
        endShape();
    };

}
