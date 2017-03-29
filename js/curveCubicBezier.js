function CurveBezier(size) {
    this.size = size;
    this.poly = new ControlPolygon(size);
    this.setup = function () {
        this.poly = new ControlPolygon(this.size, 2);
    };
    this.draw = function () {
        var current, next, next2, prev;
        prev = this.poly.points[0];
        for (var i = 1; i < this.poly.points.length - 2; i += 3) {
            current = this.poly.points[i];
            next = this.poly.points[i + 1];
            next2 = this.poly.points[i + 2];
            bezier(prev.x, prev.y, current.x, current.y, next.x, next.y, next2.x, next2.y);
            prev = next2;
        }
    };

}

       