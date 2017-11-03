const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        filename:'./src/js/app.jsx'
    },
    output: {
        filename: './public/js/bundle.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader','css-loader','sass-loader']
            }
        ]
       },
    plugins: [
        new CleanWebpackPlugin(['./public/js'], {
          exclude: ['index.html']
        })
    ],
    watch: true
};
