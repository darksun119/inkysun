const path =require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('./config');
const baseConfig = require('./webpack.base');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports=merge(baseConfig,{
    mode:"production",
    devtool:config.dev.devtool,
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            name:"common.js",
            filename:"js/common.js"
        }),
        new UglifyJsPlugin({
            include:/\/src/,
            compress:{
                warnings:false
            },
            sourceMap:config.build.uglyfyJsSourceMap,
            parallel:true   //使用多进程和文件缓存来提高打包速度
        })
    ]

})