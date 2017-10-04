import { Component, Event, EventEmitter, Prop } from '@stencil/core';

@Component({
    tag: 'subtitles-button',
    styleUrl: 'subtitles-button.scss'
})
export class SubtitlesButton {
    @Event() subtitles: EventEmitter;
    @Prop() enabled: boolean;

    handleClick() {
        if (!this.enabled) this.subtitles.emit(true);
        else this.subtitles.emit(false);
    }

    render() {
        if (this.enabled) {
            return (
                <button onClick={() => this.handleClick()} aria-label='Disable Subtitles'>
                    🗨️
                </button>
            );
        } else {
            return (
                <button onClick={() => this.handleClick()} aria-label='Enable Subtitles'>
                    💬
                </button>
            );
        }
    }
}
