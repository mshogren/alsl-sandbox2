module.exports = {
  hooks: {
    'pre-commit': 'lint-staged',
    'commit-msg': 'commitlint -e $HUSKY_GIT_PARAMS'
  }
};
