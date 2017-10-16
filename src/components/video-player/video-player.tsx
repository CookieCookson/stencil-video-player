import { Component, Listen, Element, State } from '@stencil/core';

@Component({
    tag: 'video-player',
    styleUrl: 'video-player.scss'
})
export class VideoPlayer {
    // Browser conditions
    private isSafari = navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1 ? true : false;

    // Player state
    @State() isFullscreen: boolean = false;
    @State() isPlaying: boolean = false;
    @State() isMuted: boolean = false;
    @State() isSubtitled: boolean = false;
    @State() progress: number = 0.01;
    @State() duration: number = 1;
    @State() volume: number = 1;
    @State() userFocus: boolean = true;
    @State() thumbnailsTrack: TextTrack = null;
    @State() subtitlesTrack: TextTrack = null;

    // DOM elements
    @Element() element: HTMLElement;
    private video: any;

    // Internal states
    private wasPlaying: boolean; // maintains play state whilst scrubbing
    private userFocusTimeout: NodeJS.Timer;

    componentDidLoad() {
        this.video = this.element.querySelector('video');
        this.bindEventListeners();
    }
    
    bindEventListeners() {
        this.video.addEventListener('durationchange', () => this.durationHandler());
        this.video.addEventListener('loadedmetadata', () => this.emitMetadata());
        this.video.addEventListener('timeupdate', () => this.timeupdateHandler());
        this.video.addEventListener('ended', () => this.endedHandler());
        this.video.addEventListener('playing', () => this.playingHandler(true));
        this.video.addEventListener('pause', () => this.playingHandler(false));
        this.video.addEventListener('click', (clickEvent) => this.handleVideoClick(clickEvent));
        (this.video.textTracks as any).onchange = (changeEvent) => {
            this.showingSubtitlesHandler(changeEvent.target[0].mode === 'showing' ? true : false);
        };
    }

    /**
     * Manages playback state
     */

    @Listen('play')
    playHandler() {
        this.video.play();
    }

    @Listen('pause')
    pauseHandler() {
        this.video.pause();
    }

    playingHandler(playing) {
        this.isPlaying = playing;
    }

    endedHandler() {
        this.isPlaying = false;
    }
    
    handleVideoClick(clickEvent) {
        clickEvent.preventDefault();
        if (this.video.paused) this.playHandler();
        else this.pauseHandler();
    }

    /**
     * Manages player metadata state
     */

    durationHandler() {
        this.duration = this.video.duration;
    }
    
    emitMetadata() {
        if (this.video.textTracks) this.processTextTracks();
    }

    processTextTracks() {
        for (let i = 0; i < this.video.textTracks.length; i++) {
            const tt = this.video.textTracks[i];
            if (tt.kind === 'metadata' && tt.label === 'thumbnails') this.thumbnailsTrackHandler(tt);
            if (tt.kind === 'subtitles') this.subtitlesTrackHandler(tt);
        }
    }

    thumbnailsTrackHandler(thumbnailsTrack) {
        this.thumbnailsTrack = thumbnailsTrack;
    }

    /**
     * Manages subtitles state
     */

    @Listen('subtitles')
    subtitlesHandler(event) {
        this.video.textTracks[0].mode = event.detail ? 'showing' : 'hidden';
    }

    subtitlesTrackHandler(subtitlesTrack) {
        this.subtitlesTrack = subtitlesTrack;
        // Get default enabled state of subtitles
        if (this.subtitlesTrack) this.isSubtitled = this.subtitlesTrack.mode === 'showing' ? true : false;
    }

    showingSubtitlesHandler(isShowingSubtitles) {
        this.isSubtitled = isShowingSubtitles;
    }

    /**
     * Manages seek state
     */

    @Listen('seekStart')
    seekStartHandler(event) {
        this.video.currentTime = event.detail;
        this.wasPlaying = this.isPlaying;
        if (this.wasPlaying) this.pauseHandler();
    }

    @Listen('seekMove')
    seekMoveHandler(event) {
        this.video.currentTime = event.detail;
    }

    @Listen('seekEnd')
    seekEndHandler(event) {
        this.video.currentTime = event.detail;
        if (this.wasPlaying) this.playHandler();
    }

    timeupdateHandler() {
        this.progress = this.video.currentTime;
    }

    /**
     * Manages volume state
     */

    @Listen('volume')
    volumeHandler(event) {
        this.volume = event.detail;
        if (event.detail === 0) this.isMuted = true;
        else this.isMuted = false;
        this.video.volume = event.detail;
    }

    @Listen('mute')
    muteHandler() {
        this.isMuted = true;
        this.video.volume = 0;
    }

    @Listen('unmute')
    unmuteHandler() {
        this.isMuted = false;
        this.video.volume = 1;
    }

    /**
     * Manages full screen state
     */

    @Listen('enterFullscreen')
    enterFullscreen() {
        if (!this.isSafari) this.element.webkitRequestFullscreen();
        else (this.video as any).webkitEnterFullscreen();
    }

    @Listen('exitFullscreen')
    exitFullscreen() {
        document.webkitExitFullscreen();
    }

    @Listen('webkitfullscreenchange')
    fullscreenchangeHandler() {
        this.isFullscreen = document.webkitIsFullScreen;
    }

    /**
     * Manages user focus state
     */

    @Listen('mousemove')
    mousemoveHandler() {
        this.userFocus = true;
        clearTimeout(this.userFocusTimeout);
        this.userFocusTimeout = setTimeout(() => {
            this.userFocus = false;
        }, 3000);
    }

    @Listen('mouseleave')
    mouseoutHandler() {
        this.userFocus = false;
    }

    /**
     * Manages global keyboard controls for the player
     */

    @Listen('keyup')
    keyboardHandler(keyboardEvent) {
        switch (keyboardEvent.code) {
            case 'Space': {
                keyboardEvent.preventDefault();
                if (!this.isPlaying) this.playHandler();
                else this.pauseHandler();
                break;
            }
            case 'KeyM': {
                keyboardEvent.preventDefault();
                if (!this.isMuted) this.muteHandler();
                else this.unmuteHandler();
                break;
            }
            case 'KeyF': {
                keyboardEvent.preventDefault();
                if (!this.isFullscreen) this.enterFullscreen();
                else this.exitFullscreen();
            }
        }
    }

    render() {
        let audioControls = null;
        if (!this.isSafari) {
            audioControls = [
                <mute-button muted={this.isMuted}></mute-button>,
                <volume-bar level={this.volume}></volume-bar>
            ];
        }
        let subtitlesButton = null;
        if (this.subtitlesTrack) {
            subtitlesButton = <subtitles-button enabled={this.isSubtitled}></subtitles-button>;
        }
        return ([
            <cues-box cues={this.subtitlesTrack} visible={this.isSubtitled}></cues-box>,
            <control-bar visible={!this.isPlaying || this.userFocus}>
                <scrub-bar progress={this.progress} duration={this.duration} thumbnails={this.thumbnailsTrack}></scrub-bar>
                <play-button playing={this.isPlaying}></play-button>
                <time-label time={this.progress}></time-label>
                <time-label time={this.duration}></time-label>
                {audioControls}
                <fullscreen-button fullscreen={this.isFullscreen}></fullscreen-button>
                {subtitlesButton}
            </control-bar>
        ]);
    }

}
