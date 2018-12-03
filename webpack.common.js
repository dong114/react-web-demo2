/* eslint-disable  */

const path = require('path');//node提供的一块方法
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// ant design custom theme
const ROOT = path.resolve(__dirname);
const theme = require(path.resolve(ROOT, 'src/css/antd-theme.js'));

// css 单独打包，使用该插件后就不需要配置style-loader了
// 本来是内联在最终的网页里，现在通过外联方式，可以在/dist文件夹下找到单独的css文件
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: './src/app.jsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'), //打包后文件的输出路径
    filename: 'bundle.js', //输出文件名字
    //filename: "[name].[hash].js"//打包后输出文件的文件名
  },

  devServer: {
    //contentBase:'./dist',  contentBase可以不用指定 因为用了这个HtmlWebpackPlugin插件
    historyApiFallback: true, //不跳转，在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，任意的 404 响应都可能需要被替代为 index.html
    inline: true, //实时刷新
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      //3 编译es6和编译jsx和js
      {
        test: /\.(js|jsx)$/,
        exclude: [
          /node_modules/,
          path.resolve(__dirname, 'src/libs')
        ],
        use: {
          loader: 'babel-loader'
        }
      },
      //配置图片
      {
        test: /\.(jpg|png|gif|jpeg|bmp|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192, //限制图片的大小
            name: 'img/[name].[hash:8].[ext]' //不可继承
          }
        }
      },
      //配置字体图标
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000, //限制大小10k
          }
        }
      },
      //配置css
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader' }, //, options: { importLoaders: 1 }
          { loader: 'postcss-loader', options: { ident: 'postcss', plugins: [require('autoprefixer')('last 100 versions')] } }
        ]
      },

      {
        test: /\.less$/,
        exclude: path.resolve(__dirname, './node_modules'),
        use: ExtractTextPlugin.extract({ //用css module
          use: [{
            loader: 'css-loader',
            options: {
              minimize: false,
              modules: true,
              localIdentName: '[name]_[local]_[hash:base64:5]'
            }
          },
          {
            loader: 'less-loader?{"javascriptEnabled":true,"sourceMap":true}'
          }
          ],
          // use style-loader in development
          fallback: 'style-loader'
        })
      },
      {
        test: /\.less$/,
        include: path.resolve(__dirname, './node_modules'),
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader'
          },
          {
            loader: `less-loader?{"javascriptEnabled":true,"sourceMap":true,"modifyVars":${JSON.stringify(theme)}}`
          }
          ],
          fallback: 'style-loader'
        })
      },


      // {
      //   test: /\.less$/,
      //   use: [{
      //     loader: 'style-loader' // creates style nodes from JS strings
      //   }, {
      //     loader: 'css-loader' // translates CSS into CommonJS
      //   }, {
      //     loader: 'less-loader', // compiles Less to CSS
      //     options: {
      //       modifyVars: {
      //         'primary-color': '#333',
      //         'body-background': '#333',
      //         'border-radius-base': '2px',
      //       },
      //       javascriptEnabled: true,
      //       //modules: true,
      //       //localIdentName: '[path][name]__[local]--[hash:base64:5]'
      //     }
      //     //https://ant.design/docs/react/customize-theme-cn#2)-less
      //     //https://github.com/webpack-contrib/less-loader
      //   }]
      // },

      //test: /\.less/,
      //loader: `style!css!postcss!less?{modifyVars:${JSON.stringify(theme)}}`

      //配置scss  执行顺序是从右往走的这个顺序是不能改变的
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 2 } },
          { loader: 'postcss-loader', options: { ident: 'postcss', plugins: [require('autoprefixer')('last 100 versions')] } },
          'sass-loader'
        ]
      },
      // {
      //   test: /\.tsx?$/,
      //   loader: "ts-loader",
      //   exclude: /node_modules/
      // },
      {
        test: /\.md$/,
        use: ['raw-loader']
      }
    ]
  },
  // html 模板插件
  plugins: [
    // webpack 内置的 banner-plugin
    new webpack.BannerPlugin('Copyright'),

    //利用webpack-html-plugin这个插件它可以生成html文件到指定的目录下，这样就可以不用再根目录下建立页面文件了，直接在src下建立模板文件，
    new HtmlWebpackPlugin({
      favicon: `${__dirname}/src/favicon.ico`,
      template: `${__dirname}/src/index.template.html` //默认会在dist路径下生成index.html并引用所有的静态资源
    }),
    new CopyWebpackPlugin([{
      from: `${__dirname}/src/libs/md5.min.js`, to: `${__dirname}/dist/js/md5.min.js`, force: true
    }])
  ]


};
