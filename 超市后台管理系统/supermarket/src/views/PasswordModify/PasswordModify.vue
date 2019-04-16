<template>
    <div class="passwordmodify">
        <el-card class="box-card">
            <!-- 标题 -->
            <div slot="header" class="clearfix">
                <span>修改账号密码</span>
            </div>
            <!-- 内容 -->
            <div class="text item">
                <el-form :model="passwordModifyForm" status-icon :rules="rules" size="small" ref="passwordModifyForm" label-width="100px" class="demo-ruleForm">

                    <el-form-item label="原密码" prop="oldPassword">
                        <el-input type="text" v-model="passwordModifyForm.oldPassword" auto-complete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="新密码" prop="newPassword">
                        <el-input type="text" v-model="passwordModifyForm.newPassword"></el-input>
                    </el-form-item>

                    <el-form-item label="确认新密码" prop="checkNewPass">
                        <el-input type="text" v-model="passwordModifyForm.checkNewPass" auto-complete="off"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="success" @click="editForm()">修改</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import { passwordReg } from "@/utils/validator"
import local from "@/utils/local"
export default {
    data(){
        //验证旧密码
        const checkOldPassword=(rule,value,callback) => {
            if(value === ""){
                callback(new Error("旧密码不能为空"));
            }else{
                  let params={
                      oldPassword:value
                  }
                  //发送请求
                  this.request.get("/account/checkoldpassword",params)
                      .then(res =>{
                         let{code,result}=res;
                         if(code === 0){
                             callback();
                         }else if(code === 1){
                             callback(new Error(result));
                         }
                      })
                      .catch(err => {
                          console.log(err);
                      })
            }
        }
        //验证新密码
        const checkNewPassword=(rule,value,callback) => {
            if(value === ""){//非空
                callback(new Error("新密码不能为空"));
            }else if(!passwordReg(value)){//长度
                callback(new Error("以字母开头，长度在3~6之间，只能包含字符、数字和下划线"));
            }else if(value === this.passwordModifyForm.oldPassword){
                 callback(new Error("新密码不能与旧密码相同"))
            }else{
                if(this.passwordModifyForm.checkNewPass !== ""){
                   this.$refs.passwordModifyForm.validateField("checkNewPass");
                }
                callback();
            }
        }

        //验证确认新密码
        const comfirmNewPassword=(rule,value,callback) => {
            if(value === ""){//非空
                callback(new Error("确认新密码不能为空"))
            }else if(value !== this.passwordModifyForm.newPassword){
                callback(new Error("两次密码不一致！"));
            }else{
                callback();
            }
        }
        return {
            passwordModifyForm:{
                oldPassword:"",
                newPassword:"",
                checkNewPass:""
            },
            rules:{
               oldPassword:[
                 {required:true,validator:checkOldPassword,trigger:"blur"}
               ],
               newPassword:[
                   {required:true,validator:checkNewPassword,trigger:"blur"}
               ],
               checkNewPass:[
                   {required:true,validator:comfirmNewPassword,trigger:"blur"} 
               ]
            }      
        }
    },
    methods:{
        editForm(){
           this.$refs.passwordModifyForm.validate(valid => {
               if(valid){
                   //收集新密码
                   let params={
                       newPassword:this.passwordModifyForm.newPassword
                   }
                   //发送请求
                   this.request.post("/account/savenewpassword",params)
                       .then(res => {
                          let {code,result}=res;
                          if(code === 0){
                              this.$message({
                                  type:"success",
                                  message:result
                              })
                              //清除token
                              local.remove("y_l_10_12");
                              //跳转到登录页面
                              this.$router.push("/login")
                          }else if(code === 1){
                              this.$message.error(result);
                          }
                       })
                       .catch(err => {
                           console.log(err);
                       })

               }else{
                   return
               }
           })
        }
    }
}
</script>

<style lang="less">
  @import "./passwordmodify.less";
</style>