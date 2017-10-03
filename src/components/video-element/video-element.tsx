import { Component, Prop, Method, Element, Event, EventEmitter } from '@stencil/core';

@Component({
    tag: 'video-element',
    styleUrl: 'video-element.scss'
})
export class VideoElement {
    @Prop() src: string;
    @Prop() poster: string;
    @Prop() thumbs: string;

    @Event() play: EventEmitter;
    @Event() pause: EventEmitter;
    @Event() timeupdate: EventEmitter;
    @Event() duration: EventEmitter;
    @Event() ended: EventEmitter;
    @Event() thumbnailsTrack: EventEmitter;

    @Element() element: HTMLElement;

    private video: HTMLVideoElement;

    componentDidLoad() {
        this.video = this.element.querySelector('video');
        this.video.addEventListener('timeupdate', () => this.emitCurrentTime());
        if (this.video.duration) this.emitDuration();
        this.video.addEventListener('loadedmetadata', () => this.emitMetadata());
        this.video.addEventListener('ended', () => this.emitEnded());
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
    seekTo(newTime) {
        this.video.currentTime = newTime;
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

    emitMetadata() {
        this.emitDuration();
        if (this.video.textTracks) this.emitTextTracks();
    }

    emitDuration() {
        this.duration.emit(this.video.duration);
    }

    emitTextTracks() {
        for (let i = 0; i < this.video.textTracks.length; i++) {
            if (this.video.textTracks[i].label === 'thumbnails') this.thumbnailsTrack.emit(this.video.textTracks[i]);
        }
    }

    emitCurrentTime() {
        this.timeupdate.emit(this.video.currentTime);
    }

    emitEnded() {
        this.ended.emit();
    }

    render() {
        let thumbsTrack = null;
        if (this.thumbs) thumbsTrack = <track src={this.thumbs} kind='metadata' label='thumbnails' default />;
        return (
            <video
                poster={this.poster}
                onClick={($event) => this.handleClick($event)}
                playsInline
                webkit-playsinline>
                <source src={this.src} />
                {thumbsTrack}
            </video>
        );
    }
}
