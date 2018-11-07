const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: './index.html'
});

module.exports = {
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