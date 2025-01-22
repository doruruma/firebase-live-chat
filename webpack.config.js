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
    sign_up: "./src/sign_up.js",
    sign_in: "./src/sign_in.js",
    chat: "./src/chat.js",
    firebase: "./src/firebase.js",
    component: "./src/component.js",
    local_storage: "./src/local_storage.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist/js"),
  },
}
