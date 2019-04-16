<template>
    <div class="leftnav">
          <!--$route.path 当前的路径 -->
          <el-menu
            :default-active="$route.path" 
            class="el-menu-vertical-demo"
            background-color="#2b343d"
            text-color="#fff"
            active-text-color="#fa5247"
            unique-opened
            router>

            <el-submenu :index="(index + 1) + ''" v-for="(menu,index) in menus" :key="index">
                <template slot="title">
                    <i class="menu.iconClass"></i>
                    <span>{{ menu.title }}</span>
                </template>

                <el-menu-item v-for="(submenu,index) in menu.children" :key="index" :index="submenu.path">{{ submenu.subTitle }}</el-menu-item> 
            </el-submenu>

        </el-menu>
    </div>
</template>

<script>
export default {
    data(){
        return {
            "menus":[]
        }
    },
    methods:{
        //发送请求
        getMenus(){
            this.request.get("/account/getmenus")
                .then(res=>{
                    this.menus=res.accessMenu;
                })
                .catch(err =>{
                    console.log(err)
                })
        }

    },
    created(){
       this.getMenus();
    }
}
</script>

<style lang="less">
@import "./leftNav.less";
</style>
