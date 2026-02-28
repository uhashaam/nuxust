<template>
  <header class="header-01" :class="{ 'is-scrolled': isScrolled }">
    <div class="header-container">
      <div class="logo-group">
        <a href="/" class="domain-logo">b-2b.com</a>
        <span class="divider">|</span>
        <span class="industry-name">{{ industryName }}</span>
      </div>
      
      <nav class="nav-links">
        <a :href="subdomain ? `/i/${subdomain}` : '/'" class="nav-item">Home</a>
        <NuxtLink to="/pricing" class="nav-item">Packages</NuxtLink>
        <a :href="subdomain ? `/i/${subdomain}/news` : '/news'" class="nav-item">News Center</a>
        <a :href="subdomain ? `/i/${subdomain}/about` : '/about'" class="nav-item">About Us</a>
        <a :href="subdomain ? `/i/${subdomain}/contact` : '/contact'" class="nav-item">Contact</a>
      </nav>

      <div class="auth-group">
        <template v-if="user">
          <NuxtLink to="/dashboard" class="nav-item portal-link">Dashboard</NuxtLink>
          <el-button type="primary" size="small" @click="logout">Logout</el-button>
        </template>
        <template v-else>
          <NuxtLink to="/login" class="nav-item portal-link">Login</NuxtLink>
          <el-button type="primary" size="small" @click="navigateTo('/register')">Join</el-button>
        </template>
      </div>

      <button class="mobile-menu-btn" @click="isMenuOpen = !isMenuOpen">
        <el-icon><Menu v-if="!isMenuOpen" /><Close v-else /></el-icon>
      </button>

      <div class="mobile-nav" :class="{ 'active': isMenuOpen }">
        <a :href="subdomain ? `/i/${subdomain}` : '/'" @click="isMenuOpen = false">Home</a>
        <NuxtLink to="/pricing" @click="isMenuOpen = false">Packages</NuxtLink>
        <a :href="subdomain ? `/i/${subdomain}/news` : '/news'" @click="isMenuOpen = false">News Center</a>
        <a :href="subdomain ? `/i/${subdomain}/about` : '/about'" @click="isMenuOpen = false">About Us</a>
        <a :href="subdomain ? `/i/${subdomain}/contact` : '/contact'" @click="isMenuOpen = false">Contact</a>
        <div class="mobile-auth" v-if="!user">
          <NuxtLink to="/login" @click="isMenuOpen = false">Login</NuxtLink>
          <NuxtLink to="/register" @click="isMenuOpen = false">Register</NuxtLink>
        </div>
        <div class="mobile-auth" v-else>
          <NuxtLink to="/dashboard" @click="isMenuOpen = false">Dashboard</NuxtLink>
          <a href="#" @click.prevent="logout(); isMenuOpen = false">Logout</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu, Close } from '@element-plus/icons-vue'
import { useAuth } from '~/composables/useAuth'
import { navigateTo } from 'nuxt/app'

defineProps<{
  industryName: string
  subdomain?: string
}>()

const { user, logout } = useAuth()
const isScrolled = ref(false)
const isMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.header-01 {
  background: #ffffff;
  border-bottom: 1px solid #f1f5f9;
  height: 80px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}

.header-01.is-scrolled {
  height: 64px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 4rem;
}

.logo-group {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.domain-logo {
  font-size: 1.25rem;
  font-weight: 800;
  color: #1e293b;
  text-decoration: none;
  letter-spacing: -0.025em;
}

.divider {
  color: #cbd5e1;
}

.industry-name {
  font-weight: 800;
  font-size: 1.125rem;
  color: #0f172a;
  text-transform: uppercase;
}

.nav-links {
  display: flex;
  gap: 2.5rem;
}

.nav-item {
  text-decoration: none;
  color: #64748b;
  font-weight: 600;
  font-size: 0.9375rem;
  transition: color 0.2s;
}

.nav-item:hover {
  color: #0f172a;
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #1e293b;
  margin-left: auto;
}

.mobile-nav {
  display: none;
}

.auth-group {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-left: auto;
}

.portal-link {
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
  
  .mobile-menu-btn {
    display: block;
  }

  .mobile-nav {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    background: white;
    padding: 2rem;
    gap: 1.5rem;
    border-bottom: 1px solid #f1f5f9;
    transform: translateY(-100%);
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 999;
  }

  .mobile-nav.active {
    transform: translateY(0);
    opacity: 1;
  }

  .mobile-nav a {
    text-decoration: none;
    color: #1e293b;
    font-weight: 700;
    font-size: 1.125rem;
  }

  .mobile-auth {
    border-top: 1px solid #f1f5f9;
    padding-top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
}
</style>
