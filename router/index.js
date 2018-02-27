const express = require('express')

const mysql = require('../util/mysql');

var sd = require('silly-datetime');

var app = express();

// 路由
const router = express.Router();



router.route('/getDoctorInfo').post(function (req, res) {
    
    let sql;
    sql =  `select * from doctor where d_tel = ?`;
    
    param = [req.body.username];
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
            res.send({message: 'ERROR'});
            return
        }else{
            res.send(data);
        }
        
        })
    })
    
})
router.route('/getFamilyInfo').post(function (req, res) {
    let sql;
    sql =  `select id,name from patientgroup where fromLoginUser = ?`;
    
    param = [req.body.username];
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
            res.send({message: 'ERROR'});
            return
        }else{
            res.send(data);
        }
        
        })
    })
    
})
router.route('/insertPerson').post(function (req, res) {
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
router.route('/delPerson').post(function (req, res) {
    console.log(req.body)
    let sql =  `delete from patientgroup where id = ?`;
    
    param = [req.body.id];
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
            res.send({message: 'ERROR'});
            return
        }else{
            res.send({message: 'OK'});
        }
        
        })
    })
    
})
router.route('/delAllPerson').post(function (req, res) {
    console.log(req.body)
    let sql =  `delete from patientgroup where id = ?`;
    
    param = [req.body.id];
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
            res.send({message: 'ERROR'});
            return
        }else{
            res.send({message: 'OK'});
        }
        
        })
    })
    
})

module.exports = router