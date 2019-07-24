
const path =require('path');
const production=require('./prod');
const developement=require('./dev');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
    entry:path.resolve(__dirname,'src/index.js'),
    output:{
        path:path.resolve(__dirname,'dist'),
        publicPath:'/dist/',
        filename:'[name].[hash].js',
    },

    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /(node_modules)/,  //对这个不做处理
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['env']
                  }
                }
            },
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,  //对这个不做处理
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['env','react']    //在react环境下,也可以进行打包
                  }
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
    devSever:{
        inline:true,
        hot:true,
        port:3000
    },
    plugins:[
        new HtmlWebpackPlugin({
            minify: { // 压缩HTML文件
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: true, // 删除空白符与换行符
                minifyCSS: true,// 压缩内联css
                hash:true
            },
            template: '../public/index.html'
        })
    ]
}