function SpectrumAnalyzer()
{
    var canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 200;
    var context = canvas.getContext('2d');

    width = canvas.width;
    height = canvas.height - 9;

    var bar_width = 40;
    var barCount = Math.round(width / bar_width);

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

        var block_height = 11;
        var y2 = block_height - 3;

        var freqByteData = new Uint8Array(myAudioAnalyser.frequencyBinCount);
        myAudioAnalyser.getByteFrequencyData(freqByteData);

        for (var i = 0; i < barCount; i++) {

            var magnitude = freqByteData[i * 5];
            var bar_height = Math.round((magnitude) / block_height / 2);
            
            for (var j = 0; j < bar_height; j++) {
                var y1 = height - (j * block_height);
                context.strokeStyle = colors.Black;
                context.strokeRect(bar_width * i, y1, bar_width - 5, y2);
            }
        }        
        return canvas;
    }
}