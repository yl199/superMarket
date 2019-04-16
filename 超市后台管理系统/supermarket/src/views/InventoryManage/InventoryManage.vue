<template>
    <div class="inventorymanage">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>库存管理</span>
            </div>
            <div class="text item">
                <div class="inventoryBox" style="border-bottom:1px solid #ccc;">
                   <el-form :model="inventoryManageForm" ref="inventoryManageForm" label-width="100px" class="demo-ruleForm">
                        <el-row :gutter="20">
                            <el-col :span="4">
                                    <el-form-item>
                                        <el-select v-model="inventoryManageForm.classify" placeholder="---选择分类---">
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
                                        <el-input v-model="inventoryManageForm.keyword"></el-input>
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
                    ref="inventoryTable"
                    :data="inventoryManageData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    stripe
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
                    prop="purchasingprice"
                    label="进价（元）"
                    show-overflow-tooltip
                    >
                    </el-table-column>

                    <el-table-column
                    prop="putstorage"
                    label="入库"
                    show-overflow-tooltip
                    >
                    </el-table-column>

                    <el-table-column
                    prop="quantity"
                    label="库存"
                    show-overflow-tooltip
                    >
                    </el-table-column>

                    <el-table-column
                    prop="sold"
                    label="已售"
                    show-overflow-tooltip
                    >
                    </el-table-column>

                     <el-table-column label="操作">
                        <template slot-scope="scope">
                            <!-- 修改 -->
                           <i class="el-icon-edit" @click="editInventory(scope.row.id)" style="margin-right:20px;color:green;font-size:18px;"></i>
                          
                            <!-- 删除 --> 
                           <i class="el-icon-delete" @click="delInventory(scope.row.id)" style="color:red;font-size:18px;"></i>
                           
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 模态框 -->
                <!-- 修改数据的模态框 -->
                <el-dialog title="库存修改" :visible.sync="dialogFormVisible" width="400px">
                    <el-form :model="editInventoryForm" ref="editInventoryForm" :rules="rules">

                         <el-form-item label="商品条形码" prop="barcode">
                            <div style="-width:300px;display:inline-block;margin-right:5px;"> <el-input type="text" v-model="editInventoryForm.barcode"></el-input></div>
                        </el-form-item>

                       <el-form-item label="商品名称" prop="goodsName">
                        <div class="changeWidth" style="width:100px;display:inline-block;margin-right:5px;">
                           <el-input v-model="editInventoryForm.goodsName"></el-input>
                        </div>    
                      </el-form-item>

                       <el-form-item label="所属分类" prop="classify">
                        <el-select v-model="editInventoryForm.classify" placeholder="---选择分类---">                                          
                            <el-option label="服装类" value="服装类"></el-option>
                            <el-option label="食品类" value="食品类"></el-option>
                            <el-option label="电子类" value="电子类"></el-option>
                            <el-option label="水果类" value="水果类"></el-option>
                        </el-select>
                       </el-form-item>

                        <el-form-item label="进价" prop="purchasingprice">
                         <div class="changeWidth" style="width:100px;display:inline-block;margin-right:5px;">
                              <el-input v-model="editInventoryForm.purchasingprice"></el-input> 
                         </div>
                         元<p class="textMessage" style="font-size:12px;color:#ccc;line-height:10px;margin-left:30px;">默认市场价为售价的1.2倍</p>
                       </el-form-item>

                       <el-form-item label="入库" prop="putstorage">
                         <div class="changeWidth" style="width:100px;display:inline-block;-margin-right:5px;">
                               <el-input v-model="editInventoryForm.putstorage"></el-input>
                         </div>
                      
                       </el-form-item>

                       <el-form-item label="库存" prop="quantity">
                         <div class="changeWidth" style="width:100px;display:inline-block;-margin-right:5px;">
                               <el-input v-model="editInventoryForm.quantity"></el-input>
                         </div>元
                      
                       </el-form-item>

                        <el-form-item label="已售" prop="sold">
                            <div class="changeWidth" style="width:100px;display:inline-block;margin-right:5px;">
                                <el-input v-model="editInventoryForm.sold"></el-input>
                            </div>
                            <p class="textMessage" style="font-size:12px;color:#ccc;line-height:10px;margin-left:30px;">记重商品单位为千克</p>
                        </el-form-item>

                    </el-form>
                    <div slot="footer" class="dialog-footer" style="width:250px">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="saveEditInventory">确 定</el-button>
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
                    <el-button type="success" @click="batchCancel">批量删除</el-button>
                    <el-button type="primary" @click="unselect">取消选择</el-button>
                </div>
                 
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data(){
       return {
           inventoryManageForm:{
               classify:"",
               keyword:""
           },
           inventoryManageData:[],
           total:17,//总条数
           currentPage:1,//当前页码
           pageSize:3,//每页的条数
           dialogFormVisible:false,
           editId:"",
           editInventoryForm:{
               barcode:"",
               goodsName:"",
               classify:"",
               purchasingprice:"",
               putstorage:"",
               quantity:"",
               sold:""
           },
           rules:{
               barcode:[{required:true,message:"商品条形码不能为空",trigger:"blur"}]
           },
            selectId:[]
       }
    },
    methods:{
        handleSelectionChange(val){
           this.selectId=val.map(v => v.id);
           //console.log(this.selectId);
        },
        //每页的条数
        handleSizeChange(val){
           this.pageSize=val;
           //调用
           this.getInventoryByPage();
        },
        handleCurrentChange(val){
           this.currentPage=val;
           //调用
           this.getInventoryByPage();
        },
        //分页函数，请求页面数据
        getInventoryByPage(){
            //收集数据
            let params={
                currentPage:this.currentPage,
                pageSize:this.pageSize,
                classify:this.inventoryManageForm.classify,
                keyword:this.inventoryManageForm.keyword
            }
            //发送请求
            this.request.get("/inventory/changeInventoryPage",params)
                .then(res => {
                    let {total,data}=res;
                    this.total=total;
                   this.inventoryManageData=data;
                })
                .catch(err => {
                    console.log(err);
                })
        },
        //删除库存
        delInventory(id){
            let params={
                id
            }
            this.$confirm('此操作将永久删除该库存, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                      //发送请求
                    this.request.get("/inventory/delinventory",params)
                        .then(res => {
                            let{code,result}=res;
                            if(code===0){
                                this.$message({
                                    type:"success",
                                    message:result
                                })
                                //刷新页面
                                this.getInventoryByPage();
                            }else if(code===1){
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
        //修改库存（数据回填）
        editInventory(id){
           this.dialogFormVisible=true;
           this.editId=id;
           let params={
               id
           }
           //发送请求
           this.request.get("/inventory/editinventory",params)
               .then(res => {
                    this.editInventoryForm.barcode=res[0].barcode;
                    this.editInventoryForm.goodsName=res[0]. goods_name;
                    this.editInventoryForm.classify=res[0].classify;
                    this.editInventoryForm.purchasingprice=res[0].purchasingprice;
                    this.editInventoryForm.putstorage=res[0].putstorage;
                    this.editInventoryForm.quantity=res[0].quantity;
                    this.editInventoryForm.sold=res[0].sold;
               })
               .catch(err => {
                   console.log(err);
               })
        },
        //修改库存（保存新数据）
        saveEditInventory(){
             this.$refs.editInventoryForm.validate(valid =>{
                      if(valid){
                             this.dialogFormVisible=false;
                             let params={
                                barcode: this.editInventoryForm.barcode,
                                goodsName:this.editInventoryForm.goodsName,
                                classify:this.editInventoryForm.classify,
                                purchasingprice:this.editInventoryForm.purchasingprice,
                                putstorage:this.editInventoryForm.putstorage,
                                quantity:this.editInventoryForm.quantity,
                                sold:this.editInventoryForm.sold,
                                editId:this.editId
                            }
                            this.request.post("/inventory/saveinventory",params)
                                .then(res => {
                                    let{code,result}=res;
                                        if(code===0){
                                            this.$message({
                                                type:"success",
                                                message:result
                                            })
                                            //刷新页面
                                            this.getInventoryByPage();
                                        }else if(code===1){
                                            this.$message.error(result);
                                        }
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                      }else{
                          return
                      }
                  })
        },
        // 批量删除
        batchCancel(){
           let params={
               selectId:this.selectId
           }
            this.$confirm('此操作将永久删除该库存, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    //发送请求
                    this.request.get("/inventory/cancelinventory",params)
                        .then(res => {
                            let{code,result}=res;
                            if(code===0){
                                this.$message({
                                    type:"success",
                                    message:result
                                })
                                //刷新页面
                                this.getInventoryByPage();
                            }else if(code===1){
                                this.$message.error(result);
                            }
                        })
                        .catch(err=>{
                            console.log(err);
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                    });
        },
        //取消选择
        unselect(){
            this.$refs.inventoryTable.clearSelection();
        },
        //根据条件查询
        search(){
           this.getInventoryByPage();
        }
    },
    created(){
        this.getInventoryByPage();
    }
    
}
</script>

<style lang="less">
  @import "./inventorymanage.less";
</style>