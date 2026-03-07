<template>
  <header class="header-06">
    <div class="header-container">
      <div class="logo-area">
        <a href="/" class="domain-logo">b-2b.com</a>
        <span class="industry-name">{{ industryName }}</span>
      </div>
      
      <nav class="nav-center">
        <a href="/" class="nav-item"><span>Home</span></a>
        <a href="https://b-2b.com/pricing" class="nav-item"><span>Packages</span></a>
        <a href="/news" class="nav-item"><span>News Center</span></a>
        <a href="/about" class="nav-item"><span>About Us</span></a>
        <a href="/contact" class="nav-item"><span>Contact</span></a>
      </nav>

      <div class="right-panel">
        <div class="auth-box">
          <template v-if="user">
            <a href="https://b-2b.com/dashboard" class="nav-item mini"><span>Dashboard</span></a>
            <el-button type="primary" size="small" @click="logout" class="logout-minimal">OUT</el-button>
          </template>
          <template v-else>
            <a href="https://b-2b.com/login" class="nav-item mini"><span>Login</span></a>
            <el-button type="primary" size="small" @click="navigateTo('https://b-2b.com/register', { external: true })">Join</el-button>
          </template>
        </div>
        <button class="menu-button" @click="mobileOpen = !mobileOpen">
          <el-icon><Menu v-if="!mobileOpen" /><Close v-else /></el-icon>
        </button>
      </div>

      <div class="mobile-menu" :class="{ 'is-open': mobileOpen }">
        <a href="/" @click="mobileOpen = false">Home</a>
        <a href="https://b-2b.com/pricing" @click="mobileOpen = false">Packages</a>
        <a href="/news" @click="mobileOpen = false">News Center</a>
        <a href="/about" @click="mobileOpen = false">About Us</a>
        <a href="/contact" @click="mobileOpen = false">Contact</a>
        <div class="mobile-auth-btn" v-if="!user">
          <a href="https://b-2b.com/login" @click="mobileOpen = false">Login</a>
          <a href="https://b-2b.com/register" @click="mobileOpen = false" class="highlight">Register</a>
        </div>
        <div class="mobile-auth-btn" v-else>
          <a href="https://b-2b.com/dashboard" @click="mobileOpen = false">Dashboard</a>
          <a href="#" @click.prevent="logout(); mobileOpen = false">Logout</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Menu, Close } from '@element-plus/icons-vue'
import { useAuth } from '~/composables/useAuth'
import { navigateTo } from 'nuxt/app'

defineProps<{
  industryName: string
  subdomain?: string
}>()

const { user, logout } = useAuth()
const mobileOpen = ref(false)
</script>

<style scoped>
.header-06 {
  background: #0f172a;
  color: #ffffff;
  height: 80px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 3rem;
}

.logo-area {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.domain-logo {
  font-size: 1.5rem;
  font-weight: 900;
  color: #3b82f6;
  text-decoration: none;
}

.industry-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #94a3b8;
  letter-spacing: 0.05em;
}

.nav-center {
  display: flex;
  justify-content: center;
  gap: 3rem;
}

.nav-item {
  color: #f8fafc;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9375rem;
  position: relative;
  padding: 0.5rem 0;
}

.nav-item span {
  position: relative;
  z-index: 1;
}

.nav-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #3b82f6;
  transition: width 0.3s ease;
}

.nav-item:hover::after {
  width: 100%;
}

.menu-button {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.75rem;
  cursor: pointer;
}

.auth-box {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-item.mini {
  font-size: 0.8125rem;
  opacity: 0.8;
}

.logout-minimal {
  font-weight: 800;
  padding: 0 0.75rem;
}

.mobile-menu {
  display: none;
}

@media (max-width: 1024px) {
  .nav-center {
    display: none;
  }
  
  .menu-button {
    display: block;
  }

  .mobile-menu {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    background: #0f172a;
    padding: 3rem;
    gap: 2rem;
    border-top: 1px solid #1e293b;
    transform: translateY(-100%);
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1000;
  }

  .mobile-menu.is-open {
    transform: translateY(0);
    opacity: 1;
  }

  .mobile-menu a {
    color: white;
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: 800;
    text-align: center;
  }

  .mobile-auth-btn {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    padding-top: 2rem;
    border-top: 1px solid #1e293b;
    margin-top: 1rem;
  }

  .mobile-auth-btn a.highlight {
    color: #3b82f6;
  }
}
</style>
