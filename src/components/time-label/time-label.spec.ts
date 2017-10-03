import { flush, render } from '@stencil/core/testing';
import { TimeLabel } from './time-label';

describe('time-label', () => {
  it('should build', () => {
    expect(new TimeLabel()).toBeTruthy();
  });

  describe('rendering', () => {
    let element;
    beforeEach(async () => {
      element = await render({
        components: [TimeLabel],
        html: '<time-label></time-label>'
      });
    });

    it('should work without parameters', () => {
      expect(element.textContent).toEqual('00:00');
    });

    it('should work with a time set', async () => {
      element.time = 1;
      await flush(element);
      expect(element.textContent).toEqual('00:01');
    });

    it('should display minutes when time is atleast 60 seconds', async () => {
        element.time = 60;
        await flush(element);
        expect(element.textContent).toEqual('01:00');
    });

    it('should display hours when time is atleast 3600 seconds', async () => {
        element.time = 3600;
        await flush(element);
        expect(element.textContent).toEqual('01:00:00');
    });

  });
});