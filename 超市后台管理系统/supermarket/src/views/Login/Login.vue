<template>
    <div class="login">
         <div class="login-box">
             <div class="title">
                 <span class="el-icon-tickets"></span>
                  华联超市后台管理系统
             </div>
            <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="账号" prop="account">
                    <el-input v-model="loginForm.account"></el-input>
                </el-form-item> 

               <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="loginForm.password" auto-complete="off"></el-input>
               </el-form-item>

                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="loginForm.checkPass" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item> 
            </el-form>
         </div>
    </div>
</template>

<script>
//引入验证密码的js文件
import { passwordReg } from "@/utils/validator";
//引入local
import local from "@/utils/local";
export default {
    data(){
        //自定义验证密码
        const checkPassword=(rule,value,callback)=>{//rule:验证规则对象  value：用户输入的值 callback:回调函数
            if(value === ""){//非空
                callback(new Error("请输入密码"))
            }else if(!passwordReg(value)){//正则验证
                callback(new Error("以字母开头，长度在3~6之间，只能包含字符、数字和下划线"));
            }else{
                if(this.loginForm.checkPass !== ""){//判断确认密码是否为空
                   //如果不为空，触发一致性验证
                   this.$refs.loginForm.validateField("checkPass");
                }
                callback();
            }
        }

        //自定义验证确认密码
        const confirmPassword=(rule,value,callback) => {
            if(value === ""){//验证非空
               callback(new Error("确认密码不能为空"))
            }else if(value !== this.loginForm.password){//验证一致性
               callback(new Error("两次密码不一致"))
            }else{
                callback();//验证成功
            }
        }
       return {
           //表单的数据
           loginForm:{
               account:"",
               password:"",
               checkPass:""
           },
           //表单的验证规则
           rules:{
               account:[//账号 内置验证
                   {required:true,message:"请输入账号",trigger:"blur"},//非空
                   {min: 3,max: 6,message:"账号长度为3~6位",trigger:"blur"}//验证长度
               ],
               password:[//密码
                    {required:true,validator:checkPassword,trigger:"blur"}//自定义验证
               ],
               checkPass:[
                   {required:true,validator:confirmPassword,trigger:"blur"}//自定义验证确认密码
               ]
           }
       }
      
    },
    methods:{
        submitForm(){
            //表单提交
            this.$refs.loginForm.validate(valid => {
                //如果通过前端的所有的验证，valid就为true,否则为false
                if(valid){
                    //提交数据给后台
                    let params ={
                        account:this.loginForm.account,
                        password:this.loginForm.password
                    }
                    //发送请求
                    this.request.post("/login/checklogin",params)
                        .then(res => {
                           //接收数据
                           let { code,result,token }=res;
                           if(code === 0){
                               local.save("y_l_10_12",token);
                               //弹成功提示
                               this.$message({type:"success",message:result})
                               //跳转
                               this.$router.push("./home")
                           }else if(code === 1){
                               this.$message.error(result);
                           }
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }else{
                    console.log("前端验证没通过，不允许提交");
                    return
                }
            })
        },
        resetForm(){
           //重置表单
           this.$refs.loginForm.resetFields();
        }
    }

}
</script>

<style lang="less">
  //引入登录样式
  @import "./login.less";
</style>
