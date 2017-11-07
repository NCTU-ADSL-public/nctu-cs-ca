var webpack = require('webpack');
var path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    students : './src/index.student.js', 
    assistants : './src/index.assistant.js', 
    teachers : './src/index.teacher.js', 
    login : './src/index.login.js', 
  },
  output: {
    path: path.join(__dirname, '/public'), 
    filename: 'bundle.[name].js',
    publicPath: '/public/'
    },
  module: {
      loaders: [
                  {
                    test: /\.css$/,
                    loader:  ExtractTextPlugin.extract({
                          fallback: 'style-loader',
                          use: ['css-loader','sass-loader']
                        })	
                  },
                  {
                    test: /\.js$/,
		    exclude: /node_modules/,
                    loader: 'babel-loader',
                  },
                  {
                    test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif)$/,                
                    loader: 'url-loader'
                  }
      ] 
    },
  resolve: {
      extensions: ['*', '.js', '.json'] 
    },
  plugins: [
    new ExtractTextPlugin({filename: 'style.bye.css', publicPath: '/public/'})
  ],
  watch: true
};
