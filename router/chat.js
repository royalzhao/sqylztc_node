const express = require('express')

const mysql = require('../util/mysql');

var sd = require('silly-datetime');

var app = express();

// 路由
const router = express.Router();


router.route('/startChat').post(function (req, res) {
   
    let sql =  `insert into record_group(id,d_id,p_id,time,chatState,chatPerson) values (?,?,?,?,?,?)`;
    var time = sd.format(new Date());
    param = [req.body.id,req.body.d_id,req.body.username,time,req.body.radio,req.body.value];
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
router.route('/send').post(function (req, res) {
   
    let sql =  `insert into record(record_group_id,content,time,receiver,send) values (?,?,?,?,?)`;
    var time = sd.format(new Date());
    param = [req.body.record_group_id,req.body.content,time,req.body.receiver,req.body.send];
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
router.route('/getChatContent').post(function (req, res) {
    console.log(req.body)
    let sql =  `select * from record where record_group_id = ?`;
    var time = sd.format(new Date());
    param = [req.body.record_group_id];
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
            res.send(data);
        }
        
        })
    })
    
})
router.route('/order').post(function (req, res) {
    
    let sql =  `INSERT INTO sqylztc.order (d_id, order_name, order_phone, order_address, order_time, order_situation) VALUES(?, ?, ?, ?, ?, ?); `;
    var time = sd.format(new Date());
    param = [req.body.d_id,req.body.order_name,req.body.order_phone,req.body.order_address,req.body.order_time,req.body.order_situation];
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

router.route('/getGroupList').post(function (req, res) {
    
    let sql =  `SELECT *,MIN(TIME) FROM ( SELECT record.id id,record.record_group_id,record.content,record.time TIME,record.state,roup.d_name,roup.d_face FROM record  JOIN (SELECT doctor.d_name,record_group.id,doctor.d_face FROM record_group JOIN doctor ON doctor.d_id  =record_group.d_id   WHERE p_id=?   GROUP BY record_group.id ) roup ON
    roup.id=record.record_group_id ) record GROUP BY record.record_group_id`;
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
            console.log({message: 'ERROR'})
            res.send({message: 'ERROR'});
            return
        }else{
            res.send(data);
        }
        
        })
    })
    
})



module.exports = router