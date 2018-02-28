const express = require('express')

const mysql = require('../util/mysql');

var sd = require('silly-datetime');

var app = express();

// 路由
const router = express.Router();


router.route('/startChat').post(function (req, res) {
    let sql =  `insert into patientgroup(name,age,height,weight,history,sex,profession,fromLoginUser) values (?,?,?,?,?,?,?,?)`;
    
    param = [req.body.name,req.body.age,req.body.height,req.body.weight,req.body.history,req.body.sex,req.body.profession,req.body.fromUser];
    mysql.pool.getConnection(function (error, connection) {
        if (error) {
        console.log({message: '连接数据库失败'})
        return
        }
        connection.query({
        sql: sql,
        values: param
        }, function (error, data) {
        connection.release()
        if (error) {
            console.log({message: 'ERROR'})
            res.send({message: 'ERROR'});
            return
        }else{
            res.send({message: 'OK'});
        }
        
        })
    })
    
})



module.exports = router