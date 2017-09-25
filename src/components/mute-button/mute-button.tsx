import { Component, Event, EventEmitter, Prop } from '@stencil/core';

@Component({
    tag: 'mute-button',
    styleUrl: 'mute-button.scss'
})
export class MuteButton {
    @Event() mute: EventEmitter;
    @Event() unmute: EventEmitter;
    @Prop() muted: boolean;

    handleClick() {
        if (!this.muted) this.mute.emit();
        else this.unmute.emit();
    }

    render() {
        if (this.muted) {
            return (
                <button onClick={ () => this.handleClick()}>
                    🔇
                </button>
            );
        } else {
            return (
                <button onClick={ () => this.handleClick()}>
                    🔊
                </button>
            );
        }
    }
}
