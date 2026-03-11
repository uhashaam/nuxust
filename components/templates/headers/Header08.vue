<template>
  <header class="header-08">
    <div class="header-container">
      <div class="logo-group">
        <a href="/" class="domain-logo">b-2b.com</a>
        <div class="industry-tag">{{ industryName }}</div>
      </div>
      
      <nav class="nav-horizontal">
        <div class="nav-wrapper">
          <a :href="`/i/${subdomain}`" class="nav-item">Home</a>
          <a :href="`/i/${subdomain}/products`" class="nav-item">Technologies</a>
          <a href="https://b-2b.com/pricing" class="nav-item">Packages</a>
          
          <div class="nav-item has-dropdown">
            <a :href="`/i/${subdomain}/news`" class="drop-trigger">
              News Center
              <el-icon class="arrow"><ArrowDown /></el-icon>
            </a>
            <div class="dropdown-menu">
              <div class="dropdown-inner">
                <div class="dropdown-column">
                  <h4>Industry News</h4>
                  <a :href="`/i/${subdomain}/news/trends`">Market Trends</a>
                  <a :href="`/i/${subdomain}/news/tech`">Technology</a>
                  <a :href="`/i/${subdomain}/news/events`">Events</a>
                </div>
                <div class="dropdown-column">
                  <h4>Insights</h4>
                  <a :href="`/i/${subdomain}/news/reports`">Reports</a>
                  <a :href="`/i/${subdomain}/news/interviews`">Interviews</a>
                  <a :href="`/i/${subdomain}/news/analysis`">Analysis</a>
                </div>
              </div>
            </div>
          </div>

          <a :href="`/i/${subdomain}/about`" class="nav-item">About Us</a>
          <a :href="`/i/${subdomain}/contact`" class="nav-item">Contact</a>
        </div>
      </nav>

      <div class="auth-cluster">
        <template v-if="user">
          <a href="https://b-2b.com/dashboard" class="auth-icon-btn"><el-icon><User /></el-icon></a>
          <button class="logout-text-btn" @click="logout">Logout</button>
        </template>
        <template v-else>
          <a href="https://b-2b.com/login" class="nav-item">Login</a>
          <el-button type="primary" size="large" @click="navigateTo('https://b-2b.com/register', { external: true })" class="reg-btn-8">Join Now</el-button>
        </template>
      </div>

      <button class="mobile-open" @click="isMobileOpen = !isMobileOpen">
        <el-icon><Menu v-if="!isMobileOpen" /><Close v-else /></el-icon>
      </button>

      <div class="mobile-nav" :class="{ 'open': isMobileOpen }">
        <a :href="`/i/${subdomain}`" @click="isMobileOpen = false">Home</a>
        <a :href="`/i/${subdomain}/products`" @click="isMobileOpen = false">Technologies</a>
        <a href="https://b-2b.com/pricing" @click="isMobileOpen = false">Packages</a>
        <a :href="`/i/${subdomain}/news`" @click="isMobileOpen = false">News Center</a>
        <a :href="`/i/${subdomain}/about`" @click="isMobileOpen = false">About Us</a>
        <a :href="`/i/${subdomain}/contact`" @click="isMobileOpen = false">Contact</a>
        <div class="mobile-auth-stack" v-if="!user">
          <a href="https://b-2b.com/login" @click="isMobileOpen = false">Login</a>
          <a href="https://b-2b.com/register" @click="isMobileOpen = false" class="primary">Join Free</a>
        </div>
        <div class="mobile-auth-stack" v-else>
          <a href="https://b-2b.com/dashboard" @click="isMobileOpen = false">Dashboard</a>
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
  background: rgba(240, 247, 255, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  height: 85px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(219, 234, 254, 0.8);
  position: sticky;
  top: 0;
  z-index: 1000;
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
  font-family: 'Outfit', sans-serif;
  font-size: 1.35rem;
  font-weight: 800;
  color: #1e40af;
  text-decoration: none;
  letter-spacing: -0.02em;
}

.industry-tag {
  font-family: 'Outfit', sans-serif;
  background: #ffffff;
  color: #1e3a8a;
  padding: 0.375rem 0.875rem;
  border-radius: 6px;
  font-size: 0.9375rem;
  font-weight: 700;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.02);
  letter-spacing: 0.05em;
  text-transform: uppercase;
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
