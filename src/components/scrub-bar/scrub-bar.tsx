import { Component, Prop, PropDidChange, Event, EventEmitter, Element, Listen, State } from '@stencil/core';

@Component({
    tag: 'scrub-bar',
    styleUrl: 'scrub-bar.scss'
})
export class ScrubBar {
    @Prop() progress: number;
    @Prop() duration: number;
    @Prop() thumbnails: TextTrack;

    @Event() seekStart: EventEmitter;
    @Event() seekMove: EventEmitter;
    @Event() seekEnd: EventEmitter;

    @Element() element: HTMLElement;

    private scrubElement: HTMLElement;
    private isDown: boolean = false;

    @State() valuetext: string = '0:00 of 0:00';
    @State() thumbnailOptions: any;

    componentDidLoad() {
        this.scrubElement = this.element.querySelector('progress');
    }

    @Listen('touchstart')
    touchstartHandler(event) {
        this.handleDown(event);
    }

    @Listen('mousedown')
    mousedownHandler(event) {
        this.handleDown(event);
    }

    @Listen('body:touchmove')
    bodytouchmoveHandler(event) {
        this.handleBodyMove(event);
    }

    @Listen('body:mousemove')
    bodymousemoveHandler(event) {
        this.handleBodyMove(event);
    }

    @Listen('body:touchend')
    bodytouchendHandler(event) {
        this.handleUp(event);
    }

    @Listen('body:mouseup')
    bodymouseupHandler(event) {
        this.handleUp(event);
    }

    @Listen('mousemove')
    mousemoveHandler(event) {
        this.handleMove(event);
    }

    handleDown(event) {
        this.isDown = true;
        this.scrubToPosition(event, this.seekStart);
    }

    handleBodyMove(event) {
        if (this.isDown) this.scrubToPosition(event, this.seekMove);
    }

    handleUp(event) {
        if (this.isDown) {
            this.isDown = false;
            this.scrubToPosition(event, this.seekEnd);
        }
    }

    handleMove(event) {
        if (this.thumbnails) this.showThumbnail(event);
    }

    scrubToPosition(event, emitter) {
        // Find scrub position as a percentage
        let clientX = event.touches && event.touches[0] ? event.touches[0].clientX : event.clientX;
        if (!clientX) return;
        let controlPosition = this.scrubElement.getBoundingClientRect().left;
        let percent = (clientX - controlPosition) / this.scrubElement.offsetWidth;
        if (percent > 1) percent = 1;
        if (percent < 0) percent = 0;
        // Convert percentage into time
        const newTime = this.duration * percent;
        emitter.emit(newTime);
    }

    calculateSeek(event) {
        // Find scrub position as a percentage
        let clientX = event.touches && event.touches[0] ? event.touches[0].clientX : event.clientX;
        if (!clientX) return;
        let controlPosition = this.scrubElement.getBoundingClientRect().left;
        let percent = (clientX - controlPosition) / this.scrubElement.offsetWidth;
        if (percent > 1) percent = 1;
        if (percent < 0) percent = 0;
        // Convert percentage into time
        const newTime = this.duration * percent;
        return newTime;
    }
    
    @Listen('keyup')
    keyboardHandler(keyboardEvent: KeyboardEvent) {
        let preventDefault = true;
        switch (keyboardEvent.code) {
            case 'ArrowLeft': {
                this.arrowLeftHandler();
                break;
            }
            case 'ArrowRight': {
                this.arrowRightHandler();
                break;
            }
            default: {
                // If no keyboard event is to be handled, do not prevent default
                preventDefault = false;
            }
        }
        if (preventDefault) keyboardEvent.preventDefault();
    }

    arrowLeftHandler() {
        let newTime = this.progress - 5; // go back 5 seconds
        if (newTime < 0.001) newTime = 0.001;
        this.seekEnd.emit(newTime);
    }

    arrowRightHandler() {
        let newTime = this.progress + 5; // go forwards 5 seconds
        if (newTime > this.duration) newTime = this.duration;
        this.seekEnd.emit(newTime);
    }
    
    @PropDidChange('progress')
    onProgressChangeHandler() {
        this.setValueText();
    }

    @PropDidChange('duration')
    onDurationChangeHandler() {
        this.setValueText();
    }

    setValueText() {
        if (this.progress !== undefined && this.duration !== undefined) {
            this.valuetext = this.toHHMMSS(this.progress) + ' of ' + this.toHHMMSS(this.duration);
        }
    }

    toHHMMSS(time) {
        // Get total seconds
        let numberInSeconds = parseInt(time, 10);
        // Get hours
        let hours: any = Math.floor(numberInSeconds / 3600);
        // Get remaining minutes
        let minutes: any = Math.floor((numberInSeconds - (hours * 3600)) / 60);
        // Get remaining seconds
        let seconds: any = numberInSeconds - (hours * 3600) - (minutes * 60);
        // Add leading 0 to hours
        if (hours < 10) {
            hours = '0' + hours;
        }
        // Add leading 0 to minutes
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        // Add leading 0 to seconds
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        // Return combined text string
        return (hours !== '00' ? hours + ':' : '') + minutes + ':' + seconds;
    };

    showThumbnail(event) {
        let position = this.calculateSeek(event);
        const cues = this.thumbnails.cues;
        let cueIndex = 0;
        for (cueIndex = 0; cueIndex < cues.length; cueIndex++) {
            if (cues[cueIndex].startTime <= position && cues[cueIndex].endTime > position) break;
        }
        const url = cues[cueIndex].text.split('#')[0];
        const xywh = cues[cueIndex].text.substr(cues[cueIndex].text.indexOf('=')+1).split(',');

        this.thumbnailOptions = {
            url: url,
            x: xywh[0] + 'px',
            y: xywh[1] + 'px',
            w: xywh[2] + 'px',
            h: xywh[3] + 'px',
            position: position / this.duration * 100
        }
    }

    render() {
        let objects = [
            <progress
                max={this.duration}
                value={this.progress || 0}
                tabindex='0'
                role='slider'
                aria-label='Seek slider'
                aria-valuemin='0'
                aria-valuemax={this.duration}
                aria-valuenow={this.progress}
                aria-valuetext={this.valuetext}
            ></progress>
        ];
        if (this.thumbnails) objects.unshift(<thumbnail-preview options={this.thumbnailOptions}></thumbnail-preview>);
   
        return objects;
    }
}
