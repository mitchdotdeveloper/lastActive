const path = require('path');

const srcPath = path.resolve(__dirname, 'client');
const publicPath = path.resolve(__dirname, 'public');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
  entry: './client',
  output: {
    path: publicPath
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: srcPath,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-transform-react-jsx'
            ]
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    host: 'localhost',
    port: 5000,
    contentBase: publicPath,
    historyApiFallback: true,
    watchContentBase: true,
    stats: 'minimal'
  }
};
