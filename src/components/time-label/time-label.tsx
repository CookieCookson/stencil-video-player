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
    didChangeHandler(time: number) {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        if (hours < 10) this.hours = '0' + hours;
        else this.hours = String(hours);
        if (minutes < 10) this.minutes = '0' + minutes;
        else this.minutes = String(minutes);
        if (seconds < 10) this.seconds = '0' + seconds;
        else this.seconds = String(seconds);
    }

    render() {
        if (this.hours !== '00') {
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
        } else {
            return ([
                <span>{this.minutes[0]}</span>,
                <span>{this.minutes[1]}</span>,
                <span class='divider'>:</span>,
                <span>{this.seconds[0]}</span>,
                <span>{this.seconds[1]}</span>
            ]);
        }
    }
}
