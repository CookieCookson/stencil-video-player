exports.config = {
  namespace: 'videoplayer',
  generateDistribution: true,
  bundles: [
    { components: [
      'video-player',
      'play-button',
      'mute-button',
      'fullscreen-button',
      'scrub-bar',
      'volume-bar',
      'time-label',
      'control-bar',
      'thumbnail-preview',
      'subtitles-button',
      'cues-box'
    ] }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
