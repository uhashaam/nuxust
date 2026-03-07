<template>
  <header class="header-02">
    <div class="header-container">
      <div class="logo-section">
        <a href="/" class="domain-logo">b-2b.com</a>
        <span class="divider">/</span>
        <span class="industry-name">{{ industryName }}</span>
      </div>
      
      <nav class="nav-center">
        <a :href="`/i/${subdomain}`" class="nav-item">Home</a>
        <a href="https://b-2b.com/pricing" class="nav-item">Packages</a>
        <a :href="`/i/${subdomain}/news`" class="nav-item">News Center</a>
        <a :href="`/i/${subdomain}/about`" class="nav-item">About Us</a>
        <a :href="`/i/${subdomain}/contact`" class="nav-item">Contact</a>
      </nav>

      <div class="right-actions">
        <template v-if="user">
          <a href="https://b-2b.com/dashboard" class="nav-item dashboard-text">Dashboard</a>
          <el-button link @click="logout">Logout</el-button>
        </template>
        <template v-else>
          <a href="https://b-2b.com/login" class="nav-item login-text">Login</a>
          <a href="https://b-2b.com/register" class="register-btn">Register</a>
        </template>
      </div>

      <button class="mobile-toggle" @click="menuOpen = !menuOpen">
        <el-icon><Menu v-if="!menuOpen" /><Close v-else /></el-icon>
      </button>

      <div class="mobile-nav" :class="{ 'is-open': menuOpen }">
        <a :href="`/i/${subdomain}`" @click="menuOpen = false">Home</a>
        <a href="https://b-2b.com/pricing" @click="menuOpen = false">Packages</a>
        <a :href="`/i/${subdomain}/news`" @click="menuOpen = false">News Center</a>
        <a :href="`/i/${subdomain}/about`" @click="menuOpen = false">About Us</a>
        <a :href="`/i/${subdomain}/contact`" @click="menuOpen = false">Contact</a>
        <div class="mobile-split" v-if="!user">
          <a href="https://b-2b.com/login" @click="menuOpen = false">Login</a>
          <a href="https://b-2b.com/register" @click="menuOpen = false" class="primary">Join Now</a>
        </div>
        <div class="mobile-split" v-else>
          <a href="https://b-2b.com/dashboard" @click="menuOpen = false">Dashboard</a>
          <a href="#" @click.prevent="logout(); menuOpen = false">Logout</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Menu, Close } from '@element-plus/icons-vue'
import { useAuth } from '~/composables/useAuth'

defineProps<{
  industryName: string
  subdomain?: string
}>()

const { user, logout } = useAuth()
const menuOpen = ref(false)
</script>

<style scoped>
.header-02 {
  background: #f8fafc;
  height: 90px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid #e2e8f0;
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.domain-logo {
  font-weight: 900;
  color: #334155;
  text-decoration: none;
  font-size: 1.125rem;
}

.divider {
  color: #94a3b8;
}

.industry-name {
  font-weight: 600;
  color: #64748b;
  font-size: 1rem;
}

.nav-center {
  display: flex;
  gap: 1rem;
  background: #ffffff;
  padding: 0.5rem;
  border-radius: 99px;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

.nav-item {
  text-decoration: none;
  color: #475569;
  font-weight: 700;
  font-size: 0.875rem;
  padding: 0.625rem 1.25rem;
  border-radius: 99px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-item:hover {
  background: #0f172a;
  color: #ffffff;
  transform: translateY(-1px);
}

.mobile-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #334155;
}

.right-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
}

.register-btn {
  background: #0f172a;
  color: white;
  text-decoration: none;
  padding: 0.5rem 1.25rem;
  border-radius: 99px;
  font-weight: 700;
  font-size: 0.875rem;
}

.dashboard-text, .login-text {
  padding: 0 !important;
  background: none !important;
  color: #475569 !important;
}

.mobile-nav {
  display: none;
}

@media (max-width: 1024px) {
  .header-container {
    display: flex;
    justify-content: space-between;
  }
  
  .nav-center {
    display: none;
  }
  
  .mobile-toggle {
    display: block;
  }

  .mobile-nav {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 90px;
    left: 0;
    right: 0;
    background: #f8fafc;
    padding: 2rem;
    gap: 1.5rem;
    border-bottom: 2px solid #e2e8f0;
    transform: translateY(-100%);
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 999;
  }

  .mobile-nav.is-open {
    transform: translateY(0);
    opacity: 1;
  }

  .mobile-nav a {
    text-decoration: none;
    color: #334155;
    font-weight: 700;
    padding: 1rem;
    border-radius: 12px;
    background: white;
    text-align: center;
  }

  .mobile-split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-top: 1rem;
  }

  .mobile-split a.primary {
    background: #0f172a;
    color: white;
  }
}
</style>
