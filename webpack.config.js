var webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js",
    publicPath: "/public/",
  },
  module: {
    preLoaders: [
      {
        test: /\.tag$/,
        exclude: /node_modules/,
        loader: "riotjs-loader",
        query: {
          type: "babel"
        }
      }
    ],
    loaders: [
      {
        test: /\.js$|\.tag$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.tag.html$/,
        exclude: /node_modules/,
        loader: "tag"
      },
      {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader"
      }
    ]
  },
  resolve: {
      extensions: ["", ".js", ".tag", ".html"]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.ProvidePlugin({
      riot: "riot"
    })
  ]
}
