<template>
    <div class="personcenter">
        <!-- 面板 -->
        <el-card class="box-card">
            <!-- 标题 -->
            <div slot="header" class="clearfix">
                <span>个人中心</span>
            </div>
            <!-- 内容 -->
            <div class="text item">
                <!-- 用户头像 -->
                <div>
                    <el-upload
                    class="avatar-uploader"
                    action="aa"
                    :show-file-list="false"
                    :http-request="upload"
                    :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
                <!-- 用户信息 -->
                <div style="margin-top:20px">
                   <p>账号：{{account}}</p>
                   <p>用户组：{{userGroup}}</p>
                   <p>创建时间：：{{ctime | filteDate}} </p>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import moment from "moment"
import axios from "axios"
export default {
    data(){
        return {
            account:"",
            userGroup:"",
            ctime:"",
            imageUrl:""
        }
    },
    methods:{
         //获取当前账号的信息
         getAccountInfo(){
             this.request.get("/account/getaccountinfo")
                  .then(res =>{
                      this.account=res[0].account;
                      this.userGroup=res[0].user_group;
                      this.ctime=res[0].create_date;
                  })
                  .catch(err => {
                      console.log(err);
                  })
         },
         //头像上传之前回调，判断头像是否符合
         beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        upload(file){
            console.log(file)
            //创建一个formData对象
            let formData=new FormData();
            //将传入文件数据，存入formData中
            formData.append("file",file.file)
            console.log(formData);

            //发送axios请求，只能是post
            axios.post("/account/uploadavatar",formData,{
               headers:{'Content-Type': 'multipart/form-data'}
            })
            .then(response =>{
                let {code,result,path}=response.data;
                if(code === 0){
                    this.$message({type:"success",message:result});
                    //头像回填
                    this.imageUrl=`http://127.0.0.1:888/${path}`
                    //刷新页面
                    this.$emit("A");
                }else if(code === 1){
                    this.$message.error(result);
                }
            })
            .catch(err =>{
                console.log(err);
            })
        }
    },
    created(){
       this.getAccountInfo();
    },
    filters:{
       filteDate(val){
          return moment(val).format("YYYY-MM-DD hh:mm:ss")
       } 
    }
}
</script>


<style lang="less">
.personcenter{
    .el-card{
        .el-card__header{
            font-size:20px;
            font-weight: bold;
            background-color: #ccc;
        }
    }
    .el-card__body{
         .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
        }
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }
    }
}
</style>