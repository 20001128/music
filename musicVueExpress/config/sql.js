var sqlMap = {
    singer:{
        search:'SELECT * FROM song where name = ?',
        searchone:"select distinct name,type from singer WHERE type = ? and name regexp '[^a-w0-9]' order by convert(name using gbk) ASC"
    },
    localMusic:{
        search:'SELECT * FROM localMusic',
        add:'insert into localmusic(title,name,url) value (?,?,?)'
    },
    mylike:{
        search:"SELECT * FROM listMenu where list = '我喜欢'",
        delete:"DELETE FROM listmenu WHERE url = ?",
        deleteall:"DELETE FROM listmenu WHERE list = '我喜欢'"
    },
    songList:{
        search:'SELECT * FROM songList'
    },
    listMenu:{
        search:'SELECT * FROM listMenu'
    },
    listMenuSearch:{
        search:'SELECT * FROM listMenu where list = ?'
    },
    addMylike:{
        add:'insert into listMenu(list,title,name,url) value (?,?,?,?)'
    },
    login:{
        search:'SELECT * FROM userinfo',
        add:'INSERT INTO userinfo(userName,PASSWORD) VALUES (?,?) '
    },
    delete:{
        add:'insert into deleted(title,name,url) VALUES (?,?,?)',
        search:'SELECT * FROM deleted'
    }
}
module.exports = sqlMap