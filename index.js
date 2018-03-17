const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const multer  = require('multer');
const fs = require('fs'); 

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

//图片上传
//选择diskStorage存储
const storage = multer.diskStorage({
destination: function (req, file, cb) {
    cb(null, path.resolve('webapp/upload'));
},
filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));//增加了文件的扩展名
}
});

const upload = multer({storage: storage});

app.post('/upload', upload.single('avatar'), function(req, res, next) {   //avatar要和前端传过来的name一样

    res.send({
        err: null,
        //filePath:就是图片在项目中的存放路径
        filePath: 'http://127.0.0.1:4000/upload/' + path.basename(req.file.path)
    });
    console.log({
        err: null,
        //filePath:就是图片在项目中的存放路径
        filePath: 'http://127.0.0.1:4000/upload/' + path.basename(req.file.path)
    })
});


let _static = path.join('webapp');
app.use(express.static(_static));

const healthyRouter = require('./router/healthyRouter');
app.use('/', healthyRouter);

const user = require('./router/user');
app.use('/', user);

const index = require('./router/index');
app.use('/', index);

const chat = require('./router/chat');
app.use('/', chat);

const admin = require('./router/admin');
app.use('/', admin);

app.listen(4000);
console.log('服务器启动，端口：4000');