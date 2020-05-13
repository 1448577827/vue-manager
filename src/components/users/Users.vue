<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!--卡片-->
      <el-card class="card_box">
        <el-row :gutter="20">
          <!--input-->
          <el-col :span="8">
            <el-input placeholder="请输入内容"  v-model="queryInfo.query" class="input-with-select" clearable @clear="clear">
              <el-button slot="append"  @click="qwe"  icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
          <!--按钮-->
          <el-col :span="4"><el-button type="primary">添加用户</el-button></el-col>
        </el-row>
        <!--表格-->
        <el-table
          :data="userList"
          border>
          <!--索引-->
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="username" label="姓名"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="mobile" label="电话"></el-table-column>
          <el-table-column prop="" label="状态">
            <!--设置状态 不需要要props -->
            <template #default="{ row }">
              <el-switch @change="userStateChange(row)"
                v-model="row.mg_state"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作">
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            <el-tooltip content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>

          </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[2, 4, 6, 8]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-card>
    </div>
</template>

<script>
export default {
  name: 'Users',
  data() {
    return {
      queryInfo:{
        query:'', // 查询的数据
        pagenum:1, // 默认渲染第一页
        pagesize:2 // 每页显示条数
      },
      userList:[],
      total:0
    }
  },
  created() {
    this.getUserList()
  },
  methods:{
    // 获取用户列表的
    async getUserList() {
      const { data:res } = await this.$http.get('users', {
        params:this.queryInfo
      })
      if (res.meta.status !== 200) return this.$message.error('获取失败')
      this.userList = res.data.users
      this.total = res.data.total
    },
    // 监听pagesize改变事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      // 重新获取数据
      this.getUserList()
    },
    // 监听pag改变事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      // 重新获取数据
      this.getUserList()
    },
    //  监听状态改变
    async userStateChange(userInfo) {
      const { data : res } = await this.$http.put(`users/${userInfo.id}/state/$(userInfo.mg_state)`)
      if (res.meta.status !== 200) {
        userInfo.mg_state = !userInfo.mg_state
        this.$message.error('状态更新失败')
        return false
      }
      this.$message.success('成功')
    },
    // 搜索
    qwe() {
      this.getUserList()
    },
    clear() { this.getUserList() }
  }
}
</script>

<style scoped>
  .card_box{
    margin-top:20px;
  }

</style>
