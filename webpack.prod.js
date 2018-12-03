
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require('./package.json');

const commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig, {

  //module.exports = {
  entry: {
    //index: path.resolve(__dirname, 'src/app.jsx'),
    app: './src/app.jsx',
    // 将 第三方依赖（node_modules中的） 单独打包 pkg或获取到package.json文件中的第三方依赖库Object.keys()
    //Object.keys 返回一个所有元素为字符串的数组，其元素来自于从给定的对象上面可直接枚举的属性。
    //这些属性的顺序与手动遍历该对象属性时的一致。
    vendor: Object.keys(pkg.dependencies) ////插件中name,filename必须以这个key为值
  },
  output: {
    path: path.resolve(__dirname, 'dist'), //打包后文件的输出路径
    filename: 'js/[name].[chunkhash:8].js' //[chunkhash:8]这个是为了添加md5后缀
  },

  module: {
    rules: [
      //3 编译es6和编译jsx和js
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      //配置css
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //publicPath: '../',
          use: [
            { loader: 'css-loader', options: { importLoaders: 1, minimize: true } },
            { loader: 'postcss-loader', options: { ident: 'postcss', plugins: [require('autoprefixer')('last 100 versions')] } }
          ]
        })
      },
      //配置scss  执行顺序是从右往走的这个顺序是不能改变的
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //publicPath: '../',
          use: [
            { loader: 'css-loader', options: { importLoaders: 2, minimize: true } },
            { loader: 'postcss-loader', options: { ident: 'postcss', plugins: [require('autoprefixer')('last 100 versions')] } },
            'sass-loader'
          ]
        })
      },
      //https://www.npmjs.com/package/url-loader
      //https://www.npmjs.com/package/file-loader
      // {
      //   test: /\.(jpg|png|gif|jpeg|bmp|svg)$/,
      //   use: {
      //     loader: 'file-loader',
      //     options: {
      //       limit: 8192,
      //       name: 'img/[name].[hash:8].[ext]'
      //     }
      //   }
      // },

      // //配置字体图标  这里最好使用file-loader
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: [
          { loader: 'file-loader', options: { name: 'fonts/[name].[hash:8].[ext]' } }// fonts/打包到下的fonts文件夹}
        ]
      },

    ]
  },

  // html 模板插件
  plugins: [
    // webpack 内置的 banner-plugin
    //new webpack.BannerPlugin('Copyright'),
    //利用webpack-html-plugin这个插件它可以生成html文件到指定的目录下，这样就可以不用再根目录下建立页面文件了，直接在src下建立模板文件，
    new HtmlWebpackPlugin({
      favicon: `${__dirname}/src/favicon.ico`,
      template: `${__dirname}/src/index.template.html` //默认会在dist路径下生成index.html并引用所有的静态资源
    }),

    //7 代码优化：合并以及压缩代码
    // 开发环境暂时不需要
    new UglifyJsPlugin(), //改用非webpack内置
    //// https://github.com/angular/angular/issues/10618
    // new webpack.optimize.UglifyJsPlugin({
    //   //输出不显示警告
    //   compress: {
    //     warnings: false //默认值
    //   },
    //   //输出去掉注释
    //   output: {
    //     comments: false //默认值
    //   }
    // }),
    //提取css文件
    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash:8].css',
    }),
    // 提供第三方依赖的代码
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      //          filename:"chunk.js"//忽略则以name为输出文件的名字，否则以此为输出文件名字
    }),
    new CopyWebpackPlugin([{
      from: `${__dirname}/src/favicon.ico`, to: `${__dirname}/dist/favicon.ico`, force: true
    }, {
      from: `${__dirname}/src/img`, to: `${__dirname}/dist/img`, toType: 'dir', force: true
    }])

  ]


});
