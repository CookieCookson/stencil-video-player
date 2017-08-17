import { Component, Prop } from '@stencil/core';

@Component({
    tag: 'scrub-bar'
})
export class ScrubBar {
    @Prop() progress: number = 1;
    @Prop() duration: number = 1;

    render() {
        return (
            <progress max={this.duration} value={this.progress}></progress>
        );
    }
}