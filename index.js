const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

//node添加请求头解决跨域问题
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

let _static = path.join('webapp');
app.use(express.static(_static));

const healthyRouter = require('./router/healthyRouter');
app.use('/', healthyRouter);

const user = require('./router/user');
app.use('/', user);

const index = require('./router/index');
app.use('/', index);

app.listen(4000);
console.log('服务器启动，端口：4000');