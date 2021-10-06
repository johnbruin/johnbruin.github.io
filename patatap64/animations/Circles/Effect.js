function Circles() {

    var canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 200;
    var context = canvas.getContext('2d');

    var imageObj1 = new Image();
    imageObj1.src = "animations/Circles/Resources/Circle1.png";

    var imageObj2 = new Image();
    imageObj2.src = "animations/Circles/Resources/Circle2.png";

    var imageObj3 = new Image();
    imageObj3.src = "animations/Circles/Resources/Circle3.png";

    var angle = 0;
    var radius = 50;
    radius_add = -1;

    var _playing = false;
    this.IsPlaying = function () {
        return _playing;
    }

    var _times = -1;
    var _counter = 0;
    this.Play = function (times) {
        _times = times;
        _counter = 0;
        _index = 0;
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

        context.globalCompositeOperation = 'lighter';

        var x1 = Math.sin(angle + Math.PI * 2 / 3 * 0) * radius;
        var y1 = Math.cos(angle + Math.PI * 2 / 3 * 0) * radius;

        var x2 = Math.sin(angle + Math.PI * 2 / 3 * 1) * radius;
        var y2 = Math.cos(angle + Math.PI * 2 / 3 * 1) * radius;

        var x3 = Math.sin(angle + Math.PI * 2 / 3 * 2) * radius;
        var y3 = Math.cos(angle + Math.PI * 2 / 3 * 2) * radius;
        
        context.drawImage(imageObj1, (canvas.width / 2) - x1 - 35, (canvas.height / 2) - y1 - 35, 70, 70);
        context.drawImage(imageObj2, (canvas.width / 2) - x2 - 35, (canvas.height / 2) - y2 - 35, 70, 70);
        context.drawImage(imageObj3, (canvas.width / 2) - x3 - 35, (canvas.height / 2) - y3 - 35, 70, 70);

        radius = radius + radius_add;
        if (radius <= 0 || radius >= 50) {
            radius_add = -radius_add;
        }

        angle = angle + 0.1;
        if (angle > Math.PI * 2)
            angle = 0;

        return canvas;
    }
}