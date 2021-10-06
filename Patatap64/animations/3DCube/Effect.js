function Cube3D() {

    var canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 200;
    var context = canvas.getContext('2d');

    var _playing = false;
    this.IsPlaying = function () {
        return _playing;
    }

    var _times = -1;
    var _counter = 0;
    this.Play = function (times) {
        _times = times;
        _counter = 0;
        _playing = true;
    }

    function Point3D(X, Y, Z) {

        this.x = X;
        this.y = Y;
        this.z = Z;

        this.rotateX = function (angle) {
            var rad, cosa, sina, y, z;
            rad = angle * Math.PI / 180;
            cosa = Math.cos(rad);
            sina = Math.sin(rad);
            y = this.y * cosa - this.z * sina;
            z = this.y * sina + this.z * cosa;
            return new Point3D(this.x, y, z);
        }

        this.rotateY = function (angle) {
            var rad, cosa, sina, x, z;
            rad = angle * Math.PI / 180;
            cosa = Math.cos(rad);
            sina = Math.sin(rad);
            z = this.z * cosa - this.x * sina;
            x = this.z * sina + this.x * cosa;
            return new Point3D(x, this.y, z);
        }

        this.rotateZ = function (angle) {
            var rad, cosa, sina, x, y;
            rad = angle * Math.PI / 180;
            cosa = Math.cos(rad);
            sina = Math.sin(rad);
            x = this.x * cosa - this.y * sina;
            y = this.x * sina + this.y * cosa;
            return new Point3D(x, y, this.z);
        }

        this.project = function (viewWidth, viewHeight, fov, viewDistance) {
            var factor, x, y;
            factor = fov / (viewDistance + this.z);
            x = this.x * factor + viewWidth / 2;
            y = this.y * factor + viewHeight / 2;
            return new Point3D(x, y, this.z);
        }
    }

    var vertices = [
        new Point3D(-1, 1, -1),
        new Point3D(1, 1, -1),
        new Point3D(1, -1, -1),
        new Point3D(-1, -1, -1),
        new Point3D(-1, 1, 1),
        new Point3D(1, 1, 1),
        new Point3D(1, -1, 1),
        new Point3D(-1, -1, 1)
    ];

    //// Define the vertices that compose each of the 6 faces. These numbers are
    //// indices to the vertex list defined above.
    var faces = [[0, 1, 2, 3], [1, 5, 6, 2], [5, 4, 7, 6], [4, 0, 3, 7], [0, 4, 5, 1], [3, 2, 6, 7]];

    // Define the colors for each face.
    var _colors = [
        colors.Cyan,
        colors.LightBlue,
        colors.Cyan,
        colors.LightBlue,
        colors.Blue,
        colors.Blue,
        colors.LigthGreen,
        colors.Blue
    ];

    var angle = 0;

    this.Draw = function () {

        context.beginPath();
        context.clearRect(0, 0, canvas.width, canvas.height);
        if (_counter > _times) {
            _playing = false;
            return canvas;
        }
        _counter++;

        var t = new Array();

        for (var i = 0; i < vertices.length; i++) {
            var v = vertices[i];
            var r = v.rotateZ(angle).rotateX(angle).rotateZ(angle);
            var p = r.project(320, 200, 140, 4);
            t.push(p);
        }

        var avg_z = new Array();

        for (var i = 0; i < faces.length; i++) {
            var f = faces[i];
            var tot = 0;
            for (var pp = 0; pp < f.length; pp++) {
                tot = tot + t[f[pp]].z;
            }
            avg_z[i] = { "index": i, "z": tot / f.length };            
        }

        avg_z.sort(function (a, b) {
            return b.z - a.z;
        });

        for (var i = 0; i < faces.length; i++) {
            var f = faces[avg_z[i].index];
            context.save();
            context.fillStyle = _colors[avg_z[i].index];
            context.beginPath();
            context.moveTo(t[f[0]].x, t[f[0]].y);
            for (var pp = 1; pp < f.length; pp++) {
                context.lineTo(t[f[pp]].x, t[f[pp]].y);            
            }
            context.closePath();
            context.fill();
            context.restore();
        }
        angle += 2;
        return canvas;
    }
}