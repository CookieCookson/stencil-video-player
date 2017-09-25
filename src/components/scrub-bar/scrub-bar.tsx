import { Component, Prop, Event, EventEmitter, Element, Listen } from '@stencil/core';

@Component({
    tag: 'scrub-bar',
    styleUrl: 'scrub-bar.scss'
})
export class ScrubBar {
    @Prop() progress: number;
    @Prop() duration: number;

    @Event() seek: EventEmitter;
    @Element() element: HTMLElement;

    private scrubElement: HTMLElement;
    private isDown:boolean = false;
    
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
    touchmoveHandler(event) {
        this.handleMove(event);
    }

    @Listen('body:mousemove')
    mousemoveHandler(event) {
        this.handleMove(event);
    }

    @Listen('body:touchend')
    touchendHandler(event) {
        this.handleUp(event);
    }

    @Listen('body:mouseup')
    mouseupHandler(event) {
        this.handleUp(event);
    }

    handleDown(event) {
        this.isDown = true;
        this.calculateSeek(event);
    }

    handleMove(event) {
        if (this.isDown) {
            this.calculateSeek(event);
        }
    }

    handleUp(event) {
        if (this.isDown) {
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
        return (
            <progress
                max={this.duration}
                value={this.progress || 0}
            ></progress>
        );
    }
}
