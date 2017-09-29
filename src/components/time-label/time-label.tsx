import { Component, State, Prop, PropDidChange } from '@stencil/core';

@Component({
    tag: 'time-label',
    styleUrl: 'time-label.scss'
})
export class TimeLabel {
    @State() seconds: string = '00';
    @State() minutes: string = '00';
    @State() hours: string = '00';

    @Prop() time: number;

    @PropDidChange('time')
    didChangeHandler(currentTimeInSeconds: number) {
        let h = Math.floor(currentTimeInSeconds / 3600);
        let m, s;
        if (h > 0) {
            m = Math.floor((currentTimeInSeconds - (h / 3600)) / 60);
            s = currentTimeInSeconds - (h * 3600) - (m * 60);
        } else {
            m = Math.floor(currentTimeInSeconds / 60);
            s = currentTimeInSeconds - (m * 60);
        }
        if (h < 10) this.hours = '0' + h;
        else this.hours = String(h);
        if (m < 10) this.minutes = '0' + m;
        else this.minutes = String(m);
        if (s < 10) this.seconds = '0' + s;
        else this.seconds = String(s);
    }

    render() {
        return ([
            <span>{this.hours[0]}</span>,
            <span>{this.hours[1]}</span>,
            <span class='divider'>:</span>,
            <span>{this.minutes[0]}</span>,
            <span>{this.minutes[1]}</span>,
            <span class='divider'>:</span>,
            <span>{this.seconds[0]}</span>,
            <span>{this.seconds[1]}</span>
        ]);
    }
}
