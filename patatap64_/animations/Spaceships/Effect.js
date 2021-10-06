function Spaceships() {

    var canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 200;
    var context = canvas.getContext('2d');

    var _spaceships;
    var _index = 0;

    function InitSpaceships() {
        _spaceships = [];
        for (var n = 1; n <= 5; n++) {
            var img = new Image();
            img.src = "animations/Spaceships/Resources/boss" + n.toString() + ".png";
            _spaceships.push({
                x: canvas.width / 2,
                y: canvas.height + img.height,
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
        InitSpaceships();
        _times = times;
        _counter = 0;
        _index = Math.floor(Math.random() * 5);
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

        context.drawImage(_spaceships[_index].image, _spaceships[_index].x - (_spaceships[_index].image.width / 2), _spaceships[_index].y - (_spaceships[_index].image.height / 2));

        _spaceships[_index].y = _spaceships[_index].y - 10;

        return canvas;
    }
}