var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    path.join(__dirname, 'src/index.js') 
  ],
  output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'       
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
    }
};
