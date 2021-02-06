import fs from "fs";
import path from "path";
import CopyPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

const clientConfig = {
  entry: "./src/client/index.tsx",
  target: "web",
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
        { from: "./src/client/static/favicon.ico", to: "." },
        { from: "./src/client/static/robots.txt", to: "." },
        { from: "./src/client/static/manifest.json", to: "." },
      ],
    }),
  ],
  devServer: {
    contentBase: path.resolve(
      __dirname,
      "src",
      "client",
      "static",
      "index.html"
    ),
    compress: true,
    port: 9000,
    hot: true,
    https: true,
    key: fs.readFileSync("./tmp/privkey.pem"),
    cert: fs.readFileSync("./tmp/cert.pem"),
  },
};

module.exports = [clientConfig];
