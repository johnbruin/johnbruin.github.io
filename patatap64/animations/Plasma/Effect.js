function Plasma() {

    var canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 200;
    var context = canvas.getContext('2d');

    var RAD = Math.PI / 180.0;
    var Sin = Math.sin;
    var Cos = Math.cos;
    var Sqrt = Math.sqrt;

    var w = canvas.width;
    var h = canvas.height;

    var palette;
    var CycleSpeed = 3;
    var PlasmaDensity = 125;
    var TimeFunction = 576;
    var PlasmaFunction = 1;
    var Jitter = 0;
    var Alpha = 1;
    var paletteoffset;

    function Init() {
        paletteoffset = 0;
        palette = new Array(256);
        PlasmaFunction = Math.round(Math.random());
        TimeFunction = 500 + Math.round(Math.random() * 100);
        for (var i = 0; i < 15; i++) {
            palette[i + 15 * 0] = colors.PlasmaColor(i);
            palette[i + 15 * 1] = colors.PlasmaColor(15 - i);
            palette[i + 15 * 2] = colors.PlasmaColor(i);
            palette[i + 15 * 3] = colors.PlasmaColor(15 - i);
            palette[i + 15 * 4] = colors.PlasmaColor(i);
            palette[i + 15 * 5] = colors.PlasmaColor(15 - i);
            palette[i + 15 * 6] = colors.PlasmaColor(i);
            palette[i + 15 * 7] = colors.PlasmaColor(15 - i);
            palette[i + 15 * 8] = colors.PlasmaColor(i);
            palette[i + 15 * 9] = colors.PlasmaColor(15 - i);
            palette[i + 15 * 10] = colors.PlasmaColor(i);
            palette[i + 15 * 11] = colors.PlasmaColor(15 - i);
            palette[i + 15 * 12] = colors.PlasmaColor(i);
            palette[i + 15 * 13] = colors.PlasmaColor(15 - i);
            palette[i + 15 * 14] = colors.PlasmaColor(i);
            palette[i + 15 * 15] = colors.PlasmaColor(15 - i);
            palette[i + 15 * 16] = colors.PlasmaColor(i);
        }
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

        if (_counter > _times) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            _playing = false;
            return canvas;
        }
        _counter++;

        var pw = PlasmaDensity;
        var ph = (pw * (h / w));
        
        paletteoffset = paletteoffset += CycleSpeed;

        // scale the plasma source to the canvas width/height
        var vpx = (w / pw);
        var vpy = (h / ph); 

        var jitter = Jitter ? (-Jitter + (Math.random() * Jitter * 2)) : 0;
        for (var y = 0, x; y < ph; y++) {
            for (x = 0; x < pw; x++) {
                // map plasma pixels to canvas pixels using the virtual pixel size
                context.fillStyle = palette[(~~colour(x, y) + paletteoffset) % 256];
                context.fillRect(x * vpx + jitter, y * vpy + jitter, vpx, vpy);
            }
        }
        return canvas;
    }

    function colour(x, y) {
        var time = Date.now() / TimeFunction;
        switch (PlasmaFunction) {
            case 0:
                return ((Sin(dist(x + time, y, 128.0, 128.0) / 8.0)
                        + Sin(dist(x - time, y, 64.0, 64.0) / 8.0)
                        + Sin(dist(x, y + time / 7, 192.0, 64) / 7.0)
                        + Sin(dist(x, y, 192.0, 100.0) / 8.0)) + 4) * 32;
                break;
            case 1:
                return (128 + (128 * Sin(x * 0.0625)) +
                        128 + (128 * Sin(y * 0.03125)) +
                        128 + (128 * Sin(dist(x + time, y - time, w, h) * 0.125)) +
                        128 + (128 * Sin(Sqrt(x * x + y * y) * 0.125))) * 0.25;
                break;
        }
    }

    function dist(a, b, c, d) {
        return Sqrt((a - c) * (a - c) + (b - d) * (b - d));
    }
}