var db = require('../config/db')
var sql = require('../config/sql')
var mysql = require('mysql')
var express = require('express')
var router = express.Router()
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var conn = mysql.createConnection(db.mysql)
conn.connect()

router.post('/loading',function(req,res,next){
    let userName = req.query.userName
    let password = req.query.password
    conn.query(sql.login.search,function(err,rows){
        if(err) throw err
        if(rows){
          console.log(rows)
          let str = []
          let arr = []
          let sst = []
          for(let i = 0;i<rows.length;i++){
             if(rows[i].userName == userName && rows[i].password == password || rows[i].id == userName && rows[i].password == password){
                 str.push(rows[i])
             }
             if(rows[i].userName == userName && rows[i].password != password || rows[i].id == userName && rows[i].password != password){
                 arr.push(rows[i])
             }
             if(rows[i].userName != userName || rows[i].id != userName){
                 sst.push(rows[i])
             }
          }
          if(str.length){
              return res.send({"status":"200","result":"success","userInfo":str,"text":"登录成功","flag":true})
          }
          else{
              return res.send({"status":"200","result":"success","text":"您输入的信息有误，请重新输入","flag":"false"})
          }
          if(arr.length){
             return res.send({"status":"200","result":"success","text":"您输入的密码错误，请重新输入","flag":false})
          }
          if(sst.length){
              return res.send({"status":"200","result":"success","text":"账户不存在","flag":false})
          }
        }
    })
})
router.post('/insert',function(req,res,next){
    let userName = req.query.userName
    let password = req.query.password
    conn.query(sql.login.add,[userName,password],function(err,rows){
        if(err) throw err
        if(rows){
            return res.send({"status":"200","result":"success","userInfo":rows,"text":"注册成功","flag":true})
        }
    })
})
module.exports = router;