const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {

    entry: "./src/remote/index.js",
    output: {
        path: path.join(__dirname, "build"),
        filename: "remote.js",
    },
    target: "electron-renderer",

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({ title: "simfoni" }),
    ],

    devServer: {
        contentBase: path.join(__dirname, "build"),
        port: 9001,
    },
};
