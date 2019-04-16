<template>
    <div class="stocktotal">
       <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>进货数据统计</span>
            </div>
            <div class="text item">
              <el-form ref="form" :model="stockForm">
                <el-row>
                        <el-col :span="8">
                            <el-form-item label="活动时间">
                                <el-col :span="11">
                                <el-date-picker type="date" placeholder="选择日期" v-model="stockForm.startDate" style="width: 100%;"></el-date-picker>
                                </el-col>
                                <el-col class="line" :span="2">-</el-col>
                                <el-col :span="11">
                                <el-date-picker type="date" placeholder="选择日期" v-model="stockForm.endDate" style="width: 100%;"></el-date-picker>
                                </el-col>
                            </el-form-item>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item>
                                <el-button type="success" @click="onSubmit" size="mini">提交</el-button>
                            </el-form-item>
                        </el-col>
                </el-row>
              </el-form>
              <div id="box" style="height:400px"></div>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
      data(){
         return {
            stockForm:{
                startDate:"",
                endDate:"",
                salesStatus:""
            }
        }
    },
    methods:{
       onSubmit(){

       },
       getChart(categoryData,value){
           //初始化
           let mychart=this.echarts.init(document.getElementById("box"));

           //配置
           let option={
                tooltip: {
                    show: true
                },
                legend: {
                    data:['销量']
                },
                xAxis : [
                    {
                        type : 'category',
                        data : categoryData
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        "name":"销量",
                        "type":"line",
                        "data":value
                    }
                ]
           }

           //使用配置生成报表
           mychart.setOption(option)
       }
    },
    //生命周期钩子函数 mounted 适合操作dom
    mounted(){
        let res={
            categoryData:["2019-02-01","2019-02-02","2019-02-03","2019-02-04","2019-02-05"],
            value:[20,100,300,210,120]
        }
        let {categoryData,value}=res;
        //调用生成报表的函数
        this.getChart(categoryData,value);
    }
}

</script>

<style lang="less">
  @import "./stocktotal.less";
</style>