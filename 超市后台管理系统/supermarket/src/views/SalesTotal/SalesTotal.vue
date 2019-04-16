<template>
    <div class="salestotal">
       <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>销售数据统计</span>
            </div>
            <div class="text item">
              <el-form ref="form" :model="sellingTimeForm">
                <el-row>
                        <el-col :span="8">
                            <el-form-item label="活动时间">
                                <el-col :span="11">
                                <el-date-picker type="date" placeholder="选择日期" v-model="sellingTimeForm.startDate" style="width: 100%;"></el-date-picker>
                                </el-col>
                                <el-col class="line" :span="2">-</el-col>
                                <el-col :span="11">
                                <el-date-picker type="date" placeholder="选择日期" v-model="sellingTimeForm.endDate" style="width: 100%;"></el-date-picker>
                                </el-col>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                             <el-form-item>
                                <el-select v-model="sellingTimeForm.salesStatus" placeholder="销售情况统计">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item>
                                <el-button type="success" @click="onSubmit" size="mini">提交</el-button>
                            </el-form-item>
                        </el-col>
                </el-row>
              </el-form>
              <!-- 报表 -->
              <div id="box" style="height:400px;">

              </div>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
     data(){
         return {
            sellingTimeForm:{
                startDate:"",
                endDate:"",
                salesStatus:""
            }
        }
    },
    methods:{
       onSubmit(){

       },
       //生成报表
       getChart(categoryData,value){
           //选中dom容器，初始化
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
           mychart.setOption(option);
       }
    },
    //生命周期钩子函数 mounted 适合操作dom
    mounted(){
        let res={
            categoryData:["2019-04-01","2019-04-02","2019-04-03","2019-04-04","2019-04-05","2019-04-06"],
            value:[100,300,350,400,120,50]
        }

        let {categoryData,value}=res;
        this.getChart(categoryData,value);
    }
}
</script>

<style lang="less">
  @import "./salestotal.less";
</style>