import { Component, Event, EventEmitter, Prop } from '@stencil/core';

@Component({
    tag: 'fullscreen-button',
    styleUrl: 'fullscreen-button.scss'
})
export class FullscreenButton {
    @Event() enterFullscreen: EventEmitter;
    @Event() exitFullscreen: EventEmitter;
    @Prop() fullscreen: boolean;

    handleClick() {
        if (!this.fullscreen) this.enterFullscreen.emit();
        else this.exitFullscreen.emit();
    }

    render() {
        if (this.fullscreen) {
            return (
                <button onClick={ () => this.handleClick()}>
                    Exit Fullscreen
                </button>
            );
        } else {
            return (
                <button onClick={ () => this.handleClick()}>
                    Enter Fullscreen
                </button>
            );
        }
    }
}