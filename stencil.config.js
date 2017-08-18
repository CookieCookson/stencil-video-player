exports.config = {
  bundles: [
    { components: [
      'video-player',
      'video-element',
      'play-button',
      'mute-button',
      'scrub-bar',
      'time-label'
    ] }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
