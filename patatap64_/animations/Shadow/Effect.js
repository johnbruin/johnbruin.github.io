function Shadow() {

    var canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 200;
    var context = canvas.getContext('2d');

    var _shadows;
    var _index;
    var _indexadd = .75;

    function InitShadows() {
        _shadows = [];
        for (var n = 1; n <= 19; n++) {
            var img = new Image();
            img.src = "animations/Shadow/Resources/Shadow" + n.toString() + ".png";
            _shadows.push({
                x: canvas.width / 2 - 160,
                y: canvas.height / 2 - 90,
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
        InitShadows();
        _times = times;
        _counter = 0;
        _index = 8;
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

        var i = Math.floor(_index);
        if (_shadows[i].image.width == 0)
            return canvas;

        context.drawImage(_shadows[i].image, _shadows[i].x - 90, _shadows[i].y, 320, 180);

        context.save();
        context.scale(-1, 1);
        context.drawImage(_shadows[i].image, _shadows[i].x - 90, _shadows[i].y, -320, 180);
        context.restore();

        if (i >= 18 || i <= 0)
            _indexadd = -_indexadd;

         _index = _index + _indexadd;

        return canvas;
    }
}