const webpack = require('webpack');
// const uglify = require('uglifyjs-webpack-plugin');
const express = require('express');
const path = require('path');
const app = express();
const config = {
    mode: 'production',
    entry: {
        main: './main.js',
        reportor: './reportor.js'
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].js'
    },
    plugins: [
        // new uglify()
    ],
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     use: [{
            //       loader: 'babel-loader',
            //       options: {
            //          presets: ['es2015']
            //       }
            //     }],
            //     exclude: '/node_modules/'
            // }
        ]
    }
}
webpack(config, (err, stats) => {
    if (err) {
        console.error(err);
        return
    }
    console.log('构建成功\n')
    app.use(express.static('public'));
    app.get('/', function (req, res, ) {
        res.sendFile(__dirname + '/index.html');
    })

    app.listen(3333, () => {
        console.log('\nApp is listening on port 3333')
    })

    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }))
})

