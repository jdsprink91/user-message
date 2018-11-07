const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: './index.html'
});

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        publicPath: '/',
        port: 8080,
        historyApiFallback: true,
    },
    plugins: [
        htmlWebpackPlugin
    ],
    resolve: {
        extensions: [ '.js', '.jsx' ]
    }
}