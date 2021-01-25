import path from "path";
// import Dotenv from 'dotenv-webpack';

const serverConfig = {
  name: "server",
  entry: "./src/server/Server.ts",
  output: {
    path: path.resolve(__dirname, "build", "server"),
    filename: "server.js",
  },
  // plugins: [
  //   new Dotenv()
  // ],
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
      },
    ],
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  optimization: {
    minimize: false,
  },
};

module.exports = [serverConfig];
