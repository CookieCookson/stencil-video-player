import { Component, Prop, Listen, Element } from '@stencil/core';

@Component({
    tag: 'video-player',
    styleUrl: 'video-player.scss'
})
export class VideoPlayer {
    @Prop() url: string;

    @Element() element: HTMLElement;

    private videoElement: any;
    private isPlaying: boolean = false;
    private isMuted: boolean = false;
    private progress: number = 0;
    private duration: number = 0;
    private volume: number = 1;

    componentWillLoad() {
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

    @Listen('seek')
    seekHandler(event) {
        this.videoElement.seekTo(event.detail);
    }

    @Listen('volume')
    volumeHandler(event) {
        this.volume = event.detail;
        if (this.volume === 0) this.isMuted = true;
        else this.isMuted = false;
        this.videoElement.setVolume(event.detail);
    }

    render() {
        return ([
            <video-element src={this.url}></video-element>,
            <play-button playing={this.isPlaying}></play-button>,
            <mute-button muted={this.isMuted}></mute-button>,
            <scrub-bar progress={this.progress} duration={this.duration}></scrub-bar>,
            <volume-bar level={this.volume}></volume-bar>,
            <time-label time={this.progress}></time-label>,
            <time-label time={this.duration}></time-label>
        ]);
    }

}