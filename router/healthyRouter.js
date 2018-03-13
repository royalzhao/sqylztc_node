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
    if(req.body.type == '1'){
        let sql =  `select * from toutiao where id = ?`;
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
    }else if(req.body.type == '2'){
        let sql =  `select * from zhishi where id = ? `;
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
    }
   
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
module.exports = router