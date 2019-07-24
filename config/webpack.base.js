const path =require('path');
const config = require('./config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
module.exports={
    entry:config.base.entry,
    output:{
        path:config.base.output.path,
        filename:"js/"+config.base.output.filename,
        chunkFilename:"[name]-[hash].js"
    },
    module:{
        rules:[
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,  //对这个不做处理
                use: {
                  loader: 'babel-loader',
                  options: config.babelConfig
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                  fallback: "style-loader",
                  use: "css-loader"
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextWebpackPlugin.extract({
                  fallback: 'style-loader',
                  use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 8192
                    }
                  }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 8192
                    }
                  }
                ]
            },

        ]
    },
    resolve:{
        extensions:["js","jsx"],
        alias:{
            "@":"../src/components"
        }
    },
    plugins:[
        new HtmlWebpackPlugin({
            minify: { // 压缩HTML文件
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: true, // 删除空白符与换行符
                minifyCSS: true,// 压缩内联css
                hash:true
            },
            template: path.resolve(__dirname,'../index.html')
        }),
        new CopyWebpackPlugin([
            {
                from:path.resolve(__dirname,"../static"),
                to:config.base.output.path+'/static',
                ignore:['.*']
            }
        ]),
        new OptimizeCssPlugin({
            filename:'css/[name.[contenthash].css',
            allChunks:true
        })
    ]

}