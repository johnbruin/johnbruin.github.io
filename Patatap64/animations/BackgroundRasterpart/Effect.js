function Rasterpart() {

    var canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 200;
    var context = canvas.getContext('2d');

    var bar1 = [
        colors.Black,
        colors.Brown, 
        colors.DarkGray,
        colors.LightBrown, 
        colors.Gray,
        colors.LightGray,
        colors.Yellow, 
        colors.White, 
        colors.Yellow, 
        colors.LightGray,
        colors.Gray,
        colors.LightBrown, 
        colors.DarkGray,
        colors.Brown,
        colors.Black        
    ];


    var bar2 = [
        colors.Black,
        colors.Blue,
        colors.DarkGray,
        colors.LightBlue,
        colors.Gray,
        colors.LightGray,
        colors.Cyan,
        colors.White,
        colors.Cyan,
        colors.LightGray,
        colors.Gray,
        colors.LightBlue,
        colors.DarkGray,
        colors.Blue,
        colors.Black
    ];

    var middle = canvas.height / 2;
    var ratio = 0.6;
    var raster1;

    
    function Init()
    {
        raster1 = new Rasterbars(0.05, 0.6, 5, bar1, 0.3, 0.3, 0, canvas.width);
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

        context.drawImage(raster1.Draw(), 0, 0, canvas.width, canvas.height);

        return canvas;      
	};
};