const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

// const serverConfig = {
//   name: "server",
//   entry: "./src/server/Server.ts",
//   mode: "production",
//   output: {
//     path: path.resolve(__dirname, "dist"),
//     filename: "server.js",
//     library: "server",
//     libraryTarget: "umd",
//     globalObject: "this",
//   },
//   devtool: "source-map",
//   resolve: {
//     extensions: [".ts", ".js"],
//   },
//   target: "node",
//   module: {
//     rules: [
//       {
//         test: /\.tsx?$/,
//         exclude: [/node_modules/],
//         loader: "ts-loader",
//         options: {
//           configFile: "../../tsconfig.server.json",
//         },
//       },
//     ],
//   },
//   watchOptions: {
//     ignored: /node_modules/,
//   },
//   optimization: {
//     minimize: false,
//   },
// };

const clientConfig = {
  entry: "./src/client/index.tsx",
  target: "web",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "build"),
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
        test: /\.css$/,
        loader: "css-loader",
      },
      {
        test: /\.s[ac]ss$/i,
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
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
  ],
};

module.exports = [clientConfig];
// module.exports = [serverConfig, clientConfig];
