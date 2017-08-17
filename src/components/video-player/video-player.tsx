import { Component, Prop, Listen } from '@stencil/core';

@Component({
    tag: 'video-player',
    styleUrl: 'video-player.scss'
})
export class VideoPlayer {
    @Prop() url: string;

    private videoElement:any = document.querySelector('video-element');

    private isPlaying: boolean = false;

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

    render() {
        return ([
            <video-element src={this.url}></video-element>,
            <play-button playing={this.isPlaying}></play-button>
        ]);
    }

}