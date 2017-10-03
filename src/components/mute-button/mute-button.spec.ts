import { flush, render } from '@stencil/core/testing';
import { MuteButton } from './mute-button';

describe('mute-button', () => {
  it('should build', () => {
    expect(new MuteButton()).toBeTruthy();
  });

  describe('rendering', () => {
    let element;
    beforeEach(async () => {
      element = await render({
        components: [MuteButton],
        html: '<mute-button></mute-button>'
      });
    });

    it('should work without parameters', () => {
      expect(element.textContent).toEqual('🔊');
    });

    it('should work with muted set to false', async () => {
      element.muted = false;
      await flush(element);
      expect(element.textContent).toEqual('🔊');
    });

    it('should change icon when muted is set to true', async () => {
        element.muted = true;
        await flush(element);
        expect(element.textContent).toEqual('🔇');
    });

  });
});