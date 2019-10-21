const path = require('path')
const htmlWebpackPlugin=require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'app.js'),
        filename: 'app.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {loader:'babel-loader'},
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                    {loader: 'postcss-loader'},
                    {loader: 'less-loader'}
                ]
            },
            {
                test:/\.(jpg|png|gif|svg)$/,
                use:[
                    {
                        loader:'url-loader',
                        //传参设置文件小于多少kb进行转化成流的bs64编码嵌入文件中
                        options:{
                                //8KB
                                limit:8000
                            }
                    }
                ]
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            title: '',
            filename: 'index.html',
            template: path.resolve(__dirname, './src/index.html'),
            hash: true
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, './static'),
            to: path.resolve(__dirname, './dist'),
            ignore: ['.*']
        }])
    ],
    devServer: {
       contentBase: './dist',
       host: '10.1.37.13'
    }
}