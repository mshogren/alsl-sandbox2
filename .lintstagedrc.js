module.exports = {
  'src/**/*.{js,jsx,ts,tsx,json,css,scss,md}': [
    'prettier --write'
  ],
  'src/**/*.js?(x)': [
    (filenames) => filenames.length > 10 ? 'eslint .' : `eslint ${filenames.join(' ')}`
  ],
  'functions/**/*.js': [
    'prettier --write'
  ],
}
