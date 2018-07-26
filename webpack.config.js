const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    devtool: 'none',
    entry : __dirname + '/app/main.js',
    output : {
        path : __dirname + "/build/",
        filename : 'bundle.js'
    },
    
    devServer: {
        contentBase: "./public",  //以public为根目录提供文件
        historyApiFallback: true,
        inline: true,
        host:'127.0.0.1'
    },

    module : {
        rules : [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    // {
                    //     loader: "style-loader"
                    // }, {
                    //     loader: "css-loader",
                    //     options: {
                    //         modules: true, // 指定启用css modules
                    //         localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                    //     }
                    // }
                    MiniCssExtractPlugin.loader,
                    // "style-loader",
                    "css-loader"
                ]
            }
        ]
    },

    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + "/public/index.html"//new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin(),//热加载插件
        new webpack.optimize.OccurrenceOrderPlugin(),//为组件分配ID
        new MiniCssExtractPlugin({
          filename: "style.css"
        })
        //webpack.optimize.CommonsChunkPlugin提取公共代码插件
        //new webpack.optimize.UglifyJsPlugin()//压缩
        // new ExtractTextPlugin("style.css")
    ]
}