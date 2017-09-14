var path = require('path');

module.exports = {
  entry: [
    './src/index.js',
   ],
  output: {
      path: './build',
      filename: 'bundle.js'       
    },
  module: {
      loaders: [
                  {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    loader: ["style", "css", "sass"]
                  },
                  {
                    test: /\.js$/,
                    loader: 'babel',
                  },
                  {
                    test: /\.(png|jpg|gif)$/,                
                    loader: 'url-loader'
                  }
       ]
    },
  resolve: {
      extensions: ['', '.js', '.json'] 
    }
};
