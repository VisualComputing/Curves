function CurveAprox(size) {
    this.size = size;
    this.poly = new ControlPolygon(size);
    this.consts = getPascalTriangle(size);
    this.setup = function () {
        this.poly = new ControlPolygon(this.size, true);
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
//        var current,next,next2,prev;
//        prev=this.poly.points[0];
//        for (var i = 1; i < this.poly.points.length - 2; i += 3) {
//            current = this.poly.points[i];
//            next = this.poly.points[i + 1];
//            next2 = this.poly.points[i + 2];
//            bezier(prev.x, prev.y, current.x, current.y, next.x, next.y, next2.x, next2.y);
//            prev = next2;
//        }
    };

}

//test 6:     1  5 10 10 5 1 
//test 7:  [1, 6, 15, 20, 15, 6, 1]
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