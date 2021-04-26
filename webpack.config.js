const webpack = require("webpack");
const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {

    devtool: false,

    entry: {
        app: path.resolve(__dirname, "src/index.js"),
        backgroundApp: path.resolve(__dirname, "src/backgroundApp.js"),
        contentApp: path.resolve(__dirname, "src/contentApp.js")
    },
    output: {
        path: path.resolve(__dirname, "customBuild"),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
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
                test: /\.svg$/,
                loader: "svg-url-loader",
                options: {
                    limit: 10000,
                },
            },
            {
                test: /\.(ttf|png|jpg|gif)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "assets/",
                        },
                    },
                ],
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx", ".tsx", ".ts"],
        alias: {
            "react-dom": "@hot-loader/react-dom",
        },
    },
    devServer: {
        contentBase: "./customBuild",
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: "public", to: "." }]
        })
    ]
}
