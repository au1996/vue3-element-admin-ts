<template>
  <div class="user-manage-view">
    <div class="header-box">
      <el-input
        v-model="tableParams.username"
        class="left"
        placeholder="请输入关键词搜索"
        clearable
        @change="onSearch"
      >
        <template #append>
          <el-button @click="onSearch">
            <I name="Search" />
          </el-button>
        </template>
      </el-input>
      <el-button type="primary" @click="showDialog">
        <I name="Plus" class="mr-4"></I>添加用户
      </el-button>
    </div>
    <el-table v-loading="tableLoading" :data="tableData" border>
      <el-table-column prop="username" label="账号" />
      <el-table-column prop="password" label="密码" />
      <el-table-column prop="role" label="角色">
        <template #default="{ row }">
          {{ getRoleName(row.role) }}
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱" min-width="120" />
      <el-table-column prop="introduction" label="介绍" />
      <el-table-column prop="avatar" label="头像">
        <template #default="{ row }">
          <img v-show="row.avatar" :src="row.avatar" width="40" height="40" />
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" min-width="160">
        <template #default="{ row }">
          {{ DateFormat(row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="showDialog(2, row)">
            <I name="Edit" size="small" class="mr-4"></I>修改
          </el-button>
          <el-button type="danger" size="small" @click="deleteUser(row)">
            <I name="Delete" size="small" class="mr-4"></I>删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pagination.page"
      v-model:page-size="pagination.pageSize"
      :total="pagination.total"
      :page-sizes="[2, 10, 20, 50]"
      layout="slot, prev, pager, next, sizes, jumper"
      @current-change="pagination.pageChange"
      @size-change="pagination.sizeChange"
    >
    </el-pagination>
    <el-dialog v-model="dialogVisible" :title="dialogFlag === 2 ? '修改' : '添加'">
      <el-form ref="userFormRef" v-loading="formLoading" :model="userForm" label-width="80px">
        <el-form-item prop="username" label="账号">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="userForm.password"></el-input>
        </el-form-item>
        <el-form-item prop="role" label="角色">
          <el-select v-model="userForm.role" placeholder="请选择" class="w-full" @focus="getRoles">
            <el-option
              v-for="item in roleList"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>
        <el-form-item prop="introduction" label="介绍">
          <el-input v-model="userForm.introduction"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" :disabled="formLoading" @click="addOrUpdateUser">
            确 定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, inject } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import useTableData from '@/hooks/useTableData'
import { get_user_list, add_user, get_roles, update_user_info, delete_user_info } from '@/api/user'

const DateFormat: any = inject('$DateFormat')
const tableParams = reactive({
  username: ''
})

const getTableParams = () => {
  return tableParams
}

const setTableData = (res: any, tableData: any) => {
  pagination.total = res.total
  tableData.value = res.list
}

const { tableLoading, tableData, pagination, getTableData } = useTableData({
  getTableParams,
  setTableData,
  request: get_user_list,
  pageSize: 2
})

const onSearch = () => {
  getTableData(1)
}

/**
 * 获取角色列表
 */
const roleList: Array<any> = reactive([])
const getRoles = () => {
  if (roleList.length) return
  get_roles().then((res: any) => {
    roleList.push(...res.list)
  })
}

getRoles()

/**
 * 获取角色名
 */
const getRoleName = (id: string) => {
  let name = id
  roleList.forEach((group) => {
    if (group.id === id) {
      name = group.name
    }
  })
  return name
}

/**
 * 弹窗相关
 */
const dialogFlag = ref(1)
const dialogVisible = ref(false)
const formLoading = ref(false)
const userFormRef = ref(null)
const userForm = ref({
  username: '',
  password: '',
  role: '',
  email: '',
  introduction: ''
} as {
  [key: string]: string
  username: string
  password: string
  role: string
  email: string
  introduction: string
})

/**
 * 展开弹窗
 */
const showDialog = (flag: number, row: any) => {
  dialogVisible.value = true
  dialogFlag.value = flag
  if (flag === 2) {
    userForm.value = { ...row }
  } else {
    userForm.value = {
      username: '',
      password: '',
      role: '',
      email: '',
      introduction: ''
    }
  }
}

/**
 * 添加或更新用户
 */
const addOrUpdateUser = () => {
  formLoading.value = true
  if (dialogFlag.value === 2) {
    update_user_info({ ...userForm })
      .then(() => {
        getTableData()
        dialogVisible.value = false
      })
      .finally(() => {
        formLoading.value = false
      })
  } else {
    add_user({ ...userForm })
      .then(() => {
        getTableData()
        dialogVisible.value = false
      })
      .finally(() => {
        formLoading.value = false
      })
  }
}

/**
 * 删除用户
 */
const deleteUser = (row: any) => {
  ElMessageBox.confirm(`确定删除 ${row.username} ？`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      delete_user_info({ id: row.username }).then(() => {
        const index = tableData.value.findIndex((o) => o.username === row.username)
        tableData.value.splice(index, 1)
        ElMessage({
          type: 'success',
          message: '删除成功'
        })
      })
    })
    .catch(() => {})
}
</script>

<style lang="scss" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  .left {
    width: 300px;
  }
}
</style>
