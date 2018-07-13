var db = require('../config/db')
var sql = require('../config/sql')
var mysql = require('mysql')
var express = require('express')
var router = express.Router()
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var conn = mysql.createConnection(db.mysql)
conn.connect()

router.get('/localMusic',function(req,res,next){
     conn.query(sql.localMusic.search,function(err,rows){
        if(err) throw err
            if(rows){
                console.log(rows)
                let str = {
                    "status":"200",
                    "result":"success",
                    "musicsList":rows
                }
             return res.send(str); 
            }
         })        
})
router.get('/mylike',function(req,res,next){
    conn.query(sql.mylike.search,function(err,rows){
        if(err) throw err
        if(rows.length){
            console.log(rows)
            let str = {
                "status":"200",
                "result":"success",
                "musicsList":rows
            }
            return res.send(str); 
        }else{
            let str = {
                "status":"200",
                "result":"success",
                "musicsList":[]
            }
            return res.send(str)
        }
    })
})
router.get('/songList',function(req,res,next){
    conn.query(sql.songList.search,function(err,rows){
        if(err) throw err
        if(rows){
            console.log(rows)
            let str = {
                "status":"200",
                "result":"success",
                "songList":rows
            }
            return res.send(str)
        }
    })
})
router.get('/listMenu',function(req,res,next){
    conn.query(sql.listMenu.search,function(err,rows){
        if(err) throw err
        if(rows){
            let str = {
                "status":"200",
                "result":"success",
                "listMenu":rows
            }
            console.log(rows)
            return res.send(str)
        }
    })
})
router.post('/listMenuSearch',function(req,res,next){
    conn.query(sql.listMenuSearch.search,[req.query.word],function(err,rows){
        if(err) throw err
        if(rows){
            let str = {
                "status":"200",
                "result":"success",
                "listMenuSearch":rows
            }
            console.log(rows)
            return res.send(str)
        }
    })
})
router.post('/delete',function(req,res,next){
    let url = req.query.url
    let title = req.query.title
    let name = req.query.name
    conn.query(sql.mylike.delete,[url],function(err,rows){
        if(err) throw err
        if(rows){
           conn.query(sql.delete.add,[title,name,url],function(err,rows){
               console.log(rows)
                // if(err) throw err
                // if(rows){
                //     // return
                // }
            })
            return res.send({"status":"200","result":"success"})
        }
    })
})
router.get('/deleteAll',function(req,res,next){
  conn.query(sql.mylike.deleteall,function(err,rows){
      if(err) throw err
      if(rows){
          return res.send({"status":"200","result":"success"})
      }
  })
})
router.get('/deleted',function(req,res,next){
    conn.query(sql.delete.search,function(err,rows){
    if(err) throw err
      if(rows.length){
          let str = {
              "status":"200",
              "result":"success",
              "deleteList":rows
          }
          return res.send(str)
      }else{
          let str = {
              "status":"200",
              "result":"success",
              "deleteList":[]
          }
          return res.send(str)
      }
    })
})
router.post('/insert',function(req,res,next){
    let url = req.query.url
    let title = req.query.title
    let name = req.query.name
    console.log(req.query)
    conn.query(sql.localMusic.add,[title,name,url],function(err,rows){
        if(err) throw err
        if(rows){
            console.log(rows)
            return res.send({"status":"200","result":"success"})
        }
    })
})
module.exports = router;