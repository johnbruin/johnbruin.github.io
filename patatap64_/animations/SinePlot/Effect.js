function SinePlot() {

    var numberofpoints = 40;
    var canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 200;
    var context = canvas.getContext('2d');

    var points;
    var phase;
    var color;
    var factor;

    function Init() {
        phase = 0;

        factor = -1;
        while (factor == -1 || factor == 1)
            factor = Math.round(Math.random() * 20);

        //alert(factor);

        color = colors.RandomBackgroundColor();
        points = [];
        var img = new Image();
        img.src = "animations/SinePlot/Resources/ball.png";
        for (var n = 0; n < numberofpoints; n++) {            
            points.push({
                x: 0,
                y: 0,
                z: 0,
                image: img
            });
        }
    }

    var _playing = false;
    this.IsPlaying = function () {
        return _playing;
    }

    var _times = -1;
    var _counter = 0;
    this.Play = function (times) {
        Init();
        _times = times;
        _counter = 0;
        _playing = true;
    }

    this.Draw = function () {

        context.beginPath();
        context.clearRect(0, 0, canvas.width, canvas.height);
        if (_counter > _times) {
            _playing = false;
            return canvas;
        }
        _counter++;

        updatePoints();

        // draw
        drawPoints();

        return canvas;
    }

    function drawPoints() {
        if (points) {
            for (var n = 0; n < points.length; n++) {
                var point = points[n];
                context.save();
                var size = point.z / 4;
                context.translate(point.x + 160, point.y + 100);
                context.drawImage(point.image, -(size / 2), -(size / 2), size, size);
                context.restore();
            }
        }
    }

    function updatePoints() {
        var fov = 80;
        phase = phase + .02;
        for (var n = 0; n < numberofpoints; n++) {
            var point = points[n];
            var radians = phase + Math.radians(360 / numberofpoints * (n + 1));
            var x = Math.sin(radians) * 200 * Math.cos(radians);
            var y = 10 + Math.cos(radians * Math.sin(radians / factor)) * 100;
            var z = 50 + Math.cos(radians) * 30;
            var scale = fov / (z + fov);
            point.x = x * scale;
            point.y = y * scale;
            point.z = z;
        }
    }

    // Converts from degrees to radians.
    Math.radians = function (degrees) {
        return degrees * Math.PI / 180;
    };
}