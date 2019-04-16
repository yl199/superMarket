<template>
    <div class="accountadd">
        <!-- 面板 -->
        <el-card class="box-card">
            <!-- 标题 -->
            <div slot="header" class="clearfix">
                <span>添加管理员账号</span>
            </div>
            <!-- 内容 -->
            <div class="text item">
                 <el-form :model="accountAddForm" status-icon :rules="rules" size="small" ref="accountAddForm" label-width="100px" class="demo-ruleForm">
                     <!-- 账号 -->
                    <el-form-item label="账号" prop="account">
                        <el-input v-model="accountAddForm.account"></el-input>
                    </el-form-item>
                    <!-- 密码 -->
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="accountAddForm.password" auto-complete="off"></el-input>
                    </el-form-item>
                    <!-- 确认密码 -->
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="accountAddForm.checkPass" auto-complete="off"></el-input>
                    </el-form-item>
                    <!-- 用户组 -->
                    <el-form-item label="选择用户组" prop="userGroup">
                        <el-select v-model="accountAddForm.userGroup" placeholder="请选择用户组">
                        <el-option label="超级管理员" value="超级管理员"></el-option>
                        <el-option label="普通管理员" value="普通管理员"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm()">添加</el-button>
                        <el-button @click="resetForm()">重置</el-button>
                    </el-form-item>
                 </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
//引入工具函数
import { passwordReg } from "@/utils/validator"
export default {
     data(){
         //自定义验证账号
         const checkAccount=(rule,value,callback) =>{
             let params={
                 newAccount:value
             }
             this.request.get("/account/checkaccount",params)
                 .then(res =>{
                     let{code,result}=res;
                     if(code===0){
                         callback();
                     }else if(code===1){
                         callback(new Error(result));
                     }
                 })
                 .catch(err =>{
                     console.log(err)
                 })
         }
         //自定义验证密码
         const checkPassword=(rule,value,callback) => {
             //非空验证
             if(value === "" ){
                 callback(new Error("密码不能为空"));
             }else if(!passwordReg(value)){//正则验证
                 callback(new Error("以字母开头，长度在3~6之间，只能包含字符、数字和下划线"));
             }else{
                 if(this.accountAddForm.checkPass !== "" ){
                     this.$refs.accountAddForm.validateField("checkPass");
                 }
                 callback();
             }
         }
         //自定义验证确认密码
         const comfirmPassword=(rule,value,callback) => {
             if(value === ""){
                 callback(new Error("确认密码不能为空"));
             }else if(value !== this.accountAddForm.password){//一致性验证
                 callback(new Error("两次密码不一致"));
             }else{
                 callback();
             }
         }
         return {
             //表单数据
             accountAddForm:{
                 account:'',
                 password:'',
                 checkPass:'',
                 userGroup:''
             },
             //规则
             rules:{
                account:[
                    {required:true,message:"请输入账号",trigger:"blur"},//非空
                    {min:3,max:6,message:"账号长度在3~6位",trigger:"blur"},//验证长度
                    {required:true,validator:checkAccount,trigger:"blur"}
                ],
                password:[
                    {required:true,validator:checkPassword,trigger:"blur"}//自定义验证
                ],
                checkPass:[
                     {required:true,validator:comfirmPassword,trigger:"blur"}//自定义验证
                ],
                userGroup:[
                    {required:true,message:"请选择用户组",trigger:"change"}//非空
                ]
             }
         }
     },
     methods:{
         //添加账号函数
         submitForm(){
            //表单提交
            this.$refs.accountAddForm.validate(valid => {
                if(valid){
                    let params={
                        account:this.accountAddForm.account,
                        password:this.accountAddForm.password,
                        userGroup:this.accountAddForm.userGroup
                    }
                    //发送请求
                    this.request.post("/account/addAccount",params)
                        .then(res => {
                            //接收响应的数据
                            let {code,result}=res;
                            //判断
                            if(code === 0){
                                 //弹出成功提示框
                                this.$message({
                                    type:"success",
                                    message:result
                                })
                                //跳转到账号管理页面
                                this.$router.push("/home/accountmanage");
                            }else if(code === 1){
                                this.$message.error(result);
                            }
                           
                        })
                        .catch(err =>{
                           console.log(err);
                        })
                    
                    
                }else{
                    console.log("前端验证不通过，不允许提交");
                    return
                }
            })
         },
         //重置
         resetForm(){
            this.$refs.accountAddForm.resetFields();
         }
     }
};
</script>

<style lang="less">
@import "./accountadd.less";
</style>