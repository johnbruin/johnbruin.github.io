function HorizontalLines() {

    var fov = 250; 
    var numberoflines = 60;
    var canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 200;
    var context = canvas.getContext('2d');

    var lines;

    function InitLines() {
        lines = [];
        for (var n = 0; n < numberoflines; n++) {
            lines.push({
                y: 25 * n,
                z: 50 * n,
                vy: 0,
                color: colors.Black,
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
        InitLines();
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

        updateLines();

        // draw
        drawLines();

        return canvas;
    }

    function drawLines() {
        if (lines) {
            for (var n = 0; n < lines.length; n++) {
                var line = lines[n];
                context.fillStyle = line.color;
                var scale = fov / (fov + line.z);
                var y2d = line.y * scale;
                if (y2d <= canvas.height / 2) {
                    context.fillRect(0, canvas.height - y2d, canvas.width, 1);
                    context.fillRect(0, y2d, canvas.width, 1);
                }
            }
        }
    }

    function updateLines() {
        lines[0].z = lines[0].z + 1;
        lines[0].y += lines[0].vy;
        for (var n = 0; n < lines.length;n++) {
            lines[n].y = lines[n].y - 2.5;
        }
    }
}