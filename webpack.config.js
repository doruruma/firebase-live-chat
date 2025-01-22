const webpack = require("webpack")
const path = require("path")
const dotenv = require("dotenv")

const env = dotenv.config().parsed
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next])
  return prev
}, {})

module.exports = {
  mode: "development",
  plugins: [new webpack.DefinePlugin(envKeys)],
  entry: {
    index: "./src/index.js",
    firebase: "./src/firebase.js",
    component: "./src/component.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist/js"),
  },
}
