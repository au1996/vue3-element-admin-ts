<template>
  <div class="sidebar-container">
    <div class="logo" @click="$router.push('/')">
      <img class="logo-img" :src="logoUrl" alt="logo" />
      <transition name="fade-transform" mode="out-in">
        <h1 v-show="opened" class="logo-text">Vue Element Admin</h1>
      </transition>
    </div>
    <el-scrollbar class="scrollbar-wrapper">
      <el-menu
        :router="true"
        class="v-enter-to"
        :default-active="$route.path"
        :collapse="isCollapse"
        :show-timeout="200"
        text-color="#fff"
        background-color="#4a5a74"
        active-text-color="#409EFF"
      >
        <SidebarItem v-for="item in routerList" :key="item.path" :index="item.path" :nav="item" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed, onMounted } from 'vue'
import store from '@/store'
import { constantRoutes } from '@/router'
import { getRoles } from '@/utils/auth'
import logoUrl from '@/assets/img/logo.png'
import SidebarItem from './SidebarItem.vue'

const roles = getRoles()
const routerList: any[] = reactive([])

const opened = computed(() => store.state.app.sidebar.opened)
const isCollapse = computed(() => !opened.value)

onMounted(() => {
  filterRoutes()
})

/**
 * 权限过滤路由
 */
const filterRoutes = () => {
  constantRoutes.forEach((item) => {
    if (item.path === '/') {
      const childrens = item.children as any[]
      routerList.push(...childrens)
    }
  })
  for (let i = 0; i < routerList.length; i++) {
    if (
      routerList[i].meta &&
      routerList[i].meta.roles &&
      !routerList[i].meta.roles.includes(roles)
    ) {
      routerList.splice(i, 1)
      i--
    }
  }
  filterChildrens(routerList)
}

/**
 * 权限过滤子路由
 */
const filterChildrens = (routers: any) => {
  const childrens: Array<any> = []
  routers.forEach((item: any) => {
    if (
      (item.meta && !item.meta.roles) ||
      (item.meta && item.meta.roles && item.meta.roles.includes(roles))
    ) {
      childrens.push(item)
      if (item.children) {
        filterChildrens(item.children)
      }
    }
  })
  routers.length = 0
  routers.push(...childrens)
}
</script>

<style lang="scss" scoped="scoped">
.logo {
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  overflow: hidden;
  text-align: center;
  cursor: pointer;
  background-color: #2b2f3a;

  .logo-img {
    width: 32px;
    height: 32px;
  }

  .logo-text {
    display: inline-block;
    height: 50px;
    margin-left: 12px;
    font-size: 14px;
    line-height: 50px;
    color: #fff;
  }
}
</style>
