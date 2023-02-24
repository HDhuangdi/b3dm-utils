const TerserPlugin = require("terser-webpack-plugin")
const resolve = (path) => require("path").resolve(__dirname, path);

const commonConfig = {
  entry: {
    index: resolve("./src/index.ts"),
  },
  output: {
    path: resolve("./dist"),
    filename: "index.min.js",
    libraryTarget: "umd",
    library: "B3DMUtils",
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /.jsx?$/,
        loader: "babel-loader",
        resolve: {
          fullySpecified: false,
        },
      }
    ],
  },
  optimization: {
    minimizer: [new TerserPlugin({
      extractComments: false,
    })],
  },
  mode: "production",
};

module.exports = commonConfig;
