import { Component, Prop, Method, Element, Event, EventEmitter } from '@stencil/core';

@Component({
    tag: 'video-element',
    styleUrl: 'video-element.scss'
})
export class VideoElement {
    @Prop() src: string;
    @Prop() poster: string;
    @Prop() thumbs: string;
    @Prop() subtitles: string;

    @Event() play: EventEmitter;
    @Event() pause: EventEmitter;
    @Event() timeupdate: EventEmitter;
    @Event() duration: EventEmitter;
    @Event() ended: EventEmitter;
    @Event() playing: EventEmitter;
    @Event() thumbnailsTrack: EventEmitter;
    @Event() subtitlesTrack: EventEmitter;
    @Event() showingSubtitles: EventEmitter;

    @Element() element: HTMLElement;

    private video: HTMLVideoElement;

    componentDidLoad() {
        this.video = this.element.querySelector('video');
        this.emitInitialValues();
        this.bindEventListeners();
    }

    emitInitialValues() {
        this.emitDuration();
        this.emitMetadata();
    }

    bindEventListeners() {
        this.video.addEventListener('durationchange', () => this.emitDuration());
        this.video.addEventListener('loadedmetadata', () => this.emitMetadata());
        this.video.addEventListener('timeupdate', () => this.emitCurrentTime());
        this.video.addEventListener('ended', () => this.emitEnded());
        this.video.addEventListener('playing', () => this.emitPlaying());
        this.video.addEventListener('pause', () => this.emitPaused());
        this.video.addEventListener('click', (event) => this.handleClick(event));
        (this.video.textTracks as any).onchange = (changeEvent) => {
            this.showingSubtitles.emit(changeEvent.target[0].mode === 'showing' ? true : false);
        };
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

    @Method()
    toggleSubtitles(enabled) {
        this.video.textTracks[0].mode = enabled ? 'showing' : 'hidden';
    }

    handleClick(event) {
        event.preventDefault();
        if (this.video.paused) this.play.emit();
        else this.pause.emit();
    }

    emitMetadata() {
        if (this.video.textTracks) this.emitTextTracks();
    }

    emitDuration() {
        if (this.video.duration) this.duration.emit(this.video.duration);
    }

    emitTextTracks() {
        for (let i = 0; i < this.video.textTracks.length; i++) {
            const tt = this.video.textTracks[i];
            if (tt.kind === 'metadata' && tt.label === 'thumbnails') this.thumbnailsTrack.emit(tt);
            if (tt.kind === 'subtitles') this.subtitlesTrack.emit(tt);
        }
    }

    emitCurrentTime() {
        this.timeupdate.emit(this.video.currentTime);
    }

    emitEnded() {
        this.ended.emit();
    }

    emitPlaying() {
        this.playing.emit(true);
    }

    emitPaused() {
        this.playing.emit(false);
    }

    render() {
        return (
            <slot />
        );
    }
}
