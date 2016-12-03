module.exports = {
  context: __dirname + "/src",
  entry: {
    app: "./app.tag",
    bundle: "./index.ts"
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].js"
  },
  devtool: "inline-source-map",
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: "ts-loader"
      },
      {
        test: /\.tag$/,
        loader: "riotjs-loader",
        query: { type: "typescript" }
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tag"]
  },
  devServer: {
    contentBase: "dist",
    port: 3000,
    historyApiFallback: {
      index: "/index.html"
    }
  }
}
