var webpack = require("webpack")

module.exports = {
  context: __dirname + "/src",
  entry: {
    html: "./index.html",
    javascript: "./index.js"
  },
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },
  plugins: [new webpack.ProvidePlugin({ riot: "riot" })],
  devtool: "inline-source-map",
  module: {
    preLoaders: [
      {
        test: /\.tag$/,
        loader: "riotjs-loader",
        query: { type: "babel" }
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader"
      },
      {
        test: /\.html$/,
        loader: "file-loader",
        query: { name: "[name].[ext]" }
      }
    ]
  },
  resolve: {
    extensions: ["", ".js", ".tag"]
  },
  devServer: { contentBase: "./public" }
}
