const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  mode: 'development',
  entry: [
    './src/main.js',
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
        include: [
          resolve('src'),
          resolve('test'),
          resolve('node_modules/webpack-dev-server/client'),
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html',
      inject: true,
    }),
  ],
  devServer: {
    // IP Address for running in mobile
    host: '192.168.5.101',
    port: 9000,
    contentBase: 'public',
    historyApiFallback: {
      disableDotRule: true,
      rewrites: [
        { from: /.*/, to: path.posix.join('/', 'index.html') },
      ],
    },
    hot: true,
    open: true,
    proxy: {
      '/mobile-api/delivery': {
        target: 'http://mobile-api.qa2-sg.cld:80/mobile-api/delivery/delivery',
        changeOrigin: true,
        pathRewrite: {
          '^/mobile-api/delivery': '',
        },
      },
    },
  },
};
