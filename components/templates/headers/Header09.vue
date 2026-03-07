<template>
  <header class="header-09">
    <div class="header-container">
      <div class="left-section">
        <div class="icon-stack">
          <el-icon><Box /></el-icon>
          <el-icon><Printer /></el-icon>
        </div>
        <a href="/" class="domain-logo">b-2b.com</a>
      </div>
      
      <div class="center-section">
        <h1 class="industry-name">{{ industryName }}</h1>
      </div>

      <nav class="nav-right">
        <a :href="`/i/${subdomain}`" class="nav-item">Home</a>
        <a href="https://b-2b.com/pricing" class="nav-item">Packages</a>
        <a :href="`/i/${subdomain}/news`" class="nav-item">News</a>
        <a :href="`/i/${subdomain}/about`" class="nav-item">About Us</a>
        <a :href="`/i/${subdomain}/contact`" class="nav-item">Contact</a>
        <div class="auth-side" v-if="!user">
          <a href="https://b-2b.com/login" class="nav-item">Login</a>
        </div>
        <div class="auth-side" v-else>
          <a href="https://b-2b.com/dashboard" class="nav-item highlight">Dashboard</a>
          <button class="logout-minimal-9" @click="logout">Logout</button>
        </div>
      </nav>

      <button class="mobile-toggle" @click="isOpen = !isOpen">
        <el-icon><Menu v-if="!isOpen" /><Close v-else /></el-icon>
      </button>

      <div class="mobile-nav" :class="{ 'active': isOpen }">
        <a :href="`/i/${subdomain}`" @click="isOpen = false">Home</a>
        <a href="https://b-2b.com/pricing" @click="isOpen = false">Packages</a>
        <a :href="`/i/${subdomain}/news`" @click="isOpen = false">News Center</a>
        <a :href="`/i/${subdomain}/about`" @click="isOpen = false">About Us</a>
        <a :href="`/i/${subdomain}/contact`" @click="isOpen = false">Contact</a>
        <div class="mobile-auth-row" v-if="!user">
          <a href="https://b-2b.com/login" @click="isOpen = false">Login</a>
          <a href="https://b-2b.com/register" @click="isOpen = false" class="primary">Sign Up</a>
        </div>
        <div class="mobile-auth-row" v-else>
          <a href="https://b-2b.com/dashboard" @click="isOpen = false">Dashboard</a>
          <a href="#" @click.prevent="logout(); isOpen = false">Logout</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Menu, Close, Box, Printer } from '@element-plus/icons-vue'
import { useAuth } from '~/composables/useAuth'

defineProps<{
  industryName: string
  subdomain?: string
}>()

const { user, logout } = useAuth()
const isOpen = ref(false)
</script>

<style scoped>
.header-09 {
  background: #ffffff;
  height: 90px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid #f1f5f9;
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
}

.left-section {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.icon-stack {
  display: flex;
  gap: 0.5rem;
  color: #6366f1;
  font-size: 1.25rem;
}

.domain-logo {
  font-size: 1.125rem;
  font-weight: 800;
  color: #1e293b;
  text-decoration: none;
}

.center-section {
  text-align: center;
}

.industry-name {
  font-size: 1.25rem;
  font-weight: 900;
  color: #0f172a;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0;
}

.nav-right {
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
}

.nav-item {
  text-decoration: none;
  color: #64748b;
  font-weight: 700;
  font-size: 0.875rem;
  transition: color 0.2s;
}

.nav-item:hover {
  color: #6366f1;
}

.auth-side {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-left: 2rem;
  border-left: 1px solid #f1f5f9;
  padding-left: 2rem;
}

.nav-item.highlight {
  color: #6366f1;
}

.logout-minimal-9 {
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  text-transform: uppercase;
}

.mobile-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  justify-self: end;
}

.mobile-nav {
  display: none;
}

@media (max-width: 1200px) {
  .header-container {
    display: flex;
    justify-content: space-between;
  }
  
  .nav-right {
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
    background: white;
    padding: 2rem;
    gap: 1.5rem;
    border-bottom: 2px solid #f1f5f9;
    transform: translateY(-100%);
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 1000;
  }

  .mobile-nav.active {
    transform: translateY(0);
    opacity: 1;
  }

  .mobile-nav a {
    text-decoration: none;
    color: #0f172a;
    font-weight: 800;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 8px;
    text-align: center;
  }

  .mobile-auth-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .mobile-auth-row a.primary {
    background: #6366f1;
    color: white;
  }
}
</style>
