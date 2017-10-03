/*! Built with http://stenciljs.com */
videoplayer.loadComponents(

/**** module id (dev mode) ****/
"control-bar",

/**** component modules ****/
function importComponent(exports, h, t, Context, publicPath) {
var ControlBar = /** @class */ (function () {
    function ControlBar() {
        this.visible = true;
    }
    ControlBar.prototype.componentDidLoad = function () {
        this.element.style.opacity = '1';
    };
    ControlBar.prototype.visibilityHandler = function (isVisible) {
        this.element.style.opacity = isVisible ? '1' : '0';
    };
    ControlBar.prototype.render = function () {
        return '';
    };
    return ControlBar;
}());

var FullscreenButton = /** @class */ (function () {
    function FullscreenButton() {
    }
    FullscreenButton.prototype.handleClick = function () {
        if (!this.fullscreen)
            this.enterFullscreen.emit();
        else
            this.exitFullscreen.emit();
    };
    FullscreenButton.prototype.render = function () {
        var _this = this;
        if (this.fullscreen) {
            return (h("button", { "o": { "click": function () { return _this.handleClick(); } } }, t("\uD83D\uDD33")));
        }
        else {
            return (h("button", { "o": { "click": function () { return _this.handleClick(); } } }, t("\uD83D\uDD32")));
        }
    };
    return FullscreenButton;
}());

var MuteButton = /** @class */ (function () {
    function MuteButton() {
    }
    MuteButton.prototype.handleClick = function () {
        if (!this.muted)
            this.mute.emit();
        else
            this.unmute.emit();
    };
    MuteButton.prototype.render = function () {
        var _this = this;
        if (this.muted) {
            return (h("button", { "o": { "click": function () { return _this.handleClick(); } } }, t("\uD83D\uDD07")));
        }
        else {
            return (h("button", { "o": { "click": function () { return _this.handleClick(); } } }, t("\uD83D\uDD0A")));
        }
    };
    return MuteButton;
}());

var PlayButton = /** @class */ (function () {
    function PlayButton() {
    }
    PlayButton.prototype.handleClick = function () {
        if (!this.playing)
            this.play.emit();
        else
            this.pause.emit();
    };
    PlayButton.prototype.render = function () {
        var _this = this;
        if (this.playing) {
            return (h("button", { "o": { "click": function () { return _this.handleClick(); } }, "a": { "aria-label": 'Pause' } }, t("\u23F8\uFE0F")));
        }
        else {
            return (h("button", { "o": { "click": function () { return _this.handleClick(); } }, "a": { "aria-label": 'Play' } }, t("\u25B6\uFE0F")));
        }
    };
    return PlayButton;
}());

var ScrubBar = /** @class */ (function () {
    function ScrubBar() {
        this.isDown = false;
        this.valuetext = '0:00 of 0:00';
    }
    ScrubBar.prototype.componentDidLoad = function () {
        this.scrubElement = this.element.querySelector('progress');
    };
    ScrubBar.prototype.touchstartHandler = function (event) {
        this.handleDown(event);
    };
    ScrubBar.prototype.mousedownHandler = function (event) {
        this.handleDown(event);
    };
    ScrubBar.prototype.bodytouchmoveHandler = function (event) {
        this.handleBodyMove(event);
    };
    ScrubBar.prototype.bodymousemoveHandler = function (event) {
        this.handleBodyMove(event);
    };
    ScrubBar.prototype.bodytouchendHandler = function (event) {
        this.handleUp(event);
    };
    ScrubBar.prototype.bodymouseupHandler = function (event) {
        this.handleUp(event);
    };
    ScrubBar.prototype.mousemoveHandler = function (event) {
        this.handleMove(event);
    };
    ScrubBar.prototype.mouseleaveHandler = function () {
        this.handleLeave();
    };
    ScrubBar.prototype.handleDown = function (event) {
        this.isDown = true;
        this.scrubToPosition(event, this.seekStart);
    };
    ScrubBar.prototype.handleBodyMove = function (event) {
        if (this.isDown)
            this.scrubToPosition(event, this.seekMove);
    };
    ScrubBar.prototype.handleUp = function (event) {
        if (this.isDown) {
            this.isDown = false;
            this.scrubToPosition(event, this.seekEnd);
        }
    };
    ScrubBar.prototype.handleMove = function (event) {
        if (this.thumbnails)
            this.showThumbnail(event);
    };
    ScrubBar.prototype.handleLeave = function () {
        if (this.thumbnails)
            this.hideThumbnail();
    };
    ScrubBar.prototype.scrubToPosition = function (event, emitter) {
        // Find scrub position as a percentage
        var clientX = event.touches && event.touches[0] ? event.touches[0].clientX : event.clientX;
        if (!clientX)
            return;
        var controlPosition = this.scrubElement.getBoundingClientRect().left;
        var percent = (clientX - controlPosition) / this.scrubElement.offsetWidth;
        if (percent > 1)
            percent = 1;
        if (percent < 0)
            percent = 0;
        // Convert percentage into time
        var newTime = this.duration * percent;
        emitter.emit(newTime);
    };
    ScrubBar.prototype.calculateSeek = function (event) {
        // Find scrub position as a percentage
        var clientX = event.touches && event.touches[0] ? event.touches[0].clientX : event.clientX;
        if (!clientX)
            return;
        var controlPosition = this.scrubElement.getBoundingClientRect().left;
        var percent = (clientX - controlPosition) / this.scrubElement.offsetWidth;
        if (percent > 1)
            percent = 1;
        if (percent < 0)
            percent = 0;
        // Convert percentage into time
        var newTime = this.duration * percent;
        return newTime;
    };
    ScrubBar.prototype.keyboardHandler = function (keyboardEvent) {
        var preventDefault = true;
        switch (keyboardEvent.code) {
            case 'ArrowLeft': {
                this.arrowLeftHandler();
                break;
            }
            case 'ArrowRight': {
                this.arrowRightHandler();
                break;
            }
            default: {
                // If no keyboard event is to be handled, do not prevent default
                preventDefault = false;
            }
        }
        if (preventDefault)
            keyboardEvent.preventDefault();
    };
    ScrubBar.prototype.arrowLeftHandler = function () {
        var newTime = this.progress - 5; // go back 5 seconds
        if (newTime < 0.001)
            newTime = 0.001;
        this.seekMove.emit(newTime);
    };
    ScrubBar.prototype.arrowRightHandler = function () {
        var newTime = this.progress + 5; // go forwards 5 seconds
        if (newTime > this.duration)
            newTime = this.duration;
        this.seekMove.emit(newTime);
    };
    ScrubBar.prototype.onProgressChangeHandler = function () {
        this.setValueText();
    };
    ScrubBar.prototype.onDurationChangeHandler = function () {
        this.setValueText();
    };
    ScrubBar.prototype.setValueText = function () {
        if (this.progress !== undefined && this.duration !== undefined) {
            this.valuetext = this.toHHMMSS(this.progress) + ' of ' + this.toHHMMSS(this.duration);
        }
    };
    ScrubBar.prototype.toHHMMSS = function (time) {
        // Get total seconds
        var numberInSeconds = parseInt(time, 10);
        // Get hours
        var hours = Math.floor(numberInSeconds / 3600);
        // Get remaining minutes
        var minutes = Math.floor((numberInSeconds - (hours * 3600)) / 60);
        // Get remaining seconds
        var seconds = numberInSeconds - (hours * 3600) - (minutes * 60);
        // Add leading 0 to hours
        if (hours < 10) {
            hours = '0' + hours;
        }
        // Add leading 0 to minutes
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        // Add leading 0 to seconds
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        // Return combined text string
        return (hours !== '00' ? hours + ':' : '') + minutes + ':' + seconds;
    };
    ScrubBar.prototype.showThumbnail = function (event) {
        var position = this.calculateSeek(event);
        var cues = this.thumbnails.cues;
        var cueIndex = 0;
        for (cueIndex = 0; cueIndex < cues.length; cueIndex++) {
            if (cues[cueIndex].startTime <= position && cues[cueIndex].endTime > position)
                break;
        }
        if (cues[cueIndex]) {
            var url = cues[cueIndex].text.split('#')[0];
            var xywh = cues[cueIndex].text.substr(cues[cueIndex].text.indexOf('=') + 1).split(',');
            var newPos = position / this.duration * this.element.clientWidth;
            var lower = parseInt(xywh[2]) / 2;
            var upper = this.element.clientWidth - lower;
            if (newPos < lower)
                newPos = lower;
            if (newPos > upper)
                newPos = upper;
            this.thumbnailOptions = {
                url: url,
                x: xywh[0],
                y: xywh[1],
                w: xywh[2],
                h: xywh[3],
                position: newPos
            };
        }
    };
    ScrubBar.prototype.hideThumbnail = function () {
        this.thumbnailOptions = null;
    };
    ScrubBar.prototype.render = function () {
        var objects = [
            h("progress", { "a": { "tabindex": '0', "role": 'slider', "aria-label": 'Seek slider', "aria-valuemin": '0', "aria-valuemax": this.duration, "aria-valuenow": this.progress, "aria-valuetext": this.valuetext }, "p": { "max": this.duration, "value": this.progress || 0 } })
        ];
        if (this.thumbnails && this.thumbnailOptions)
            objects.unshift(h("thumbnail-preview", { "p": { "options": this.thumbnailOptions } }));
        return objects;
    };
    return ScrubBar;
}());

var ThumbnailPreview = /** @class */ (function () {
    function ThumbnailPreview() {
    }
    ThumbnailPreview.prototype.optionsHandler = function () {
        this.element.style.backgroundImage = 'url(' + this.options.url + ')';
        this.element.style.backgroundPosition = '-' + this.options.x + 'px -' + this.options.y + 'px';
        this.element.style.width = this.options.w + 'px';
        this.element.style.height = this.options.h + 'px';
        this.element.style.left = this.options.position + 'px';
        this.element.style.marginLeft = -this.options.w / 2 + 'px';
    };
    ThumbnailPreview.prototype.render = function () {
        return '';
    };
    return ThumbnailPreview;
}());

var TimeLabel = /** @class */ (function () {
    function TimeLabel() {
        this.seconds = '00';
        this.minutes = '00';
        this.hours = '00';
    }
    TimeLabel.prototype.didChangeHandler = function (time) {
        var hours = Math.floor(time / 3600);
        var minutes = Math.floor((time % 3600) / 60);
        var seconds = time % 60;
        if (hours < 10)
            this.hours = '0' + hours;
        else
            this.hours = String(hours);
        if (minutes < 10)
            this.minutes = '0' + minutes;
        else
            this.minutes = String(minutes);
        if (seconds < 10)
            this.seconds = '0' + seconds;
        else
            this.seconds = String(seconds);
    };
    TimeLabel.prototype.render = function () {
        if (this.hours !== '00') {
            return ([
                h("span", 0, this.hours[0]),
                h("span", 0, this.hours[1]),
                h("span", { "c": { "divider": true } }, t(":")),
                h("span", 0, this.minutes[0]),
                h("span", 0, this.minutes[1]),
                h("span", { "c": { "divider": true } }, t(":")),
                h("span", 0, this.seconds[0]),
                h("span", 0, this.seconds[1])
            ]);
        }
        else {
            return ([
                h("span", 0, this.minutes[0]),
                h("span", 0, this.minutes[1]),
                h("span", { "c": { "divider": true } }, t(":")),
                h("span", 0, this.seconds[0]),
                h("span", 0, this.seconds[1])
            ]);
        }
    };
    return TimeLabel;
}());

var VideoElement = /** @class */ (function () {
    function VideoElement() {
    }
    VideoElement.prototype.componentDidLoad = function () {
        var _this = this;
        this.video = this.element.querySelector('video');
        this.video.addEventListener('timeupdate', function () { return _this.emitCurrentTime(); });
        if (this.video.duration)
            this.emitDuration();
        this.video.addEventListener('loadedmetadata', function () { return _this.emitMetadata(); });
        this.video.addEventListener('ended', function () { return _this.emitEnded(); });
    };
    VideoElement.prototype.playVideo = function () {
        this.video.play();
    };
    VideoElement.prototype.pauseVideo = function () {
        this.video.pause();
    };
    VideoElement.prototype.muteVideo = function () {
        this.video.volume = 0;
    };
    VideoElement.prototype.unmuteVideo = function () {
        this.video.volume = 1;
    };
    VideoElement.prototype.seekTo = function (newTime) {
        this.video.currentTime = newTime;
    };
    VideoElement.prototype.setVolume = function (volume) {
        this.video.volume = volume;
    };
    VideoElement.prototype.enterFullscreen = function () {
        this.video.webkitEnterFullscreen();
    };
    VideoElement.prototype.handleClick = function (event) {
        event.preventDefault();
        if (this.video.paused)
            this.play.emit();
        else
            this.pause.emit();
    };
    VideoElement.prototype.emitMetadata = function () {
        this.emitDuration();
        if (this.video.textTracks)
            this.emitTextTracks();
    };
    VideoElement.prototype.emitDuration = function () {
        this.duration.emit(this.video.duration);
    };
    VideoElement.prototype.emitTextTracks = function () {
        for (var i = 0; i < this.video.textTracks.length; i++) {
            if (this.video.textTracks[i].label === 'thumbnails')
                this.thumbnailsTrack.emit(this.video.textTracks[i]);
        }
    };
    VideoElement.prototype.emitCurrentTime = function () {
        this.timeupdate.emit(this.video.currentTime);
    };
    VideoElement.prototype.emitEnded = function () {
        this.ended.emit();
    };
    VideoElement.prototype.render = function () {
        var _this = this;
        var thumbsTrack = null;
        if (this.thumbs)
            thumbsTrack = h("track", { "a": { "kind": 'metadata', "label": 'thumbnails' }, "p": { "src": this.thumbs, "default": true } });
        return (h("video", { "o": { "click": function ($event) { return _this.handleClick($event); } }, "a": { "webkit-playsinline": true }, "p": { "poster": this.poster, "playsInline": true } },
            h("source", { "p": { "src": this.src } }),
            thumbsTrack));
    };
    return VideoElement;
}());

var VideoPlayer = /** @class */ (function () {
    function VideoPlayer() {
        // Browser conditions
        this.isSafari = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1 ? true : false;
        // Player state
        this.isFullscreen = false;
        this.isPlaying = false;
        this.isMuted = false;
        this.progress = 0.01;
        this.duration = 1;
        this.volume = 1;
        this.userFocus = true;
        this.thumbnailsTrack = null;
    }
    VideoPlayer.prototype.componentDidLoad = function () {
        this.videoElement = this.element.querySelector('video-element');
    };
    /**
     * Manages playback state
     */
    VideoPlayer.prototype.playHandler = function () {
        this.isPlaying = true;
        this.videoElement.playVideo();
    };
    VideoPlayer.prototype.pauseHandler = function () {
        this.isPlaying = false;
        this.videoElement.pauseVideo();
    };
    VideoPlayer.prototype.endedHandler = function () {
        this.isPlaying = false;
    };
    /**
     * Manages player metadata state
     */
    VideoPlayer.prototype.durationHandler = function (event) {
        this.duration = event.detail;
    };
    VideoPlayer.prototype.thumbnailsTrackHandler = function (event) {
        this.thumbnailsTrack = event.detail;
    };
    /**
     * Manages seek state
     */
    VideoPlayer.prototype.seekStartHandler = function (event) {
        this.videoElement.seekTo(event.detail);
        this.wasPlaying = this.isPlaying;
        if (this.wasPlaying)
            this.pauseHandler();
    };
    VideoPlayer.prototype.seekMoveHandler = function (event) {
        this.videoElement.seekTo(event.detail);
    };
    VideoPlayer.prototype.seekEndHandler = function (event) {
        this.videoElement.seekTo(event.detail);
        if (this.wasPlaying)
            this.playHandler();
    };
    VideoPlayer.prototype.timeupdateHandler = function (event) {
        this.progress = event.detail;
    };
    /**
     * Manages volume state
     */
    VideoPlayer.prototype.volumeHandler = function (event) {
        this.volume = event.detail;
        if (event.detail === 0)
            this.isMuted = true;
        else
            this.isMuted = false;
        this.videoElement.setVolume(event.detail);
    };
    VideoPlayer.prototype.muteHandler = function () {
        this.isMuted = true;
        this.videoElement.muteVideo();
    };
    VideoPlayer.prototype.unmuteHandler = function () {
        this.isMuted = false;
        this.videoElement.unmuteVideo();
    };
    /**
     * Manages full screen state
     */
    VideoPlayer.prototype.enterFullscreen = function () {
        if (!this.isSafari)
            this.element.webkitRequestFullscreen();
        else
            this.videoElement.enterFullscreen();
    };
    VideoPlayer.prototype.exitFullscreen = function () {
        document.webkitExitFullscreen();
    };
    VideoPlayer.prototype.fullscreenchangeHandler = function () {
        this.isFullscreen = document.webkitIsFullScreen;
    };
    /**
     * Manages user focus state
     */
    VideoPlayer.prototype.mousemoveHandler = function () {
        var _this = this;
        this.userFocus = true;
        clearTimeout(this.userFocusTimeout);
        this.userFocusTimeout = setTimeout(function () {
            _this.userFocus = false;
        }, 3000);
    };
    VideoPlayer.prototype.mouseoutHandler = function () {
        this.userFocus = false;
    };
    /**
     * Manages global keyboard controls for the player
     */
    VideoPlayer.prototype.keyboardHandler = function (keyboardEvent) {
        switch (keyboardEvent.code) {
            case 'Space': {
                keyboardEvent.preventDefault();
                if (!this.isPlaying)
                    this.playHandler();
                else
                    this.pauseHandler();
                break;
            }
            case 'KeyM': {
                keyboardEvent.preventDefault();
                if (!this.isMuted)
                    this.muteHandler();
                else
                    this.unmuteHandler();
                break;
            }
            case 'KeyF': {
                keyboardEvent.preventDefault();
                if (!this.isFullscreen)
                    this.enterFullscreen();
                else
                    this.exitFullscreen();
            }
        }
    };
    VideoPlayer.prototype.render = function () {
        var audioControls = null;
        if (!this.isSafari) {
            audioControls = [
                h("mute-button", { "p": { "muted": this.isMuted } }),
                h("volume-bar", { "p": { "level": this.volume } })
            ];
        }
        return ([
            h("video-element", { "p": { "src": this.url, "poster": this.poster, "thumbs": this.thumbs } }),
            h("control-bar", { "p": { "visible": !this.isPlaying || this.userFocus } },
                h("scrub-bar", { "p": { "progress": this.progress, "duration": this.duration, "thumbnails": this.thumbnailsTrack } }),
                h("play-button", { "p": { "playing": this.isPlaying } }),
                h("time-label", { "p": { "time": this.progress } }),
                h("time-label", { "p": { "time": this.duration } }),
                h("time-label", 0),
                audioControls,
                h("fullscreen-button", { "p": { "fullscreen": this.isFullscreen } }))
        ]);
    };
    return VideoPlayer;
}());

var VolumeBar = /** @class */ (function () {
    function VolumeBar() {
        this.isDown = false;
        this.valuetext = '100% volume';
    }
    VolumeBar.prototype.componentDidLoad = function () {
        this.volumeElement = this.element.querySelector('progress');
    };
    VolumeBar.prototype.touchstartHandler = function (event) {
        this.handleDown(event);
    };
    VolumeBar.prototype.mousedownHandler = function (event) {
        this.handleDown(event);
    };
    VolumeBar.prototype.touchmoveHandler = function (event) {
        this.handleMove(event);
    };
    VolumeBar.prototype.mousemoveHandler = function (event) {
        this.handleMove(event);
    };
    VolumeBar.prototype.touchendHandler = function (event) {
        this.handleUp(event);
    };
    VolumeBar.prototype.mouseupHandler = function (event) {
        this.handleUp(event);
    };
    VolumeBar.prototype.handleDown = function (event) {
        this.isDown = true;
        this.calculateVolume(event);
    };
    VolumeBar.prototype.handleMove = function (event) {
        if (this.isDown) {
            this.calculateVolume(event);
        }
    };
    VolumeBar.prototype.handleUp = function (event) {
        if (this.isDown) {
            this.isDown = false;
            this.calculateVolume(event);
        }
    };
    VolumeBar.prototype.calculateVolume = function (event) {
        var clientX = event.touches && event.touches[0] ? event.touches[0].clientX : event.clientX;
        if (!clientX)
            return;
        var controlPosition = this.volumeElement.getBoundingClientRect().left;
        var percent = (clientX - controlPosition) / this.volumeElement.offsetWidth;
        if (percent > 1)
            percent = 1;
        if (percent < 0)
            percent = 0;
        this.volume.emit(percent);
    };
    VolumeBar.prototype.keyboardHandler = function (keyboardEvent) {
        var preventDefault = true;
        switch (keyboardEvent.code) {
            case 'ArrowLeft': {
                this.arrowLeftHandler();
                break;
            }
            case 'ArrowRight': {
                this.arrowRightHandler();
                break;
            }
            default: {
                // If no keyboard event is to be handled, do not prevent default
                preventDefault = false;
            }
        }
        if (preventDefault)
            keyboardEvent.preventDefault();
    };
    VolumeBar.prototype.arrowLeftHandler = function () {
        var newVolume = this.level - 0.05; // reduce volume by 5%
        if (newVolume < 0)
            newVolume = 0;
        this.volume.emit(newVolume);
    };
    VolumeBar.prototype.arrowRightHandler = function () {
        var newVolume = this.level + 0.05; // increase volume by 5%
        if (newVolume > 1)
            newVolume = 1;
        this.volume.emit(newVolume);
    };
    VolumeBar.prototype.onLevelChange = function () {
        this.valuetext = (this.level * 100).toFixed(0) + '% volume';
    };
    VolumeBar.prototype.render = function () {
        return (h("progress", { "a": { "max": '1', "tabindex": '0', "role": 'slider', "aria-valuemin": '0', "aria-valuemax": '100', "aria-valuenow": ((this.level * 100).toFixed(0)), "aria-valuetext": this.valuetext }, "p": { "value": this.level } }));
    };
    return VolumeBar;
}());

exports['CONTROL-BAR'] = ControlBar;
exports['FULLSCREEN-BUTTON'] = FullscreenButton;
exports['MUTE-BUTTON'] = MuteButton;
exports['PLAY-BUTTON'] = PlayButton;
exports['SCRUB-BAR'] = ScrubBar;
exports['THUMBNAIL-PREVIEW'] = ThumbnailPreview;
exports['TIME-LABEL'] = TimeLabel;
exports['VIDEO-ELEMENT'] = VideoElement;
exports['VIDEO-PLAYER'] = VideoPlayer;
exports['VOLUME-BAR'] = VolumeBar;
},


/***************** control-bar *****************/
[
/** control-bar: tag **/
"CONTROL-BAR",

/** control-bar: members **/
[
  [ "element", /** element ref **/ 7 ],
  [ "visible", /** prop **/ 1 ]
],

/** control-bar: host **/
{},

/** control-bar: events **/
0 /* no events */,

/** control-bar: propWillChanges **/
0 /* no prop will change methods */,

/** control-bar: propDidChanges **/
[
  [
    /*****  control-bar prop did change [0] ***** /
    /* prop name **/ "visible",
    /* call fn *****/ "visibilityHandler"
  ]
]

],

/***************** fullscreen-button *****************/
[
/** fullscreen-button: tag **/
"FULLSCREEN-BUTTON",

/** fullscreen-button: members **/
[
  [ "fullscreen", /** prop **/ 1, /** type boolean **/ 1 ]
],

/** fullscreen-button: host **/
{},

/** fullscreen-button: events **/
[
  [
    /*****  fullscreen-button enterFullscreen ***** /
    /* event name ***/ "enterFullscreen"
  ],
  [
    /*****  fullscreen-button exitFullscreen ***** /
    /* event name ***/ "exitFullscreen"
  ]
]

],

/***************** mute-button *****************/
[
/** mute-button: tag **/
"MUTE-BUTTON",

/** mute-button: members **/
[
  [ "muted", /** prop **/ 1, /** type boolean **/ 1 ]
],

/** mute-button: host **/
{},

/** mute-button: events **/
[
  [
    /*****  mute-button mute ***** /
    /* event name ***/ "mute"
  ],
  [
    /*****  mute-button unmute ***** /
    /* event name ***/ "unmute"
  ]
]

],

/***************** play-button *****************/
[
/** play-button: tag **/
"PLAY-BUTTON",

/** play-button: members **/
[
  [ "playing", /** prop **/ 1, /** type boolean **/ 1 ]
],

/** play-button: host **/
{},

/** play-button: events **/
[
  [
    /*****  play-button play ***** /
    /* event name ***/ "play"
  ],
  [
    /*****  play-button pause ***** /
    /* event name ***/ "pause"
  ]
]

],

/***************** scrub-bar *****************/
[
/** scrub-bar: tag **/
"SCRUB-BAR",

/** scrub-bar: members **/
[
  [ "duration", /** prop **/ 1, /** type number **/ 2 ],
  [ "element", /** element ref **/ 7 ],
  [ "progress", /** prop **/ 1, /** type number **/ 2 ],
  [ "thumbnailOptions", /** state **/ 5 ],
  [ "thumbnails", /** prop **/ 1 ],
  [ "valuetext", /** state **/ 5 ]
],

/** scrub-bar: host **/
{},

/** scrub-bar: events **/
[
  [
    /*****  scrub-bar seekStart ***** /
    /* event name ***/ "seekStart"
  ],
  [
    /*****  scrub-bar seekMove ***** /
    /* event name ***/ "seekMove"
  ],
  [
    /*****  scrub-bar seekEnd ***** /
    /* event name ***/ "seekEnd"
  ]
],

/** scrub-bar: propWillChanges **/
0 /* no prop will change methods */,

/** scrub-bar: propDidChanges **/
[
  [
    /*****  scrub-bar prop did change [0] ***** /
    /* prop name **/ "duration",
    /* call fn *****/ "onDurationChangeHandler"
  ],
  [
    /*****  scrub-bar prop did change [1] ***** /
    /* prop name **/ "progress",
    /* call fn *****/ "onProgressChangeHandler"
  ]
]

],

/***************** thumbnail-preview *****************/
[
/** thumbnail-preview: tag **/
"THUMBNAIL-PREVIEW",

/** thumbnail-preview: members **/
[
  [ "element", /** element ref **/ 7 ],
  [ "options", /** prop **/ 1 ]
],

/** thumbnail-preview: host **/
{},

/** thumbnail-preview: events **/
0 /* no events */,

/** thumbnail-preview: propWillChanges **/
0 /* no prop will change methods */,

/** thumbnail-preview: propDidChanges **/
[
  [
    /*****  thumbnail-preview prop did change [0] ***** /
    /* prop name **/ "options",
    /* call fn *****/ "optionsHandler"
  ]
]

],

/***************** time-label *****************/
[
/** time-label: tag **/
"TIME-LABEL",

/** time-label: members **/
[
  [ "hours", /** state **/ 5 ],
  [ "minutes", /** state **/ 5 ],
  [ "seconds", /** state **/ 5 ],
  [ "time", /** prop **/ 1, /** type number **/ 2 ]
],

/** time-label: host **/
{},

/** time-label: events **/
0 /* no events */,

/** time-label: propWillChanges **/
0 /* no prop will change methods */,

/** time-label: propDidChanges **/
[
  [
    /*****  time-label prop did change [0] ***** /
    /* prop name **/ "time",
    /* call fn *****/ "didChangeHandler"
  ]
]

],

/***************** video-element *****************/
[
/** video-element: tag **/
"VIDEO-ELEMENT",

/** video-element: members **/
[
  [ "element", /** element ref **/ 7 ],
  [ "enterFullscreen", /** method **/ 6 ],
  [ "muteVideo", /** method **/ 6 ],
  [ "pauseVideo", /** method **/ 6 ],
  [ "playVideo", /** method **/ 6 ],
  [ "poster", /** prop **/ 1 ],
  [ "seekTo", /** method **/ 6 ],
  [ "setVolume", /** method **/ 6 ],
  [ "src", /** prop **/ 1 ],
  [ "thumbs", /** prop **/ 1 ],
  [ "unmuteVideo", /** method **/ 6 ]
],

/** video-element: host **/
{},

/** video-element: events **/
[
  [
    /*****  video-element play ***** /
    /* event name ***/ "play"
  ],
  [
    /*****  video-element pause ***** /
    /* event name ***/ "pause"
  ],
  [
    /*****  video-element timeupdate ***** /
    /* event name ***/ "timeupdate"
  ],
  [
    /*****  video-element duration ***** /
    /* event name ***/ "duration"
  ],
  [
    /*****  video-element ended ***** /
    /* event name ***/ "ended"
  ],
  [
    /*****  video-element thumbnailsTrack ***** /
    /* event name ***/ "thumbnailsTrack"
  ]
]

],

/***************** video-player *****************/
[
/** video-player: tag **/
"VIDEO-PLAYER",

/** video-player: members **/
[
  [ "duration", /** state **/ 5 ],
  [ "element", /** element ref **/ 7 ],
  [ "isFullscreen", /** state **/ 5 ],
  [ "isMuted", /** state **/ 5 ],
  [ "isPlaying", /** state **/ 5 ],
  [ "poster", /** prop **/ 1 ],
  [ "progress", /** state **/ 5 ],
  [ "thumbnailsTrack", /** state **/ 5 ],
  [ "thumbs", /** prop **/ 1 ],
  [ "url", /** prop **/ 1 ],
  [ "userFocus", /** state **/ 5 ],
  [ "volume", /** state **/ 5 ]
],

/** video-player: host **/
{}

],

/***************** volume-bar *****************/
[
/** volume-bar: tag **/
"VOLUME-BAR",

/** volume-bar: members **/
[
  [ "element", /** element ref **/ 7 ],
  [ "level", /** prop **/ 1, /** type number **/ 2 ]
],

/** volume-bar: host **/
{},

/** volume-bar: events **/
[
  [
    /*****  volume-bar volume ***** /
    /* event name ***/ "volume"
  ]
],

/** volume-bar: propWillChanges **/
0 /* no prop will change methods */,

/** volume-bar: propDidChanges **/
[
  [
    /*****  volume-bar prop did change [0] ***** /
    /* prop name **/ "level",
    /* call fn *****/ "onLevelChange"
  ]
]

]
)