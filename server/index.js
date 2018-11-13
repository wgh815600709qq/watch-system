const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Origin");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.get('/', function (req, res) {
    res.send('Hello World');
})

app.use('/*', function (req, res, next) {
    console.log(req.url, req.method)
    next();
})
app.post('/report', function (req, res, next) {
    console.log('req', JSON.stringify(req.body))
    let time = req.body.time
    let timeDay = new Date(time)
    let year = timeDay.getFullYear();
    let month = timeDay.getMonth() + 1;
    let day = timeDay.getDate();
    var filePath = path.join(__dirname, `/log/${year}-${month}-${day}.txt`)
    // console.log('filePath', filePath)
    fs.stat(filePath, function (err, stats) {
        if (err) {
            // console.warn(err)
            fs.writeFile(filePath, JSON.stringify(req.body, null, 2) + '\n', function (err) {
                if (err) {
                    return console.error(err);
                }
            })
        } else if (stats.isFile()) { // 修改操作
            fs.open(filePath, 'a+', function (err, fd) {
                fs.writeFile(fd, JSON.stringify(req.body, null, 2) + '\n', function (err) {
                    if (err) {
                        return console.error(err);
                    }
                })
            })
        }
    })
    res.send(req.body)
})

var server = app.listen(8888, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})