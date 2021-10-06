// Start off by initializing a new audio context
myAudioContext = new (window.AudioContext || window.webkitAudioContext)();
myAudioAnalyser = myAudioContext.createAnalyser();

if (!myAudioContext.createGain)
    myAudioContext.createGain = myAudioContext.createGainNode;
if (!myAudioContext.createDelay)
    myAudioContext.createDelay = myAudioContext.createDelayNode;
if (!myAudioContext.createScriptProcessor)
    myAudioContext.createScriptProcessor = myAudioContext.createJavaScriptNode;

function waitForWebfonts(fonts, callback) {
    var loadedFonts = 0;
    for (var i = 0, l = fonts.length; i < l; ++i) {
        (function (font) {
            var node = document.createElement('span');
            // Characters that vary significantly among different fonts
            node.innerHTML = 'giItT1WQy@!-/#';
            // Visible - so we can measure it - but not on the screen
            node.style.position = 'absolute';
            node.style.left = '-10000px';
            node.style.top = '-10000px';
            // Large font size makes even subtle changes obvious
            node.style.fontSize = '300px';
            // Reset any font properties
            node.style.fontFamily = 'sans-serif';
            node.style.fontVariant = 'normal';
            node.style.fontStyle = 'normal';
            node.style.fontWeight = 'normal';
            node.style.letterSpacing = '0';
            document.body.appendChild(node);

            // Remember width with no applied web font
            var width = node.offsetWidth;

            node.style.fontFamily = font;

            var interval;
            function checkFont() {
                // Compare current width with original width
                if (node && node.offsetWidth != width) {
                    ++loadedFonts;
                    node.parentNode.removeChild(node);
                    node = null;
                }

                // If all fonts have been loaded
                if (loadedFonts >= fonts.length) {
                    if (interval) {
                        clearInterval(interval);
                    }
                    if (loadedFonts == fonts.length) {
                        callback();
                        return true;
                    }
                }
            };

            if (!checkFont()) {
                interval = setInterval(checkFont, 50);
            }
        })(fonts[i]);
    }
};

function routeSound(source) {
    var myNodes = {};
    myNodes.volume = myAudioContext.createGain();
    myNodes.volume.gain.value = 1;
    source.connect(myNodes.volume);
    myNodes.volume.connect(myAudioAnalyser);
    return source;
}

function playSound(buffer, time) {
    var source = myAudioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(myAudioContext.destination);
    source = routeSound(source);
    source[source.start ? 'start' : 'noteOn'](time);
}

function loadSounds(obj, soundMap, callback) {
    // Array-ify
    var names = [];
    var paths = [];
    var i = 0;
    for (var name in soundMap) {
        i++;
        var path = soundMap[name];
        names.push(name);
        paths.push(path);
    }
    bufferLoader = new BufferLoader(myAudioContext, paths, function (bufferList) {
        for (var i = 0; i < bufferList.length; i++) {
            var buffer = bufferList[i];
            var name = names[i];
            obj[name] = buffer;
        }
        if (callback) {
            callback();
        }
    });
    bufferLoader.load();
}

function BufferLoader(myAudioContext, urlList, callback) {
    this.myAudioContext = myAudioContext;
    this.urlList = urlList;
    this.onload = callback;
    this.bufferList = new Array();
    this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function (url, index) {
    // Load buffer asynchronously
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    var loader = this;

    request.onload = function () {
        // Asynchronously decode the audio file data in request.response
        loader.myAudioContext.decodeAudioData(
          request.response,
          function (buffer) {
              if (!buffer) {
                  alert('error decoding file data: ' + url);
                  return;
              }
              loader.bufferList[index] = buffer;
              if (++loader.loadCount == loader.urlList.length)
                  loader.onload(loader.bufferList);
          },
          function (error) {
              console.error('decodeAudioData error', error);
          }
        );
    }

    request.onerror = function () {
        alert('BufferLoader: XHR error');
    }

    request.send();
};

BufferLoader.prototype.load = function () {
    for (var i = 0; i < this.urlList.length; ++i)
        this.loadBuffer(this.urlList[i], i);
};