const path = require("path");
const webpack = require("webpack");

module.exports = {

    entry: "./src/index.jsx",
    output: {
        path: path.join(__dirname, "public"),
        filename: "bundle.js",
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: "babel-loader",
            },
        ],
    },

    resolve: {
        extensions: ["*", ".js", ".jsx"],
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],

    devServer: {
        contentBase: path.join(__dirname, "public"),
        inline: true,
        hot: true,
    },
};
