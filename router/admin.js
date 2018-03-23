const express = require('express')

const mysql = require('../util/mysql');

var sd = require('silly-datetime');

var app = express();

// 路由
const router = express.Router();

//随机生成8位数字的方法


router.route('/patientCount').post(function (req, res) {
    let sql;
   
    sql =  `SELECT address.label,COUNT(1) count FROM ( SELECT p_houseNum FROM patient  GROUP BY id) a  JOIN address ON address.value = a.p_houseNum GROUP BY p_houseNum,address.label`;
    
    //console.log(name)
    //param = [req.body.p_tel,req.body.p_password];
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
            if(data.length>0){
                res.send(data);
            }else{
                res.send({message: 'ERROR'});
            }
          //  console.log(data)
            
        }
        
        })
    })
    
})
router.route('/showAllPhone').post(function (req, res) {
    let sql;
   
    sql =  `select * from common_phone`;
    
    //console.log(name)
    //param = [req.body.p_tel,req.body.p_password];
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
            if(data.length>0){
                res.send(data);
            }else{
                res.send({message: 'ERROR'});
            }
            ///console.log(data)
            
        }
        
        })
    })
    
})
router.route('/getDoctor').post(function (req, res) {
    let sql;
   
    sql =  `select d_id,d_name from doctor`;
    
    //console.log(name)
    //param = [req.body.p_tel,req.body.p_password];
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
            if(data.length>0){
                res.send(data);
            }else{
                res.send({message: 'ERROR'});
            }
           // console.log(data)
            
        }
        
        })
    })
    
})
router.route('/getTheAddress').post(function (req, res) {
    //console.log(req.body)
    let sql;
    sql =  `select * from address where id=?`;
    
    //console.log(name)
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
            //console.log({message: 'ERROR'})
            return
        }else{
            res.send(data);
           
            //console.log(data)
            
        }
        
        })
    })
    
})
router.route('/getThePhone').post(function (req, res) {
   
    let sql;
   
    sql =  `select * from common_phone where id=?`;
    
    //console.log(name)
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
            if(data.length>0){
                res.send(data);
            }else{
                res.send({message: 'ERROR'});
            }
            //console.log(data)
            
        }
        
        })
    })
    
})

router.route('/showToutiaoList').post(function (req, res) {
    //console.log(req.body)
    let sql;
    if(req.body.n_type == 'toutiao'){
        sql =  `SELECT 	* FROM toutiao where n_type = 'toutiao' LIMIT ?, ?`;
       //console.log(1)
    }else if(req.body.n_type == 'zhishi'){
        sql =  `SELECT 	* FROM toutiao where n_type = 'zhishi' LIMIT ?, ?`;
       // console.log(2)
    }
    
    
    //console.log(name)
    param = [(parseInt(req.body.pageNum)-1)*parseInt(req.body.pageSize),parseInt(req.body.pageSize)];
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
                //console.log(data)
                res.send(data);
            }else{
                res.send({message: 'ERROR'});
            }
           // console.log(data)
            
        }
        
        })
    })
    
})

router.route('/showDoctorList').post(function (req, res) {
    let sql;
    
    sql =  `SELECT 	* FROM doctor  LIMIT ?, ?`;
    
    //console.log(name)
    param = [(parseInt(req.body.pageNum)-1)*parseInt(req.body.pageSize),parseInt(req.body.pageSize)];
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
           // console.log(data)
            
        }
        
        })
    })
    
})
router.route('/showToutiaoNum').post(function (req, res) {
    let sql;
    if(req.body.n_type == 'toutiao'){
        sql =  `SELECT 	count(*) count FROM toutiao where n_type = 'toutiao'`;
      // console.log(1)
    }else if(req.body.n_type == 'zhishi'){
        sql =  `SELECT 	count(*) count FROM toutiao where n_type = 'zhishi'`;
       // console.log(2)
    }
    
    
    //console.log(name)
    //param = [parseInt(req.body.pageNum)-1,parseInt(req.body.pageSize)];
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
            
            if(data.length>0){
                res.send(data);
            }else{
                res.send({message: 'ERROR'});
            }
            //console.log(data)
            
        }
        
        })
    })
    
})
router.route('/showDoctorNum').post(function (req, res) {
    let sql;
    sql =  `SELECT 	count(*) count FROM doctor `;
    
    
    
    //console.log(name)
    //param = [parseInt(req.body.pageNum)-1,parseInt(req.body.pageSize)];
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
            
            if(data.length>0){
                res.send(data);
            }else{
                res.send({message: 'ERROR'});
            }
            //console.log(data)
            
        }
        
        })
    })
    
})

router.route('/showToutiaoNum').post(function (req, res) {
    let sql;
    if(req.body.n_type == "toutiao"){
        sql =  `SELECT 	count(*) count FROM toutiao where n_type="toutiao" `;
    }else if(req.body.n_type == "zhishi"){
        sql =  `SELECT 	count(*) count FROM toutiao where n_type="zhishi" `;
    }
    
    
    //console.log(name)
    //param = [parseInt(req.body.pageNum)-1,parseInt(req.body.pageSize)];
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
            
            if(data.length>0){
                res.send(data);
            }else{
                res.send({message: 'ERROR'});
            }
            //console.log(data)
            
        }
        
        })
    })
    
})
router.route('/saveArticle').post(function (req, res) {
    let sql;
    
    sql =  `insert into toutiao(n_img,n_title,n_abstract,n_time,n_content,n_from,n_type) values (?,?,?,?,?,?,?)`;

    //console.log(name)
    param = [req.body.n_img,req.body.n_title,req.body.n_abstract,req.body.n_time,req.body.n_content,req.body.n_from,req.body.n_type];
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
            
            //console.log(data)
            
        }
        
        })
    })
    
})
router.route('/saveDoctor').post(function (req, res) {
    let sql;
    
    sql =  `insert into doctor(d_id,d_name,d_technicalTitle,d_committee,d_tel,d_abstract,d_face,p_houseNum,d_password) values (?,?,?,?,?,?,?,?,?)`;

    //console.log(name)
    param = [req.body.d_id,req.body.d_name,req.body.d_technicalTitle,req.body.d_committee,req.body.d_tel,req.body.d_abstract,req.body.d_face,req.body.p_houseNum,req.body.d_password];
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
            
            //console.log(data)
            
        }
        
        })
    })
    
})
router.route('/deleteToutiaoAll').post(function (req, res) {
    //console.log(req.body)
    var sql =  `delete from toutiao where n_id in (`;//用来拼接？
    param = [];
    for(let i = 0;i<req.body.ids.length;i++){  //循环传过来的id数组，插入到param变量数组中
        param.push(req.body.ids[i])
    }
    
    for(let i = 0;i<req.body.ids.length-1;i++){	//循环拼接sql
        sql = sql+req.body.ids[i]+`,`;
    }
    sql = sql+req.body.ids[req.body.ids.length-1]+`)`;	//拼接结尾
    

    //console.log(name)
    //param = [req.body.n_img,req.body.n_title,req.body.n_abstract,req.body.n_see_num,req.body.n_time,req.body.n_content,req.body.n_from,req.body.n_type];
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
            
            //console.log(data)
            
        }
        
        })
    })
    
})
router.route('/delAllPhone').post(function (req, res) {
    console.log(req.body)
    var sql =  `delete from common_phone where id in (`;//用来拼接？
    param = [];
    for(let i = 0;i<req.body.ids.length;i++){  //循环传过来的id数组，插入到param变量数组中
        param.push(req.body.ids[i])
    }
    
    for(let i = 0;i<req.body.ids.length-1;i++){	//循环拼接sql
        sql = sql+req.body.ids[i]+`,`;
    }
    sql = sql+req.body.ids[req.body.ids.length-1]+`)`;	//拼接结尾
    

    //console.log(name)
    //param = [req.body.n_img,req.body.n_title,req.body.n_abstract,req.body.n_see_num,req.body.n_time,req.body.n_content,req.body.n_from,req.body.n_type];
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
            
            //console.log(data)
            
        }
        
        })
    })
    
})
router.route('/deleteDoctorAll').post(function (req, res) {
    console.log(req.body)
    var sql =  `delete from doctor where id in (`;//用来拼接？
    param = [];
    for(let i = 0;i<req.body.ids.length;i++){  //循环传过来的id数组，插入到param变量数组中
        param.push(req.body.ids[i])
    }
    
    for(let i = 0;i<req.body.ids.length-1;i++){	//循环拼接sql
        sql = sql+req.body.ids[i]+`,`;
    }
    sql = sql+req.body.ids[req.body.ids.length-1]+`)`;	//拼接结尾
    

    //console.log(name)
    //param = [req.body.n_img,req.body.n_title,req.body.n_abstract,req.body.n_see_num,req.body.n_time,req.body.n_content,req.body.n_from,req.body.n_type];
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
            
           // console.log(data)
            
        }
        
        })
    })
    
})
router.route('/deleteArticle').post(function (req, res) {
    //console.log(req.body)
    var sql =  `delete from toutiao where n_id = ?`;
    

    //console.log(name)
    param = [req.body.n_id];
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
            
            //console.log(data)
            
        }
        
        })
    })
    
})
router.route('/deleteDoctor').post(function (req, res) {
    //console.log(req.body)
    var sql =  `delete from doctor where d_id = ?`;
    

    //console.log(name)
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
            
            //console.log(data)
            
        }
        
        })
    })
    
})
router.route('/delPhone').post(function (req, res) {
    //console.log(req.body)
    var sql =  `delete from common_phone where id = ?`;
    

    //console.log(name)
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
            
            //console.log(data)
            
        }
        
        })
    })
    
})
router.route('/showNewsById').post(function (req, res) {
    //console.log(req.body)
    var sql =  `select * from toutiao where n_id = ?`;
    

    //console.log(name)
    param = [req.body.n_id];
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
            
            //console.log(data)
            
        }
        
        })
    })
    
})
router.route('/showDoctorById').post(function (req, res) {
   // console.log(req.body)
    var sql =  `select * from doctor where d_id = ?`;

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
            res.send({message: 'ERROR'});
            return
        }else{
            
            
            res.send(data);
            
          //  console.log(data)
            
        }
        
        })
    })
    
})
router.route('/getAddress').post(function (req, res) {
    //console.log(req.body)
    var sql =  `select * from address`;

    //param = [req.body.d_id];
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
            
            
            res.send(data);
            
            //  console.log(data)
            
        }
        
        })
    })
    
})
router.route('/updateNews').post(function (req, res) {
    //console.log(req.body)
    var sql =  `update toutiao set n_img=?,n_title=?,n_abstract=?,n_time=?,n_content=?,n_from=?,n_type=? where n_id = ?`;
    

    //console.log(name)
    param = [req.body.n_img, req.body.n_title, req.body.n_abstract, req.body.n_time, req.body.n_content, req.body.n_from, req.body.n_type, req.body.n_id];
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
            
            //console.log(data)
            
        }
        
        })
    })
    
})
router.route('/updateAddress').post(function (req, res) {
    //console.log(req.body)
    var sql =  `UPDATE address SET d_id=?,d_name=(SELECT d_name FROM doctor WHERE d_id = ?) WHERE id = ?`;
    

    //console.log(name)
    param = [req.body.d_id, req.body.d_id, req.body.id];
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
            
            //console.log(data)
            
        }
        
        })
    })
    
})
router.route('/updateDoctor').post(function (req, res) {
    //console.log(req.body)
    var sql =  `update doctor set d_name=?,d_technicalTitle=?,d_committee=?,d_tel=?,d_abstract=?,d_password=?,d_face=?,p_houseNum=? where d_id = ?`;
    

    //console.log(name)
    param = [req.body.d_name, req.body.d_technicalTitle, req.body.d_committee, req.body.d_tel, req.body.d_abstract, req.body.d_password, req.body.d_face,req.body.p_houseNum, req.body.d_id];
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
            
            //console.log(data)
            
        }
        
        })
    })
    
})
router.route('/updateThePhone').post(function (req, res) {
    //console.log(req.body)
    var sql =  `update common_phone set title=?,phone=? where id = ?`;
    

    //console.log(name)
    param = [ req.body.title,req.body.phone,req.body.id];
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
            
            //console.log(data)
            
        }
        
        })
    })
    
})
router.route('/updatePass').post(function (req, res) {
    console.log(req.body)
    var sql =  `update admin set a_password=? where id = ?`;
    

    //console.log(name)
    param = [ req.body.a_password,req.body.id];
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
            
            //console.log(data)
            
        }
        
        })
    })
    
})
router.route('/addPhone').post(function (req, res) {
    //console.log(req.body)
    let sql =  `insert into common_phone(title,phone) values (?,?)`;
    

    //console.log(name)
    param = [req.body.title, req.body.phone];
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
            
            //console.log(data)
            
        }
        
        })
    })
    
})




module.exports = router