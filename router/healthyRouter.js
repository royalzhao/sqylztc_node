const express = require('express')

const mysql = require('../util/mysql');

var sd = require('silly-datetime');

var app = express();

// 路由
const router = express.Router();

//路由把客户端请求的url和处理方法连接起来

//头条列表
router.route('/selectToutiao').get(function (req, res) {
    
    let sql =  `select * from toutiao `;
   
    //param = [offset,limit];
    mysql.pool.getConnection(function (error, connection) {
        if (error) {
        console.log({message: '连接数据库失败'})
        return
        }
        connection.query({
        sql: sql
        //values: param
        }, function (error, data) {
        connection.release()
        if (error) {
            console.log({messsage: 'ERROR'})
            return
        }else{
            res.send(data);
        }
        
        })
    })
})
router.route('/selectZhishi').get(function (req, res) {
    
    let sql =  `select * from zhishi `;
   
    //param = [offset,limit];
    mysql.pool.getConnection(function (error, connection) {
        if (error) {
        console.log({message: '连接数据库失败'})
        return
        }
        connection.query({
        sql: sql
        //values: param
        }, function (error, data) {
        connection.release()
        if (error) {
            console.log({messsage: 'ERROR'})
            return
        }else{
            res.send(data);
        }
        
        })
    })
})

//文章详情
router.route('/article').post(function (req, res) {
   //console.log(req.body)
    let sql =  `select * from toutiao where n_id = ?`;
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
            console.log({messsage: 'ERROR'})
            return
        }else{
            res.send(data);
        }
        
        })
    })
    
   
})
//常用电话
router.route('/common_phone').get(function (req, res) {
    
    let sql =  `select * from common_phone `;
   
    //param = [offset,limit];
    mysql.pool.getConnection(function (error, connection) {
        if (error) {
        console.log({message: '连接数据库失败'})
        return
        }
        connection.query({
        sql: sql
        //values: param
        }, function (error, data) {
        connection.release()
        if (error) {
            console.log({messsage: 'ERROR'})
            return
        }else{
            res.send(data);
        }
        
        })
    })
})
//更新浏览次数
router.route('/updateSeeNum').post(function (req, res) {
    
    let sql =  `UPDATE toutiao SET n_see_num = n_see_num+1 WHERE n_id=?`;
   
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
            console.log({messsage: 'ERROR'})
            return
        }else{
            res.send({messsage: 'OK'});
            //console.log({messsage: 'OK'})
        }
        
        })
    })
})
//更新医生服务患者次数
router.route('/updatePatientNum').post(function (req, res) {
    //console.log(req.body)
    let sql =  `UPDATE doctor SET d_patientNum = d_patientNum+1 WHERE d_tel=?`;
   
    param = [req.body.d_id];
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
            console.log({messsage: 'ERROR'})
            return
        }else{
            res.send({messsage: 'OK'});
            //console.log({messsage: 'OK'})
        }
        
        })
    })
})
module.exports = router