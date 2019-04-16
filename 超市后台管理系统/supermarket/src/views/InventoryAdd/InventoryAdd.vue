<template>
    <div class="inventoryadd">
       <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>商品入库</span>
            </div>
            <div class="text item">
                <el-form :model="inventoryAddForm" status-icon :rules="rules" ref="inventoryAddForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="商品条形码" prop="barcode">
                        <el-input type="text" v-model="inventoryAddForm.barcode"></el-input>
                    </el-form-item>

                     <el-form-item label="商品名称" prop="goodsName">
                        <el-input type="text" v-model="inventoryAddForm.goodsName"></el-input>
                    </el-form-item>

                     <el-form-item label="所属分类" prop="classify">
                        <el-select v-model="inventoryAddForm.classify" placeholder="---选择分类---">                                          
                            <el-option label="服装类" value="服装类"></el-option>
                            <el-option label="食品类" value="食品类"></el-option>
                            <el-option label="电子类" value="电子类"></el-option>
                            <el-option label="水果类" value="水果类"></el-option>
                        </el-select>
                    </el-form-item>  

                    <el-form-item label="库存数量" prop="quantity">
                        <el-input v-model="inventoryAddForm.quantity"></el-input>
                        <p style="font-size:12px;color:#666;line-height:10px;">记重商品单位为千克</p>
                    </el-form-item>

                    <el-form-item label="入库" prop="putStorage">
                        <el-input type="text" v-model="inventoryAddForm.putStorage"></el-input>
                    </el-form-item>

                     <el-form-item label="已售" prop="sold">
                        <el-input type="text" v-model="inventoryAddForm.sold"></el-input>
                    </el-form-item>

                    <el-form-item label="进价" prop="purchasingPrice">
                        <el-input v-model="inventoryAddForm.purchasingPrice"></el-input><span style="margin-left:5px;">元</span>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm()">入库</el-button>
                        <el-button @click="resetForm()">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import { priceReg,quantityReg } from "@/utils/validator"
export default {
    data(){
         //自定义验证数量
        const checkQuantity=(rule,value,callback)=>{
          if(!quantityReg(value)){
                callback(new Error("只能为整数"))
            }else{
                callback();
            }
        }
          //自定义验证价格
        const checkPrice=(rule,value,callback)=>{
          if(!priceReg(value)){
                callback(new Error("价格保留两位小数"))
            }else{
                callback();
            }
        }
        return {
            inventoryAddForm:{
                barcode:"",
                goodsName:"",
                classify:"",
                putStorage:"",
                quantity:"",
                sold:"",
                purchasingPrice:""
            },
            rules:{
                barcode:[
                    {required:true,message:"条形码不能为空",trigger:"blur"}
                ],
                goodsName:[
                     {required:true,message:"商品名称不能为空",trigger:"blur"},
                ],
                classify:[
                    {required:true,message:"所属分类不能为空",trigger:"blur"},
                ],
                quantity:[
                   {required:true,message:"库存数量不能为空",trigger:"blur"},
                   {required:true,validator:checkQuantity,trigger:"blur"}
                ],
                purchasingPrice:[
                   {required:true,message:"进价不能为空",trigger:"blur"},
                   {required:true,validator:checkPrice,trigger:"blur"}
                ],
                putStorage:[
                    {required:true,message:"入库数量不能为空",trigger:"blur"},
                   {required:true,validator:checkQuantity,trigger:"blur"}
                ],
                sold:[
                     {required:true,message:"已售不能为空",trigger:"blur"},
                     {required:true,validator:checkQuantity,trigger:"blur"}
                 ]
            }
        }
    },
    methods:{
        submitForm(){
                //表单提交
                this.$refs.inventoryAddForm.validate(valid => {
                    if(valid){
                        let params={
                            barcode:this.inventoryAddForm.barcode,
                            goodsName:this.inventoryAddForm.goodsName,
                            classify:this.inventoryAddForm.classify,
                            putStorage:this.inventoryAddForm.putStorage,
                            sold:this.inventoryAddForm.sold,
                            quantity:this.inventoryAddForm.quantity,
                            purchasingPrice:this.inventoryAddForm.purchasingPrice
                        }
                        //发送请求
                        this.request.post("/inventory/inventoryadd",params)
                             .then(res => {
                                let {code,result}=res;
                                if(code === 0){
                                    //弹成功提示
                                    this.$message({
                                        type:"success",
                                        message:result
                                    })
                                    //跳转
                                    this.$router.push("/home/inventorymanage")
                                }else if(code === 1){
                                    this.$message.error(result);
                                }
                             })
                             .catch(err => {
                                 console.log(err);
                             })
                    }else{
                        console.log("前端验证不通过，不允许提交");
                        return
                    }
                })
        },
        resetForm(){
             this.$refs.inventoryAddForm.resetFields();
        }
    }
}
</script>

<style lang="less">
  @import "./inventoryadd.less";
</style>