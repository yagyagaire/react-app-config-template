const path = require('path'); //npm path module to resolve and join paths
const HtmlWebpackPlugin = require('html-webpack-plugin'); //Plugin to generate index.html file in the build/dist directory

module.exports = {
    entry: './src/index.js', //main entry point to be processed by webpack
    output: {
        path: path.join(__dirname, '/dist'),
        publicPath: '/',
        filename: 'bundle.js' //output filename of js and jsx bundles.
    },
    devServer: {
        contentBase: './dist', //location from where static items are served
        writeToDisk: true, //allows saving of created bundle to disk, it is however run from memory
        watchContentBase: true,
        proxy: [
            {
                context: ['/api', '/auth'], //path on which requests to client are passed through development server
                target: 'http://localhost:5000', //specifies the backend development server which acts as proxy for requests made to client
                secure: false //https disabled
            }
        ],
        port: 3000 //specifies the localhost client port, default is 8080
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node-modules/,
                use: ['babel-loader', 'eslint-loader'] //use babel and eslint to parse js and jsx files
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'] //use less-loader to parse .less files and convert them to css
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('./index.html')
        })
    ]
};
