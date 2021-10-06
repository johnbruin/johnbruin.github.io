function Noise() {

    var canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 200;
    var context = canvas.getContext('2d');

    function Init() {

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

        var w = context.canvas.width;
        var h = context.canvas.height;

        if (_counter > _times)
        {
            _playing = false;
            return canvas;
        }
        _counter++;

        var idata = context.createImageData(w, h);
        var buffer32 = new Uint32Array(idata.data.buffer);
        var len = buffer32.length;
        for (var i = 0; i < len; i++)
            if (Math.random() < 0.5)
                buffer32[i] = 0xff000000;

        context.putImageData(idata, 0, 0);

        return canvas;
    }
}