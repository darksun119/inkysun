const path = require('path');
// const api = require('../mock/index');
module.exports={
    base:{
        entry:path.resolve(__dirname,'../src/main.js'),
        output:{
            path:path.resolve(__dirname,'dist'),
            publicPath:'/',
            filename:'[name].[hash].js',
        }
    },
    dev:{
        contentBase: path.join(__dirname, 'dist'),
        host:'localhost',
        inline:true,
        hot:true,
        port:3000,
        browserOpen:true,
        devtool:"eval",
        // proxy:{},
        // before:api   //d
    },
    build:{
        uglyfyJsSourceMap:false,
        devtool:false
    },
    babelConfig:{
        presets:[
            ["env","react"],
        ],
        // plugins:["tranform-runtime","transform-react-jsx"]
    }
}