<template>
    <div class="accountmanage">
       <el-card class="box-card">
           <!-- 标题 -->
            <div slot="header" class="clearfix">
                <span>账号管理</span>
            </div>
            <!-- 内容 -->
            <div class="text item">
                <!-- 表格列表 -->
                <el-table
                    ref="accountManageTable"
                    :data="accountManageData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                   >

                    <el-table-column
                    type="selection"
                    width="55">
                    </el-table-column>

                    <el-table-column
                    prop="account"
                    label="用户名称"
                    >
                    </el-table-column>

                     <el-table-column
                    prop="user_group"
                    label="用户组"
                    show-overflow-tooltip
                    >
                    </el-table-column>

                    <el-table-column
                    label="日期"
                    >
                    <template slot-scope="scope">{{ scope.row.create_date | filterDate }}</template>
                    </el-table-column>

                     <el-table-column label="操作">
                        <template slot-scope="scope">
                            <!-- 修改 -->
                            <el-button
                            size="mini"
                            type="primary"
                            @click="editAccount(scope.row.id)"
                           >
                           <i class="el-icon-edit"></i>修改
                           </el-button>
                            <!-- 删除 -->
                            <el-button
                            size="mini"
                            type="danger"
                            @click="deleteAccount(scope.row.id)"
                           >
                           <i class="el-icon-delete"></i>删除
                           </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 修改数据的模态框 -->
                <el-dialog title="账号修改" :visible.sync="dialogFormVisible" width="400px">
                    <el-form :model="editForm" ref="editForm" :rules="rules">
                        <el-form-item prop="account" label="账号" :label-width="formLabelWidth" style="width:280px">
                        <el-input v-model="editForm.account" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item prop="userGroup" label="用户组" :label-width="formLabelWidth">
                        <el-select v-model="editForm.userGroup" placeholder="请选择用户组">
                            <el-option label="超级管理员" value="超级管理员"></el-option>
                            <el-option label="普通管理员" value="普通管理员"></el-option>
                        </el-select>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer" style="width:250px">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="saveEdit">确 定</el-button>
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
//引入moment
import moment from "moment"
export default {
    data(){
        return {
            accountManageData:[],
                currentPage:1,
                total:17,//总页数 
                pageSize:3,
                //修改数据表单 
                editForm:{
                    account:"",
                    userGroup:""
                },
                dialogFormVisible:false,  //模态框的显示和隐藏状态
                formLabelWidth:"80px",
                editId:"",//原来的id
                rules:{
                    account:[
                        {required:true,message:"账号不能为空",trigger:"blur"},
                        {min:3,max:6,message:"账号长度为3~6位",trigger:"blur"}
                    ],
                    userGroup:[
                        {required:true,message:"账号不能为空",trigger:"change"}
                    ]
                },
                selectId:[] //被选中的id
        }
    },
    methods:{

        //分页函数请求
        getAccountByPage(){
              //收集数据
              let params={
                  currentPage:this.currentPage,
                  pageSize:this.pageSize
              }
              //发送请求
              this.request.get("/account/changepage",params)
                  .then(res => {
                      let{ total,data }=res;
                      this.total=total;
                      this. accountManageData=data;
                      //如果这一页没有数据，自动跳转上一页
                      if(!data.length && this.currentPage !== 1){
                        //返回上一页
                        this.currentPage-=1;
                        //调用自己
                        this.getAccountByPage();
                      }
                  })
                  .catch(err => {
                      console.log(err);
                  })
        },

        //每页条数的改变
        handleSizeChange(val){
            //把每页的条数赋给pageSize
            this.pageSize=val;
            //调用分页函数
            this.getAccountByPage();
        },
        //当前页码
        handleCurrentChange(val){
            //把当前页码赋给currentPage
            this.currentPage=val;
            //调用分页函数
            this.getAccountByPage();
        },
        //删除账号
        deleteAccount(id){
            //参数id
            let params={
                id
            }
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        //发送axios请求
                        this.request.get("/account/delaccount",params)
                            .then(res => {
                                //接收后台响应的数据
                                let { code,result }=res;
                                //判断
                                if(code === 0){
                                //弹成功提示信息
                                this.$message({type:"success",message:result});
                                //刷新页面
                                  this.getAccountByPage();
                                }else if(code === 1){
                                    //弹失败提示信息
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
        //修改账号(数据回填)
        editAccount(id){
          this.dialogFormVisible=true;
          this.editId=id;
          //参数id
          let params={
              id
          }
          //发送请求
          this.request.get("/account/editAccount",params)
              .then(res => {
                  this.editForm.account=res[0].account;
                  this.editForm.userGroup=res[0].user_group;
              })
              .catch(err => {
                  console.log(err);
              })
        },
        //修改账号(保存新数据)
        saveEdit(){
           //判断前端验证是否通过
           this.$refs.editForm.validate(valid => {
               if(valid){
                   this.dialogFormVisible=false;
                   //收集数据
                   let params={
                       account:this.editForm.account,
                       userGroup:this.editForm.userGroup,
                       editId:this.editId
                   }
                   //发送请求
                   this.request.post("/account/saveedit",params)
                       .then(res => {
                            //接收后台响应的数据
                            let { code,result }=res;
                            //判断
                            if(code === 0){
                            //弹成功提示信息
                            this.$message({type:"success",message:result});
                            //刷新页面
                             this.getAccountByPage();
                            }else if(code === 1){
                                //弹失败提示信息
                                this.$message.error(result);
                            }
                            })
                            .catch(err => {
                                console.log(err);
                       })
               }else{
                   console.log("前端验证不通过")
                   return
               }
           })
        },
        //取消选择
        cancelSelect(){
           this.$refs.accountManageTable.clearSelection();
        },
        //选择框被选中
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
            //收集数据
            let params={
                selectId:this.selectId
            }
             this.$confirm('此操作将批量删除文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                         //发送请求
                        this.request.get("./account/batchdel",params)
                            .then(res => {
                                //接收后台响应的数据
                                    let { code,result }=res;
                                    //判断
                                    if(code === 0){
                                    //弹成功提示信息
                                    this.$message({type:"success",message:result});
                                    //刷新页面
                                     this.getAccountByPage();
                                    }else if(code === 1){
                                        //弹失败提示信息
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
        }
    },
    //vue的生命周期 钩子函数 适合发axios请求
    created(){
       this.getAccountByPage();
    },
    //过滤器
    filters:{
        //过滤时间
       filterDate(time){
          return moment(time).format('YYYY-MM-DD hh:mm')
       }
    }
};
</script>

<style lang="less">
@import "./accountmanage.less";
</style>