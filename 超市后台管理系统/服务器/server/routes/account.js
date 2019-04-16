var express = require('express');
var router = express.Router();
//引入连接对象
const connection=require("./js/conn")
//写一个路由，统一设置响应头
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


//账号添加
router.post("/addAccount",(req,res) =>{
      //接收前端发来的数据
      let { account,password,userGroup }=req.body;
      let imgUrl="/upload/1.jpg";//默认头像
      
      //将数据存入数据库
      //编写sql
      let sqlStr=`insert into account(account,password,user_group,img_url) values('${account}','${password}','${userGroup}','${imgUrl}')`;
      //执行sql
      connection.query(sqlStr,(err,data) => {
        if(err) throw err;
        //判断是否成功
        if(data.affectedRows>0){//响应成功的消息  0--成功
             res.send({code:0,result:"添加账号成功！！"})
        }else{//响应失败
          res.send({code:1,result:"添加账号失败！！"})
        }
       
      })
})

//验证账号是否存在
router.get("/checkaccount",(req,res) =>{
  let{ newAccount }=req.query;
  const sqlStr=`select * from account where account='${newAccount}'`
  connection.query(sqlStr,(err,data)=>{
    if(err) throw err;
    if(!data.length){
      res.send({code:0,result:"账号正确"})    
    }else{
      res.send({code:1,result:"该账号已存在，请重新输入"})
    }
  })
})

//删除账号
router.get("/delaccount",(req,res) => {
    //接收id
    let { id } =req.query;
    //根据id删除数据
    const sqlStr=`delete from account where id=${ id }`;
    //执行sql
    connection.query(sqlStr,(err,data) => {
       if(err) throw err;
       //判断
       if(data.affectedRows >0){
          res.send({ code:0,result:"删除账号成功"});
       }else{
         res.send({ code:1,result:"删除账号失败"});
       }
    })
})

//修改数据--数据回填
router.get("/editAccount",(req,res) => {
  //接收参数
  let { id }=req.query;
  //构造sql
  const sqlStr=`select * from account where id=${id}`
  //执行sql
  connection.query(sqlStr,(err,data) => {
     if(err) throw err;
     res.send(data);
  })
})

//修改数据--保存新数据
router.post("/saveedit",(req,res) => {
  //接收数据
  let{ account,userGroup,editId}=req.body;
  //构造sql
  const sqlStr=`update account set account='${account}',user_group='${userGroup}' where id=${editId}`
 //执行sql
 connection.query(sqlStr,(err,data) =>{
   if(err) throw err;
   if(data.affectedRows >0){
     res.send({code:0,result:"修改账号成功！"})
   }else{
    res.send({code:1,result:"修改账号失败！"})     
   }
 })
})

//批量删除
router.get("/batchdel",(req,res) => {
   //接收参数
   let { selectId }=req.query;
   //构造sql
   const sqlStr=`delete from account where id in (${ selectId })`
   //执行sql
   connection.query(sqlStr,(err,data) =>{
      if(err) throw err;
      if(data.affectedRows >0){
        res.send({code:0,result:"批量删除成功！"})
      }else{
       res.send({code:1,result:"批量删除失败！"})     
      }
   })
})

//分页函数---对应页的账号列表
router.get("/changePage",(req,res) => {
  //接收参数
  let { currentPage,pageSize }=req.query;
  //构造sql
   let sqlStr=`select * from account order by create_date desc`
   //执行sql
   connection.query(sqlStr,(err,data) => {
     if(err) throw err;
     //计算总条数
     let total=data.length;
     //计算跳过多少条
     let n=(currentPage-1)*pageSize;
     //拼接sql语句
     sqlStr+=` limit ${n},${pageSize}`;
     //执行sql
     connection.query(sqlStr,(err,data) => {
        if(err) throw err;
        res.send({total,data});
     })
   })
})

//验证旧密码
router.get("/checkoldpassword",(req,res) => {
  console.log(req.user);
  //接收参数
  let { oldPassword }=req.query;
  //接收当前用户的密码
  let { password }=req.user;
  //判断
  if(oldPassword === password){
    res.send({code:0,result:"原密码正确！！"})
  }else{
    res.send({code:1,result:"原密码错误，请检查密码是否输入正确"})
  }
})

//修改密码
router.post("/savenewpassword",(req,res) => {
  //接收数据
  let { newPassword }=req.body;
  //接收id
  let { id }=req.user;
  //构造sql
  const sqlStr=`update account set password='${newPassword}' where id=${id}`
  //执行sql
  connection.query(sqlStr,(err,data) => {
    if(err) throw err;
    if(data.affectedRows>0){
      res.send({code:0,result:"修改密码成功，请重新登录！"})
    }else{
      res.send({code:1,result:"修改密码失败！！"})
    }
  })
})

//个人中心信息回填
router.get("/getaccountinfo",(req,res) =>{
  let{ id }=req.user;
  const sqlStr=`select * from account where id=${id}`
  connection.query(sqlStr,(err,data)=>{
    if(err) throw err;
    res.send(data);
  })
})

/* ----------------- 上传后端配置 开始 -------------- */ 

// 引入multer
const multer = require('multer')

// 配置上传到服务器放置的目录 和 重命名
const storage = multer.diskStorage({
	destination: 'public/upload', // 图片上传到服务器的这个目录
	  // 图片重命名
    filename (req, file, cb) {
        var fileFormat =(file.originalname).split("."); // haha.jpg => ['haha', 'jpg']
        // 获取时间戳
        var filename = new Date().getTime();  
        // 124354654 + "." + jpg
        cb(null, filename + "." + fileFormat[fileFormat.length - 1]);
    }
})

// 上传对象
const upload = multer({
    storage,
});

/* ----------------- 上传后端配置 结束-------------- */ 

//头像上传
router.post("/uploadavatar",upload.single("file"),(req,res) =>{
      console.log(req.file);
      //获取文件名
      let filename=req.file.filename;
      //拼接路径
      let path=`/upload/${filename}`
      const sqlStr=`update account set img_url='${path}' where id=${req.user.id}`
      connection.query(sqlStr,(err,data) =>{
        if(err) throw err;
        if(data.affectedRows>0){
          res.send({code:0,result:"头像上传成功",path})
        }else{
          res.send({code:1,result:"头像上传失败"})
        }
      })

})

//菜单权限
router.get("/getmenus",(req,res) =>{
  let userGroup=req.user.user_group;
  let role=userGroup==="超级管理员"?"super":"normal";

  let menus=[
          //系统管理
          {
            iconClass:"el-icon-info",
            title:"系统管理",
            roles:['super','normal'],
            children:[
                {path:"/home/systeminfo",subTitle:"系统信息"}
            ]
         },
        //账号管理
        {
            iconClass:"el-icon-document",
            title:"账号管理",
            roles:['super'],
            children:[
                {path:"/home/accountmanage",subTitle:"账号管理"},
                {path:"/home/accountadd",subTitle:"添加账号"},
                {path:"/home/passwordmodify",subTitle:"密码修改"},
            ]
        },
        //商品管理
        {
            iconClass:"el-icon-goods",
            title:"商品管理",
            roles:['super','normal'],
            children:[
                {path:"/home/goodsmanage",subTitle:"商品管理"},
                {path:"/home/goodsadd",subTitle:"添加商品"}
            ]
        },
        //进货管理
        {
        iconClass:"el-icon-d-caret",
        title:"进货管理",
        roles:['super'],
        children:[
            {path:"/home/inventorymanage",subTitle:"库存管理"},
            {path:"/home/inventoryadd",subTitle:"添加库存"}
        ]
        },
        //出货管理
        {
        iconClass:"el-icon-view",
        title:"出货管理",
        roles:['super','normal'],
        children:[
            {path:"/home/saleslist",subTitle:"销售列表"},
            {path:"/home/outboundgoods",subTitle:"商品出库"},
            {path:"/home/goodsreturn",subTitle:"商品退货"}
        ]
        },
        //统计管理
        {
        iconClass:"el-icon-view",
        title:"统计管理",
        roles:['super'],
        children:[
            {path:"/home/salestotal",subTitle:"销售统计"},
            {path:"/home/stocktotal",subTitle:"进货统计"}
        ]
        },
        //会员管理
        {
        iconClass:"el-icon-message",
        title:"会员管理",
        roles:['super','normal'],
        children:[
            {path:"/home/membermanage",subTitle:"账号管理"},
            {path:"/home/memberadd",subTitle:"添加账号"}
        ]
        }
  ]

  //过滤菜单
  let accessMenu=[]
  menus.forEach(item => {
    if(item.roles.includes(role)){
       accessMenu.push(item)
    }
  })

  res.send({accessMenu});
})

module.exports = router;
