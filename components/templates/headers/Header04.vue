<template>
  <header class="header-04">
    <div class="top-row">
      <div class="container">
        <a :href="subdomain ? `/i/${subdomain}` : '/'" class="domain-logo">b-2b.com</a>
        <div class="industry-name">{{ industryName }}</div>
      </div>
    </div>
    <div class="bottom-row">
      <div class="container">
        <nav class="nav-links">
          <a :href="subdomain ? `/i/${subdomain}` : '/'" class="nav-item">Home</a>
          <div class="dot"></div>
          <NuxtLink to="/pricing" class="nav-item">Packages</NuxtLink>
          <div class="dot"></div>
          <a :href="subdomain ? `/i/${subdomain}/news` : '/news'" class="nav-item">News</a>
          <div class="dot"></div>
          <a :href="subdomain ? `/i/${subdomain}/about` : '/about'" class="nav-item">About</a>
          <div class="dot"></div>
          <a :href="subdomain ? `/i/${subdomain}/contact` : '/contact'" class="nav-item">Contact</a>
        </nav>
      </div>
    </div>

    <div class="auth-row">
      <div class="container justify-center">
        <template v-if="user">
          <NuxtLink to="/dashboard" class="auth-link">Personal Center</NuxtLink>
          <span class="auth-divider">/</span>
          <a href="#" @click.prevent="logout" class="auth-link">Sign Out</a>
        </template>
        <template v-else>
          <NuxtLink to="/login" class="auth-link">Login</NuxtLink>
          <span class="auth-divider">/</span>
          <NuxtLink to="/register" class="auth-link">Register</NuxtLink>
        </template>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div class="mobile-nav-bar">
      <a :href="subdomain ? `/i/${subdomain}` : '/'" class="mobile-logo">b-2b.com</a>
      <button class="mobile-toggle" @click="isOpen = !isOpen">
        <el-icon><Menu v-if="!isOpen" /><Close v-else /></el-icon>
      </button>
    </div>
    <div class="mobile-overlay" :class="{ 'active': isOpen }">
      <nav class="mobile-menu">
        <a :href="subdomain ? `/i/${subdomain}` : '/'" @click="isOpen = false">Home</a>
        <NuxtLink to="/pricing" @click="isOpen = false">Packages</NuxtLink>
        <a :href="subdomain ? `/i/${subdomain}/news` : '/news'" @click="isOpen = false">News Center</a>
        <a :href="subdomain ? `/i/${subdomain}/about` : '/about'" @click="isOpen = false">About Us</a>
        <a :href="subdomain ? `/i/${subdomain}/contact` : '/contact'" @click="isOpen = false">Contact</a>
        <div class="mobile-auth-grid" v-if="!user">
          <NuxtLink to="/login" @click="isOpen = false">Login</NuxtLink>
          <NuxtLink to="/register" @click="isOpen = false">Register</NuxtLink>
        </div>
        <div class="mobile-auth-grid" v-else>
          <NuxtLink to="/dashboard" @click="isOpen = false">Dashboard</NuxtLink>
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
const isOpen = ref(false)
</script>

<style scoped>
.header-04 {
  background: #ffffff;
}

.top-row {
  border-bottom: 3px solid #000000;
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
  font-size: 2rem;
  font-weight: 900;
  color: #000000;
  text-decoration: none;
  text-transform: lowercase;
}

.industry-name {
  font-size: 1.125rem;
  font-weight: 700;
  color: #000000;
  text-transform: uppercase;
  border: 2px solid #000000;
  padding: 0.5rem 1.5rem;
}

.bottom-row {
  border-bottom: 2px solid #000000;
  padding: 1rem 0;
}

.nav-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin: 0 auto;
}

.nav-item {
  text-decoration: none;
  color: #000000;
  font-weight: 800;
  font-size: 1rem;
  text-transform: uppercase;
  transition: color 0.2s;
}

.nav-item:hover {
  color: #4ade80; /* Green for agriculture/food feel */
}

.dot {
  width: 6px;
  height: 6px;
  background: #e2e8f0;
  border-radius: 50%;
}

/* Mobile Styles */
.mobile-nav-bar {
  display: none;
  height: 70px;
  background: white;
  padding: 0 1.5rem;
  align-items: center;
  justify-content: space-between;
  border-bottom: 3px solid #000;
}

.mobile-logo {
  font-size: 1.5rem;
  font-weight: 900;
  color: black;
  text-decoration: none;
}

.mobile-toggle {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.auth-row {
  border-bottom: 2px solid #000;
  background: #f8fafc;
  padding: 0.5rem 0;
}

.auth-link {
  text-decoration: none;
  color: #000;
  font-weight: 700;
  font-size: 0.875rem;
  text-transform: uppercase;
}

.auth-divider {
  margin: 0 1rem;
  color: #cbd5e1;
}

.justify-center {
  justify-content: center !important;
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
  gap: 2rem;
  text-align: center;
}

.mobile-menu a {
  font-size: 2rem;
  font-weight: 900;
  color: black;
  text-decoration: none;
  text-transform: uppercase;
}

.mobile-auth-grid {
  display: flex;
  justify-content: center;
  gap: 2rem;
  border-top: 3px solid #000;
  padding-top: 2rem;
  margin-top: 1rem;
}

.mobile-auth-grid a {
  font-size: 1.25rem;
}

@media (max-width: 768px) {
  .top-row, .bottom-row {
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
