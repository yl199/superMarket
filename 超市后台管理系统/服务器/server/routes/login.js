var express = require('express');
var router = express.Router();
//引入jsonwebtoken
const jwt=require("jsonwebtoken");
//连接数据库
const connection=require("./js/conn")
//写一个路由，统一设置响应头
router.all('*', (req, res, next) => {
	// 设置响应头解决跨域
	res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:8081")
	res.setHeader("Access-Control-Allow-Headers", "authorization"); // 允许通过头部信息authorization 携带token
	// 放行
	next();
})


/* --------------------  验证token合法性开始  ---------------- */ 
//准备一个秘钥
const secretkey="yl1998";
/* 验证token的合法性 */
const expressJwt = require('express-jwt');
// 验证token的合法性
router.use(expressJwt ({
            secret: secretkey
}).unless({
    path: ['/login/checklogin']  // 除了这个地址，其他的URL都需要验证（其他的所有请求 都要带上token 才能获取数据 否则不能获取到数据）
})); 
// 路由拦截器
router.use(function (err, req, res, next) {
    // 如果前端没有token或者是错误的token 就会抛出如下错误
    if (err.name === 'UnauthorizedError') { 
        // 响应给前端token无效的信息
        res.status(401).send('token不合法...');
    }
})

/* --------------------  验证token合法性结束  ---------------- */ 


//登录验证
router.post("/checklogin",(req,res) => {
  //接收参数
  let { account,password }=req.body;
  //构造sql
  const sqlStr=`select * from account where account='${account}' and password='${password}'`
  //执行sql
  connection.query(sqlStr,(err,data) => {
    if(err) throw err;
    //判断
    if(data.length){
       //生成token，将token和数据一起发给前端
       const token=jwt.sign(Object.assign({},data[0]),secretkey,{ expiresIn:  60*60*2 });
       res.send({code:0,result:"欢迎登录",token})
    }else{
       res.send({code:1,result:"登录失败，请检查账号和密码！！"})
    }
  })
})
//获取当前账号名
router.get("/getcurrentaccount",(req,res) => {
    //（使用express-jwt验证token合法后 会把token的值 存入 req.user 其实就是当前登录账号数据对象）
      res.send(req.user.account);
   
})
module.exports = router;
