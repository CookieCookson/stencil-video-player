import { Component, Prop, Event, EventEmitter, Element } from '@stencil/core';

@Component({
    tag: 'volume-bar',
    styleUrl: 'volume-bar.scss'
})
export class VolumeBar {
    @Prop() level: number;
    
    @Event() volume: EventEmitter;
    @Element() element: HTMLElement;

    private volumeElement: HTMLElement;
    private isDown:boolean = false;
    
    componentWillLoad() {
        this.volumeElement = this.element.querySelector('progress');
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
            this.calculateVolume(event);
        }
    }

    handleUp(event) {
        if (this.isDown) {
            event.preventDefault();
            this.isDown = false;
            this.calculateVolume(event);
        }
    }
    
    calculateVolume(event) {
        let controlPosition = this.volumeElement.getBoundingClientRect().left;
        let percent = (event.clientX - controlPosition) / this.volumeElement.offsetWidth;
        if (percent > 1) percent = 1;
        if (percent < 0) percent = 0;
        this.volume.emit(percent);
    }

    render() {
        return ([
            <span>Volume</span>,
            <progress
                max='1'
                value={this.level}
                onMouseDown={ (downEvent) => this.handleDown(downEvent) }
            ></progress>
        ]);
    }
}