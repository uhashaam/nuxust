<template>
  <header class="header-07" :class="{ 'is-scrolled': isScrolled }">
    <div class="header-container">
      <div class="logo-section">
        <a href="/" class="domain-label">b-2b.com</a>
        <span class="industry-name">{{ industryName }}</span>
      </div>
      
      <nav class="core-nav">
        <a :href="getPath('/', subdomain)" class="nav-item">Home</a>
        <a :href="getPath('/news', subdomain)" class="nav-item">News Center</a>
        <div class="auth-minimal">
          <template v-if="user">
            <a href="https://b-2b.com/dashboard" class="nav-item">Dashboard</a>
            <a href="#" @click.prevent="logout" class="nav-item">Logout</a>
          </template>
          <template v-else>
            <a href="https://b-2b.com/login" class="nav-item">Login</a>
            <a href="https://b-2b.com/register" class="nav-item accent">Join</a>
          </template>
        </div>
      </nav>

      <button class="mobile-toggle" @click="isOpen = !isOpen">
        <el-icon><Menu v-if="!isOpen" /><Close v-else /></el-icon>
      </button>

      <div class="mobile-overlay" :class="{ 'active': isOpen }">
        <div class="mobile-content">
          <a :href="getPath('/', subdomain)" @click="isOpen = false">Home</a>
          <a :href="getPath('/news', subdomain)" @click="isOpen = false">News Center</a>
          <a href="https://b-2b.com/login" v-if="!user" @click="isOpen = false">Login</a>
          <a href="https://b-2b.com/register" v-if="!user" @click="isOpen = false">Register</a>
          <template v-else>
            <a href="https://b-2b.com/dashboard" @click="isOpen = false">Dashboard</a>
            <a href="#" @click.prevent="logout(); isOpen = false">Logout</a>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu, Close } from '@element-plus/icons-vue'
import { useAuth } from '~/composables/useAuth'

defineProps<{
  industryName: string
  subdomain?: string
}>()

const { user, logout } = useAuth()
const { getPath } = useSubdomainNav()
const isScrolled = ref(false)
const isOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.header-07 {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: transparent;
  display: flex;
  align-items: center;
  z-index: 1000;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  color: #ffffff;
}

.header-07.is-scrolled {
  height: 64px;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  color: #0f172a;
}

.header-container {
  max-width: 1360px;
  margin: 0 auto;
  padding: 0 3rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-section {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.domain-label {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 0.6875rem;
  font-weight: 800;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: inherit;
  text-decoration: none;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.3);
  opacity: 0.7;
}

.is-scrolled .domain-label {
  text-shadow: none;
  opacity: 0.5;
}

.industry-name {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 1.375rem;
  font-weight: 300;
  color: inherit;
  letter-spacing: -0.01em;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
}

.is-scrolled .industry-name {
  text-shadow: none;
  font-weight: 600;
  font-size: 1.125rem;
}

.core-nav {
  display: flex;
  align-items: center;
  gap: 2.5rem;
}

.nav-item {
  text-decoration: none;
  color: inherit;
  font-weight: 400;
  font-size: 0.8125rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  position: relative;
  transition: opacity 0.25s ease;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  padding: 0.25rem 0;
}

.is-scrolled .nav-item {
  text-shadow: none;
  font-weight: 500;
}

.nav-item:hover {
  opacity: 0.6;
}

.nav-item.accent {
  font-weight: 700;
  opacity: 1;
}

.auth-minimal {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-left: 1.5rem;
  padding-left: 2rem;
  border-left: 1px solid currentColor;
  opacity: 0.6;
}

.is-scrolled .auth-minimal {
  border-left-color: rgba(0, 0, 0, 0.1);
}

.mobile-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.35rem;
  cursor: pointer;
  color: inherit;
  padding: 0.5rem;
  border-radius: 8px;
}

.mobile-overlay {
  display: none;
}

@media (max-width: 768px) {
  .core-nav {
    display: none;
  }
  
  .mobile-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mobile-overlay {
    display: flex;
    position: fixed;
    inset: 0;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    padding: 6rem 2rem;
    transform: translateX(100%);
    transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 999;
  }

  .mobile-overlay.active {
    transform: translateX(0);
  }

  .mobile-content {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }

  .mobile-content a {
    font-size: 2rem;
    font-weight: 300;
    color: #0f172a;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    transition: opacity 0.2s;
  }

  .mobile-content a:hover {
    opacity: 0.5;
  }
}
</style>
