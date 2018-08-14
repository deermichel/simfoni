const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => ({

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
                loader: "babel-loader",
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    (argv.mode === "development") ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]",
                    "sass-loader",
                ],
            },
        ],
    },

    resolve: {
        extensions: ["*", ".js", ".jsx"],
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: "style.css",
        }),
    ],

    devServer: {
        contentBase: path.join(__dirname, "public"),
        inline: true,
        hot: true,
    },
});
