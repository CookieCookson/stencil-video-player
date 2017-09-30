import { Component, Prop, Listen, Element, State } from '@stencil/core';

@Component({
    tag: 'video-player',
    styleUrl: 'video-player.scss'
})
export class VideoPlayer {
    @Prop() url: string;
    @Prop() poster: string;

    @State() isFullscreen: boolean = false;
    @State() isPlaying: boolean = false;
    @State() isMuted: boolean = false;
    @State() progress: number = 0.01;
    @State() duration: number = 1;
    @State() volume: number = 1;

    @Element() element: HTMLElement;

    private videoElement: any;

    private isSafari = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1 ? true: false;

    private wasPlaying: boolean; // maintains play state whilst scrubbing

    componentDidLoad() {
        this.videoElement = this.element.querySelector('video-element');
    }

    @Listen('play')
    playHandler() {
        this.isPlaying = true;
        this.videoElement.playVideo();
    }

    @Listen('pause')
    pauseHandler() {
        this.isPlaying = false;
        this.videoElement.pauseVideo();
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

    @Listen('timeupdate')
    timeupdateHandler(event) {
        this.progress = event.detail;
    }

    @Listen('duration')
    durationHandler(event) {
        this.duration = event.detail;
    }

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

    @Listen('volume')
    volumeHandler(event) {
        this.volume = event.detail;
        if (event.detail === 0) this.isMuted = true;
        else this.isMuted = false;
        this.videoElement.setVolume(event.detail);
    }

    @Listen('body:keyup')
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

    render() {
        let audioControls = null;
        if (!this.isSafari) {
            audioControls = [
                <mute-button muted={this.isMuted}></mute-button>,
                <volume-bar level={this.volume}></volume-bar>
            ];
        }
        return ([
            <video-element src={this.url} poster={this.poster}></video-element>,
            <control-bar visible={!this.isPlaying}>
                <scrub-bar progress={this.progress} duration={this.duration}></scrub-bar>
                <play-button playing={this.isPlaying}></play-button>
                <time-label time={this.progress}></time-label>
                <time-label time={this.duration}></time-label>
                {audioControls}
                <fullscreen-button fullscreen={this.isFullscreen}></fullscreen-button>
            </control-bar>
        ]);
    }

}
