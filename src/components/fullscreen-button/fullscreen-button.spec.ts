import { flush, render } from '@stencil/core/testing';
import { FullscreenButton } from './fullscreen-button';

describe('fullscreen-button', () => {
  it('should build', () => {
    expect(new FullscreenButton()).toBeTruthy();
  });

  describe('rendering', () => {
    let element;
    beforeEach(async () => {
      element = await render({
        components: [FullscreenButton],
        html: '<fullscreen-button></fullscreen-button>'
      });
    });

    it('should work without parameters', () => {
      expect(element.textContent).toEqual('🔲');
    });

    it('should work with fullscreen set to false', async () => {
      element.fullscreen = false;
      await flush(element);
      expect(element.textContent).toEqual('🔲');
    });

    it('should change icon when fullscreen is set to true', async () => {
      element.fullscreen = true;
      await flush(element);
      expect(element.textContent).toEqual('🔳');
    });

  });
});