var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    path.join(__dirname, '/src/index.js') 
  ],
  output: {
    path: path.join(__dirname, '/public'), 
    filename: 'bundle.js',
    publicPath: '/public/'
    },
  module: {
      loaders: [
                  {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    loader: ['style-loader', 'css-loader', 'sass-loader']
                  },
                  {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                  },
                  {
                    test: /\.(png|jpg|gif)$/,                
                    loader: 'url-loader'
                  }
      ] 
    },
  resolve: {
      extensions: ['*', '.js', '.json'] 
    },
  watch: true
};
