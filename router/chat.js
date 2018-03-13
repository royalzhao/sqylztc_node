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
            console.log({message: '接口startChat--------sql_ERROR'})
            res.send({message: 'ERROR'});
            return
        }else{
            res.send({message: 'OK'});
        }
        
        })
    })
    
})
router.route('/send').post(function (req, res) {
    
    let sql =  `insert into record(record_group_id,content,time,receiver,send,face) values (?,?,?,?,?,?)`;
    var time = sd.format(new Date());
   console.log(req.body.face)
    param = [req.body.record_group_id,req.body.content,time,req.body.receiver,req.body.send,req.body.face];
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
            console.log({message: '接口send--------sql_ERROR'})
            res.send({message: 'ERROR'});
            return
        }else{
            res.send({message: 'OK'});
        }
        
        })
    })
    
})
router.route('/getChatContent').post(function (req, res) {
   
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
            console.log({message: '接口getChatContent--------sql_ERROR'})
            res.send({message: 'ERROR'});
            return
        }else{
            res.send(data);
        }
        
        })
    })
    
})
router.route('/order').post(function (req, res) {
    
    let sql =  `INSERT INTO sqylztc.sq_order (d_id, order_name, order_phone, order_address, order_time, order_situation) VALUES(?, ?, ?, ?, ?, ?); `;
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
            console.log({message: '接口order--------sql_ERROR'})
            res.send({message: 'ERROR'});
            return
        }else{
            res.send({message: 'OK'});
        }
        
        })
    })
    
})

router.route('/getGroupList').post(function (req, res) {
    
    let sql =  `SELECT record.id ,record.record_group_id,record.receiver,record.send,record.content,record.time,record.state,roup.d_name name,roup.d_face face FROM record 
    JOIN (SELECT doctor.d_name,record_group.id,doctor.d_face FROM record_group JOIN doctor ON doctor.d_tel  =record_group.d_id   WHERE p_id=? ) roup ON roup.id=record.record_group_id  
    JOIN (SELECT record_group_id,MAX(time) time FROM record GROUP BY record_group_id) b ON  record.record_group_id=b.record_group_id AND record.time=b.time    GROUP BY record.record_group_id`;
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
            console.log({message: '接口getGroupList--------sql_ERROR'})
            res.send({message: 'ERROR'});
            return
        }else{
            res.send(data);
        }
        
        })
    })
    
})
router.route('/getDoctorGroupList').post(function (req, res) {
    
    let sql =   `SELECT record.id ,record.record_group_id,record.receiver,record.send,record.content,record.time,record.state,roup.p_name name,roup.p_face face FROM record 
    JOIN (SELECT patient.p_name,record_group.id,patient.p_face FROM record_group JOIN patient ON patient.p_tel  =record_group.p_id   WHERE d_id=? ) roup ON roup.id=record.record_group_id  
    JOIN (SELECT record_group_id,MAX(TIME) TIME FROM record WHERE record.receiver=? GROUP BY record_group_id) b ON  record.record_group_id=b.record_group_id AND record.time=b.time   
     GROUP BY record.record_group_id`;
    param = [req.body.username,req.body.username];
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
            console.log({message: '接口getDoctorGroupList--------sql_ERROR'})
            res.send({message: 'ERROR'});
            return
        }else{
            res.send(data);
        }
        
        })
    })
    
})

router.route('/getGroupState').post(function (req, res) {
    
    let sql =  `SELECT record.id ,record.record_group_id,record.receiver,record.send,record.content,record.time,record.state,roup.d_name,roup.d_face FROM record 
    JOIN (SELECT doctor.d_name,record_group.id,doctor.d_face FROM record_group JOIN doctor ON doctor.d_tel  =record_group.d_id   WHERE p_id=? ) roup ON roup.id=record.record_group_id  
    JOIN (SELECT record_group_id,MAX(time) time FROM record WHERE record.receiver=? GROUP BY record_group_id) b ON  record.record_group_id=b.record_group_id AND record.time=b.time   
     GROUP BY record.record_group_id`;
    param = [req.body.username,req.body.username];
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
            console.log({message: '接口getGroupState--------sql_ERROR'})
            res.send({message: 'ERROR'});
            return
        }else{
            console.log({message: 'OK'})
            res.send(data);
        }
        
        })
    })
    
})
router.route('/getDoctorGroupState').post(function (req, res) {
   
    let sql =  `SELECT record.id ,record.record_group_id,record.receiver,record.send,record.content,record.time,record.state,roup.d_name,roup.d_face FROM record 
    JOIN (SELECT doctor.d_name,record_group.id,doctor.d_face FROM record_group JOIN doctor ON doctor.d_tel  =record_group.d_id   WHERE d_tel=? ) roup ON roup.id=record.record_group_id  
    JOIN (SELECT record_group_id,MAX(time) time FROM record WHERE record.receiver=? GROUP BY record_group_id) b ON  record.record_group_id=b.record_group_id AND record.time=b.time   
     GROUP BY record.record_group_id`;
    param = [req.body.username,req.body.username];
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
            console.log({message: '接口getDoctorGroupState--------sql_ERROR'})
            res.send({message: 'ERROR'});
            return
        }else{
            console.log({message: 'OK'})
            res.send(data);
        }
        
        })
    })
    
})
router.route('/getState').post(function (req, res) {
   
    let sql =  `SELECT COUNT(1) count FROM record WHERE receiver =? AND state='false'`;
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
            console.log({message: '接口getState--------sql_ERROR'})
            res.send({message: 'ERROR'});
            return
        }else{
            console.log({message: 'OK'})
            res.send(data);
        }
        
        })
    })
    
})

router.route('/delChatRecord').post(function (req, res) {
    
    let sql =  `delete from record_group where id = ?`;
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
            console.log({message: '接口delChatRecord--------sql_ERROR'})
            res.send({message: 'ERROR'});
            return
        }else{
            res.send({message: 'OK'});
        }
        
        })
    })
    
})
router.route('/changeState').post(function (req, res) {
    
    let sql =  `UPDATE record SET state='true' WHERE record_group_id=? and receiver=?`;
    param = [req.body.record_group_id,req.body.receiver];
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
            console.log({message: '接口changeState--------sql_ERROR'})
            res.send({message: 'ERROR'});
            return
        }else{
            res.send({message: 'OK'});
        }
        
        })
    })
    
})
router.route('/selectState').post(function (req, res) {
    
    let sql =  `SELECT state FROM record  WHERE receiver = ? ORDER BY TIME DESC LIMIT 1`;
    param = [req.body.receiver];
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
            console.log({message: '接口selectState--------sql_ERROR'})
            res.send({message: 'ERROR'});
            return
        }else{
            res.send(data);
        }
        
        })
    })
    
})



module.exports = router