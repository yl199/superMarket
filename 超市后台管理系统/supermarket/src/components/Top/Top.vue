<template>
    <div class="top">
        <el-row :gutter="20">
            <!-- 标题 -->
            <el-col :span="20">
                <h2 class="title">
                  <i class="el-icon-menu"></i>
                  华联超市管理系统
                </h2>
            </el-col>
            <!-- 头像和当前账号名 -->
            <el-col :span="4">
                <el-row :gutter="20">
                    <!--头像  -->
                    <el-col :span="8">
                        <div class="avatar">
                            <img width="100%" height="100%" :src="imgUrl" alt="">
                        </div>
                    </el-col>
                    <!--当前账号名-->
                    <el-col :span="16">
                        <el-dropdown @command="handleCommand">
                            <span class="el-dropdown-link">
                                {{account}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="personalCenter">个人中心</el-dropdown-item>
                                <el-dropdown-item command="logout">退出账号</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
//引入local
import local from "@/utils/local";

export default {
    data(){
        return {
            account:"",
            imgUrl:""
        }
    },
    methods:{
        handleCommand(command){
           if(command === "personalCenter"){
               //跳转个人中心
               this.$router.push("/home/personcenter")
           }else if(command === "logout"){
               //清除token
               local.remove("y_l_10_12")
               //跳转到登录页面
               this.$router.push("/");
           }
        },
         //获取当前账号名--请求
        getCurrentAccount(){
            this.request.get("/account/getaccountinfo")
                .then(res => {
                    let {account,img_url}=res[0];
                   this.account=account;
                   this.imgUrl=`http://127.0.0.1:888/${img_url}`
                })
                .catch(err =>{
                    console.log(err)
                })
        }
    },
   
    created(){
       //调用
        this.getCurrentAccount();
    }
}
</script>

<style lang="less">
  @import "./top.less";
</style>
