var showHelp = false;

function drawPads() {
    var H;
    var W;
    var rows;
    var cols;
    var imgWidth;
    var imgHeight;
    var imgID;
    var imgLeft;
    var imgTop;
    var x = 0;
    var y = 0;
    var imgScale = 0.444 * 2.9;

    idleTime = 0;

    $(".pad").remove();
    W = $("#content").width();
    H = $("#content").height();

    imgWidth = 112 * imgScale;
    imgHeight = 98 * imgScale;

    if (showHelp)
        $("#instructions").show();
    else
        $("#instructions").hide();

    for (var i = 0; i <= 27; i++) {
        if (i == 26)
            imgID = "SPACE";
        else if (i == 27)
            imgID = "ENTER";
        else
            imgID = String.fromCharCode(65 + i);

        var imgLetter = "<span class='letter'>" + imgID + "<span>";
        var imgPad = "<div class='pad' id='" + imgID + "' />";

        $("#content").append(imgPad);
        if (showHelp)
            $("#" + imgID).append(imgLetter);

        imgLeft = (imgWidth * 0.75) * x;
        if (imgLeft + imgWidth > (W - 75)) {
            x = 0;
            y++;
            imgLeft = imgWidth * 0.75 * x;
        }

        if (isEven(x))
            imgTop = (imgHeight * y) + (imgHeight * 0.5);
        else
            imgTop = imgHeight * y;

        imgPad = $("#" + imgID);
        imgPad.css("top", imgTop + 20);
        imgPad.css("left", imgLeft + 75);
        imgPad.click(function () {
            play(this.id);
        });
        x++;
    }

    //Scale content
    scale = 0.8 * (window.innerWidth / contentWidth);
    $('#content').css('transform', 'scale(' + scale + ',' + scale + ')');
}

function isEven(value) {
    if (value % 2 == 0)
        return true;
    else
        return false;
}

document.onkeydown = function (evt) {
    evt = evt || window.event;
    if (evt.keyCode == 32) {
        $("#SPACE").toggleClass("keydown");
        play("SPACE");
    }
    else if (evt.keyCode == 13) {
        $("#ENTER").toggleClass("keydown");
        play("ENTER");
    }
    else if (evt.keyCode == 191) {
        showHelp = !showHelp;
        drawPads();
    }
    else if (evt.keyCode >= 65 && evt.keyCode <= 90) {
        $("#" + String.fromCharCode(evt.keyCode).toUpperCase()).toggleClass("keydown");
        play(String.fromCharCode(evt.keyCode).toUpperCase());
    }
    //alert(evt.keyCode);
}

document.onkeyup = function (evt) {
    evt = evt || window.event;
    if (evt.keyCode == 32) {
        $("#SPACE").toggleClass("keydown");
    }
    else if (evt.keyCode == 13) {
        $("#ENTER").toggleClass("keydown");
    }
    else if (evt.keyCode >= 65 && evt.keyCode <= 90) {
        $("#" + String.fromCharCode(evt.keyCode).toUpperCase()).toggleClass("keydown");
    }
}

function play(key) {

    var color = colors.RandomBackgroundColor();
    $('#backgroundFullCanvas').css('background-color', color);

    sample.play(key);
}