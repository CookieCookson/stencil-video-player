import { Component, Event, EventEmitter, Prop } from '@stencil/core';

@Component({
    tag: 'play-button',
    styleUrl: 'play-button.scss'
})
export class PlayButton {
    @Event() play: EventEmitter;
    @Event() pause: EventEmitter;
    @Prop() playing: boolean;

    handleClick() {
        if (!this.playing) this.play.emit();
        else this.pause.emit();
    }

    render() {
        if (this.playing) {
            return (
                <div onClick={ () => this.handleClick()}>
                    Pause
                </div>
            );
        } else {
            return (
                <div onClick={ () => this.handleClick()}>
                    Play
                </div>
            );
        }
    }
}