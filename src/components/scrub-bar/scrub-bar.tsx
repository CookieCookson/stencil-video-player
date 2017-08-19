import { Component, Prop, Event, EventEmitter, Element } from '@stencil/core';

@Component({
    tag: 'scrub-bar',
    styleUrl: 'scrub-bar.scss'
})
export class ScrubBar {
    @Prop() progress: number = 1;
    @Prop() duration: number = 1;

    @Event() seek: EventEmitter;
    @Element() element: HTMLElement;

    private scrubElement: HTMLElement;
    private isDown:boolean = false;
    
    componentWillLoad() {
        this.scrubElement = this.element.querySelector('progress');
        document.addEventListener('mousemove', (event) => this.handleMove(event));
        document.addEventListener('mouseup', (event) => this.handleUp(event));
    }

    handleDown(event) {
        event.preventDefault();
        this.isDown = true;
    }

    handleMove(event) {
        if (this.isDown) {
            event.preventDefault();
            this.calculateSeek(event);
        }
    }

    handleUp(event) {
        if (this.isDown) {
            event.preventDefault();
            this.isDown = false;
            this.calculateSeek(event);
        }
    }
    
    calculateSeek(event) {
        let controlPosition = this.scrubElement.getBoundingClientRect().left;
        let percent = (event.clientX - controlPosition) / this.scrubElement.offsetWidth;
        if (percent > 1) percent = 1;
        if (percent < 0) percent = 0;
        this.seek.emit(percent);
    }

    render() {
        return ([
            <span>Scrub</span>,
            <progress
                max={this.duration}
                value={this.progress}
                onMouseDown={ (downEvent) => this.handleDown(downEvent) }
            ></progress>
        ]);
    }
}