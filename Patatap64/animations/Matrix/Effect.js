function Matrix() {

    var canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 200;
    var context = canvas.getContext('2d');

    var yPositions = Array(300).join(0).split('');

    function Init() {
        context.fillStyle = 'rgb(0,0,0)';
        context.fillRect(0, 0, canvas.width, canvas.height);
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

        var w = context.canvas.width;
        var h = context.canvas.height;

        if (_counter > _times)
        {
            context.clearRect(0, 0, canvas.width, canvas.height)
            _playing = false;
            return canvas;
        }
        _counter++;

        context.fillStyle = 'rgba(0,0,0,.05)';
        context.fillRect(0, 0, w, h);
        context.fillStyle = colors.Green;
        context.font = '5pt CommodoreServer';

        yPositions.map(function (y, index) {
            var text = String.fromCharCode(34 + Math.random() * 66);
            var x = (index * 10) + 10;
            context.fillText(text, x, y);
            if (y > 100 + Math.random() * 1e4) {
                yPositions[index] = 0;
            }
            else {
                yPositions[index] = y + 10;
            }
        });

        return canvas;
    }
}