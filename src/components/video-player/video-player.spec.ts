import { render } from '@stencil/core/testing';
import { VideoPlayer } from './video-player';

describe('video-player', () => {
  it('should build', () => {
    expect(new VideoPlayer()).toBeTruthy();
  });

  describe('rendering', () => {
    let element;
    beforeEach(async () => {
      element = await render({
        components: [VideoPlayer],
        html: '<video-player></video-player>'
      });
    });

  });
});