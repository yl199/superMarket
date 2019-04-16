<template>
    <div class="memberadd">
       <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>添加编辑账号</span>
            </div>
            <div class="text item">
                <el-form :model="memberAddForm" status-icon :rules="rules" ref="memberAddForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="真实姓名" prop="trueName">
                        <el-input type="text" v-model="memberAddForm.trueName"></el-input>
                    </el-form-item>

                    <el-form-item label="会员卡卡号" prop="membershipCardNumber">
                        <el-input type="text" v-model="memberAddForm.membershipCardNumber"></el-input>
                    </el-form-item>

                    <el-form-item label="用户组" prop="userGroup">
                        <el-select v-model="memberAddForm.userGroup" placeholder="请选择用户组">
                        <el-option label="普通会员-99%" value="普通会员-99%"></el-option>
                        <el-option label="高级会员" value="高级会员"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="身份证号" prop="idNumber">
                        <el-input v-model="memberAddForm.idNumber"></el-input>
                    </el-form-item>

                     <el-form-item label="用户状态" prop="userStatus">
                        <el-radio-group v-model="memberAddForm.userStatus">
                        <el-radio label="启用"></el-radio>
                        <el-radio label="禁用"></el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="手机号码" prop="telNumber">
                        <el-input v-model="memberAddForm.telNumber"></el-input>
                    </el-form-item>

                    <el-form-item label="座机号码" prop="landlineNumber">
                        <el-input v-model="memberAddForm.landlineNumber"></el-input>
                    </el-form-item>

                    <el-form-item label="邮箱地址" prop="emailAddress">
                        <el-input v-model="memberAddForm.emailAddress"></el-input>
                    </el-form-item>

                    <el-form-item label="地区选择" prop="areaSelection">
                        <el-select v-model="memberAddForm.province" placeholder="---请选择省份---">
                            <el-option
                            v-for="item in optionsProvince"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>

                        <el-select
                            v-model="memberAddForm.city"
                            collapse-tags
                            style="margin-left: 20px;"
                            placeholder="---请选择城市---">
                            <el-option
                            v-for="item in optionsCity"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="详细地址" prop="detailedAddress">
                        <el-input v-model="memberAddForm.emailAddress"></el-input>
                    </el-form-item>

                    <el-form-item label="邮政编码" prop="postalCode">
                        <el-input v-model="memberAddForm.postalCode"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm()">提交</el-button>
                        <el-button @click="resetForm()">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            </el-card>
    </div>
</template>

<script>
export default {
    data(){
       return {
            memberAddForm:{
                 trueName:"",  //真实姓名
                 membershipCardNumber:"",  //会员卡卡号
                 userGroup:"普通会员-99%",  //用户组
                 idNumber:"",    //身份证号
                 userStatus:"禁用",  //用户状态
                 telNumber:"",  //手机号码
                 landlineNumber:"",   //座机号码
                 emailAddress:"",   //邮箱地址
                 province:"",   //省份
                 city:"",  //城市
                 detailedAddress:"",  //详细地址
                 postalCode:""   //邮政编码 
            },
            rules:{
                 trueName:[{required:true,message:"真实姓名不能为空",trigger:"blur"}],
                 membershipCardNumber:[{required:true,message:"会员卡卡号不能为空",trigger:"blur"}],
                 userGroup:[{required:true,message:"用户组不能为空",trigger:"change"}]
            },
            //省份
            optionsProvince: [
                {
                value: '选项1',
                label: '四川省'
                }, 
                {
                value: '选项2',
                label: '重庆'
                }
                ],
            //城市
            optionsCity:[
                {
                value: '选项1',
                label: '四川省'
                }, 
                {
                value: '选项2',
                label: '重庆'
                } 
            ]
            
       }
    },
    methods:{
        submitForm(){
            this.$refs.memberAddForm.validate(valid => {
                if(valid){
                    let params={
                        trueName: this.memberAddForm.trueName,  //真实姓名
                        membershipCardNumber: this.memberAddForm.membershipCardNumber,  //会员卡卡号
                        userGroup: this.memberAddForm.userGroup,  //用户组
                        idNumber: this.memberAddForm. idNumber,    //身份证号
                        userStatus: this.memberAddForm.userStatus,  //用户状态
                        telNumber: this.memberAddForm.telNumber,  //手机号码
                        landlineNumber: this.memberAddForm.landlineNumber,   //座机号码
                        emailAddress: this.memberAddForm. emailAddress,   //邮箱地址
                        province: this.memberAddForm. province,   //省份
                        city: this.memberAddForm.city,  //城市
                        detailedAddress: this.memberAddForm.detailedAddresse,  //详细地址
                        postalCode: this.memberAddForm.postalCode   //邮政编码 
                    }

                    alert("添加成功！");
                    //跳转
                    this.$router.push("/home/membermanage");
                }else{
                    console.log("前端验证不通过，不允许提交");
                    return
                }
            })
        },
        resetForm(){
           this.$refs.memberAddForm.resetFields();
        }
    }
}
</script>

<style lang="less">
  @import "./memberadd.less";
</style>