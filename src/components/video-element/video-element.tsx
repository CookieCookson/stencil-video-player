import { Component, Prop, Method, Element, Event, EventEmitter } from '@stencil/core';

@Component({
    tag: 'video-element',
    styleUrl: 'video-element.scss'
})
export class VideoElement {
    @Prop() src: string;
    @Prop() poster: string;

    @Event() play: EventEmitter;
    @Event() pause: EventEmitter;
    @Event() timeupdate: EventEmitter;
    @Event() duration: EventEmitter;

    @Element() element: HTMLElement;

    private video:HTMLVideoElement;

    componentDidLoad() {
        this.video = this.element.querySelector('video');
        this.video.addEventListener('timeupdate', () => this.emitCurrentTime());
        if (this.video.duration) this.emitDuration();
        this.video.addEventListener('loadedmetadata', () => this.emitDuration());
    }

    @Method()
    playVideo() {
        this.video.play();
    }

    @Method()
    pauseVideo() {
        this.video.pause();
    }

    @Method()
    muteVideo() {
        this.video.volume = 0;
    }

    @Method()
    unmuteVideo() {
        this.video.volume = 1;
    }

    @Method()
    seekTo(time) {
        this.video.currentTime = this.video.duration * time;
    }

    @Method()
    setVolume(volume) {
        this.video.volume = volume;
    }

    @Method()
    enterFullscreen() {
        (this.video as any).webkitEnterFullscreen();
    }

    handleClick(event) {
        event.preventDefault();
        if (this.video.paused) this.play.emit();
        else this.pause.emit();
    }

    emitDuration() {
        this.duration.emit(this.video.duration);
    }

    emitCurrentTime() {
        this.timeupdate.emit(this.video.currentTime);
    }

    render() {
        return (
            <video poster={this.poster} onClick={($event) => this.handleClick($event)} playsInline webkit-playsinline>
                <source src={this.src} />
            </video>
        );
    }
}
