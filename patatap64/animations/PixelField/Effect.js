function PixelField() {

    var canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 200;
    var context = canvas.getContext('2d'),
    width = canvas.width,
    height = canvas.height,
    halfWidth = width / 2,
    halfHeight = height / 2,
    fov = 350,
    offsetX = 0,
    offsetY = 0,
    mouseX = 0,
    mouseY = 0,
    pixels;

    function Init() {
        mouseX = -100 + Math.random() * 200;
        mouseY = -50 + Math.random() * 100;

        // set up an grid of 3D Pixels in undulating waves
        pixels = [];
        for(var x = -500; x<500; x+=6) { 
            for(var z = -150; z<150; z+=6) { 
                var zOscillation = Math.sin(z*(Math.PI*4/250));
                var xOscillation = Math.sin((x+z)*(Math.PI*2/250));
                var pixel = new Pixel3D(x,(zOscillation+xOscillation)*14+30,z);
                pixels.push(pixel); 
            }
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

        context.beginPath();
        context.clearRect(0, 0, canvas.width, canvas.height);
        if (_counter > _times) {
            _playing = false;
            return canvas;
        }
        _counter++;

        render();

        return canvas;
    }

    function render() {

        mouseX = mouseX + 1;

        // ease offsetX and offsetY towards the 
        // mouse position (to smooth the "camera" 
        // motion). 
        offsetX += (mouseX - offsetX) * 0.1;
        offsetY += (mouseY - offsetY) * 0.1;

        // clear the canvas
        context.clearRect(0, 0, width, height);
        // and get the imagedata out of it
        var imagedata = context.getImageData(0, 0, canvas.width, canvas.height);

        // iterate through every point in the array
        var i = pixels.length;
        while (i--) {
            var pixel = pixels[i];

            // here's the 3D to 2D formula, first work out 
            // scale for that pixel's z position (distance from 
            // camera)
            var scale = fov / (fov + pixel.z);
            // and multiply our 3D x and y to get our
            // 2D x and y. Add halfWidth and halfHeight
            // so that our 2D origin is in the middle of 
            // the screen.
            var x2d = ((pixel.x + offsetX) * scale) + halfWidth;
            var y2d = ((pixel.y + offsetY) * scale) + halfHeight;


            drawPoint(context, x2d, y2d, 1, colors.LightGreen);

            // add 1 to the z position to bring it a little 
            // closer to the camera each frame
            pixel.z -= 1.5;
            // if it's now too close to the camera, 
            // move it to the back
            if (pixel.z < -fov) pixel.z += (fov * 2);

        }

        // and write all those pixel values into the canvas
        //context.putImageData(imagedata, 0, 0);

    }

    function drawPoint(context, x, y, size, color) {
        if ((x < 0) || (x > width) || (y < 0) || (y > width)) return;
        context.save();
        context.beginPath();
        context.fillStyle = color;
        context.arc(x, y, size, 0, 2 * Math.PI, true);
        context.fill();
        context.restore();
    }

    function Pixel3D(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}