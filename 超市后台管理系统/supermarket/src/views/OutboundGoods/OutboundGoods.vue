<template>
    <div class="outboundgoods">
       <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>商品销售</span>
        </div>
        <div class="text item">
            <el-form :model="Form" status-icon :rules="rules" ref="Form" label-width="100px" class="demo-ruleForm" size="mini">
                <el-form-item label="商品条形码" prop="barcode" style="width:300px">
                    <el-input type="text" v-model="Form.barcode"></el-input>
                </el-form-item>
                <el-form-item label="数量" prop="quantity" style="width:300px">
                    <el-input type="text" v-model="Form.quantity"></el-input>
                    <span style="color:#ccc;font-size:14px;">记重商品单位为千克</span>
                </el-form-item>
            </el-form>
            <el-button type="success" size="mini">加入订单</el-button>
            <!-- 表格-->
            <div style="margin-top:20px;border-top:2px solid #ccc;">
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="name"
                    label="名称"
                    width="180">
                </el-table-column>

                <el-table-column
                    prop="quantity"
                    label="数量"
                    width="180">
                </el-table-column>

                <el-table-column
                    prop="unitPrice"
                    label="单价（元）">
                </el-table-column>

                <el-table-column
                    prop="totalPrice"
                    label="总价（元）">
                </el-table-column>

                <el-table-column
                    prop="preferentialPrice"
                    label="优惠总价（元）">
                </el-table-column>

              </el-table>
            </div>
            <div style="margin-top:20px;padding-bottom:10px;border-bottom:2px solid #ccc;">
                总价：0元，优惠：0元。 <span style="color:red">小计：0元</span>
            </div>
            <div style="margin-top:20px;">
                <el-form :model="data" size="mini">
                    <el-form-item label="会员卡号" prop="vipCardNumber" style="width:300px">
                         <el-input type="text" v-model="data.vipCardNumber"></el-input>
                         <span style="color:#ccc;font-size:14px;">填写会员卡卡号</span>
                    </el-form-item>
                </el-form>
            </div>
            <el-button type="success" size="mini">确认提交</el-button>
        </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data (){
        return {
            Form:{
                barcode:"",
                quantity:""
            },
            rules:{
               barcode:[
                   {required:true,message:"商品条形码不为空",trigger:"blur"}
               ],
              quantity:[
                   {required:true,message:"数量不为空",trigger:"blur"}
               ],               
            },
            tableData:[
                {
                  name:"哈哈哈",
                  quantity:"12",
                  unitPrice:"12.00",
                  totalPrice:"25.00",
                  preferentialPrice:"24.00"
                },
                 {
                  name:"哈哈哈",
                  quantity:"12",
                  unitPrice:"12.00",
                  totalPrice:"25.00",
                  preferentialPrice:"24.00"
                },
                 {
                  name:"哈哈哈",
                  quantity:"12",
                  unitPrice:"12.00",
                  totalPrice:"25.00",
                  preferentialPrice:"24.00"
                }
            ],
            data:{
                vipCardNumber:''
            }
            
        }
    },
    methods:{
       
    }
}
</script>

<style lang="less">
  @import "./outboundgoods.less";
</style>