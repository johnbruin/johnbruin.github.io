function Stickman() {
    var canvas = document.createElement("canvas");
    canvas.width = 500;
    canvas.height = 400;
    var context = canvas.getContext('2d');

    var _playing = false;
    this.IsPlaying = function () {
        return _playing;
    }

    var _frame;

    var _times = -1;
    var _counter = 0;
    this.Play = function (times) {
        _frame = 0;
        _times = times;
        _counter = 0;
        _playing = true;
    }

    this.Draw = function () {

        context.clearRect(0, 0, canvas.width, canvas.height);

        if (_counter >= _times) {
            _playing = false;
            return canvas;
        }
        _counter++;

        _frame = _frame + 1.5
        var frame = Math.round(_frame);
        if (frame > motion.length - 1)
            _frame = 0;

        context.beginPath();

        context.save();

        context.translate(canvas.width / 4, canvas.height / 4);
        context.scale(0.5, 0.5);

        context.moveTo(motion[frame].Head[0], motion[frame].Head[1]);
        context.lineTo(motion[frame].Neck[0], motion[frame].Neck[1]);
        context.lineTo(motion[frame].SpineShoulder[0], motion[frame].SpineShoulder[1]);
        context.lineTo(motion[frame].SpineMid[0], motion[frame].SpineMid[1]);
        context.lineTo(motion[frame].SpineBase[0], motion[frame].SpineBase[1]);
        context.lineTo(motion[frame].HipRight[0], motion[frame].HipRight[1]);
        context.lineTo(motion[frame].KneeRight[0], motion[frame].KneeRight[1]);
        context.lineTo(motion[frame].AnkleRight[0], motion[frame].AnkleRight[1]);
        context.moveTo(motion[frame].HandLeft[0], motion[frame].HandLeft[1]);
        context.moveTo(motion[frame].HandLeft[0], motion[frame].HandLeft[1]);
        context.lineTo(motion[frame].ElbowLeft[0], motion[frame].ElbowLeft[1]);
        context.lineTo(motion[frame].ShoulderLeft[0], motion[frame].ShoulderLeft[1]);
        context.lineTo(motion[frame].SpineShoulder[0], motion[frame].SpineShoulder[1]);
        context.lineTo(motion[frame].ShoulderRight[0], motion[frame].ShoulderRight[1]);
        context.lineTo(motion[frame].ElbowRight[0], motion[frame].ElbowRight[1]);
        context.lineTo(motion[frame].HandRight[0], motion[frame].HandRight[1]);
        context.moveTo(motion[frame].HandRight[0], motion[frame].HandRight[1]);
        context.moveTo(motion[frame].SpineBase[0], motion[frame].SpineBase[1]);
        context.lineTo(motion[frame].HipLeft[0], motion[frame].HipLeft[1]);
        context.lineTo(motion[frame].KneeLeft[0], motion[frame].KneeLeft[1]);
        context.lineTo(motion[frame].AnkleLeft[0], motion[frame].AnkleLeft[1]);
        context.strokeStyle = colors.White;
        context.stroke();
        context.closePath();

        //Draw head
        var r = 15;
        drawCircle(motion[frame].Head[0], motion[frame].Head[1] + 10, 15);

        //Draw joints
        var r = 5;
        drawCircle(motion[frame].ShoulderLeft[0], motion[frame].ShoulderLeft[1], r);
        drawCircle(motion[frame].SpineShoulder[0], motion[frame].SpineShoulder[1], r);
        drawCircle(motion[frame].ShoulderRight[0], motion[frame].ShoulderRight[1], r);
        drawCircle(motion[frame].SpineMid[0], motion[frame].SpineMid[1], r);
        drawCircle(motion[frame].SpineBase[0], motion[frame].SpineBase[1], r);
        drawCircle(motion[frame].HipLeft[0], motion[frame].HipLeft[1], r);
        drawCircle(motion[frame].HipRight[0], motion[frame].HipRight[1], r);
        drawCircle(motion[frame].ElbowLeft[0], motion[frame].ElbowLeft[1], r);
        drawCircle(motion[frame].ElbowRight[0], motion[frame].ElbowRight[1], r);
        drawCircle(motion[frame].HandLeft[0], motion[frame].HandLeft[1], r);
        drawCircle(motion[frame].HandRight[0], motion[frame].HandRight[1], r);
        drawCircle(motion[frame].KneeLeft[0], motion[frame].KneeLeft[1], r);
        drawCircle(motion[frame].KneeRight[0], motion[frame].KneeRight[1], r);
        drawCircle(motion[frame].AnkleLeft[0], motion[frame].AnkleLeft[1], r);
        drawCircle(motion[frame].AnkleRight[0], motion[frame].AnkleRight[1], r);
        
        context.restore();

        return canvas;
    }

    function drawCircle(x, y, r) {
        context.beginPath();
        context.arc(x, y, r, 0, 2 * Math.PI, false);
        context.fillStyle = colors.White;
        context.fill();
        context.closePath();
    }
}