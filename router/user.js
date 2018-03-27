const express = require('express')

const mysql = require('../util/mysql');

var sd = require('silly-datetime');

var app = express();

// 路由
const router = express.Router();

//随机生成8位数字的方法


router.route('/register').post(function (req, res) {
    let sql =  `insert into patient(p_name,p_tel,p_password,p_houseNum) values (?,?,?,?)`;
    //随机生成8位数
    var name = '';
    for(var i=0;i<8;i++)
    {
        name+=Math.floor(Math.random()*10);
    } 
    name = 'v_'+name;
    //console.log(name)
    param = [name,req.body.p_tel,req.body.p_password,req.body.p_houseNum];
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

router.route('/login').post(function (req, res) {
    let sql;
    if(req.body.loginState == 1){
        sql =  `select p_name,p_tel,p_face face from patient where p_tel = ? and p_password = ?`;
        console.log(1)
    }else if(req.body.loginState == 2){
        sql =  `select d_name,d_tel,d_face face from doctor where d_tel = ? and d_password = ?`;
        console.log(2)
    }else if(req.body.loginState == 3){
        sql =  `select * from admin where a_user = ? and a_password = ?`;
        console.log(3)
    }
    //console.log(name)
    param = [req.body.p_tel,req.body.p_password];
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
            if(data.length>0){
                res.send(data);
            }else{
                res.send({message: 'ERROR'});
            }
            console.log(data)
            
        }
        
        })
    })
    
})
router.route('/forgetPass').post(function (req, res) {
    let sql;
    if(req.body.updateState == '1'){
        sql =  `update patient set p_password=? where p_tel=?`;
        //console.log(1)
    }else if(req.body.updateState == '2'){
        sql =  `update doctor set d_password=? where d_tel=?`;
        //console.log(2)
    }
    //console.log(name)
    param = [req.body.p_password,req.body.p_tel];
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
router.route('/checkForget').post(function (req, res) {
    let sql;
    if(req.body.updateState == '1'){
        sql =  `select * from patient where p_tel = ?`;
        //console.log(1)
    }else if(req.body.updateState == '2'){
        sql =  `select * from doctor where d_tel = ?`;
        //console.log(2)
    }
    //console.log(name)
    param = [req.body.p_tel];
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
            //console.log({message: 'ERROR'})
            return
        }else{
           // console.log(data.length)
            if(data.length > 0){
               // console.log(data)
                res.send({message: 'OK'});
            }else{
                res.send({message: 'ERROR'});
            }
            
        }
        
        })
    })
    
})
router.route('/getAddress').get(function (req, res) {
    let sql;
    sql =  `select value,label from address`;
    
    param = [req.body.p_tel,req.body.p_password];
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
router.route('/check').post(function (req, res) {
    let sql;
    sql =  `select * from patient where p_tel = ?`;
    
    param = [req.body.p_tel];
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
            console.log(data)
            console.log(data.length)
            if(data.length>0){
                res.send({message: 'ERROR'});
            }else{
                res.send({message: 'OK'});
            }
            
        }
        
        })
    })
    
})


module.exports = router