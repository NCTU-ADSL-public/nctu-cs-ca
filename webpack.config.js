var webpack = require('webpack');
var path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
		    loader: 'url-loader?limit=8192&name=[name].[ext]&publicPath=../../',
                    //loader: "url-loader?name=public/[name].[ext]"

                  }
                  /*{
                       test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif)$/,
                       use: [
                       {
                            loader: 'file-loader?name=[name].[ext]',
                       }
                      ]
                  }*/
      ] 
    },
  resolve: {
      extensions: ['*', '.js', '.json'] 
    },
  plugins: [
    	new BundleAnalyzerPlugin({
		analyzerMode: 'server',
		analyzerHost: '140.113.168.202',
		analyzerPort: 1112,
		reportFilename: 'report.html',
		defaultSizes: 'parsed',
		openAnalyzer: true,
		generateStatsFile: true,
		statsFilename: 'stats.json',
		statsOptions: null,
		logLevel: 'info'
	}),
	new ExtractTextPlugin({filename: 'style.[name].css', publicPath: '/public/'})
  ],
  watch: true
};
