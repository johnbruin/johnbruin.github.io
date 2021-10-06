function Lines() {

    var numberoflines = 100;
    var canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 200;
    var context = canvas.getContext('2d');

    var lines;

    function InitLines() {
        lines = [];
        for (var n = 0; n < numberoflines; n++) {
            lines.push({
                x: Math.floor(Math.random() * 32),
                y: 0,
                vy: (3 + (Math.random() * 13)),
                color: colors.Random(),
                length: 200 + Math.random() * 200,
                width: 10
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
                context.fillRect(line.x * 10, line.y - line.length, line.width, line.y);
            }
        }
    }

    function updateLines() {
        for (var n = 0; n < lines.length; n++) {
            var line = lines[n];
            line.y += line.vy;
        }
    }
}