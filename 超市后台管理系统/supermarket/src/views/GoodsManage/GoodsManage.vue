<template>
    <div class="goodsmanage">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>商品管理</span>
            </div>
            <div class="text item">
                <div style="border-bottom:1px solid #ccc;">
                   <el-form :model="goodsManageForm" ref="goodsManageForm" label-width="100px" class="demo-ruleForm">
                        <el-row :gutter="20">
                            <el-col :span="4">
                                    <el-form-item>
                                        <el-select v-model="goodsManageForm.classify" placeholder="---选择分类---">
                                            <el-option label="全部" value="全部"></el-option>                                            
                                            <el-option label="服装类" value="服装类"></el-option>
                                            <el-option label="食品类" value="食品类"></el-option>
                                            <el-option label="电子类" value="电子类"></el-option>
                                            <el-option label="水果类" value="水果类"></el-option>
                                        </el-select>
                                    </el-form-item>  
                            </el-col>
                            <el-col :span="8">
                                    <el-form-item label="">
                                        关键字:
                                        <el-input v-model="goodsManageForm.keyword"></el-input>
                                        (商品名称，条形码)
                                    </el-form-item> 
                            </el-col>
                             <el-col :span="12">
                                  <el-form-item label="">
                                    <el-button type="success" size="mini" @click="search">查询</el-button>
                                 </el-form-item> 
                             </el-col>
                        </el-row>                                
                    </el-form>
                </div>
                 <!-- 表格信息 -->
                <el-table
                    ref="GoodsTable"
                    :data="goodsManageData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">

                    <el-table-column
                    type="selection"
                    width="55">
                    </el-table-column>

                    <el-table-column
                    prop="barcode"
                    label="商品条形码"
                    >
                    </el-table-column>

                     <el-table-column
                    prop="goods_name"
                    label="商品名称"
                    show-overflow-tooltip
                    >
                    </el-table-column>

                   <el-table-column
                    prop="classify"
                    label="所属分类"
                    show-overflow-tooltip
                    >
                    </el-table-column>
                    
                    <el-table-column
                    prop="sellingprice"
                    label="售价（元）"
                    show-overflow-tooltip
                    >
                    </el-table-column>

                    <el-table-column
                    prop="marketprice"
                    label="市场价（元）"
                    show-overflow-tooltip
                    >
                    </el-table-column>

                     <el-table-column
                    prop="ispromotion"
                    label="是否促销"
                    show-overflow-tooltip
                    >
                    </el-table-column>

                    <el-table-column
                    prop="preferentialenjoy"
                    label="会员优惠"
                    show-overflow-tooltip
                    >
                    </el-table-column>

                     <el-table-column
                    prop="inventoryquantity"
                    label="库存"
                    show-overflow-tooltip
                    width="60">
                    </el-table-column>


                     <el-table-column label="操作">
                        <template slot-scope="scope">
                            <!-- 修改 -->
                           <i class="el-icon-edit" @click="editGoods(scope.row.id)" style="margin-right:20px;color:green;font-size:18px;"></i>
                          
                            <!-- 删除 --> 
                           <i class="el-icon-delete" @click="delGoods(scope.row.id)" style="color:red;font-size:18px;"></i>
                           
                        </template>
                    </el-table-column>
                </el-table>

                 <!-- 修改数据的模态框 -->
                <el-dialog title="商品修改" :visible.sync="dialogFormVisible" width="600px">
                    <el-form :model="editGoodsForm" ref="editGoodsForm" :rules="rules">

                         <el-form-item label="商品条形码" prop="barcode">
                            <div style="-width:300px;display:inline-block;margin-right:5px;"> <el-input type="text" v-model="editGoodsForm.barcode"></el-input></div>
                            <el-button size="mini" type="success" @click="generateBarcode">生成条形码</el-button>
                        </el-form-item>

                       <el-form-item label="商品名称" prop="goodsName">
                        <div class="changeWidth" style="width:100px;display:inline-block;margin-right:5px;">
                           <el-input v-model="editGoodsForm.goodsName"></el-input>
                        </div>    
                      </el-form-item>

                       <el-form-item label="所属分类" prop="classify">
                        <el-select v-model="editGoodsForm.classify" placeholder="---选择分类---">
                            <el-option label="全部" value="全部"></el-option>                                            
                            <el-option label="服装类" value="服装类"></el-option>
                            <el-option label="食品类" value="食品类"></el-option>
                            <el-option label="电子类" value="电子类"></el-option>
                            <el-option label="水果类" value="水果类"></el-option>
                        </el-select>
                       </el-form-item>

                        <el-form-item label="商品售价" prop="goodsSellingPrice">
                         <div class="changeWidth" style="width:100px;display:inline-block;margin-right:5px;">
                              <el-input v-model="editGoodsForm.goodsSellingPrice"></el-input> 
                         </div>
                         元<p class="textMessage" style="font-size:12px;color:#ccc;line-height:10px;margin-left:60px;">默认市场价为售价的1.2倍</p>
                       </el-form-item>

                       <el-form-item label="市场价" prop="marketPrice">
                         <div class="changeWidth" style="width:100px;display:inline-block;-margin-right:5px;">
                               <el-input v-model="editGoodsForm.marketPrice"></el-input>
                         </div>元
                      
                       </el-form-item>

                        <el-form-item label="是否促销" prop="isPromotion">
                            <el-radio-group v-model="editGoodsForm.isPromotion">
                            <el-radio label="启用"></el-radio>
                            <el-radio label="禁用"></el-radio>
                            </el-radio-group>
                        </el-form-item>

                         <el-form-item label="会员优惠" prop="preferentialEnjoy">
                            <el-radio-group v-model="editGoodsForm.preferentialEnjoy">
                            <el-radio label="享受"></el-radio>
                            <el-radio label="不享受"></el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item label="入库数量" prop="inventoryQuantity">
                            <div class="changeWidth" style="width:100px;display:inline-block;margin-right:5px;">
                                <el-input v-model="editGoodsForm.inventoryQuantity"></el-input>
                            </div>
                            <p class="textMessage" style="font-size:12px;color:#ccc;line-height:10px;margin-left:60px;">记重商品单位为千克</p>
                        </el-form-item>

                    </el-form>
                    <div slot="footer" class="dialog-footer" style="width:250px">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="saveEditGoods">确 定</el-button>
                    </div>
                </el-dialog>

                 <!-- 分页 -->
                 <div style="margin-top:20px">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[1, 3, 5, 7]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                   </el-pagination>
                </div>
                 <!-- 批量删除 -->
                <div style="margin-top: 20px">
                    <el-button type="success" @click="batchDel">批量删除</el-button>
                    <el-button type="primary" @click="cancelSelect">取消选择</el-button>
                </div>
                 
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data(){
       return {
           goodsManageForm:{
               classify:"",
               keyword:""
           },
           goodsManageData:[],
           total:17,
           currentPage:1,
           pageSize:3,
           editGoodsForm:{
               barcode:"",
               goodsName:"",
               classify:"",
               goodsSellingPrice:"",
               marketPrice:"",
               isPromotion:"禁用",
               preferentialEnjoy:"享受",
               inventoryQuantity:""
           },
           dialogFormVisible:false,
           rules:{
               classify:[
                     {required:true,message:"所选分类不能为空",trigger:"change"}
                 ],
                 barcode:[
                     {required:true,message:"商品条形码不能为空",trigger:"blur"}
                 ],
                 goodsName:[
                     {required:true,message:"商品名称不能为空",trigger:"blur"}
                  ],
                 goodsSellingPrice:[
                      {required:true,message:"商品售价不能为空",trigger:"blur"}
                 ]
           },
           editId:"",//原来的id
           selectId:[] //选中的id

       }
    },
    methods:{
        //分页函数
        getGoodsByPage(){
            //收集数据
            let params={
                pageSize:this.pageSize,
                currentPage:this.currentPage,
                classify:this.goodsManageForm.classify,
                keyword:this.goodsManageForm.keyword
            }
            //发送请求
            this.request.get("/goods/changeGoodsPage",params)
                .then(res => {
                   //接收数据
                   let { total,data }=res;
                   this.total=total;
                   this. goodsManageData=data;

                   //如果这一页没有数据，自动跳转上一页
                   if(!data.length && this.currentPage !== 1){
                       //自动跳转上一页
                       this.currentPage-=1;
                       //调用分页函数
                      this.getGoodsByPage();
                   }
                })
                .catch(err => {
                    console.log(err);
                })
        },
        //每页的总条数
        handleSizeChange(val){
          //将每页的条数赋值给pageSize
          this.pageSize=val;
           //调用分页函数
          this.getGoodsByPage();
        },
        //当前页码
        handleCurrentChange(val){
          //将每页的条数赋值给currentPage
          this.currentPage=val;
           //调用分页函数
           this.getGoodsByPage();
        },
        //删除商品
        delGoods(id){
            let params={
                id
            }
             this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() =>{
                        //发送请求
                        this.request.get("/goods/delgoods",params)
                            .then(res => {
                                 //接收后端返回的数据
                                 let { code,result }=res;
                                 if(code === 0){
                                     //弹成功提示
                                     this.$message({type:"success",message:result})
                                     //刷新页面
                                     this.getGoodsByPage();
                                 }else if(code === 1){
                                     //弹失败页面
                                     this.$message.error(result);
                                 }  
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                    });
           
        },
         //模态框中的商品条形码
        generateBarcode(){
            var code="";
            for(var i=0;i<6;i++){
                code+=Math.floor(Math.random()*10);
            }
            this.editGoodsForm.barcode=code;
        },
        //修改商品信息(数据回填)
        editGoods(id){
           this.dialogFormVisible=true;
           this.editId=id;
           //收集数据
           let params={
               id
           }
           //发送请求
           this.request.get("/goods/editgoods",params)
               .then(res => {
                    this.editGoodsForm.barcode=res[0].barcode;
                    this.editGoodsForm.goodsName=res[0].goods_name;
                    this.editGoodsForm.classify=res[0].classify;
                    this.editGoodsForm.goodsSellingPrice=res[0].sellingprice;
                    this.editGoodsForm.marketPrice=res[0].marketprice;
                    this.editGoodsForm.isPromotion=res[0].ispromotion;
                    this.editGoodsForm.preferentialEnjoy=res[0].preferentialenjoy;
                    this.editGoodsForm.inventoryQuantity=res[0].inventoryquantity;
               }) 
               .catch(err => {
                   console.log(err);
               })
        },
        //修改商品(保存新数据)
        saveEditGoods(){
            //前端验证通过判断
            this.$refs.editGoodsForm.validate(valid =>{
                if(valid){
                    this.dialogFormVisible=false;
                      //收集数据
                        let params={
                            barcode:this.editGoodsForm.barcode,
                            goodsName:this.editGoodsForm.goodsName,
                            classify:this.editGoodsForm.classify,
                            goodsSellingPrice:this.editGoodsForm.goodsSellingPrice,
                            marketPrice:this.editGoodsForm.marketPrice,
                            isPromotion:this.editGoodsForm.isPromotion,
                            preferentialEnjoy:this.editGoodsForm.preferentialEnjoy,
                            inventoryQuantity:this.editGoodsForm.inventoryQuantity,
                            editId:this.editId
                        }
                    //发送请求
                    this.request.post("/goods/savaeditgoods",params)
                        .then(res => {
                          //接收数据
                            let {code,result} =res;
                            if(code === 0){
                                this.$message({type:"success",message:result})
                                //刷新页面
                                this.getGoodsByPage();
                                
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
         //被选中的选择框
        handleSelectionChange(val){
            this.selectId=val.map(v => v.id);
        },
        //批量删除
        batchDel(){
         //判断
         if(!this.selectId.length){
             this.$message.error("请先选择后，再批量删除");
             return
         }
          let params={
              selectId:this.selectId
          }
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    //发送请求
                    this.request.get("/goods/batchdel",params)
                        .then(res => {
                            //接收后台响应的数据
                            let { code,result }=res;
                            //判断
                            if(code === 0){
                            //弹成功提示信息
                            this.$message({type:"success",message:result});
                            //刷新页面
                                this.getGoodsByPage();
                            }else if(code === 1){
                                //弹失败提示信息
                                this.$message.error(result);
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                    });
        },
        //取消选择
       cancelSelect(){
           this.$refs.GoodsTable.clearSelection();
       },
       //查询
       search(){
           //调用分页函数
           this.getGoodsByPage();
       }

    },

    //vue的生命周期 --钩子函数
    created(){
        //调用分页函数
        this.getGoodsByPage();
    }
    
}
</script>

<style lang="less">
  @import "./goodsmanage.less";
</style>