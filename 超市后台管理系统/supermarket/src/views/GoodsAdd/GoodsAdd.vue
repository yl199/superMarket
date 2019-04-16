<template>
    <div class="goodsadd">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>添加商品</span>
            </div>
            <div class="text item">
                <el-form :model="goodsAddForm" status-icon :rules="rules" size="small" ref="goodsAddForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="所属分类" prop="classify">
                        <el-select v-model="goodsAddForm.classify" placeholder="---选择分类---">
                        <el-option label="服装类" value="服装类"></el-option>
                        <el-option label="食品类" value="食品类"></el-option>
                        <el-option label="电子类" value="电子类"></el-option>
                        <el-option label="水果类" value="水果类"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="商品条形码" prop="barcode">
                        <div style="width:300px;display:inline-block;margin-right:5px;"> <el-input type="text" v-model="goodsAddForm.barcode"></el-input></div>
                        <el-button size="mini" type="success" @click="generateBarcode">生成条形码</el-button>
                    </el-form-item>

                    <el-form-item label="商品名称" prop="goodsName">
                        <div class="changeWidth">
                           <el-input v-model="goodsAddForm.goodsName"></el-input>
                        </div>    
                    </el-form-item>

                     <el-form-item label="商品售价" prop="goodsSellingPrice">
                         <div class="changeWidth">
                              <el-input v-model="goodsAddForm.goodsSellingPrice"></el-input> 
                         </div>
                         元<p class="textMessage">默认市场价为售价的1.2倍</p>
                    </el-form-item>
 
                     <el-form-item label="市场价" prop="marketPrice">
                         <div class="changeWidth">
                               <el-input v-model="goodsAddForm.marketPrice"></el-input>
                         </div>元
                      
                    </el-form-item>
                    
                    <el-form-item label="商品进价" prop="goodsPurchasingPrice">
                        <div class="changeWidth">
                             <el-input v-model="goodsAddForm.goodsPurchasingPrice"></el-input>
                        </div>元
                       
                    </el-form-item>
                    
                     <el-form-item label="入库数量" prop="inventoryQuantity">
                         <div class="changeWidth">
                             <el-input v-model="goodsAddForm.inventoryQuantity"></el-input>
                         </div>
                          <p class="textMessage">记重商品单位为千克</p>
                    </el-form-item>
                    
                    <el-form-item label="商品重量" prop="goodsWeight">
                        <div class="changeWidth">
                            <el-input v-model="goodsAddForm.goodsWeight"></el-input>
                        </div>
                        
                    </el-form-item>

                    <el-form-item label="商品单位" prop="goodsUnit">
                        <div class="changeWidth">
                            <el-input v-model="goodsAddForm.goodsUnit"></el-input>
                        </div>
                    </el-form-item>

                     <el-form-item label="会员优惠" prop="preferentialEnjoy">
                        <el-radio-group v-model="goodsAddForm.preferentialEnjoy">
                        <el-radio label="享受"></el-radio>
                        <el-radio label="不享受"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    
                     <el-form-item label="是否促销" prop="isPromotion">
                        <el-radio-group v-model="goodsAddForm.isPromotion">
                        <el-radio label="启用"></el-radio>
                        <el-radio label="禁用"></el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="商品简介" prop="goodsIntroduction">
                        <el-input type="textarea" v-model="goodsAddForm.goodsIntroduction"></el-input>
                        <p class="textMessage">不得超过200字</p>
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
import { priceReg,quantityReg } from "@/utils/validator"
export default {
    data(){
        //自定义验证价格
        const checkPrice=(rule,value,callback)=>{
            if(value ===""){
                callback(new Error("商品售价不能为空"))
            }else if(!priceReg(value)){
                callback(new Error("价格保留两位小数"))
            }else{
                callback();
            }
        }
        //自定义验证数量
        const checkQuantity=(rule,value,callback)=>{
            if(value ===""){
                callback(new Error("商品售价不能为空"))
            }else if(!quantityReg(value)){
                callback(new Error("只能为整数"))
            }else{
                callback();
            }
        }
        return {
            goodsAddForm:{
                classify:"",//所属分类
                barcode:"",//商品条形码
                goodsName:"",//商品名称
                goodsSellingPrice:"",//商品售价
                marketPrice:"",//市场价
                goodsPurchasingPrice:"",//商品进价
                inventoryQuantity:"",//入库数量
                goodsWeight:"",//商品重量
                goodsUnit:"",//商品单位
                preferentialEnjoy:"享受",//会员优惠
                isPromotion:"禁用",//是否促销
                goodsIntroduction:"",//商品简介
            },
            rules:{
                 classify:[
                     {required:true,message:"所选分类不能为空",trigger:"change"}
                 ],
                 barcode:[
                     {required:true,message:"商品条形码不能为空",trigger:"change"}
                 ],
                 goodsName:[
                     {required:true,message:"商品名称不能为空",trigger:"blur"}
                  ],
                 goodsSellingPrice:[
                      {required:true,validator:checkPrice,trigger:"blur"}
                 ],
                 marketPrice:[
                      {required:true,validator:checkPrice,trigger:"blur"}
                 ],
                 goodsPurchasingPrice:[
                      {required:true,validator:checkPrice,trigger:"blur"}
                 ],
                 inventoryQuantity:[
                     {required:true,validator:checkQuantity,trigger:"blur"}
                 ]
            }
        }
    },
    methods:{
        submitForm(){
            this.$refs.goodsAddForm.validate(valid => {
                if(valid){
                    let params={
                         classify:this.goodsAddForm.classify,//所属分类
                         barcode:this.goodsAddForm.barcode,//商品条形码
                         goodsName:this.goodsAddForm.goodsName,//商品名称
                         goodsSellingPrice:this.goodsAddForm.goodsSellingPrice,//商品售价
                         marketPrice:this.goodsAddForm.goodsSellingPrice*1.2,//市场价
                         goodsPurchasingPrice:this.goodsAddForm.goodsPurchasingPrice,//商品进价
                         inventoryQuantity:this.goodsAddForm.inventoryQuantity,//入库数量
                         goodsWeight:this.goodsAddForm.goodsWeight,//商品重量
                         goodsUnit:this.goodsAddForm.goodsUnit,//商品单位
                         preferentialEnjoy:this.goodsAddForm.preferentialEnjoy,//会员优惠
                         isPromotion:this.goodsAddForm.isPromotion,//是否促销
                         goodsIntroduction:this.goodsAddForm.goodsIntroduction//商品简介
                    }
                    //发送请求
                    this.request.post("/goods/addGoods",params)
                        .then(res => {
                            //接收数据
                            let {code,result} =res;
                            if(code === 0){
                                this.$message({type:"success",message:result})
                                //跳转到商品管理
                                this.$router.push("/home/goodsmanage");
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
            this.$refs.goodsAddForm.resetFields();
        },
        generateBarcode(){
            var code="";
            for(var i=0;i<10;i++){
                code+=Math.floor(Math.random()*10);
            }
            this.goodsAddForm.barcode=code;
        }
    }
}
</script>

<style lang="less">
  @import "./goodsadd.less";
</style>