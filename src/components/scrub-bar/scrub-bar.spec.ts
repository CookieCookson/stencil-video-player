import { render } from '@stencil/core/testing';
import { ScrubBar } from './scrub-bar';

describe('scrub-bar', () => {
  it('should build', () => {
    expect(new ScrubBar()).toBeTruthy();
  });

  describe('rendering', () => {
    let element;
    beforeEach(async () => {
      element = await render({
        components: [ScrubBar],
        html: '<scrub-bar></scrub-bar>'
      });
    });

  });
});