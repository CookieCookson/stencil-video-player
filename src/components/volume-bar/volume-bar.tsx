import { Component, Prop, PropDidChange, Event, EventEmitter, Element, Listen } from '@stencil/core';

@Component({
    tag: 'volume-bar',
    styleUrl: 'volume-bar.scss'
})
export class VolumeBar {
    @Prop() level: number;

    @Event() volume: EventEmitter;
    @Element() element: HTMLElement;

    private volumeElement: HTMLElement;
    private isDown: boolean = false;
    private valuetext = '100% volume';

    componentDidLoad() {
        this.volumeElement = this.element.querySelector('progress');
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
        this.calculateVolume(event);
    }

    handleMove(event) {
        if (this.isDown) {
            this.calculateVolume(event);
        }
    }

    handleUp(event) {
        if (this.isDown) {
            this.isDown = false;
            this.calculateVolume(event);
        }
    }

    calculateVolume(event) {
        let clientX = event.touches && event.touches[0] ? event.touches[0].clientX : event.clientX;
        if (!clientX) return;
        let controlPosition = this.volumeElement.getBoundingClientRect().left;
        let percent = (clientX - controlPosition) / this.volumeElement.offsetWidth;
        if (percent > 1) percent = 1;
        if (percent < 0) percent = 0;
        this.volume.emit(percent);
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
        let newVolume = this.level - 0.05; // reduce volume by 5%
        if (newVolume < 0) newVolume = 0
        this.volume.emit(newVolume);
    }

    arrowRightHandler() {
        let newVolume = this.level + 0.05; // increase volume by 5%
        if (newVolume > 1) newVolume = 1;
        this.volume.emit(newVolume);
    }

    @PropDidChange('level')
    onLevelChange() {
        this.valuetext = (this.level * 100).toFixed(0) + '% volume';
    }

    render() {
        return (
            <progress
                max='1'
                value={this.level}
                tabindex='0'
                role='slider'
                aria-valuemin='0'
                aria-valuemax='100'
                aria-valuenow={((this.level * 100).toFixed(0))}
                aria-valuetext={this.valuetext}
            ></progress>
        );
    }
}
