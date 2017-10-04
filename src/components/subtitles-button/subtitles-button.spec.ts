import { flush, render } from '@stencil/core/testing';
import { SubtitlesButton } from './subtitles-button';

describe('subtitles-button', () => {
  it('should build', () => {
    expect(new SubtitlesButton()).toBeTruthy();
  });

  describe('rendering', () => {
    let element;
    beforeEach(async () => {
      element = await render({
        components: [SubtitlesButton],
        html: '<subtitles-button></subtitles-button>'
      });
    });

    it('should work without parameters', () => {
      expect(element.textContent).toEqual('💬');
    });

    it('should work with enabled set to false', async () => {
      element.enabled = false;
      await flush(element);
      expect(element.textContent).toEqual('💬');
    });

    it('should change icon when enabled is set to true', async () => {
      element.enabled = true;
      await flush(element);
      expect(element.textContent).toEqual('🗨️');
    });

  });
});