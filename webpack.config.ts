const path = require("path");

const serverConfig = {
  name: "server",
  entry: "./src/server/Server.ts",
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.js",
    library: "server",
    libraryTarget: "umd",
    globalObject: "this",
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".js"],
  },
  target: "node",
  module: {
      rules: [
          {
              test: /\.tsx?$/,
              exclude: [/node_modules/],
              loader: "ts-loader",
              options: {
                  configFile: "../../tsconfig.server.json"
              }
          }
      ]
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  optimization: {
    minimize: false,
  }
};

module.exports = [serverConfig];
