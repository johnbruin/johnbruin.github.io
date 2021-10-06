function Pads()
{
    var canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 200;
    var context = canvas.getContext('2d');

    var _pattern;
    var _patterns;
    var _index;
    function Init() {
        var _patterns = [];
        var pattern;

        pattern = [];
        pattern.push("R");
        pattern.push("L,K,J,Q,Y,S,T,M");
        pattern.push("E,D,C,I,P,W,X,Z,SPACE,T,M");
        pattern.push("D,B,A,H,O,V,ENTER,U,N,G,F");
        pattern.push("");
        _patterns.push(pattern);

        pattern = [];
        pattern.push("D");
        pattern.push("B,C,K,E,F");
        pattern.push("A,I,J,R,L,M,G");
        pattern.push("H,P,Q,Y,S,T,N");
        pattern.push("O,W,X,Z,SPACE,U");
        pattern.push("V,ENTER");
        pattern.push("");
        _patterns.push(pattern);

        pattern = [];
        pattern.push("A,B");
        pattern.push("H,I,C,D");
        pattern.push("O,P,J,K,E,F");
        pattern.push("V,W,Q,R,L,M,G");
        pattern.push("X,Y,S,T,N");
        pattern.push("Z,SPACE,U");
        pattern.push("ENTER");
        pattern.push("");
        _patterns.push(pattern);

        _pattern = _patterns[Math.round(Math.random() * (_patterns.length - 1))];

        _index = 0;
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

        $(".pad").removeClass("keydown");

        if (_counter >= _times) {
            _playing = false;
            return canvas;
        }
        _counter++;
        
        var i = Math.floor(_index);
        var ids = _pattern[i].split(",");
        for (var j = 0; j < ids.length; j++) {            
            $("#" +ids[j]).toggleClass("keydown");            
        }
        if (_index < _pattern.length - 1)
            _index = _index + .4;
        
        return canvas;
    }
}