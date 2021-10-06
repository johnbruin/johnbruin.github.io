function Starfield()
{
    var canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 200;
    var context = canvas.getContext('2d');

    var stars = new Array(512);
    var MAX_DEPTH = 32;

    /* Returns a random number in the range [minVal,maxVal] */
    function randomRange(minVal, maxVal) {
        return Math.floor(Math.random() * (maxVal - minVal - 1)) + minVal;
    }

    function InitStars() {
        for (var i = 0; i < stars.length; i++) {
            stars[i] = {
                x: randomRange(-25, 25),
                y: randomRange(-25, 25),
                z: randomRange(1, MAX_DEPTH)
            }
        }
    }

    var _playing = false;
    this.IsPlaying = function () {
        return _playing;
    }

    var _times = -1;
    var _counter = 0;
    this.Play = function (times) {
        InitStars();
        _times = times;
        _counter = 0;
        _playing = true;
    }

    this.Draw = function () {
        
        context.beginPath();
        context.clearRect(0, 0, canvas.width, canvas.height);

        if (_counter >= _times) {
            _playing = false;
            return canvas;
        }
        _counter++;

        context.fillStyle = "rgb(0,0,0)";
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        var halfWidth = canvas.width / 2;
        var halfHeight = canvas.height / 2;

        for (var i = 0; i < stars.length; i++) {
            stars[i].z -= 0.2;

            if (stars[i].z <= 0) {
                stars[i].x = randomRange(-25, 25);
                stars[i].y = randomRange(-25, 25);
                stars[i].z = MAX_DEPTH;
            }

            var k = 128.0 / stars[i].z;
            var px = stars[i].x * k + halfWidth;
            var py = stars[i].y * k + halfHeight;

            if (px >= 0 && px <= 500 && py >= 0 && py <= 400) {
                var size = (1 - stars[i].z / 32.0) * 5;
                var shade = parseInt((1 - stars[i].z / 32.0) * 255);
                context.fillStyle = "rgb(" + shade + "," + shade + "," + shade + ")";
                context.fillRect(px, py, size, size);
            }
        }

        return canvas;
    }
}