function Fountain() {

    var canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 200;
    var context = canvas.getContext('2d');

    var particles;

    function InitParticles() {
        particles = [];
        for (var n = 0; n < 5; n++) {
            var img = new Image();
            var i = Math.floor(1 + Math.random() * 6);
            img.src = "animations/Fountain/Resources/object" + i.toString() + ".png";
            particles.push({
                x: canvas.width / 2,
                y: canvas.height + 70 / 3,
                vx: (-4 + (Math.random() * 8)),
                vy: (8 + (Math.random() * 6)),
                angle: Math.floor(Math.random() * 360),
                rotation: -5 + Math.floor(Math.random() * 10),
                size: (Math.floor(20 * (5 + Math.random() * 4))) / 3,
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
        InitParticles();
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

        updateParticles();

        // draw
        drawParticles();

        return canvas;
    }

    function drawParticles() {
        if (particles) {
            for (var n = 0; n < particles.length; n++) {
                var particle = particles[n];
                drawRotatedImage(particle.image, particle.x, particle.y, particle.angle, particle.size);
            }
        }
    }

    function drawRotatedImage(image, x, y, angle, size) {
        // save the current co-ordinate system 
        // before we screw with it
        context.save();

        // move to the middle of where we want to draw our image
        context.translate(x, y);

        // rotate around that point, converting our 
        // angle from degrees to radians 
        context.rotate(angle * Math.PI / 180);

        // draw it up and to the left by half the width
        // and height of the image 
        context.drawImage(image, -(size / 2), -(size / 2), size, size);

        // and restore the co-ords to how they were when we began
        context.restore();
    }

    function updateParticles() {
        for (var n = 0; n < particles.length; n++) {
            var particle = particles[n];
            particle.x += particle.vx / 2;
            particle.y -= particle.vy / 2;
            particle.vy = particle.vy - 0.30;
            particle.angle += particle.rotation * 1.5;
        }
    }
}