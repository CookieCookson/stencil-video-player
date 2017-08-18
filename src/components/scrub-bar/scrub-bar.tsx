import { Component, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
    tag: 'scrub-bar',
    styleUrl: 'scrub-bar.scss'
})
export class ScrubBar {
    @Event() seek: EventEmitter;

    private scrub:any = document.querySelector('progress');

    @Prop() progress: number = 1;
    @Prop() duration: number = 1;

    handleSeek(event) {
        let percent = event.offsetX / this.scrub.offsetWidth;
        this.seek.emit(percent);
    }

    render() {
        return (
            <progress max={this.duration} value={this.progress} onClick={ (event) => this.handleSeek(event) }></progress>
        );
    }
}