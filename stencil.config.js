exports.config = {
  bundles: [
    { components: ['video-player', 'video-element', 'play-button'] }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
