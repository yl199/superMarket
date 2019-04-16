//引入mysql模块
const mysql=require("mysql")

//创建连接对象
const connection=mysql.createConnection({
     host:"localhost",   //数据库的地址
     user:"root",      //用户名
     password:"root",  //密码
     database:"supermarket"  //要连接的数据库
})

//执行连接
connection.connect();
console.log("数据库连接成功")

module.exports = connection;