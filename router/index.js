const express = require('express')

const mysql = require('../util/mysql');

var sd = require('silly-datetime');

var app = express();

// 路由
const router = express.Router();



router.route('/getDoctorInfo').post(function (req, res) {
   //console.log(req.body)
    let sql;
    if(req.body.userType == '2'){
        sql =  `select * from doctor where d_tel=?`;
        console.log(1)
    }else{
        console.log(req.body.username)
        sql =  `SELECT * FROM doctor  JOIN patient ON doctor.p_houseNum=patient.p_houseNum  WHERE p_tel=?`;
        console.log(2)
    }
    
    
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
            console.log(data)
            res.send(data);
        }
        
        })
    })
    
})
router.route('/getFamilyInfo').post(function (req, res) {
    console.log(req.body)
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
            console.log(data)
            res.send(data);
        }
        
        })
    })
    
})
router.route('/getFamilyDetail').post(function (req, res) {
    let sql;
    sql =  `select * from patientgroup where id = ?`;
    
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
            res.send(data);
        }
        
        })
    })
    
})
router.route('/getUserInfo').post(function (req, res) {
    let sql;
    if(req.body.userType == '1'){
        sql =  `select p_name name,p_tel tel,p_password password,p_face face from patient where p_tel = ?`;
        //console.log(1)
    }else{
        sql =  `SELECT d_name name,d_tel tel,d_password password,d_face face FROM doctor where d_tel = ?`;
        //console.log(2)
    }
    
    
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
            console.log({message: 'ERROR'});
            return
        }else{
            res.send(data);
        }
        
        })
    })
    
})
router.route('/search').post(function (req, res) {
    //console.log(req.body)
    let sql;
    sql =  `SELECT * FROM toutiao WHERE n_title LIKE "%"?"%" OR n_abstract LIKE "%"?"%" `;
    
    param = [req.body.searchValue,req.body.searchValue];
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
            console.log({message: 'ERROR'});
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
    //console.log(req.body)
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
    //console.log(req.body.ids)
    var sql =  `delete from patientgroup where id in (`;
    param = [];
    for(let i = 0;i<req.body.ids.length;i++){
        param.push(req.body.ids[i])
    }
    for(let i = 0;i<req.body.ids.length-1;i++){
        sql = sql+req.body.ids[i]+`,`;
    }
    sql = sql+req.body.ids[req.body.ids.length-1]+`)`;
    //console.log(sql)
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
router.route('/delAllChat').post(function (req, res) {
    //console.log(req.body.ids)
    let sql;
    if(req.body.userType == '1'){
        sql =  `update record_group set patientSee = false`;
        //console.log(1)
    }else if(req.body.userType == '2'){
        sql =  `update record_group set doctorSee = false`;
        //console.log(2)
    }
    //param = [req.body.username];
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
            res.send({message: 'ERROR'});
            return
        }else{
            res.send({message: 'OK'});
        }
        
        })
    })
    
})
router.route('/getAllChatNum').post(function (req, res) {
    //console.log(req.body.ids)
    var sql = `SELECT SUM(count) count FROM ( SELECT COUNT(1) count FROM record WHERE receiver =? UNION ALL SELECT COUNT(1) count FROM record WHERE send  =? ) a `;
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
            res.send({message: 'ERROR'});
            return
        }else{
            res.send(data);
        }
        
        })
    })
    
})
router.route('/getAllOrder').post(function (req, res) {
    //console.log(req.body)
    var sql = `SELECT * FROM sq_order WHERE d_id = ? and doctor_see = true`;
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
            console.log('ERROR')
            res.send({message: 'ERROR'});
            return
        }else{
           // console.log(data)
            res.send(data);
        }
        
        })
    })
    
})
router.route('/getMyOrderInfo').post(function (req, res) {
    console.log(req.body)
    var sql = `SELECT * FROM sq_order WHERE send_order = ?`;
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
            console.log('ERROR')
            res.send({message: 'ERROR'});
            return
        }else{
           // console.log(data)
            res.send(data);
        }
        
        })
    })
    
})
router.route('/updateFamilyDetail').post(function (req, res) {
    let sql =  `update patientgroup set name=?,age=?,height=?,weight=?,history=?,sex=?,profession=? where id=?`;
    
    param = [req.body.name,req.body.age,req.body.height,req.body.weight,req.body.history,req.body.sex,req.body.profession,req.body.id];
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
router.route('/updateFace').post(function (req, res) {
    //console.log(req.body)
    
    let sql;
    if(req.body.userType == '1'){
        sql =  `update patient set p_face=? where p_tel=?`;
        //console.log(1)
    }else{
        sql =  `update doctor set d_face=? where d_tel=?`;
        //console.log(2)
    }
    
    param = [req.body.face,req.body.phone];
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
router.route('/updatePassword').post(function (req, res) {
    //console.log(req.body)
    let sql;
    if(req.body.userType == '1'){
        sql =  `update patient set p_password=? where p_tel=?`;
        //console.log(1)
    }else{
        sql =  `update doctor set d_password=? where d_tel=?`;
        //console.log(2)
    }
    param = [req.body.password,req.body.phone];
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
router.route('/complateOrder').post(function (req, res) {
    //console.log(req.body)
    let sql =  `update sq_order set order_state='true' where id=?`;
    
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
            console.log('ERROR')
            res.send({message: 'ERROR'});
            return
        }else{
            res.send({message: 'OK'});
        }
        
        })
    })
})
router.route('/delOrder').post(function (req, res) {
    //console.log(req.body)
    let sql =  `update sq_order set doctor_see=false where id=?`;
    
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
            console.log('ERROR')
            res.send({message: 'ERROR'});
            return
        }else{
            res.send({message: 'OK'});
        }
        
        })
    })
})
router.route('/cancelOrder').post(function (req, res) {
    //console.log(req.body)
    let sql =  `update sq_order set order_cancel='true' where id=?`;
    
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
            console.log('ERROR')
            res.send({message: 'ERROR'});
            return
        }else{
            res.send({message: 'OK'});
        }
        
        })
    })
})

module.exports = router