<template>
    <div class="goodsreturn">
       <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>商品退货</span>
        </div>
        <div class="text item">
              <el-form :model="Form" status-icon ref="Form" label-width="100px" class="demo-ruleForm" size="mini">
                 <div style="display:inline-block;margin-right:20px;">
                    <el-form-item label="订单号" prop="orderNumber" style="width:300px">
                            <el-input type="text" v-model="Form.orderNumber"></el-input>
                    </el-form-item>
                </div>
                <el-button type="success" size="mini">查询</el-button>
            </el-form>
        </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data(){
        return {
            Form:{
               orderNumber:"" 
            }
        }
    }
}
</script>

<style lang="less">
  @import "./goodsreturn.less";
</style>