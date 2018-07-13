var db = require('../config/db')
var sql = require('../config/sql')
var mysql = require('mysql')
var express = require('express')
var router = express.Router()
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var conn = mysql.createConnection(db.mysql)
conn.connect()

router.post('/keyword',function(req,res,next){
     let keyword = req.query.keyword
     console.log(keyword)
     let sql = "SELECT * FROM song where title like '%"+keyword+"%' or name like '%"+keyword+"%'"
     console.log(sql.search.keyword)
     conn.query(sql,function(err,rows){
        if(err) throw err
        console.log(rows)
            if(rows.length){
             let data = {
                 "status": "200",
                 "params": keyword,
                 "musicsList": rows
             }
             return res.send(data); 
            }else{
				 let str = {
				 "status": "200",
                 "params": keyword,
                 "musicsList": []
							}
							return res.send(str)
						}
         })        
})
router.post('/add',function(req,res,next){
    console.log(req.query)
    let params = req.query
    conn.query("SELECT * FROM listMenu where url = '" + req.query.url + "'",function(err,rows){
        if(err) throw err
        console.log(rows)
        console.log(rows.length)
        if(rows.length == 0){
					conn.query(sql.addMylike.add,['我喜欢',params.title,params.name,params.url],function(err,rows){
						if(err) throw err
								if(rows){
								var data = {
										"status": "200",
										"result": "success",
										"insert": "0"
								}
								console.log(rows)
								 return res.send(data); 
								}
						})
        }else{
					let data = {
						"status":"200",
						"result":"success",
						"insert":"1"
					}
					return res.send(data)
				}
    })
})
module.exports = router;