<template>
  <div class="header-03-wrapper">
    <header class="header-03">
      <div class="logo-section">
        <a href="/" class="domain-logo">b-2b.com</a>
        <div class="industry-badge">{{ industryName }}</div>
      </div>
      
      <nav class="nav-vertical">
        <a :href="subdomain ? `/i/${subdomain}` : '/'" class="nav-item">
          <span class="nav-icon">■</span>
          <span class="label">Home</span>
        </a>
        <NuxtLink to="/pricing" class="nav-item">
          <span class="nav-icon">■</span>
          <span class="label">Packages</span>
        </NuxtLink>
        <a :href="subdomain ? `/i/${subdomain}/news` : '/news'" class="nav-item">
          <span class="nav-icon">■</span>
          <span class="label">News Center</span>
        </a>
        <a :href="subdomain ? `/i/${subdomain}/about` : '/about'" class="nav-item">
          <span class="nav-icon">■</span>
          <span class="label">About Us</span>
        </a>
        <a :href="subdomain ? `/i/${subdomain}/contact` : '/contact'" class="nav-item">
          <span class="nav-icon">■</span>
          <span class="label">Contact</span>
        </a>
        <div class="auth-sidebar-group">
          <template v-if="user">
            <NuxtLink to="/dashboard" class="nav-item">
              <span class="nav-icon">■</span>
              <span class="label">Dashboard</span>
            </NuxtLink>
            <a href="#" @click.prevent="logout" class="nav-item">
              <span class="nav-icon">■</span>
              <span class="label">Logout</span>
            </a>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="nav-item">
              <span class="nav-icon">■</span>
              <span class="label">Login</span>
            </NuxtLink>
            <NuxtLink to="/register" class="nav-item register-btn-sidebar">
              <span class="nav-icon">■</span>
              <span class="label">Join Now</span>
            </NuxtLink>
          </template>
        </div>
      </nav>

      <div class="header-footer">
        <p>© 2026 {{ industryName }}</p>
      </div>
    </header>

    <!-- Mobile Header (Vertical styles usually need a separate mobile horizontal version) -->
    <header class="mobile-header-03">
      <div class="mobile-container">
        <a href="/" class="domain-logo">b-2b.com</a>
        <button class="menu-toggle" @click="menuOpen = !menuOpen">
          <el-icon><Menu v-if="!menuOpen" /><Close v-else /></el-icon>
        </button>
      </div>
      <div class="mobile-drawer" :class="{ 'is-open': menuOpen }">
        <nav class="mobile-nav">
          <a :href="subdomain ? `/i/${subdomain}` : '/'" @click="menuOpen = false">Home</a>
          <NuxtLink to="/pricing" @click="menuOpen = false">Packages</NuxtLink>
          <a :href="subdomain ? `/i/${subdomain}/news` : '/news'" @click="menuOpen = false">News Center</a>
          <a :href="subdomain ? `/i/${subdomain}/about` : '/about'" @click="menuOpen = false">About Us</a>
          <a :href="subdomain ? `/i/${subdomain}/contact` : '/contact'" @click="menuOpen = false">Contact</a>
          <div class="mobile-auth-section" v-if="!user">
            <NuxtLink to="/login" @click="menuOpen = false">Login</NuxtLink>
            <NuxtLink to="/register" @click="menuOpen = false">Register</NuxtLink>
          </div>
          <div class="mobile-auth-section" v-else>
            <NuxtLink to="/dashboard" @click="menuOpen = false">Dashboard</NuxtLink>
            <a href="#" @click.prevent="logout(); menuOpen = false">Logout</a>
          </div>
        </nav>
      </div>
    </header>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Menu, Close } from '@element-plus/icons-vue'
import { useAuth } from '~/composables/useAuth'
import { navigateTo } from 'nuxt/app'

defineProps<{
  industryName: string
  subdomain?: string
}>()

const { user, logout } = useAuth()
const menuOpen = ref(false)
</script>

<style scoped>
.header-03-wrapper {
  position: relative;
}

.header-03 {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 280px;
  background: #1e293b;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 3rem 2rem;
  z-index: 1000;
  border-right: 1px solid #334155;
}

.logo-section {
  margin-bottom: 4rem;
}

.domain-logo {
  font-size: 1.5rem;
  font-weight: 900;
  color: #ffffff;
  text-decoration: none;
  display: block;
  margin-bottom: 0.5rem;
  letter-spacing: -0.05em;
}

.industry-badge {
  font-size: 0.75rem;
  font-weight: 800;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  background: #0f172a;
  padding: 0.25rem 0.75rem;
  display: inline-block;
  border-radius: 4px;
}

.nav-vertical {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex-grow: 1;
}

.nav-item {
  color: #94a3b8;
  text-decoration: none;
  font-weight: 700;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
}

.nav-icon {
  font-size: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.nav-item:hover {
  color: #ffffff;
  transform: translateX(8px);
}

.nav-item:hover .nav-icon {
  opacity: 1;
}

.auth-sidebar-group {
  margin-top: 3rem;
  border-top: 1px solid #334155;
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.register-btn-sidebar .label {
  color: #3b82f6;
}

.header-footer {
  font-size: 0.75rem;
  color: #475569;
}

/* Mobile styles */
.mobile-header-03 {
  display: none;
}

@media (max-width: 1024px) {
  .header-03 {
    display: none;
  }
  
  .mobile-header-03 {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    background: #1e293b;
    z-index: 1001;
    border-bottom: 1px solid #334155;
  }

  .mobile-container {
    height: 100%;
    padding: 0 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .menu-toggle {
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
  }

  .mobile-drawer {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    bottom: 0;
    background: #0f172a;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    padding: 2rem;
  }

  .mobile-drawer.is-open {
    transform: translateX(0);
  }

  .mobile-nav {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .mobile-nav a {
    color: white;
    text-decoration: none;
    font-size: 1.25rem;
    font-weight: 800;
    text-transform: uppercase;
  }

  .mobile-auth-section {
    border-top: 2px solid #334155;
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
}
</style>
