<template>
    <div class="home">
        <el-container>
            <!-- 左边 -->
            <el-aside width="250px">
                <!-- 使用自定义组件 -->
                <LeftNav></LeftNav>
            </el-aside>
             <!-- 右边 -->
            <el-container>
                <!-- 头 -->
                <el-header>
                    <!-- 自定义组件 -->
                    <Top ref="top"></Top>
                </el-header>
                 <!-- 中 -->
                <el-main>
                    <router-view @A="B"></router-view>
                </el-main>
                 <!-- 尾 -->
                <el-footer>
                    <!-- 自定义组件 -->
                    <Bottom></Bottom>
                </el-footer>
             </el-container>
        </el-container> 
    </div>
</template>

<script>
//引入自定义组件
import LeftNav from "@/components/LeftNav/LeftNav.vue"
import Top from "@/components/Top/Top.vue"
import Bottom from "@/components/Bottom/Bottom.vue"

export default {
    //注册组件
    components:{
        LeftNav,
        Top,
        Bottom
    },
    methods:{
        B(){
            this.$refs.top.getCurrentAccount();
        }
    }
}
</script>

<style lang="less">
  //引入主界面样式
  @import "./home.less";
</style>