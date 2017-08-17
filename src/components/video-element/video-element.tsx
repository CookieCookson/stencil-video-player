import { Component, Prop, Method, Event, EventEmitter } from '@stencil/core';


@Component({
    tag: 'video-element',
    styleUrl: 'video-element.scss'
})
export class VideoElement {

    private video:any = document.querySelector('video');

    @Event() play: EventEmitter;
    @Event() pause: EventEmitter;
    @Event() timeupdate: EventEmitter;
    @Event() duration: EventEmitter;

    componentDidLoad() {
        if (this.video) {
            this.video.addEventListener('timeupdate', () => {
                this.timeupdate.emit(this.video.currentTime);
            });
            if (this.video.duration) this.duration.emit(this.video.duration);
            this.video.addEventListener('loadedmetadata', () => {
                this.duration.emit(this.video.duration);
            });
        }
    }

    @Prop() src: string;

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

    handleClick() {
        if (this.video.paused) this.play.emit();
        else this.pause.emit();
    }

    render() {
        return (
            <video onClick={ () => this.handleClick()}>
                <source src={this.src} />
            </video>
        );
    }
}
