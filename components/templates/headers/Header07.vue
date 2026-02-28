<template>
  <header class="header-07" :class="{ 'is-scrolled': isScrolled }">
    <div class="header-container">
      <div class="logo-section">
        <a :href="subdomain ? `/i/${subdomain}` : '/'" class="domain-label">b-2b.com</a>
        <span class="industry-name">{{ industryName }}</span>
      </div>
      
      <nav class="core-nav">
        <a :href="subdomain ? `/i/${subdomain}` : '/'" class="nav-item">Home</a>
        <NuxtLink to="/pricing" class="nav-item">Packages</NuxtLink>
        <a :href="subdomain ? `/i/${subdomain}/news` : '/news'" class="nav-item">News</a>
        <div class="auth-minimal">
          <template v-if="user">
            <NuxtLink to="/dashboard" class="nav-item">Dashboard</NuxtLink>
            <a href="#" @click.prevent="logout" class="nav-item">Logout</a>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="nav-item">Login</NuxtLink>
            <NuxtLink to="/register" class="nav-item bold">Join</NuxtLink>
          </template>
        </div>
      </nav>

      <button class="mobile-toggle" @click="isOpen = !isOpen">
        <el-icon><Menu v-if="!isOpen" /><Close v-else /></el-icon>
      </button>

      <div class="mobile-overlay" :class="{ 'active': isOpen }">
        <div class="mobile-content">
          <a :href="subdomain ? `/i/${subdomain}` : '/'" @click="isOpen = false">Home</a>
          <NuxtLink to="/pricing" @click="isOpen = false">Packages</NuxtLink>
          <a :href="subdomain ? `/i/${subdomain}/news` : '/news'" @click="isOpen = false">News Center</a>
          <NuxtLink v-if="!user" to="/login" @click="isOpen = false">Login</NuxtLink>
          <NuxtLink v-if="!user" to="/register" @click="isOpen = false">Register</NuxtLink>
          <template v-else>
            <NuxtLink to="/dashboard" @click="isOpen = false">Dashboard</NuxtLink>
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
  height: 100px;
  background: transparent;
  display: flex;
  align-items: center;
  z-index: 1000;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.header-07.is-scrolled {
  height: 70px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.header-container {
  max-width: 1400px;
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
}

.domain-label {
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #000000;
  text-decoration: none;
  margin-bottom: 0.25rem;
}

.industry-name {
  font-size: 1.5rem;
  font-weight: 300;
  color: #000000;
  letter-spacing: -0.02em;
}

.core-nav {
  display: flex;
  gap: 3rem;
}

.nav-item {
  text-decoration: none;
  color: #000000;
  font-weight: 500;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  position: relative;
  transition: opacity 0.3s ease;
}

.nav-item:hover {
  opacity: 0.6;
}

.auth-minimal {
  display: flex;
  gap: 2rem;
  margin-left: 2rem;
  padding-left: 2rem;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
}

.nav-item.bold {
  font-weight: 800;
}

.mobile-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.mobile-overlay {
  display: none;
}

@media (max-width: 768px) {
  .core-nav {
    display: none;
  }
  
  .mobile-toggle {
    display: block;
  }

  .mobile-overlay {
    display: flex;
    position: fixed;
    inset: 0;
    background: white;
    padding: 6rem 2rem;
    transform: translateX(100%);
    transition: transform 0.5s ease;
    z-index: 999;
  }

  .mobile-overlay.active {
    transform: translateX(0);
  }

  .mobile-content {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  .mobile-content a {
    font-size: 2.5rem;
    font-weight: 300;
    color: black;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: -0.05em;
  }
}
</style>
