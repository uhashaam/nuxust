<template>
  <header class="header-01" :class="{ 'is-scrolled': isScrolled }">
    <div class="header-container">
      <div class="logo-group">
        <a href="/" class="domain-logo">b-2b<span class="logo-dot">.</span>com</a>
        <span class="divider"></span>
        <span class="industry-name">{{ industryName }}</span>
      </div>
      
      <nav class="nav-links">
        <a :href="getPath('/', subdomain)" class="nav-item">Home</a>
        <a :href="getPath('/news', subdomain)" class="nav-item">News Center</a>
        <a :href="getPath('/about', subdomain)" class="nav-item">About Us</a>
        <a :href="getPath('/contact', subdomain)" class="nav-item">Contact</a>
      </nav>

      <div class="auth-group">
        <template v-if="user">
          <a href="https://b-2b.com/dashboard" class="nav-item portal-link">Dashboard</a>
          <el-button type="primary" size="small" @click="logout" class="auth-btn">Logout</el-button>
        </template>
        <template v-else>
          <a href="https://b-2b.com/login" class="nav-item portal-link">Login</a>
          <a href="https://b-2b.com/register" class="join-btn">Get Started</a>
        </template>
      </div>

      <button class="mobile-menu-btn" @click="isMenuOpen = !isMenuOpen">
        <el-icon><Menu v-if="!isMenuOpen" /><Close v-else /></el-icon>
      </button>

      <div class="mobile-nav" :class="{ 'active': isMenuOpen }">
        <a :href="getPath('/', subdomain)" @click="isMenuOpen = false">Home</a>
        <a :href="getPath('/news', subdomain)" @click="isMenuOpen = false">News Center</a>
        <a :href="getPath('/about', subdomain)" @click="isMenuOpen = false">About Us</a>
        <a :href="getPath('/contact', subdomain)" @click="isMenuOpen = false">Contact</a>
        <div class="mobile-auth" v-if="!user">
          <a href="https://b-2b.com/login" @click="isMenuOpen = false">Login</a>
          <a href="https://b-2b.com/register" @click="isMenuOpen = false" class="mobile-join">Get Started</a>
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

defineProps<{
  industryName: string
  subdomain?: string
}>()

const { user, logout } = useAuth()
const { getPath } = useSubdomainNav()
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
  height: 72px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: 1px solid #f1f5f9;
}

.header-01.is-scrolled {
  height: 62px;
  box-shadow: 0 4px 20px -4px rgba(0, 0, 0, 0.06);
}

.header-container {
  max-width: 1360px;
  margin: 0 auto;
  padding: 0 2.5rem;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 3.5rem;
}

.logo-group {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

.domain-logo {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 1.3rem;
  font-weight: 800;
  color: #0f172a;
  text-decoration: none;
  letter-spacing: -0.04em;
}

.logo-dot {
  color: #6366f1;
}

.divider {
  width: 1px;
  height: 20px;
  background: #e2e8f0;
}

.industry-name {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-weight: 700;
  font-size: 0.9375rem;
  color: #1e293b;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.nav-links {
  display: flex;
  gap: 0.25rem;
}

.nav-item {
  position: relative;
  text-decoration: none;
  color: #64748b;
  font-weight: 500;
  font-size: 0.875rem;
  transition: color 0.25s ease;
  padding: 0.5rem 0.875rem;
  border-radius: 6px;
  letter-spacing: 0.01em;
}

.nav-item:hover {
  color: #0f172a;
  background: #f8fafc;
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  font-size: 1.35rem;
  cursor: pointer;
  color: #1e293b;
  margin-left: auto;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background 0.2s;
}

.mobile-menu-btn:hover {
  background: #f1f5f9;
}

.mobile-nav {
  display: none;
}

.auth-group {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;
}

.portal-link {
  font-size: 0.8125rem;
  font-weight: 500;
  color: #64748b;
}

.portal-link:hover {
  color: #0f172a;
}

.join-btn {
  background: #0f172a;
  color: #ffffff;
  text-decoration: none;
  font-size: 0.8125rem;
  font-weight: 600;
  padding: 0.5rem 1.25rem;
  border-radius: 8px;
  transition: all 0.25s ease;
  letter-spacing: 0.01em;
}

.join-btn:hover {
  background: #1e293b;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px -2px rgba(15, 23, 42, 0.2);
}

.auth-btn {
  border-radius: 8px;
  font-weight: 600;
}

@media (max-width: 900px) {
  .nav-links, .auth-group {
    display: none;
  }
  
  .mobile-menu-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mobile-nav {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 72px;
    left: 0;
    right: 0;
    background: #ffffff;
    padding: 1.25rem 1.5rem;
    gap: 0.25rem;
    border-bottom: 1px solid #f1f5f9;
    transform: translateY(-110%);
    opacity: 0;
    transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 999;
    box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.08);
  }

  .mobile-nav.active {
    transform: translateY(0);
    opacity: 1;
  }

  .mobile-nav a {
    text-decoration: none;
    color: #1e293b;
    font-weight: 600;
    font-size: 0.9375rem;
    padding: 0.875rem 1rem;
    border-radius: 8px;
    transition: background 0.2s;
  }

  .mobile-nav a:hover {
    background: #f8fafc;
  }

  .mobile-auth {
    border-top: 1px solid #f1f5f9;
    padding-top: 0.75rem;
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .mobile-join {
    background: #0f172a !important;
    color: white !important;
    text-align: center;
    border-radius: 8px;
    margin-top: 0.25rem;
  }
}
</style>
