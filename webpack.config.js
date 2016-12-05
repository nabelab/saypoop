var webpack = require("webpack")

module.exports = {
  context: __dirname + "/src",
  entry: "./index.js",
  output: {
    path: __dirname + "/public/scripts",
    filename: "bundle.js",
    publicPath: "/public/"
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
        test: /\.js$|\.tag$/,
        loader: "babel-loader"
      }
    ]
  },
  resolve: {
    extensions: ["", ".js", ".tag"]
  },
  devServer: { contentBase: "./public", port: 3000 }
}
