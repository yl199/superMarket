<template>
    <div class="membermanage">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>会员管理</span>
            </div>
            <div class="text item">
                <div style="border-bottom:1px solid #ccc;">
                   <el-form :model="memberManageForm" ref="memberManageForm" label-width="100px" class="demo-ruleForm">
                        <el-row>
                            <el-col :span="9">
                                    <el-form-item label="">
                                        搜索:
                                        <el-input v-model="memberManageForm.keyword"></el-input>
                                        (会员卡，会员名，电话，手机)
                                    </el-form-item> 
                            </el-col>
                             <el-col :span="15">
                                  <el-form-item label="">
                                    <el-button type="success" size="mini">查询</el-button>
                                 </el-form-item> 
                             </el-col>
                        </el-row>                                
                    </el-form>
                </div>
                 <!-- 表格信息 -->
                <el-table
                    ref="multipleTable"
                    :data="memberManageData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    stripe
                    @selection-change="handleSelectionChange">

                    <el-table-column
                    type="selection"
                    width="55">
                    </el-table-column>

                    <el-table-column
                    prop="membershipCardNumber"
                    label="会员卡卡号"
                    >
                    </el-table-column>

                     <el-table-column
                    prop="memberName"
                    label="会员姓名"
                    show-overflow-tooltip
                    >
                    </el-table-column>
                    
                    <el-table-column
                    prop="memberGrade"
                    label="会员等级"
                    show-overflow-tooltip
                    >
                    </el-table-column>

                    <el-table-column
                    prop="memberPoints"
                    label="会员积分"
                    show-overflow-tooltip
                    >
                    </el-table-column>

                    <el-table-column
                    prop="discount"
                    label="折扣"
                    show-overflow-tooltip
                    >
                    </el-table-column>

                    <el-table-column
                    prop="telNumber"
                    label="手机号"
                    show-overflow-tooltip
                    >
                    </el-table-column>

                     <el-table-column
                    prop="landlineNumber"
                    label="座机号"
                    show-overflow-tooltip
                    >
                    </el-table-column>

                     <el-table-column label="操作">
                        <template slot-scope="scope">
                            <!-- 修改 -->
                           <i class="el-icon-edit" style="margin-right:20px;color:green;font-size:18px;"></i>
                          
                            <!-- 删除 --> 
                           <i class="el-icon-delete" style="color:red;font-size:18px;"></i>
                           
                        </template>
                    </el-table-column>
                </el-table>
                 <!-- 分页 -->
                 <div style="margin-top:20px">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[1, 3, 5, 7]"
                        :page-size="3"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                   </el-pagination>
                </div>
                 <!-- 批量删除 -->
                <div style="margin-top: 20px">
                    <el-button type="success">批量删除</el-button>
                    <el-button type="primary">取消选择</el-button>
                </div>
                 
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data(){
       return {
           memberManageForm:{
               keyword:""
           },
           memberManageData:[
               {
                 membershipCardNumber:"123456",//会员卡卡号
                 memberName:"张三",//会员姓名
                 memberGrade:"铜牌等级",  //会员等级
                 memberPoints:"10",//会员积分
                 discount:"50%",//折扣
                 telNumber:"143256788",//手机号
                 landlineNumber:"00987999"  //座机号
               }
           ],
           total:17,
           currentPage:1
           
       }
    },
    methods:{
        handleSelectionChange(){

        },
        handleSizeChange(){

        },
        handleCurrentChange(){

        }
    }
    
}
</script>

<style lang="less">
  @import "./membermanage.less";
</style>