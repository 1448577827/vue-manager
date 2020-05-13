<template>
    <el-container class="home_container">
      <!--头部-->
      <el-header>
        <div>
          <img src="../assets/logo.png"/>
          <span>电商后台管理系统</span>
        </div>
        <div>
          <el-button type="info">退出</el-button>
        </div>
      </el-header>
      <!--主体-->
        <el-container>
          <!--左侧栏-->
          <el-aside :width="isCollapse ? '64px':'200px'">
            <div class="toggle_btn" @click="toggleColl">|||</div>
            <el-menu
              :default-active="activeIndex"
              :collapse-transition="false"
              :collapse="isCollapse"
              router
              unique-opened
              background-color="#373D41"
              text-color="#fff"
              active-text-color="#409EFF">
              <!--一级菜单-->
              <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
                <template slot="title">
                  <i :class="iconsObj[item.id]"></i>
                  <span>{{ item.authName }}</span>
                </template>
                <!--二级菜单-->
                <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveStatus('/'+ subItem.path)">
                  <i class="el-icon-menu"></i>
                  <span>{{ subItem.authName }}</span>
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </el-aside>
          <!--内容主体区域-->
          <el-main>
            <router-view></router-view>
          </el-main>
      </el-container>
    </el-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      menuList:[],
      iconsObj: {
        125:'iconfont icon-user',
        103:'iconfont icon-tijikongjian',
        101:'iconfont icon-shangpin',
        102:'iconfont icon-danju',
        145:'iconfont icon-baobiao'
      },
      isCollapse:false,
      activeIndex:''
    }
  },
  created() {
    this.getMenuList()
    this.activeIndex = window.sessionStorage.getItem('activeIndex')
  },
  methods: {
    async getMenuList() {
      const { data:res } = await this.$http.get('menus')
      // 成功 保存到data
      this.menuList = res.data
      // console.log(this.menuList)
    },
    // 折叠
    toggleColl() {
      this.isCollapse = !this.isCollapse
    },
    // 保存二级菜单index值，用于高亮显示
    saveStatus(activeIndex) {
      this.activeIndex = activeIndex
      window.sessionStorage.setItem('activeIndex', activeIndex)
    }
  }
}
</script>

<style scoped lang="less">
  .home_container{
    height: 100% ;
    .el-header{
      background-color:#373D41;
      display: flex;
      justify-content:space-between;
      color: white;
      font-size: 18px;
      align-items: center;
      >div{
        display: flex;
        align-items: center;
        img{
          width: 50px;
          margin-right: 20px;
        }
      }
    }
    .toggle_btn{
      background-color:#4A5064;
      font-size: 12px;
      line-height: 24px;
      color: #fff;
      text-align: center;
    }
  }
</style>
