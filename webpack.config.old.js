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
                          fallbackLoader: 'style-loader',
                          loader: [
                          {loader: 'css-loader', query: {modules:true}}, 'postcss-loader']
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
	new ExtractTextPlugin({filename: 'style.[name].css', publicPath: '/public/'}),
        new webpack.LoaderOptionsPlugin({
            options: {
                context: filePaths.root,
                postcss: [ // <---- postcss configs go here under LoadOptionsPlugin({ options: { ??? } })
                    require('postcss-cssnext'),
                    require('lost')(),
                    require('postcss-reporter')()
                ]
                // ...other configs that used to directly on `modules.exports`
            }
        })
  ],
  watch: true
};
