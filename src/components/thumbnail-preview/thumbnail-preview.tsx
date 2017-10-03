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
        this.element.style.backgroundPosition = '-' + this.options.x + 'px -' + this.options.y + 'px';
        this.element.style.width = this.options.w + 'px';
        this.element.style.height = this.options.h + 'px';
        this.element.style.left = this.options.position + 'px';
        this.element.style.marginLeft = -this.options.w / 2 + 'px';
    }

    render() {
        return '';
    }
}
