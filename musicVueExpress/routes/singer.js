var db = require('../config/db')
var sql = require('../config/sql')
var mysql = require('mysql')
var express = require('express')
var router = express.Router()
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var conn = mysql.createConnection(db.mysql)
conn.connect()

router.post('/name',function(req,res,next){
    let name = req.query.name
    console.log(name)
    conn.query("select distinct name,type from singer WHERE type = '"+name+"' and name regexp '[^a-w0-9]' order by convert(name using gbk) ASC",[name],function(err,rows){
        if(err) throw err
        if(rows.length){
            console.log(rows)
            let str = {
                "status":"200",
                "result":"success",
                "singerList":rows
            }
            return res.send(str)
        }else{
            let str = {
                "status":"200",
                "result":"success",
                "singerList":[]
            }
            return res.send(str)
        }
    })
})
router.post('/song',function(req,res,next){
    let name = req.query.name
    conn.query(sql.singer.search,[name],function(err,rows){
       if(err) throw err
       console.log(rows)
       if(rows.length){
            let str = {
                "status":"200",
                "result":"success",
                "singerList":rows
            }
            return res.send(str)
        }else{
            let str = {
                "status":"200",
                "result":"success",
                "singerList":[]
            }
            return res.send(str)
        }
    })
})
module.exports = router;