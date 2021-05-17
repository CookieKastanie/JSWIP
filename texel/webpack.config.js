const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const config = {
    mode: 'development',
    entry: {
        bundle: path.resolve(__dirname, 'src/main.js'),
        //loading: path.resolve(__dirname, 'src/css/importLoadingCSS.js')
        loading: path.resolve(__dirname, 'src/css/loading.css')
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
        ],
    },
    optimization: {
        minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    plugins: [
        new MiniCssExtractPlugin({filename: '[name].css'})
    ]
};

module.exports = config;
