import { Component, Prop, Listen } from '@stencil/core';

@Component({
    tag: 'video-player',
    styleUrl: 'video-player.scss'
})
export class VideoPlayer {
    @Prop() url: string;

    private videoElement:any = document.querySelector('video-element');

    private isPlaying: boolean = false;
    private isMuted: boolean = false;
    private progress: number = 0;
    private duration: number = 0;

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

    render() {
        return ([
            <video-element src={this.url}></video-element>,
            <play-button playing={this.isPlaying}></play-button>,
            <mute-button muted={this.isMuted}></mute-button>,
            <scrub-bar progress={this.progress} duration={this.duration}></scrub-bar>
        ]);
    }

}