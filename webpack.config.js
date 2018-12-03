/* eslint-disable no-template-curly-in-string */
/* eslint-disable import/no-dynamic-require */
const path = require('path');//node提供的一块方法
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');
// ant design custom theme
const ROOT = path.resolve(__dirname);
const theme = require(path.resolve(ROOT, 'src/css/antd-theme.js'));

// css 单独打包，使用该插件后就不需要配置style-loader了
// 本来是内联在最终的网页里，现在通过外联方式，可以在/dist文件夹下找到单独的css文件
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig, {
//module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'), //打包后文件的输出路径
    filename: 'bundle.js', //输出文件名字
    //filename: "[name].[hash].js"//打包后输出文件的文件名
  },
  devtool: 'eval-source-map', //开发环境使用，有利于看自己程序打印具体在那个组件里
  devServer: {
    //contentBase:'./dist',  contentBase可以不用指定 因为用了这个HtmlWebpackPlugin插件
    historyApiFallback: true, //不跳转，在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，任意的 404 响应都可能需要被替代为 index.html
    inline: true, //实时刷新
    //host: "192.168.8.100",
    // proxy: {//代理属性
    //   '/api': {
    //     target: 'http://localhost:9000/',
    //     pathRewrite: { '^/api': '' }
    //     /* 因为在 ajax 的 url 中加了前缀 '/api'，而原本的接口是没有这个前缀的
    //             所以需要通过 pathRewrite 来重写地址，将前缀 '/api' 转为 '/'*/
    //   }
    // }
  },

  module: {
    rules: [
    ]
  },
  // html 模板插件
  plugins: [
    // webpack 内置的 banner-plugin
    new webpack.BannerPlugin('Copyright'),
    new ExtractTextPlugin('main.css'),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   filename: 'vendor.js'
    // }),

  ]


});
