const path =require('path');
const HtmlWebpackPlugin =require('html-webpack-plugin'); //html
const MiniCssExtractPlugin =require('mini-css-extract-plugin'); //css压缩
const UglifyJsPlugin =require('uglifyjs-webpack-plugin'); //多线程压缩
const ExtendedDefinePlugin =require('extended-define-webpack-plugin'); //全局变量
const CopyWebpackPlugin =require('copy-webpack-plugin'); //复制静态html
const webpack =require('webpack');
const HappyPack =require('happypack'); //多线程运行
const CleanWebpackPlugin =require('clean-webpack-plugin'); //清空
// const BundleAnalyzerPlugin =require('webpack-bundle-analyzer').BundleAnalyzerPlugin; //视图分析webpack情况
const theme = require('../package.json').theme;
let happyThreadPool = HappyPack.ThreadPool({size:2});
const userDefind={
    host:'localhost',
    port:8000,
    title:'home'
};

let isProduction = process.env.NODE_ENV == 'production'
const PUBLIC_PATH = `http://${userDefind.host}:${userDefind.port}`;

// new BundleAnalyzerPlugin({   //另外一种方式
//   analyzerMode: 'server',
//   analyzerHost: '127.0.0.1',
//   analyzerPort: 8889,
//   reportFilename: 'report.html',
//   defaultSizes: 'parsed',
//   openAnalyzer: true,
//   generateStatsFile: false,
//   statsFilename: 'stats.json',
//   statsOptions: null,
//   logLevel: 'info',
// }),

console.log(process.env.NODE_ENV)
/**
 * 公共插件
 */
const pluginsPublic = [
    new ExtendedDefinePlugin({
        //全局变量
        CONFIG_NODE_ENV: process.env.NODE_ENV
    }),
    new HtmlWebpackPlugin({
        template: path.join(__dirname, '../src/index.html'), // Load a custom template
        inject: 'body', //注入到哪里
        filename: 'index.html', //输出后的名称
        hash: true, //为静态资源生成hash值
        title: userDefind.title,
        dev_port: userDefind.port,
        url: PUBLIC_PATH,
        pro: process.env.NODE_ENV
    }),
    //new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
        chunkFilename: '[chunkhash].css'
    }),
    new HappyPack({
        //多线程运行 默认是电脑核数-1
        id: 'babel', //对于loaders id
        loaders: [
            { loader:'cache-loader'},
            { loader:'babel-loader',
                options:{
                    'presets': [
                        'env',
                        'react'
                    ],
                    'plugins': [
                        'transform-runtime',
                        'syntax-dynamic-import',
                        'transform-decorators-legacy',
                        'transform-class-properties',
                        [
                            'import',
                            {
                            'libraryName': 'antd',
                            'libraryDirectory': 'es',
                            'style': true
                            }
                        ]
                    ]
                }
            }
        ], //是用babel-loader解析
        threadPool: happyThreadPool,
        verboseWhenProfiling: true //显示信息
    }),
    new webpack.ContextReplacementPlugin(
        /moment[\\/]locale$/,
        /^\.\/(en|ko|ja|zh-cn)$/
    )
];
/**
 * 公共打包插件
 */
const pluginsBuild = [
    new CleanWebpackPlugin({
        root: __dirname
    }),
    new CopyWebpackPlugin([
        {
            from: path.resolve(__dirname, '../static'),
            to: path.resolve(__dirname, '../dist/static')
        }
    ]),
    new webpack.HashedModuleIdsPlugin()
];

let pro_plugins = [].concat(
    pluginsPublic,
    pluginsBuild,
    new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require('../static/dll/manifest.json')
    }),
    new UglifyJsPlugin({
        // sourceMap: true,
        parallel: true,
        cache: true,
        uglifyOptions: {
            output: {
                comments: false,
                beautify: false
            },
            compress: {
                drop_console: true,
                drop_debugger: true
            }
        },
        exclude: /(node_modules|bower_components)/
    }) //压缩，生成map
)

const plugins = pluginsPublic.concat(pluginsBuild,isProduction?pro_plugins:[]);
module.exports= {
    devServer: {
        // contentBase: path.join(__dirname, 'dist'), //开发服务运行时的文件根目录
        host: userDefind.host,
        compress: true, //开发服务器是否启动gzip等压缩
        port: userDefind.port, //端口
        historyApiFallback: true, //不会出现404页面，避免找不到
        proxy: {
            '/list': {
                target: 'https://www.apiopen.top/meituApi',
                pathRewrite: {'^/list': ''},
                changeOrigin: true,
                secure: false
            },
            '/api': {
                target: 'http://localhost:3000/graphql',
                pathRewrite: {'^/api': ''},
                changeOrigin: true,
                secure: false
            },
            '/ap_com': {
                target: 'http://localhost:3000',
                pathRewrite: {'^/ap_com': ''},
                changeOrigin: true,
                secure: false
            }
        },
        inline:true,
        hot:true
    },
    devtool: false, //cheap-eval-source-map  是一种比较快捷的map,没有映射列
    performance: {
        maxEntrypointSize: 250000, //入口文件大小，性能指示
        maxAssetSize: 250000, //生成的最大文件
        hints: false
        // hints: 'warning', //依赖过大是否错误提示
        // assetFilter: function(assetFilename) {
        //   return assetFilename.endsWith('.js');
        // }
    },
    entry: {
        //入口
        index: ['babel-polyfill', path.resolve(__dirname, '../src/index.js')]
    },
    output: {
        //出口
        path: path.resolve(__dirname, '../dist'), //出口路径
        filename: 'index.js',
        chunkFilename: '[chunkhash].js',  //按需加载名称
        publicPath: PUBLIC_PATH //公共路径
    },
    resolve: {
        mainFields: ['main', 'jsnext:main', 'browser'], //npm读取先后方式  jsnext:main 是采用es6模块写法
        alias: {
            //快捷入口
            '@components': path.resolve(__dirname, '../src/work/components'),
            '@images': path.resolve(__dirname, '../src/work/images'),
            '@style': path.resolve(__dirname, '../src/work/style'),
            '@server': path.resolve(__dirname, '../src/work/server'),
            '@common': path.resolve(__dirname, '../src/work/common'),
            '@mobx': path.resolve(__dirname, '../src/work/mobx')

        }
    },
    module: {
        noParse: /node_modules\/(moment|chart\.js)/, //不解析
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/, //排除
                loader: 'happypack/loader?id=babel'
            },
            {
                test: /\.css$/,
                use: [
                    {loader: MiniCssExtractPlugin.loader},
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: isProduction?true:false //压缩
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|jpeg|ttf|svg)$/,
                exclude: /(node_modules|bower_components)/,
                include: [path.resolve(__dirname, 'src/work/images')],
                use: [
                    {
                        loader: 'url-loader?limit=4096', //limit 图片大小的衡量，进行base64处理
                        options: {
                            name: '[path][name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader?importLoaders=1',
                    options: {
                        minimize: isProduction?true:false //css压缩
                    }
                }, {
                    loader: 'less-loader', options: {
                        javascriptEnabled: true
                        // modifyVars: {
                        //     'primary-color': '#1DA57A',
                        //     'link-color': '#1DA57A',
                        //     'border-radius-base': '2px',
                        // }
                    }
                }]
            }, {
                test: /\.scss$/,
                use: [
                    {loader: MiniCssExtractPlugin.loader},

                    {
                        loader: 'css-loader',
                        options: {
                            minimize: isProduction?true:false //压缩
                            // sourceMap: minimize[dev],
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {modifyVars: theme}
                    }
                ]
            }
        ]
    },
    plugins: plugins
};
