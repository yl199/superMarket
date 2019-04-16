<template>
    <div class="saleslist">
       <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>销售明细</span>
        </div>
        <div class="text item">
            <!-- 时间选择 -->
           <div>
                 <span>开始时间：</span>
                <el-date-picker
                    v-model="value1"
                    type="date"
                    size="small"
                    placeholder="选择日期"
                    default-value="2010-10-01">
                </el-date-picker>
                <span style="margin-left:20px;">结束时间：</span>
                  <el-date-picker
                    v-model="value2"
                    type="date"
                    size="small"
                    placeholder="选择日期"
                    default-value="2010-10-01">
                </el-date-picker>
                <span style="color:#ccc;font-size:14px;">(格式：2010-01-01)</span>
           </div>
           <!-- 关键字 -->
           <div style="margin-top:20px" class="keyword">
               <span>关键字：</span>
               <div style="display:inline-block;"><el-input v-model="input" placeholder="请输入内容"></el-input></div>
               <span style="margin-left:10px;color:#ccc;font-size:14px;">商品名称，订单号，客户名字，会员卡号</span>
                <el-button type="success" size="mini" style="margin-left:20px;">查询</el-button>
           </div>
           <!-- 表格 -->
           <div style="margin-top:20px;border-top:2px solid #ccc">
               <el-table
                    :data="salesAccountData"
                    stripe
                    style="width: 100%">
                    <el-table-column
                    prop="orderNumber"
                    label="订单号"
                    width="180">
                    </el-table-column>

                    <el-table-column
                    prop="name"
                    label="名称"
                    width="180">
                    </el-table-column>

                    <el-table-column
                    prop="quantity"
                    label="数量">
                    </el-table-column>

                    <el-table-column
                    prop="actualPrice"
                    label="实际售价">
                    </el-table-column>

                    <el-table-column
                    prop="discounts"
                    label="优惠(促销/会员)">
                    </el-table-column>

                    <el-table-column
                    prop="refund"
                    label="退款">
                    </el-table-column>

                    <el-table-column
                    prop="sellingTime"
                    label="销售时间">
                    </el-table-column>
                </el-table>
           </div>
           <div style="margin-top:20px;">
                 <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
                </el-pagination>
           </div>
        </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data (){
        return {
            value1: "",
            value2:"",
            input:"",
            salesAccountData:[],
            currentPage:1,
        }
    },
    methods:{
        handleSizeChange(){

        },
        handleCurrentChange(){

        }
    }
}
</script>

<style lang="less">
  @import "./saleslist.less";
</style>