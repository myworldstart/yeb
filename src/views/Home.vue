<template>
    <div>
        <el-container>
            <el-header class = "homeHeader">
                <div class = "title">
                    云E办
                </div>
                <el-dropdown class="userInfo" @command = "commandHandlers">
                    <span class="el-dropdown-link">
                    {{user.name}}<i><img :src="user.userFace"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
                        <el-dropdown-item command="setting">设置</el-dropdown-item>
                        <el-dropdown-item command="logout">注销登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
                <el-container>
                    <el-aside width="200px">
                        <el-menu router unique-opened>
                            <template v-for="(item,index) in routes">
                                <el-submenu :index="index + ''"  :key="index" v-if="!item.hidden">
                                    <template slot="title"><i :class="item.iconCls" style = "color:aqua;margin-right: 5px"></i>{{item.name}}</template>
                                    <el-menu-item :index="children.path" :key = indexj v-for="(children, indexj) in item.children">{{children.name}}</el-menu-item>
                                </el-submenu>
                            </template>
                        </el-menu>
                    </el-aside>
                    <el-main>
                        <el-breadcrumb v-if="this.$router.currentRoute.path!='/home'" separator-class="el-icon-arrow-right">
                            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                            <el-breadcrumb-item>{{this.$router.currentRoute.name }}</el-breadcrumb-item>
                        </el-breadcrumb>
                        <div class="homeWelcome" v-if="this.$router.currentRoute.path == '/home'">
                            欢迎来到云E办
                        </div>
                        <router-view class="homeRouterView"/>
                    </el-main>
                </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    name: "Home",
    data(){
      return{
          user:JSON.parse(window.sessionStorage.getItem('user'))
      }
    },
    methods:{
        commandHandler(command){
            if(command == 'logout'){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                    this.postRequest('/logout');
                    window.sessionStorage.removeItem('tokenStr');
                    window.sessionStorage.removeItem('user');
                    this.$store.commit('initRoutes', []);
                    this.$router.replace('/');
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消操作'
                  });
                });
            }
        }
    },
    computed:{
        routes(){
            return this.$store.state.routes();
        }
    }
}
</script>

<style scoped>
    .homeHeader{
        background: #409eff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 15px;
        box-sizing: border-box;
    }
    .homeHeader .title{
        font-size: 30px;
        font-family: 华文楷体;
        color: white;
    }
    .homeHeader .userInfo{
        cursor: pointer;
    }
    .el-dropdown-link img{
        width: 48px;
        height: 48px;
        border-radius: 24px;
        margin-left: 8px;
    }
    .homeHeader{
        text-align: center;
        font-size: 30px;
        font-family: 华文楷体;
        color: #409eff;
        padding-top: 50px;
    }
    .homeRouterView{
        margin-top: 10px;

    }
</style>