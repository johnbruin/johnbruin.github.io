var fps = 40;

var animations = [];
var bganimations = [];
var bganimationsfull = [];

var introanimations = [];
var colors = new Colors();
var myAudioContext;
var myAudioAnalyser;
var scale;
var contentWidth = 960;
var contentHeight = 600;
var sample;
var introPlaying = true;
var idleTime = 0;

$(document).ready(function ()
{
    var maincanvas;
    var maincontext;
    var backgroundcanvas;
    var backgroundcontext;
    var backgroundfullcanvas;
    var backgroundfullcontext;

    //Increment the idle time counter every second.
    var idleInterval = setInterval(timerIncrement, 1000);
    function timerIncrement() {
        idleTime = idleTime + 1;
        if (idleTime > 10 && !introPlaying) { 
            animations[16].Play(80);
            idleTime = 0;
        }
    }

    //Instantiate FastClick on the body to remove click delay
    FastClick.attach(document.body);

    function Init() {
        drawPads(false);
        initCanvas();
        initAnimations();
    }

    function Start() {

        $("#content").hide();
        initCanvas();
        $("#mainCanvas").hide();
        $("#backgroundCanvas").hide();
        
        waitForWebfonts(['CommodoreServer', 'Snaredrum'], function () {
            introanimations.push(new c64Typer('LOAD"PATATAP64",8eedxSEARCHING FOR *edwdLOADINGdwdeREADY.exdwRUNxcwn'));
            introanimations[0].Play(1500);
            draw();
            sample = new Sample();
        });
    }

    function initAnimations()
    {
        //0
        animations.push(new TimeAnalyzer());
        //1
        animations.push(new Fountain());
        //2
        animations.push(new SpectrumAnalyzer());
        //3
        animations.push(new Sphere3D());
        //4
        animations.push(new Arrows());
        //5
        animations.push(new Cube3D());
        //6
        animations.push(new Spaceships());
        //7
        animations.push(new Pacman());
        //8
        animations.push(new ImageZoom("Ghostbusters.png"));
        //9
        animations.push(new ImageZoom("Commodore.png"));
        //10
        animations.push(new Stickman());
        //11
        animations.push(new Elite());
        //12
        animations.push(new FliScroller("this is so cool"));
        //13
        animations.push(new ImageZoom("batman_v_superman.png"));
        //14
        animations.push(new Circles());
        //15
        animations.push(new Shadow());
        //16
        animations.push(new Pads());
        //17
        animations.push(new SinePlot());
        //18
        animations.push(new PixelField());

        //0
        bganimations.push(new Lines());
        //1
        bganimations.push(new Plasma());
        //2
        bganimations.push(new Noise());
        //3
        bganimations.push(new Matrix());
        //4
        bganimations.push(new Starfield());
        //5
        bganimations.push(new Kaleidoscope());

        //0
        bganimationsfull.push(new Rasterpart());
        //1
        bganimationsfull.push(new HorizontalLines());

    }

    function initCanvas()
    {
        var W = window.innerWidth;
        var H = window.innerHeight;

        maincanvas = document.getElementById('mainCanvas');
        maincontext = maincanvas.getContext('2d');                
        //Make the maincanvas occupy the content div
        maincanvas.width = contentWidth * scale;
        maincanvas.height = contentHeight * scale;        
        $("#mainCanvas").css({ 'left': (W - maincanvas.width) / 2, 'top': (H - maincanvas.height) / 2 });

        backgroundcanvas = document.getElementById('backgroundCanvas');
        backgroundcontext = backgroundcanvas.getContext('2d');
        //Make the backgroundcanvas occupy the content div
        backgroundcanvas.width = contentWidth * scale;
        backgroundcanvas.height = contentHeight * scale;
        $("#backgroundCanvas").css({ 'left': (W - backgroundcanvas.width) / 2, 'top': (H - backgroundcanvas.height) / 2 });

        backgroundfullcanvas = document.getElementById('backgroundFullCanvas');
        backgroundfullcontext = backgroundfullcanvas.getContext('2d');
        //Make the backgroundfullcanvas occupy the full page
        backgroundfullcanvas.width = W;
        backgroundfullcanvas.height = W * 200 / 320;
        $("#backgroundFullCanvas").css({ 'top': (H - backgroundfullcanvas.height) / 2 });
    }

    $(window).resize(function () {
        Init();
    });

    var now;
    var then = Date.now();
    var interval = 1000 / fps;
    var delta;

    function draw() {

        requestAnimationFrame(draw);

        now = Date.now();
        delta = now - then;

        interval = 1000 / fps;
        if (delta > interval) {

            then = now - (delta % interval);

            //Draw foreground animations
            maincontext.beginPath();
            maincontext.clearRect(0, 0, maincanvas.width, maincanvas.height);
            for (var i = 0; i < animations.length; i++) {
                if (animations[i].IsPlaying())
                    maincontext.drawImage(animations[i].Draw(), 0, 0, maincanvas.width, maincanvas.height);
            }

            //Draw background animations
            backgroundcontext.beginPath();
            backgroundcontext.clearRect(0, 0, backgroundcanvas.width, backgroundcanvas.height);
            for (var i = 0; i < bganimations.length; i++) {
                if (bganimations[i].IsPlaying())
                    backgroundcontext.drawImage(bganimations[i].Draw(), 0, 0, backgroundcanvas.width, backgroundcanvas.height);
            }

            //Draw background animations
            backgroundfullcontext.beginPath();
            backgroundfullcontext.clearRect(0, 0, backgroundfullcanvas.width, backgroundfullcanvas.height);
            for (var i = 0; i < bganimationsfull.length; i++) {
                if (bganimationsfull[i].IsPlaying())
                    backgroundfullcontext.drawImage(bganimationsfull[i].Draw(), 0, 0, backgroundfullcanvas.width, backgroundfullcanvas.height);
            }

            if (introPlaying) {
                //Draw intro animations
                backgroundfullcontext.beginPath();
                backgroundfullcontext.clearRect(0, 0, backgroundfullcanvas.width, backgroundfullcanvas.height);
                if (introanimations[0].IsPlaying())
                    backgroundfullcontext.drawImage(introanimations[0].Draw(), 0, 0, backgroundfullcanvas.width, backgroundfullcanvas.height);
                else {
                    introPlaying = false;
                    fps = 24;
                    $("#content").show();
                    $("#mainCanvas").show();
                    $("#backgroundCanvas").show();
                    var imgInfo = $("#info");
                    imgInfo.click(function () {
                        showHelp = !showHelp;
                        drawPads();
                    });
                    Init();
                }
            }
        }
    }

    Start();
});