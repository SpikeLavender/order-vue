<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters" size="small">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="Service Name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getOrders">Select</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="orders" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
              style="width: 100%;">
      <el-table-column type="selection" width="55" prop="id">
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="serviceName" label="Service Name" width="180" sortable>
      </el-table-column>
      <el-table-column prop="serviceLevel" label="Service Level" width="140"  sortable>
      </el-table-column>
      <el-table-column prop="sliceType" label="Slice Type" width="120" sortable>
      </el-table-column>
      <el-table-column prop="orderTime" label="Order Time" width="180" :formatter="formatTime" sortable>
      </el-table-column>
      <el-table-column prop="areaList" label="Area List" min-width="180" sortable>
      </el-table-column>
      <el-table-column prop="userList" label="User List" min-width="180" sortable>
      </el-table-column>
      <el-table-column prop="appList" label="Application List" min-width="180" sortable>
      </el-table-column>
      <el-table-column prop="fee" label="Fee" min-width="120" sortable>
      </el-table-column>
      <el-table-column label="Operation" width="150">
        <template scope="scope">
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0" size="small">批量删除</el-button>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total"
                     style="float:right;">
      </el-pagination>
    </el-col>
  </section>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
export default {
  data () {
    return {
      filters: {
        name: ''
      },
      orders: [],
      total: 0,
      page: 1,
      listLoading: false,
      sels: [], // 列表选中列

      editFormVisible: false, // 编辑界面是否显示
      editLoading: false,
      editFormRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      },
      addFormVisible: false, // 新增界面是否显示
      addLoading: false,
      addFormRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    formatTime: function (row, column) {
      let orderTime = row.orderTime.split('|')
      return moment(orderTime[0]/1).format('YYYY-MM-DD') + ' - ' + moment(orderTime[0]/1).format('YYYY-MM-DD')
    },
    handleCurrentChange (val) {
      this.page = val
      this.getOrders()
    },
    // 获取用户列表
    getOrders () {
      this.listLoading = true
      let ins = axios.create({
        baseURL: 'http://127.0.0.1:8090/v1/openapi/',
      })
      ins.get('/5g-orders', {
        headers: {
          'token': sessionStorage.getItem('token')
        }
      }).then((res) => {
        let statusCode = res.data.statusCode
        console.log(res)
        if (statusCode === "200") {
          this.orders = res.data.data
        } else {
          this.$message({
            message: res.data.message,
            type: 'error'
          })
        }
        // this.total = res.data.total
        // this.users = res.data.users
        console.log(res)
        this.listLoading = false
      })
    },
    // 删除
    handleDel: function (index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        let para = { id: row.id }
        console.log(row.id)

        // todo: 删除和批量删除接口
        let ins = axios.create({
          baseURL: 'http://127.0.0.1:8090/v1/openapi/',
        })
        axios.delete('/', para).then((res) => {
          this.listLoading = false
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getOrders()
        })
      }).catch(() => {

      })
    },
    selsChange: function (sels) {
      this.sels = sels
    },
    // 批量删除
    batchRemove: function () {
      let ids = this.sels.map(item => item.id).toString()
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        let para = { ids: ids }
        axios.post('/', para).then((res) => {
          this.listLoading = false
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getOrders()
        })
      }).catch(() => {

      })
    }
  },
  mounted () {
    this.getOrders()
  }
}

</script>

<style scoped>

</style>
