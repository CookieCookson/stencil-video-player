/*! Built with http://stenciljs.com */
(function (window, document, appNamespace, publicPath, appCore, appCorePolyfilled, components, x, i) {
    'use strict';
    // create global namespace if it doesn't already exist

    (window[appNamespace] = window[appNamespace] || {}).components = components = components || [];
    // auto hide components until they been fully hydrated
    // reusing the "x" variable from the args for funzies
    x = document.createElement('style');
    x.setAttribute('data-styles', '');
    x.innerHTML = (components.map(function (c) {
        return c[0];
    }).join(',') + '{visibility:hidden}.💎{visibility:inherit}').toLowerCase();
    document.head.insertBefore(x, document.head.firstChild);
    // get this current script
    appNamespace = appNamespace.toLowerCase();
    x = document.scripts;
    for (i = x.length - 1; i >= 0; i--) {
        if (x[i].src && x[i].src.split('/').pop() === appNamespace + '.js') {
            publicPath = x[i].src.replace(appNamespace + '.js', appNamespace + '/');
            break;
        }
    }
    // request the core this browser needs
    // test for native support of custom elements and fetch
    // if either of those are not supported, then use the core w/ polyfills
    x = document.createElement('script');
    x.src = publicPath + (window.customElements && window.fetch ? appCore : appCorePolyfilled);
    x.setAttribute('data-path', publicPath);
    x.setAttribute('data-core', appCore);
    document.head.appendChild(x);
})(window, document, "videoplayer","/build/videoplayer/","videoplayer.core.js","videoplayer.core.pf.js",[["CONTROL-BAR","control-bar",{"$":"control-bar"}],["FULLSCREEN-BUTTON","control-bar",{"$":"control-bar"},[["fullscreen",1,1]]],["MUTE-BUTTON","control-bar",{"$":"control-bar"},[["muted",1,1]]],["PLAY-BUTTON","control-bar",{"$":"control-bar"},[["playing",1,1]]],["SCRUB-BAR","control-bar",{"$":"control-bar"},[["duration",1,2],["progress",1,2]],[["body:mousemove","bodymousemoveHandler",0,1],["body:mouseup","bodymouseupHandler",0,1],["body:touchend","bodytouchendHandler",0,1],["body:touchmove","bodytouchmoveHandler",0,1],["keyup","keyboardHandler"],["mousedown","mousedownHandler",0,1],["mouseleave","mouseleaveHandler",0,1],["mousemove","mousemoveHandler",0,1],["touchstart","touchstartHandler",0,1]]],["THUMBNAIL-PREVIEW","control-bar",{"$":"control-bar"},[["options",1]]],["TIME-LABEL","control-bar",{"$":"control-bar"},[["time",1,2]]],["VIDEO-ELEMENT","control-bar",{"$":"control-bar"},[["poster",1],["src",1],["thumbs",1]]],["VIDEO-PLAYER","control-bar",{"$":"control-bar"},[["poster",1],["thumbs",1],["url",1]],[["duration","durationHandler"],["ended","endedHandler"],["enterFullscreen","enterFullscreen"],["exitFullscreen","exitFullscreen"],["keyup","keyboardHandler"],["mouseleave","mouseoutHandler",0,1],["mousemove","mousemoveHandler",0,1],["mute","muteHandler"],["pause","pauseHandler"],["play","playHandler"],["playing","playingHandler"],["seekEnd","seekEndHandler"],["seekMove","seekMoveHandler"],["seekStart","seekStartHandler"],["thumbnailsTrack","thumbnailsTrackHandler"],["timeupdate","timeupdateHandler"],["unmute","unmuteHandler"],["volume","volumeHandler"],["webkitfullscreenchange","fullscreenchangeHandler"]]],["VOLUME-BAR","control-bar",{"$":"control-bar"},[["level",1,2]],[["body:mousemove","mousemoveHandler",0,1],["body:mouseup","mouseupHandler",0,1],["body:touchend","touchendHandler",0,1],["body:touchmove","touchmoveHandler",0,1],["keyup","keyboardHandler"],["mousedown","mousedownHandler",0,1],["touchstart","touchstartHandler",0,1]]]]);