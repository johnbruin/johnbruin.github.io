function Arrows() {

    var canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 200;
    var context = canvas.getContext('2d');

    var _arrows;
    var _index;
    var _opacity;
    var _opacityAdd = -0.1;

    function InitArrows() {
        _arrows = [];
        for (var n = 0; n <= 11; n++) {
            var img = new Image();
            img.src = "animations/Arrows/Resources/arrows" + n.toString() + ".png";
            _arrows.push({
                x: canvas.width / 2 - 100,
                y: canvas.height / 2 - 100,
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
        if (_arrows == null)
            InitArrows();
        _times = times;
        _counter = 0;
        _index = 0;
        _opacity = 1;
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

        if (_opacity < 0.4 || _opacity > 1) {
            _opacityAdd = -_opacityAdd;
        }
        _opacity = _opacity - _opacityAdd;

        var i = Math.floor(_index);
        if (_arrows[i].image.width == 0)
            return canvas;

        context.drawImage(_arrows[i].image, _arrows[i].x, _arrows[i].y, 200, 200);

        if (i < 11)
            _index = _index + 0.13;
        else
            _index = 0;

        return canvas;
    }
}