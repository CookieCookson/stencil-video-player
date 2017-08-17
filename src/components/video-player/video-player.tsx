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

    render() {
        return ([
            <video-element src={this.url}></video-element>,
            <play-button playing={this.isPlaying}></play-button>,
            <mute-button muted={this.isMuted}></mute-button>
        ]);
    }

}