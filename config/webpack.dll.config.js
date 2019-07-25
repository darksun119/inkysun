const path = require('path'),webpack = require('webpack');
const common = [
  'react',
  'react-dom',
  'react-router',
  'react-router-dom',
  'axios',
  'moment',
  'antd'
];
module.exports = {
  mode:'production',
  entry: {
    common
  },
  output: {
    path: path.resolve(__dirname, '../static/dll'),
    filename: '[name].[hash].js',
    library: '[name]_[hash]',
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '../static/dll', 'manifest.json'),
      name: '[name]_[hash]',
      context: __dirname,
    })
  ],
};
