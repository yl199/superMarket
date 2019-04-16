<template>
    <div class="systeminfo">
        <el-card class="box-card">
            <!-- 标题 -->
            <div slot="header" class="clearfix">
                <span>系统信息</span>
            </div>
            <div class="text item">
                <el-alert
                    title="商品总数：5。已经销售的总金额：890.00。库存商品总价：1235.82"
                    type="info"
                     show-icon>
                </el-alert>
                <div style="margin-top:20px">
                     <el-alert
                        title="导入数据"
                        type="info"
                        show-icon>
                    </el-alert>
                </div>
                <!-- 表格信息 -->
                <div style="margin-top:20px">
                    <el-row :gutter="20">
                        <!-- 销售排行 -->
                        <el-col :span="12">
                           <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span>销售排行</span>
                                </div>
                                <div class="text item">
                                    <el-table
                                        :data="salesRankingTable"
                                        style="width: 100%"
                                        stripe>
                                    
                                        <el-table-column
                                            prop="goodsName"
                                            label="商品名称"
                                            >
                                        </el-table-column>

                                        <el-table-column
                                            prop="salesVolume"
                                            label="销量"
                                        >
                                        </el-table-column>

                                    </el-table>
                                </div>
                            </el-card>
                        </el-col>
                        <!-- 缺货的商品 -->
                        <el-col :span="12">
                           <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span>缺货的商品</span>
                                </div>
                                <div class="text item">
                                    <el-table
                                        :data="stockoutTable"
                                        style="width: 100%"
                                        stripe>
                                    
                                        <el-table-column
                                            prop="stockoutGoodsName"
                                            label="商品名称"
                                            >
                                        </el-table-column>

                                        <el-table-column
                                            prop="inventory"
                                            label="库存"
                                        >
                                        </el-table-column>
                                        
                                         <el-table-column label="操作">
                                            <template slot-scope="scope">
                                                <el-button
                                                size="mini"
                                                type="danger"
                                                @click="putInStorage()">入库</el-button>
                                            </template>
                                          </el-table-column>
                                    </el-table>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                </div>
               
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data(){
        return {
           salesRankingTable:[
               {
                  goodsName:"海飞丝" ,
                  salesVolume:5
               },
               {
                  goodsName:"海飞丝" ,
                  salesVolume:5
               },
           ],
           stockoutTable:[
               {
                 stockoutGoodsName:"优乐美",
                 inventory:0
               }
           ]
        }
    },
    methods:{
        //入库
        putInStorage(){

        }
    }
};
</script>

<style lang="less">
@import "./systeminfo.less";
</style>