function Kaleidoscope() {

    var canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 200;
    var context = canvas.getContext('2d');

    var _images = [];
    var _image = new Image();
    _image.src = "animations/BackgroundKaleidoscope/Resources/image0.png";
    _images.push(_image);


    _image = new Image();
    _image.src = "animations/BackgroundKaleidoscope/Resources/image1.png";
    _images.push(_image);

    _image = new Image();
    _image.src = "animations/BackgroundKaleidoscope/Resources/image2.png";
    _images.push(_image);
    
    var _cropX = 0;
    var _cropY = 0;
    var _cropXadd = .5;
    var _cropYadd = 1;

    function Init() {
        var x = Math.round(Math.random() * (_images.length - 1));
        _image = _images[x];
        _cropX = 0;
        _cropY = 0;
        _cropXadd = .5;
        _cropYadd = 1;
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
        
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        if (_counter > _times) {
            _playing = false;
            return canvas;
        }
        _counter++;
        
        _cropX = _cropX + _cropXadd;
        _cropY = _cropY + _cropYadd;

        if (_cropX >= _image.width / 2 || _cropX <= 0)
            _cropXadd = -_cropXadd;

        if (_cropY >= _image.height / 2 || _cropY <= 0)
            _cropYadd = -_cropYadd;

        flipImage(context, _image, false, false, 0, 0);
        flipImage(context, _image, true, false, canvas.width / 2, 0);
        flipImage(context, _image, false, true, 0, canvas.height / 2);
        flipImage(context, _image, true, true, canvas.width / 2, canvas.height / 2);
        
        return canvas;
    }

    function flipImage(ctx, img, flipH, flipV, x, y) {

        var w = canvas.width / 2;
        var h = canvas.height / 2;
        var scaleH = flipH ? -1 : 1; // Set horizontal scale to -1 if flip horizontal
        var scaleV = flipV ? -1 : 1; // Set verical scale to -1 if flip vertical
        var posX = flipH ? w : 0; // Set x position to -100% if flip horizontal 
        var posY = flipV ? h : 0; // Set y position to -100% if flip vertical

        ctx.save(); // Save the current state

        ctx.translate(posX, posY);
        ctx.translate(x, y);
        ctx.scale(scaleH, scaleV); // Set scale to flip the image
        ctx.drawImage(img, _cropX, _cropY, img.width / 2, img.height / 2, 0, 0, w, h); // draw the image
                
        ctx.restore(); // Restore the last saved state
    };
}