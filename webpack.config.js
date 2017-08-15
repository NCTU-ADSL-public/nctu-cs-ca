module.exports = {
  entry: [
    './src/index.js',
    './src/components/App.js',
    './src/components/Main.js',
    './src/components/Head/BottomNavigationExampleSimple.js',
    './src/components/Head/Head.js',
    './src/components/Login/Login.js',
    './src/components/Login/LoginButtom.js',
    './src/components/Login/ToggleButtom.js'
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
                    exclude: /node_modules/,
                    loader: 'babel-loader'
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
