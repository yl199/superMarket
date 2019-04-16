import Vue from 'vue'
import App from './App.vue'
import router from './router'
//引入local
import local from "@/utils/local";

//引入request
import request from "./utils/request"
//挂载在vue原型上
Vue.prototype.request=request;

//引入echarts
import echarts from "echarts"
//挂载在vue原型上
Vue.prototype.echarts=echarts;

//引入elementui
import ElementUI from 'element-ui' // 组件
import 'element-ui/lib/theme-chalk/index.css' // 样式

//引入重置样式
import "./assets/css/base.css"
//注册
Vue.use(ElementUI)

//阻止生产提示
Vue.config.productionTip = false

//路由守卫 拦截所有路由
router.beforeEach((to,from,next) => {
  //to :要进入的目标路由  from：导航中离开的路由  next:调用函数，进行下一步
  //获取浏览器中的token
  const token=local.get("y_l_10_12");
  //如果有token就放行
  if(token){
    next()
  }else{//没有token
    //想去登录界面
    if(to.path === "/login"){
      next();
    }else{
      //如果想去其他页面，就跳转到登录
      next("/login");
    }
  }
})


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
