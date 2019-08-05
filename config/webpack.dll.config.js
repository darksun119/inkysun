const path = require('path'),webpack = require('webpack');
const CleanWebpackPlugin =require('clean-webpack-plugin'); 
const common = [
  'react',
  'react-dom',
  'react-router',
  'react-router-dom',
  'axios',
  'moment'
];
module.exports = {
  mode:'production',
  entry: {
    common,
    antd:['antd']
  },
  output: {
    path: path.resolve(__dirname, '../static/dll'),
    filename: '[name].js',
    library: '[name]_[hash]',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '../static/dll', 'manifest.json'),
      name: '[name]_[hash]',
      context: __dirname,
    })
  ],
  performance: {
    maxEntrypointSize: 250000, //入口文件大小，性能指示
    maxAssetSize: 25000, //生成的最大文件
    hints: false
    // hints: 'warning', //依赖过大是否错误提示
    // assetFilter: function(assetFilename) {
    //   return assetFilename.endsWith('.js');
    // }
  }
};
