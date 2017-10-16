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
    private videoElement: any;

    // Internal states
    private wasPlaying: boolean; // maintains play state whilst scrubbing
    private userFocusTimeout: NodeJS.Timer;

    componentDidLoad() {
        this.videoElement = this.element.querySelector('video-element');
    }

    /**
     * Manages playback state
     */

    @Listen('play')
    playHandler() {
        this.videoElement.playVideo();
    }

    @Listen('playing')
    playingHandler(event) {
        this.isPlaying = event.detail;
    }

    @Listen('pause')
    pauseHandler() {
        this.isPlaying = false;
        this.videoElement.pauseVideo();
    }

    @Listen('ended')
    endedHandler() {
        this.isPlaying = false;
    }

    /**
     * Manages player metadata state
     */

    @Listen('duration')
    durationHandler(event) {
        this.duration = event.detail;
    }

    @Listen('thumbnailsTrack')
    thumbnailsTrackHandler(event) {
        this.thumbnailsTrack = event.detail;
    }

    /**
     * Manages subtitles state
     */

    @Listen('subtitlesTrack')
    subtitlesTrackHandler(event) {
        this.subtitlesTrack = event.detail;
        // Get default enabled state of subtitles
        if (this.subtitlesTrack) this.isSubtitled = this.subtitlesTrack.mode === 'showing' ? true : false;
    }

    @Listen('showingSubtitles')
    showingSubtitlesHandler(event) {
        this.isSubtitled = event.detail;
    }

    @Listen('subtitles')
    subtitlesHandler(event) {
        this.videoElement.toggleSubtitles(event.detail);
    }

    /**
     * Manages seek state
     */

    @Listen('seekStart')
    seekStartHandler(event) {
        this.videoElement.seekTo(event.detail);
        this.wasPlaying = this.isPlaying;
        if (this.wasPlaying) this.pauseHandler();
    }

    @Listen('seekMove')
    seekMoveHandler(event) {
        this.videoElement.seekTo(event.detail);
    }

    @Listen('seekEnd')
    seekEndHandler(event) {
        this.videoElement.seekTo(event.detail);
        if (this.wasPlaying) this.playHandler();
    }

    @Listen('timeupdate')
    timeupdateHandler(event) {
        this.progress = event.detail;
    }

    /**
     * Manages volume state
     */

    @Listen('volume')
    volumeHandler(event) {
        this.volume = event.detail;
        if (event.detail === 0) this.isMuted = true;
        else this.isMuted = false;
        this.videoElement.setVolume(event.detail);
    }

    @Listen('mute')
    muteHandler() {
        this.isMuted = true;
        this.videoElement.muteVideo();
    }

    @Listen('unmute')
    unmuteHandler() {
        this.isMuted = false;
        this.videoElement.unmuteVideo();
    }

    /**
     * Manages full screen state
     */

    @Listen('enterFullscreen')
    enterFullscreen() {
        if (!this.isSafari) this.element.webkitRequestFullscreen();
        else this.videoElement.enterFullscreen();
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
            <video-element>
                <slot />
            </video-element>,
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
