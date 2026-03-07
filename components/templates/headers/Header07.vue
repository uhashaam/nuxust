<template>
  <header class="header-07" :class="{ 'is-scrolled': isScrolled }">
    <div class="header-container">
      <div class="logo-section">
        <a href="/" class="domain-label">b-2b.com</a>
        <span class="industry-name">{{ industryName }}</span>
      </div>
      
      <nav class="core-nav">
        <a :href="`/i/${subdomain}`" class="nav-item">Home</a>
        <a href="https://b-2b.com/pricing" class="nav-item">Packages</a>
        <a :href="`/i/${subdomain}/news`" class="nav-item">News</a>
        <div class="auth-minimal">
          <template v-if="user">
            <a href="https://b-2b.com/dashboard" class="nav-item">Dashboard</a>
            <a href="#" @click.prevent="logout" class="nav-item">Logout</a>
          </template>
          <template v-else>
            <a href="https://b-2b.com/login" class="nav-item">Login</a>
            <a href="https://b-2b.com/register" class="nav-item bold">Join</a>
          </template>
        </div>
      </nav>

      <button class="mobile-toggle" @click="isOpen = !isOpen">
        <el-icon><Menu v-if="!isOpen" /><Close v-else /></el-icon>
      </button>

      <div class="mobile-overlay" :class="{ 'active': isOpen }">
        <div class="mobile-content">
          <a :href="`/i/${subdomain}`" @click="isOpen = false">Home</a>
          <a href="https://b-2b.com/pricing" @click="isOpen = false">Packages</a>
          <a :href="`/i/${subdomain}/news`" @click="isOpen = false">News Center</a>
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
  color: #ffffff; /* Default to white for transparent state */
}

.header-07.is-scrolled {
  height: 70px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  color: #000000; /* Switch to dark when scrolled */
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
  color: inherit;
  text-decoration: none;
  margin-bottom: 0.25rem;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.is-scrolled .domain-label {
  text-shadow: none;
}

.industry-name {
  font-size: 1.5rem;
  font-weight: 300;
  color: inherit;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 10px rgba(0,0,0,0.3);
}

.is-scrolled .industry-name {
  text-shadow: none;
  font-weight: 700;
}

.core-nav {
  display: flex;
  align-items: center;
  gap: 3rem;
}

.nav-item {
  text-decoration: none;
  color: inherit;
  font-weight: 500;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  position: relative;
  transition: all 0.3s ease;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.is-scrolled .nav-item {
  text-shadow: none;
}

.nav-item:hover {
  opacity: 0.7;
  transform: translateY(-1px);
}

.auth-minimal {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-left: 2rem;
  padding-left: 2rem;
  border-left: 1px solid currentColor;
}

.is-scrolled .auth-minimal {
  border-left-color: rgba(0, 0, 0, 0.1);
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
  color: inherit;
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
