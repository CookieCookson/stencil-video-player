import { flush, render } from '@stencil/core/testing';
import { PlayButton } from './play-button';

describe('play-button', () => {
  it('should build', () => {
    expect(new PlayButton()).toBeTruthy();
  });

  describe('rendering', () => {
    let element;
    beforeEach(async () => {
      element = await render({
        components: [PlayButton],
        html: '<play-button></play-button>'
      });
    });

    it('should work without parameters', () => {
      expect(element.textContent).toEqual('▶️');
    });

    it('should work with playing set to false', async () => {
      element.playing = false;
      await flush(element);
      expect(element.textContent).toEqual('▶️');
    });

    it('should change icon when playing is set to true', async () => {
        element.playing = true;
        await flush(element);
        expect(element.textContent).toEqual('⏸️');
    });

  });
});