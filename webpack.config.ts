const path = require("path");
// const Dotenv = require('dotenv-webpack');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const serverConfig = {
  name: "server",
  entry: "./src/server/Server.ts",
  mode: "production",
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

const clientConfig = {
  entry: "./src/client/index.tsx",
  target: "web",
  mode: "production",
  output: {
    path: path.resolve(__dirname, "build", "client"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "awesome-typescript-loader",
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
      {
        test: /\.(s*)css$/,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico|json)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff2?|ttf|otf|eot)$/,
        exclude: /node_modules/,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(
        __dirname,
        "src",
        "client",
        "static",
        "index.html"
      ),
    }),
    new CopyPlugin({
      patterns: [
        {from: "./src/client/static/favicon.ico", to: "."},
        {from: "./src/client/static/robots.txt", to: "."},
        {from: "./src/client/static/manifest.json", to: "."},
      ]
    })
  ],
};

module.exports = [serverConfig, clientConfig];
