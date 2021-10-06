function Pacman() {

    var canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 200;
    var context = canvas.getContext('2d');

    var _direction;
    var _pacman;
    var _blinky;
    var _pinky;
    var _inky;
    var _clyde;

    var _indexPacman = 0;
    var _indexGhost = 0;

    var x;

    function Init() {
        _pacman = [];
        for (var n = 0; n <= 3; n++) {
            var img = new Image();
            img.src = "animations/Pacman/Resources/pacman" + n.toString() + ".png";
            _pacman.push({
                image: img
            });
        }

        _blinky = [];
        _pinky = [];
        _inky = [];
        _clyde = [];
        for (var n = 0; n <= 1; n++) {
            var img = new Image();
            img.src = "animations/Pacman/Resources/blinky" + n.toString() + ".png";
            _blinky.push({
                image: img
            });

            img = new Image();
            img.src = "animations/Pacman/Resources/pinky" + n.toString() + ".png";
            _pinky.push({
                image: img
            });

            img = new Image();
            img.src = "animations/Pacman/Resources/inky" + n.toString() + ".png";
            _inky.push({
                image: img
            });

            img = new Image();
            img.src = "animations/Pacman/Resources/clyde" + n.toString() + ".png";
            _clyde.push({
                image: img
            });
        }
        _direction = Math.round(Math.random());
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
        _indexPacman = 0;
        _indexGhost = 0;
        if (_direction == 0)
            x = canvas.width;
        else
            x = 0;

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

        y = canvas.height / 2;
        
        if (_direction == 0) {
            context.drawImage(_pacman[_indexPacman].image, x, y);
            context.drawImage(_blinky[_indexGhost].image, x * 1.1 + 30, y);
            context.drawImage(_pinky[_indexGhost].image, x * 1.2 + 60, y);
            context.drawImage(_inky[_indexGhost].image, x * 1.3 + 90, y);
            context.drawImage(_clyde[_indexGhost].image, x * 1.4 + 140, y);
        }
        else
        {
            context.save();
            context.scale(-1, 1);
            context.drawImage(_pacman[_indexPacman].image, x * 1.2 + 140, y - 6, 26, 26);
            context.drawImage(_blinky[_indexGhost].image, x * 1.4 + 30, y);
            context.drawImage(_pinky[_indexGhost].image, x * 1.3 + 60, y);
            context.drawImage(_inky[_indexGhost].image, x * 1.3 + 90, y);
            context.drawImage(_clyde[_indexGhost].image, x * 1.2 + 100, y);
            context.restore();
        }        
        x = x - 8;


        if (_indexGhost == 1)
            _indexGhost = 0;
        else
            _indexGhost = 1;

        _indexPacman++;
        if (_indexPacman > 3)
            _indexPacman = 0;

        return canvas;
    }
}