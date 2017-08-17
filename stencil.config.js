exports.config = {
  bundles: [
    { components: [
      'video-player',
      'video-element',
      'play-button',
      'mute-button'
    ] }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
