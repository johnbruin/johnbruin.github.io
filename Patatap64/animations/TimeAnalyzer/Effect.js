function TimeAnalyzer()
{
    var canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 200;
    var context = canvas.getContext('2d');

    var _playing = false;
    this.IsPlaying = function () {
        return _playing;
    }

    var _times = -1;
    var _counter = 0;
    this.Play = function (times) {
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
        
        var width = canvas.width;
        var y = canvas.height / 2;
        var HEIGHT = 100;
        var times = new Uint8Array(myAudioAnalyser.frequencyBinCount);

        myAudioAnalyser.getByteTimeDomainData(times);

        // Draw the time domain chart.
        for (var i = 0; i < myAudioAnalyser.frequencyBinCount; i++) {
            var value = times[i];
            var percent = value / 256;
            var height = HEIGHT * percent;
            var offset = HEIGHT - height - 1;
            var barWidth = width / myAudioAnalyser.frequencyBinCount;
            context.fillStyle = colors.Cyan;
            context.fillRect(i * barWidth, y + offset - HEIGHT / 2, 2, 2);
        }
        return canvas;
    }
}