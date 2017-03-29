function CurveAprox(size) {
    this.size = size;
    this.poly = new ControlPolygon(size);
    this.consts = getPascalTriangle(size);
    this.setup = function () {
        this.poly = new ControlPolygon(this.size, 1);
        this.consts = getPascalTriangle(this.size);
    };
    this.draw = function () {
        var steps = 50;
        prev = null;
        for (var st = 0; st <= steps; st++) {
            var result = new PVector(0, 0);
            var t = st / steps;
            var u = 1 - t;
            for (var i = 0; i < this.poly.points.length; i++) {
                var pt = pow(t, i);
                var pu = pow(u, this.poly.points.length - i - 1);
                result = result.add(result, result.mult(this.poly.points[i], (this.consts[i] * pt * pu)));
            }
            if (prev !== null) {
                line(prev.x, prev.y, result.x, result.y);
            }
            prev = result;
        }
    };

}

function getPascalTriangle(size) {
    if (size <= 1) {
        return [1];
    }
    var prev = getPascalTriangle(size - 1);
    var current = [];
    var pVal = 0;
    for (var i = 0; i < size - 1; i++) {
        current[i] = pVal + prev[i];
        pVal = prev[i];
    }
    current[size - 1] = 1;
    return current;
}