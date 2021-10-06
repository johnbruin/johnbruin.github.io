function FliScroller(scrolltext) {

    var canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 200;
    var context = canvas.getContext('2d');

    var _image;
    var _size;
    var _letters = {
        a: [0, 40], b: [40, 40], c: [80, 40], d: [120, 40], e: [160, 40], f: [200, 32], g: [232, 40], h: [272, 40], i: [312, 16], j: [328, 32], k: [360, 40], l: [400, 16], m: [416, 64], n: [480, 40], o: [520, 40], p: [560, 40], q: [600, 40], r: [640, 32], s: [672, 40], t: [712, 32], u: [744, 40], v: [784, 40], w: [824, 64], x: [888, 40], y: [928, 40], z: [968, 40]
    };
    var _letter_height = 75;
    var _letter_offset = 2;
    var _xpos;

    var _scrollcanvas;
    var _scrollcontext;

    function Init() {
        _image = new Image();
        _image.src = "animations/FliScroller/Resources/fli_font.png";

        _scrollcanvas = document.createElement("canvas");
        _scrollcanvas.width = scrolltext.length * 50;
        _scrollcanvas.height = _letter_height;
        _scrollcontext = _scrollcanvas.getContext('2d');

        var x = 0;
        for (var i = 0; i < scrolltext.length; i++) {
            letter = scrolltext[i];
            if (letter == ' ')
                x = x + 40;
            else {
                _scrollcontext.drawImage(_image, _letters[letter][0], _letter_offset, _letters[letter][1], _letter_height, x, 0, _letters[letter][1], _letter_height);
                x = x + _letters[letter][1] + 5;
            }
        }
    }

    Init();

    var _playing = false;
    this.IsPlaying = function () {
        return _playing;
    }

    var _times = -1;
    var _counter = 0;
    this.Play = function (times) {
        xpos = canvas.width;
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
        
        context.drawImage(_scrollcanvas, xpos, canvas.height / 2 - _letter_height / 2);
        xpos = xpos - 6;

        return canvas;
    }
}