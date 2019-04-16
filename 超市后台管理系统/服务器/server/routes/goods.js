var express = require('express');
var router = express.Router();
//引入连接对象
const connection=require("./js/conn")
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
  
//添加商品
router.post("/addGoods",(req,res) => {
    let{ classify,barcode,goodsName,goodsSellingPrice,marketPrice,
        goodsPurchasingPrice,inventoryQuantity,goodsWeight,goodsUnit,preferentialEnjoy,
        isPromotion,goodsIntroduction } =req.body;
    //构造sql
    const sqlStr=`insert into goods(classify,barcode,goods_name,sellingprice,marketprice,purchasingprice,inventoryquantity,goodsweight,
                  goodsunit,preferentialenjoy,ispromotion,goodsintroduction) values('${classify}','${barcode}','${goodsName}','${goodsSellingPrice}',
                  '${marketPrice}','${goodsPurchasingPrice}','${inventoryQuantity}','${goodsWeight}','${goodsUnit}','${preferentialEnjoy}',
                  '${ isPromotion}','${goodsIntroduction}')`
    //编写sql
    connection.query(sqlStr,(err,data) => {
        if(err) throw err;
        if(data.affectedRows>0){
            res.send({code:0,result:"添加商品成功！"});
        }else{
            res.send({code:1,result:"添加商品失败！"});
        }
    })
})

//分页函数
router.get("/changeGoodsPage",(req,res) =>{
    //接收参数
    let{ pageSize,currentPage,classify,keyword }=req.query;
    //构造sql
    let sqlStr=`select * from goods where 1=1`

    //判断分类是否为空或全部,如果是的话，就查询所有，否则按照条件查询
    if(classify !== "" && classify !== "全部"){
        sqlStr+=` and classify='${classify}'`
    }

    //判断关键字是否为空，如果不为空，就按商品条形码或者商品名称中含有关键字查询，否则就查全部
     if(keyword !== ""){
         sqlStr+=` and(goods_name like '%${keyword}%' or barcode like '%${keyword}%')`
     }
     //拼接按id降序
     sqlStr+=` order by id desc`
    //执行sql
    connection.query(sqlStr,(err,data) => {
        if(err) throw err;
        //计算总条数
        let total=data.length;
        //计算跳过的条数
        let n=(currentPage-1)*pageSize;
        //拼接sql
        sqlStr+=` limit ${n},${pageSize}`
        //执行sql
        connection.query(sqlStr,(err,data) => {
            if(err) throw err;
            res.send({total,data})
        })
    })
})

//删除商品
router.get("/delgoods",(req,res) => {
   //接收参数
   let{ id }=req.query;
   //构造sql
   const sqlStr=`delete from goods where id=${id}`
   //执行sql
   connection.query(sqlStr,(err,data) =>{
       if(err) throw err;
       if(data.affectedRows>0){
           res.send({code:0,result:"删除商品成功！"})
       }else{
        res.send({code:1,result:"删除商品失败！"})
       }
   })
})

//修改商品(数据回填)
router.get("/editgoods",(req,res) => {
    let { id }=req.query;
    //构造sql
    const sqlStr=`select * from goods where id=${id}`
    //执行sql
    connection.query(sqlStr,(err,data) =>{
        if(err) throw err;
        res.send(data);
    })
})

//修改商品(保存新数据)
router.post("/savaeditgoods",(req,res) => {
    let{ barcode,goodsName,classify,goodsSellingPrice,marketPrice,isPromotion,preferentialEnjoy,inventoryQuantity,editId }=req.body;
    //构造sql
    const sqlStr=`update goods set barcode='${barcode}',goods_name='${goodsName}',classify='${classify}', sellingprice='${goodsSellingPrice}',
                 marketprice='${marketPrice}',ispromotion='${isPromotion}',preferentialenjoy='${preferentialEnjoy}',
                 inventoryquantity='${inventoryQuantity}' where id=${editId}`
    //编写sql
    connection.query(sqlStr,(err,data) => {
        if(err) throw err;
        if(data.affectedRows>0){
            res.send({code:0,result:"修改商品成功！"})
        }else{
         res.send({code:1,result:"修改商品失败！"})
        }
    })
})

//批量删除
router.get("/batchdel",(req,res) => {
    //接收参数
    let { selectId } =req.query;
    //构造sql
    const sqlStr=`delete from goods where id in (${selectId})`
    //执行sql
    connection.query(sqlStr,(err,data) => {
        if(err) throw err;
        if(data.affectedRows>0){
            res.send({code:0,result:"批量删除商品成功！"})
        }else{
         res.send({code:1,result:"批量删除商品失败！"})
        }
    })
})
module.exports = router;