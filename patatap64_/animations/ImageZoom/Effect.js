function ImageZoom(picture) {

    var canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 200;
    var context = canvas.getContext('2d');

    var _image;
    var _size;

    function Init() {
        _image = new Image();
        _image.src = "animations/ImageZoom/Resources/" + picture;
        _size = 10;
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

        context.drawImage(_image, canvas.width / 2 - _size / 2, canvas.height / 2 - _size / 2, _size, _size);

        _size = _size * 1.25;

        return canvas;
    }
}