import { flush, render } from '@stencil/core/testing';
import { ControlBar } from './control-bar';

describe('control-bar', () => {
  it('should build', () => {
    expect(new ControlBar()).toBeTruthy();
  });

  describe('rendering', () => {
    let element;
    beforeEach(async () => {
      element = await render({
        components: [ControlBar],
        html: '<control-bar></control-bar>'
      });
    });

    it('should work without parameters', () => {
      expect(element.textContent).toEqual('');
    });

    it('should be visible by default', () => {
        expect(element.style.opacity).toEqual('1');
    });

    it('should be visible with visible set to true', async () => {
      element.visible = true;
      await flush(element);
      expect(element.style.opacity).toEqual('1');
    });

    it('should be hidden with visible set to false', async () => {
      element.visible = false;
      await flush(element);
      expect(element.style.opacity).toEqual('0');
    });

  });
});