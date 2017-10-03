import { Component, Prop, PropDidChange, Element } from '@stencil/core';

@Component({
    tag: 'control-bar',
    styleUrl: 'control-bar.scss'
})
export class ControlBar {
    @Prop() visible = true;
    @Element() element: HTMLElement;

    componentDidLoad() {
        this.element.style.opacity = '1';
    }

    @PropDidChange('visible')
    visibilityHandler(isVisible) {
        this.element.style.opacity = isVisible ? '1' : '0';
    }

    render() {
        return '';
    }
}