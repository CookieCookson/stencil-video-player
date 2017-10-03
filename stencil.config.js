exports.config = {
  generateCollection: true,
  bundles: [
    { components: [
      'video-player',
      'video-element',
      'play-button',
      'mute-button',
      'fullscreen-button',
      'scrub-bar',
      'volume-bar',
      'time-label',
      'control-bar',
      'thumbnail-preview'
    ] }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
