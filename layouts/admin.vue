<template>
  <el-container class="admin-layout">
    <el-aside width="240px" class="sidebar">
      <div class="logo">
        <h2>CMD Dashboard</h2>
      </div>
      <el-menu
        :default-active="route.path"
        router
        class="el-menu-vertical"
        background-color="#1e293b"
        text-color="#94a3b8"
        active-text-color="#ffffff"
      >
        <el-menu-item index="/admin">
          <span>📊 Dashboard</span>
        </el-menu-item>
        <el-menu-item index="/admin/news">
          <span>📰 News Management</span>
        </el-menu-item>
        <el-menu-item index="/admin/products">
          <span>📦 Product Management</span>
        </el-menu-item>
        <el-menu-item index="/admin/config/basic">
          <span>⚙️ Settings</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    
    <el-container>
      <el-header class="header">
        <div class="header-left">
           <h3>Administration</h3>
        </div>
        <div class="header-right">
          <el-button type="primary" plain @click="goToHome">
             View Site
          </el-button>
          <el-button type="danger" plain @click="handleLogout">
             Logout
          </el-button>
        </div>
      </el-header>
      
      <el-main class="main-content">
        <slot />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { useRoute, navigateTo } from 'nuxt/app'
import { useAuth } from '~/composables/useAuth'

const route = useRoute()
const { logout } = useAuth()

const goToHome = () => {
  navigateTo('/')
}

const handleLogout = () => {
  logout()
}
</script>

<style scoped>
.admin-layout {
  height: 100vh;
  background-color: #f1f5f9;
}

.sidebar {
  background-color: #1e293b;
  color: white;
  display: flex;
  flex-direction: column;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #334155;
  background: #0f172a;
}

.logo h2 {
  color: white;
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
}

.el-menu-vertical {
  border-right: none;
  flex: 1;
}

.header {
  background: white;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  height: 60px;
}

.header h3 {
  margin: 0;
  color: #1e293b;
}

.main-content {
  padding: 2rem;
  overflow-y: auto;
}
</style>
