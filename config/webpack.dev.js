const path =require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('./config');
const baseConfig = require('./webpack.base');

module.exports=merge(baseConfig,{
    mode:"development",
    devtool:config.dev.devtool,
    devServer:{
        contentBase:config.dev.contentBase,
        open:config.dev.browserOpen,
        host:config.dev.host,
        port:config.dev.port,
        proxy:config.dev.proxy,
        historyApiFallback:true
    }
})