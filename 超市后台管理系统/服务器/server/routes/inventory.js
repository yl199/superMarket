var express = require('express');
var router = express.Router();
//连接数据库
const connetion=require("./js/conn")
//写一个路由，统一设置响应头
router.all("*",(req,res,next) =>{
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
  

//库存添加
router.post("/inventoryadd",(req,res) => {
    let { barcode,goodsName,classify,putStorage,sold,quantity,purchasingPrice }=req.body;
    //构造sql
    const sqlStr=`insert into inventory(barcode,goods_name,classify,putstorage,sold,quantity,purchasingprice) values('${barcode}','${goodsName}','${classify}','${putStorage}',
                   '${sold}','${quantity}','${purchasingPrice}')`
    console.log(sqlStr);
    //执行sql
    connetion.query(sqlStr,(err,data) => {
        if(err) throw err;
        if(data.affectedRows > 0){
            res.send({code:0,result:"添加库存成功！！"})
        }else{
            res.send({code:0,result:"添加库存失败！！"})
        }
    })
})

//分页函数
router.get("/changeInventoryPage",(req,res) => {
    //接收参数
    let { currentPage,pageSize,classify,keyword } =req.query;
    //构造sql
    let sqlStr=`select * from inventory where 1=1`
    //当分类为空和全部时，查询所有，否者按照分类查询数据
    if(classify !== "" && classify !=="全部"){
        sqlStr+=` and classify='${classify}'`
    }

    //当关键字为空时，查询全部，否则按商品名称和商品条形码中是否包含关键字来查询数据
    if(keyword !==""){
        sqlStr+=` and(goods_name like '%${keyword}%' or barcode like '%${keyword}%')`
    }

    //按照id降序
    sqlStr+=' order by id desc'
    
    //执行sql
    connetion.query(sqlStr,(err,data) => {
        if(err) throw err;
        //计算总条数
        let total=data.length;
        //计算跳过的条数
        let n=(currentPage-1)*pageSize;
        //拼接sql
        sqlStr+=` limit ${n},${pageSize}`
        //执行sql
        connetion.query(sqlStr,(err,data)=>{
            if(err) throw err;
            res.send({total,data});
        })
    })
})

//删除库存
router.get("/delinventory",(req,res) => {
    //接收参数
    let { id }=req.query;
    //构造sql
    const sqlStr=`delete from inventory where id=${id}`
    //执行sql
    connetion.query(sqlStr,(err,data) => {
        if(err) throw err;
        if(data.affectedRows>0){
            res.send({code:0,result:"删除库存成功！！"})
        }else{
            res.send({code:1,result:"删除库存失败！！"})            
        }
    })
})

//修改库存（数据回填）
router.get("/editinventory",(req,res) => {
  let {id} =req.query;
  const sqlStr=`select * from inventory where id=${id}`
  connetion.query(sqlStr,(err,data) => {
      if(err) throw err;
      res.send(data);
  })
})

//修改库存（保存新数据）
router.post("/saveinventory",(req,res) =>{
    let {  barcode,goodsName, classify, purchasingprice, putstorage, quantity,sold,editId }=req.body;
    const sqlStr=`update inventory set barcode='${barcode}',goods_name='${goodsName}',classify='${classify}',putstorage='${putstorage}',sold='${sold}',
                  quantity='${quantity}',purchasingprice='${purchasingprice}' where id=${editId}`
    //执行sql
    connetion.query(sqlStr,(err,data) => {
        if(err) throw err;
        if(data.affectedRows>0){
            res.send({code:0,result:"修改库存成功！！"})
        }else{
            res.send({code:1,result:"修改库存失败！！"})            
        }
    })
} )

//批量删除
router.get("/cancelinventory",(req,res) =>{
    let { selectId }=req.query;
    const sqlStr=`delete from inventory where id in (${selectId})`
    connetion.query(sqlStr,(err,data)=>{
        if(err) throw err;
        if(data.affectedRows>0){
            res.send({code:0,result:"批量删除成功！！"})
        }else{
            res.send({code:1,result:"批量删除失败！！"})            
        }
    })
})

module.exports = router;