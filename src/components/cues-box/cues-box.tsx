import { Component, Prop, PropDidChange, State } from '@stencil/core';

@Component({
    tag: 'cues-box',
    styleUrl: 'cues-box.scss'
})
export class CuesBox {
    @Prop() cues: any;
    @State() cue: string;

    @PropDidChange('cues')
    onCuesSet() {
        for (let cue of this.cues.cues) {
            cue.onenter = (e) => this.cueEnter(e);
            cue.onexit = () => this.cueExit();
        }
    }

    private cueEnter(cue) {
        this.cue = cue.target.text;
    }

    private cueExit() {
        this.cue = null;
    }

    render() {
        return (
            <span>{this.cue}</span>
        );
    }
}
