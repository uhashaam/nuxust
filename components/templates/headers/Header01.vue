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
        <a :href="subdomain ? `/i/${subdomain}/products` : '/products'" class="nav-item">Technologies</a>
        <a href="https://b-2b.com/pricing" class="nav-item">Packages</a>
        <a :href="subdomain ? `/i/${subdomain}/news` : '/news'" class="nav-item">News</a>
        <a :href="subdomain ? `/i/${subdomain}/about` : '/about'" class="nav-item">About</a>
        <a :href="subdomain ? `/i/${subdomain}/contact` : '/contact'" class="nav-item">Contact</a>
      </nav>

      <div class="auth-group">
        <template v-if="user">
          <a href="https://b-2b.com/dashboard" class="nav-item portal-link">Dashboard</a>
          <el-button type="primary" size="small" @click="logout">Logout</el-button>
        </template>
        <template v-else>
          <a href="https://b-2b.com/login" class="nav-item portal-link">Login</a>
          <el-button type="primary" size="small" @click="window.location.href = 'https://b-2b.com/register'">Join</el-button>
        </template>
      </div>

      <button class="mobile-menu-btn" @click="isMenuOpen = !isMenuOpen">
        <el-icon><Menu v-if="!isMenuOpen" /><Close v-else /></el-icon>
      </button>

      <div class="mobile-nav" :class="{ 'active': isMenuOpen }">
        <a :href="subdomain ? `/i/${subdomain}` : '/'" @click="isMenuOpen = false">Home</a>
        <a :href="subdomain ? `/i/${subdomain}/products` : '/products'" @click="isMenuOpen = false">Technologies</a>
        <a href="https://b-2b.com/pricing" @click="isMenuOpen = false">Packages</a>
        <a :href="subdomain ? `/i/${subdomain}/news` : '/news'" @click="isMenuOpen = false">News</a>
        <a :href="subdomain ? `/i/${subdomain}/about` : '/about'" @click="isMenuOpen = false">About</a>
        <a :href="subdomain ? `/i/${subdomain}/contact` : '/contact'" @click="isMenuOpen = false">Contact</a>
        <div class="mobile-auth" v-if="!user">
          <a href="https://b-2b.com/login" @click="isMenuOpen = false">Login</a>
          <a href="https://b-2b.com/register" @click="isMenuOpen = false">Register</a>
        </div>
        <div class="mobile-auth" v-else>
          <a href="https://b-2b.com/dashboard" @click="isMenuOpen = false">Dashboard</a>
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
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(15, 23, 42, 0.06);
  height: 85px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.header-01.is-scrolled {
  height: 68px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.04), 0 8px 10px -6px rgba(0, 0, 0, 0.01);
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
  font-family: 'Outfit', sans-serif;
  font-size: 1.35rem;
  font-weight: 800;
  color: #0f172a;
  text-decoration: none;
  letter-spacing: -0.03em;
}

.divider {
  color: #cbd5e1;
  font-weight: 300;
}

.industry-name {
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
  font-size: 1.15rem;
  color: #1e293b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.nav-links {
  display: flex;
  gap: 2.5rem;
}

.nav-item {
  position: relative;
  text-decoration: none;
  color: #475569;
  font-weight: 600;
  font-size: 0.9375rem;
  transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0.5rem 0;
}

.nav-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #0f172a;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 2px;
}

.nav-item:hover {
  color: #0f172a;
}

.nav-item:hover::after {
  width: 100%;
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
