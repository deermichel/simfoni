const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const GoogleFontsPlugin = require("@beyonk/google-fonts-webpack-plugin");
const Colors = require("./colors");

const colorsReplaceLoader = () => {
    const rules = Object.entries(Colors)
        .map(([key, val]) => ({ search: `__COLOR_${key}`, replace: val, flags: "g" }));
    return {
        loader: "string-replace-loader",
        options: {
            multiple: rules,
        },
    };
};

module.exports = (env, argv) => ({

    entry: "./src/renderer/index.jsx",
    output: {
        path: path.join(__dirname, "build"),
        filename: "renderer.js",
    },
    target: "electron-renderer",

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    "babel-loader",
                    colorsReplaceLoader(),
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    (argv.mode === "development") ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]",
                    "sass-loader",
                    colorsReplaceLoader(),
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
        new HtmlWebpackPlugin({
            template: "static/index.html",
            title: "simfoni",
        }),
        new GoogleFontsPlugin({
            fonts: [{ family: "Source Sans Pro" }],
            path: "fonts/",
        }),
    ],

    devServer: {
        contentBase: path.join(__dirname, "build"),
        inline: true,
        hot: true,
        port: 9000,
    },
});
