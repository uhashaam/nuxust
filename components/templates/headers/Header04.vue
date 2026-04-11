<template>
  <header class="header-04">
    <div class="top-row">
      <div class="container">
        <a href="/" class="domain-logo">b-2b<span class="dot">.</span>com</a>
        <div class="industry-name">{{ industryName }}</div>
      </div>
    </div>
    <div class="bottom-row">
      <div class="container">
        <nav class="nav-links">
          <a :href="getPath(\'\', subdomain)" class="nav-item">Home</a>
          <div class="nav-dot"></div>
          <a :href="getPath(\'/news\', subdomain)" class="nav-item">News Center</a>
          <div class="nav-dot"></div>
          <a :href="getPath(\'/about\', subdomain)" class="nav-item">About Us</a>
          <div class="nav-dot"></div>
          <a :href="getPath(\'/contact\', subdomain)" class="nav-item">Contact</a>
        </nav>
      </div>
    </div>

    <div class="auth-row">
      <div class="container auth-center">
        <template v-if="user">
          <a href="https://b-2b.com/dashboard" class="auth-link">Personal Center</a>
          <span class="auth-divider">/</span>
          <a href="#" @click.prevent="logout" class="auth-link">Sign Out</a>
        </template>
        <template v-else>
          <a href="https://b-2b.com/login" class="auth-link">Login</a>
          <span class="auth-divider">/</span>
          <a href="https://b-2b.com/register" class="auth-link">Register</a>
        </template>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div class="mobile-nav-bar">
      <a href="/" class="mobile-logo">b-2b<span class="dot">.</span>com</a>
      <button class="mobile-toggle" @click="isOpen = !isOpen">
        <el-icon><Menu v-if="!isOpen" /><Close v-else /></el-icon>
      </button>
    </div>
    <div class="mobile-overlay" :class="{ 'active': isOpen }">
      <nav class="mobile-menu">
        <a :href="getPath(\'\', subdomain)" @click="isOpen = false">Home</a>
        <a :href="getPath(\'/news\', subdomain)" @click="isOpen = false">News Center</a>
        <a :href="getPath(\'/about\', subdomain)" @click="isOpen = false">About Us</a>
        <a :href="getPath(\'/contact\', subdomain)" @click="isOpen = false">Contact</a>
        <div class="mobile-auth-grid" v-if="!user">
          <a href="https://b-2b.com/login" @click="isOpen = false">Login</a>
          <a href="https://b-2b.com/register" @click="isOpen = false">Register</a>
        </div>
        <div class="mobile-auth-grid" v-else>
          <a href="https://b-2b.com/dashboard" @click="isOpen = false">Dashboard</a>
          <a href="#" @click.prevent="logout(); isOpen = false">Logout</a>
        </div>
      </nav>
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
const { getPath } = useSubdomainNav()
const isOpen = ref(false)
</script>

<style scoped>
.header-04 {
  background: #ffffff;
}

.top-row {
  border-bottom: 3px solid #0f172a;
  padding: 1.5rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.domain-logo {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 2rem;
  font-weight: 800;
  color: #0f172a;
  text-decoration: none;
  text-transform: lowercase;
  letter-spacing: -0.04em;
}

.dot {
  color: #22c55e;
}

.industry-name {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 0.875rem;
  font-weight: 800;
  color: #0f172a;
  text-transform: uppercase;
  border: 2.5px solid #0f172a;
  padding: 0.5rem 1.5rem;
  letter-spacing: 0.1em;
}

.bottom-row {
  border-bottom: 2px solid #0f172a;
  padding: 0.875rem 0;
}

.nav-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin: 0 auto;
}

.nav-item {
  position: relative;
  text-decoration: none;
  color: #475569;
  font-weight: 700;
  font-size: 0.8125rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  transition: all 0.3s ease;
  padding: 0.25rem 0;
}

.nav-item:hover {
  color: #22c55e;
}

.nav-dot {
  width: 4px;
  height: 4px;
  background: #cbd5e1;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.auth-row {
  border-bottom: 2px solid #0f172a;
  background: #fafaf9;
  padding: 0.5rem 0;
}

.auth-center {
  justify-content: center !important;
}

.auth-link {
  text-decoration: none;
  color: #0f172a;
  font-weight: 700;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: color 0.2s;
}

.auth-link:hover {
  color: #22c55e;
}

.auth-divider {
  margin: 0 1rem;
  color: #cbd5e1;
}

/* Mobile Styles */
.mobile-nav-bar {
  display: none;
  height: 64px;
  background: white;
  padding: 0 1.5rem;
  align-items: center;
  justify-content: space-between;
  border-bottom: 3px solid #0f172a;
}

.mobile-logo {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 1.4rem;
  font-weight: 800;
  color: #0f172a;
  text-decoration: none;
  letter-spacing: -0.03em;
}

.mobile-toggle {
  background: none;
  border: 2px solid #0f172a;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.375rem 0.5rem;
  display: flex;
  align-items: center;
}

.mobile-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: white;
  z-index: 2000;
  padding: 5rem 2rem;
  transform: translateY(-100%);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-overlay.active {
  transform: translateY(0);
}

.mobile-menu {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: center;
}

.mobile-menu a {
  font-size: 1.5rem;
  font-weight: 800;
  color: #0f172a;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.5rem;
  border-bottom: 2px solid #f1f5f9;
}

.mobile-auth-grid {
  display: flex;
  justify-content: center;
  gap: 2rem;
  border-top: 3px solid #0f172a;
  padding-top: 1.5rem;
  margin-top: 0.5rem;
}

.mobile-auth-grid a {
  font-size: 1rem;
  border-bottom: none;
}

@media (max-width: 768px) {
  .top-row, .bottom-row, .auth-row {
    display: none;
  }
  
  .mobile-nav-bar {
    display: flex;
  }
  
  .mobile-overlay {
    display: block;
  }
}
</style>
