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
        document.addEventListener('touchmove', (event) => this.handleMove(event));
        document.addEventListener('touchend', (event) => this.handleUp(event));
        if (this.scrubElement) {
            this.scrubElement.addEventListener('touchstart', (event) => this.handleDown(event));
        }
    }

    handleDown(event) {
        event.preventDefault();
        this.isDown = true;
        this.calculateSeek(event);
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
        let clientX = event.touches && event.touches[0] ? event.touches[0].clientX : event.clientX;
        if (!clientX) return;
        let controlPosition = this.scrubElement.getBoundingClientRect().left;
        let percent = (clientX - controlPosition) / this.scrubElement.offsetWidth;
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
                onMouseDown={ (mouseDownEvent) => this.handleDown(mouseDownEvent) }
            ></progress>
        ]);
    }
}