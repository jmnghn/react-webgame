const path = require('path');

module.exports = {
    name: 'wordrelay-config',
    mode: 'development', // 실서비스: production
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx']
    },

    // 입력
    entry: {
        app: ['./client'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins: ['@babel/plugin-proposal-class-properties','react-hot-loader/babel'],
                }

            }
        ]
    },
    
    // 출력
    output: {
        path: path.join(__dirname, 'dist'), // /Users/myeonghyeonjeong/Documents/인프런/react-webgame/lecture/dist
        filename: 'app.js',
    },
}