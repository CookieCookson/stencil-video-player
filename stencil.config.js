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
      'time-label'
    ] }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
