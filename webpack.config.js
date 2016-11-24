module.exports = {
  context: __dirname + "/src",
  entry: {
    javascript: "./index.js",
    html: "./index.html"
  },
  output: {
    path: __dirname + "/public",
    filename: "./bundle.js"
  },
  devtool: "inline-source-map",
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ["babel"] },
      { test: /\.css$/, loaders: ["style", "css?modules"] },
      { test: /\.html$/, loader: "file?name=[name].[ext]" }
    ]
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  devServer: {
    contentBase: "dist",
    port: 3000,
    historyApiFallback: {
      index: "/index.html"
    }
  }
}
