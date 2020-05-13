module.exports = {
  npmPublish: false,
  prepare: [
    '@semantic-release/npm',
    '@semantic-release/git'
  ],
  publish: [
    '@semantic-release/github'
  ]
};
