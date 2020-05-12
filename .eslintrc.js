module.exports = {
  "extends": [
    "react-app",
    "airbnb",
    "prettier",
    "prettier/react"
  ],
  "rules": {
    "indent": [
      "error",
      2,
      { "SwitchCase": 1 }
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "react/jsx-filename-extension": [
      "warn",
      { "extensions": [
        ".js",
        ".jsx"]
      }
    ],
  }
}
