import { Component, Prop, PropDidChange, Element } from '@stencil/core';

@Component({
    tag: 'thumbnail-preview',
    styleUrl: 'thumbnail-preview.scss'
})
export class ThumbnailPreview {
    @Prop() options: any;

    @Element() element;

    @PropDidChange('options')
    optionsHandler() {
        this.element.style.backgroundImage = 'url(' + this.options.url + ')';
        this.element.style.backgroundPosition = '-' + this.options.x + ' -' + this.options.y;
        this.element.style.width = this.options.w;
        this.element.style.height = this.options.h;
        this.element.style.left = this.options.position + '%';
    }

    render() {
        return '';
    }
}
