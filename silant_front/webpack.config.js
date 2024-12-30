const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: "./src/index.jsx",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "bundle.js"
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.svg$/,
                loader: 'url-loader',
                options: {
                    limit: 25000,
                },
            },
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[hash].[ext]',
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/inline'
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
                template: "./src/index.html",
                favicon: "./src/icon/favicon-96x96.png",
            }
        )
    ]
}
