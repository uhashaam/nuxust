<template>
  <header class="header-08">
    <div class="header-container">
      <div class="logo-group">
        <a :href="subdomain ? `/i/${subdomain}` : '/'" class="domain-logo">b-2b.com</a>
        <div class="industry-tag">{{ industryName }}</div>
      </div>
      
      <nav class="nav-horizontal">
        <div class="nav-wrapper">
          <a :href="subdomain ? `/i/${subdomain}` : '/'" class="nav-item">Home</a>
          <NuxtLink to="/pricing" class="nav-item">Packages</NuxtLink>
          
          <div class="nav-item has-dropdown">
            <a :href="subdomain ? `/i/${subdomain}/news` : '/news'" class="drop-trigger">
              News Center
              <el-icon class="arrow"><ArrowDown /></el-icon>
            </a>
            <div class="dropdown-menu">
              <div class="dropdown-inner">
                <div class="dropdown-column">
                  <h4>Industry News</h4>
                  <a href="/news/trends">Market Trends</a>
                  <a href="/news/tech">Technology</a>
                  <a href="/news/events">Events</a>
                </div>
                <div class="dropdown-column">
                  <h4>Insights</h4>
                  <a href="/news/reports">Reports</a>
                  <a href="/news/interviews">Interviews</a>
                  <a href="/news/analysis">Analysis</a>
                </div>
              </div>
            </div>
          </div>

          <a :href="subdomain ? `/i/${subdomain}/about` : '/about'" class="nav-item">About Us</a>
          <a :href="subdomain ? `/i/${subdomain}/contact` : '/contact'" class="nav-item">Contact</a>
        </div>
      </nav>

      <div class="auth-cluster">
        <template v-if="user">
          <NuxtLink to="/dashboard" class="auth-icon-btn"><el-icon><User /></el-icon></NuxtLink>
          <button class="logout-text-btn" @click="logout">Logout</button>
        </template>
        <template v-else>
          <NuxtLink to="/login" class="nav-item">Login</NuxtLink>
          <el-button type="primary" size="large" @click="navigateTo('/register')" class="reg-btn-8">Join Now</el-button>
        </template>
      </div>

      <button class="mobile-open" @click="isMobileOpen = !isMobileOpen">
        <el-icon><Menu v-if="!isMobileOpen" /><Close v-else /></el-icon>
      </button>

      <div class="mobile-nav" :class="{ 'open': isMobileOpen }">
        <a :href="subdomain ? `/i/${subdomain}` : '/'" @click="isMobileOpen = false">Home</a>
        <NuxtLink to="/pricing" @click="isMobileOpen = false">Packages</NuxtLink>
        <a :href="subdomain ? `/i/${subdomain}/news` : '/news'" @click="isMobileOpen = false">News Center</a>
        <a :href="subdomain ? `/i/${subdomain}/about` : '/about'" @click="isMobileOpen = false">About Us</a>
        <a :href="subdomain ? `/i/${subdomain}/contact` : '/contact'" @click="isMobileOpen = false">Contact</a>
        <div class="mobile-auth-stack" v-if="!user">
          <NuxtLink to="/login" @click="isMobileOpen = false">Login</NuxtLink>
          <NuxtLink to="/register" @click="isMobileOpen = false" class="primary">Join Free</NuxtLink>
        </div>
        <div class="mobile-auth-stack" v-else>
          <NuxtLink to="/dashboard" @click="isMobileOpen = false">Dashboard</NuxtLink>
          <a href="#" @click.prevent="logout(); isMobileOpen = false">Sign Out</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Menu, Close, ArrowDown, User } from '@element-plus/icons-vue'
import { useAuth } from '~/composables/useAuth'
import { navigateTo } from 'nuxt/app'

defineProps<{
  industryName: string
  subdomain?: string
}>()

const { user, logout } = useAuth()
const isMobileOpen = ref(false)
</script>

<style scoped>
.header-08 {
  background: #f0f7ff;
  height: 80px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid #dbeafe;
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-group {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.domain-logo {
  font-size: 1.25rem;
  font-weight: 900;
  color: #1e40af;
  text-decoration: none;
}

.industry-tag {
  background: #ffffff;
  color: #1e3a8a;
  padding: 0.375rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 700;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.nav-wrapper {
  display: flex;
  gap: 0.5rem;
}

.nav-item {
  text-decoration: none;
  color: #1e293b;
  font-weight: 600;
  font-size: 0.9375rem;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
}

.nav-item:not(.has-dropdown):hover {
  background: #dbeafe;
  color: #1e40af;
}

.has-dropdown {
  position: relative;
}

.drop-trigger {
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.arrow {
  font-size: 0.75rem;
  transition: transform 0.3s;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  background: white;
  min-width: 400px;
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
}

.has-dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}

.has-dropdown:hover .arrow {
  transform: rotate(180deg);
}

.dropdown-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.dropdown-column h4 {
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #94a3b8;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
}

.dropdown-column a {
  display: block;
  text-decoration: none;
  font-size: 0.875rem;
  color: #334155;
  padding: 0.5rem 0;
  font-weight: 600;
  transition: color 0.2s;
}

.dropdown-column a:hover {
  color: #1e40af;
}

.mobile-open {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #1e293b;
}

.auth-cluster {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.reg-btn-8 {
  border-radius: 12px;
  font-weight: 800;
  background: #1e40af;
}

.auth-icon-btn {
  background: white;
  color: #1e40af;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  text-decoration: none;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
}

.logout-text-btn {
  background: none;
  border: none;
  color: #64748b;
  font-weight: 600;
  cursor: pointer;
}

.mobile-nav {
  display: none;
}

@media (max-width: 1024px) {
  .nav-horizontal {
    display: none;
  }
  
  .mobile-open {
    display: block;
  }

  .mobile-nav {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    background: #f0f7ff;
    padding: 2rem;
    gap: 1rem;
    border-bottom: 2px solid #dbeafe;
    transform: translateY(-100%);
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 999;
  }

  .mobile-nav.open {
    transform: translateY(0);
    opacity: 1;
  }

  .mobile-nav a {
    text-decoration: none;
    color: #1e293b;
    font-weight: 700;
    padding: 1rem;
    background: white;
    border-radius: 8px;
    text-align: center;
  }

  .mobile-auth-stack {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
  }

  .mobile-auth-stack a.primary {
    background: #1e40af;
    color: white;
  }
}
</style>
