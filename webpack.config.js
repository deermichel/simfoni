const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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

    entry: "./src/index.jsx",
    output: {
        path: path.join(__dirname, "public"),
        filename: "bundle.js",
    },
    target: "electron-main",

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
                exclude: /node_modules/,
                use: [
                    (argv.mode === "development") ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]",
                    colorsReplaceLoader(),
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
