
const path = require("path");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        bootstrap: "./src/bootstrap.ts",
        editor: "./src/editor/main.ts",
    },
    output: {
        path: path.resolve(__dirname, "dist", "srv"),
        filename: "[name].bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ["ts-loader"],
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader",],
            },
            {
                test: /\.ttf$/,
                use: ['file-loader']
            },
            {
                test: /\.html$/,
                use: ['file-loader?name=[name].[ext]']
            }
        ],
    },
    plugins: [
        new MonacoWebpackPlugin()
    ]
};