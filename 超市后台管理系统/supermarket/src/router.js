import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {//根目录
      path:"/",
      redirect:"/login"
    },
    {//登录路由
      path:"/login",
      component:() => import("./views/Login/Login.vue")
    },
     {//主界面路由
      path:"/home",
      component:() => import("./views/Home/Home.vue"),
      redirect:"/home/systeminfo",
      children:[
        {//系统信息
           path:"/home/systeminfo",
           component:() => import("./views/SystemInfo/SystemInfo.vue")
        },
         {//个人中心
          path:"/home/personcenter",
          component:() => import("./views/PersonCenter/PersonCenter.vue")
       },
        {//账号添加
          path:"/home/accountadd",
          component:() => import("./views/AccountAdd/AccountAdd.vue")
        },
        {//账号管理
          path:"/home/accountmanage",
          component:() => import("./views/AccountManage/AccountManage.vue")
        },
        {//密码修改
          path:"/home/passwordmodify",
          component:() => import("./views/PasswordModify/PasswordModify.vue")
        },
        {//添加商品
          path:"/home/goodsadd",
          component:() => import("./views/GoodsAdd/GoodsAdd.vue")
        },
        {//商品管理
          path:"/home/goodsmanage",
          component:() => import("./views/GoodsManage/GoodsManage.vue")
        },
        {//销售统计
          path:"/home/salestotal",
          component:() => import("./views/SalesTotal/SalesTotal.vue")
        },
        {//进货统计
          path:"/home/stocktotal",
          component:() => import("./views/StockTotal/StockTotal.vue")
        },
        {//添加库存
          path:"/home/inventoryadd",
          component:() => import("./views/InventoryAdd/InventoryAdd.vue")
        },
        {//库存管理
          path:"/home/inventorymanage",
          component:() => import("./views/InventoryManage/InventoryManage.vue")
        },
        {//销售列表
          path:"/home/saleslist",
          component:() => import("./views/SalesList/SalesList.vue")
        },
        {//商品出库
          path:"/home/outboundgoods",
          component:() => import("./views/OutboundGoods/OutboundGoods.vue")
        },
        {//商品退货
          path:"/home/goodsreturn",
          component:() => import("./views/GoodsReturn/GoodsReturn.vue")
        },
        {//添加会员账号
          path:"/home/memberadd",
          component:() => import("./views/MemberAdd/MemberAdd.vue")
        },
        {//系统信息
          path:"/home/membermanage",
          component:() => import("./views/MemberManage/MemberManage.vue")
        }
      ]
    },
  
  ]
})
