<template>
  <header class="header-08">
    <div class="header-container">
      <div class="logo-group">
        <a href="/" class="domain-logo">b-2b<span class="dot">.</span>com</a>
        <div class="industry-tag">{{ industryName }}</div>
      </div>
      
      <nav class="nav-horizontal">
        <div class="nav-wrapper">
          <a :href="`/i/${subdomain}`" class="nav-item">Home</a>
          
          <div class="nav-item has-dropdown">
            <a :href="`/i/${subdomain}/news`" class="drop-trigger">
              News Center
              <el-icon class="arrow"><ArrowDown /></el-icon>
            </a>
            <div class="dropdown-menu">
              <div class="dropdown-inner">
                <div class="dropdown-column">
                  <h4>Industry News</h4>
                  <a :href="`/i/${subdomain}/news`">Latest Updates</a>
                  <a :href="`/i/${subdomain}/news`">Market Trends</a>
                  <a :href="`/i/${subdomain}/news`">Technology</a>
                </div>
                <div class="dropdown-column">
                  <h4>Insights</h4>
                  <a :href="`/i/${subdomain}/news`">Reports</a>
                  <a :href="`/i/${subdomain}/news`">Analysis</a>
                  <a :href="`/i/${subdomain}/news`">Events</a>
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
          <a href="https://b-2b.com/login" class="login-link">Login</a>
          <a href="https://b-2b.com/register" class="reg-btn">Join Now</a>
        </template>
      </div>

      <button class="mobile-open" @click="isMobileOpen = !isMobileOpen">
        <el-icon><Menu v-if="!isMobileOpen" /><Close v-else /></el-icon>
      </button>

      <div class="mobile-nav" :class="{ 'open': isMobileOpen }">
        <a :href="`/i/${subdomain}`" @click="isMobileOpen = false">Home</a>
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

defineProps<{
  industryName: string
  subdomain?: string
}>()

const { user, logout } = useAuth()
const isMobileOpen = ref(false)
</script>

<style scoped>
.header-08 {
  background: #eef4fb;
  height: 72px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #d6e4f0;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-container {
  max-width: 1360px;
  margin: 0 auto;
  padding: 0 2.5rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-group {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.domain-logo {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 1.25rem;
  font-weight: 800;
  color: #1e40af;
  text-decoration: none;
  letter-spacing: -0.03em;
}

.dot {
  color: #3b82f6;
}

.industry-tag {
  font-family: 'Inter', 'Outfit', sans-serif;
  background: #ffffff;
  color: #1e3a8a;
  padding: 0.3rem 0.75rem;
  border-radius: 6px;
  font-size: 0.8125rem;
  font-weight: 700;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.nav-wrapper {
  display: flex;
  gap: 0.25rem;
}

.nav-item {
  text-decoration: none;
  color: #334155;
  font-weight: 600;
  font-size: 0.8125rem;
  padding: 0.625rem 1rem;
  border-radius: 8px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  letter-spacing: 0.01em;
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
  gap: 0.375rem;
  font-weight: 600;
  font-size: 0.8125rem;
}

.arrow {
  font-size: 0.625rem;
  transition: transform 0.3s;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%) translateY(4px);
  background: white;
  min-width: 380px;
  border-radius: 12px;
  box-shadow: 0 8px 30px -6px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.04);
  padding: 1.25rem;
  opacity: 0;
  visibility: hidden;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
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
  gap: 1.5rem;
}

.dropdown-column h4 {
  font-size: 0.6875rem;
  text-transform: uppercase;
  color: #94a3b8;
  letter-spacing: 0.1em;
  margin-bottom: 0.75rem;
  font-weight: 700;
}

.dropdown-column a {
  display: block;
  text-decoration: none;
  font-size: 0.8125rem;
  color: #334155;
  padding: 0.375rem 0;
  font-weight: 500;
  transition: color 0.2s;
}

.dropdown-column a:hover {
  color: #1e40af;
}

.mobile-open {
  display: none;
  background: none;
  border: none;
  font-size: 1.35rem;
  cursor: pointer;
  color: #1e293b;
  padding: 0.5rem;
  border-radius: 8px;
}

.mobile-open:hover {
  background: #dbeafe;
}

.auth-cluster {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.login-link {
  text-decoration: none;
  color: #334155;
  font-weight: 600;
  font-size: 0.8125rem;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  transition: all 0.2s;
}

.login-link:hover {
  background: #dbeafe;
  color: #1e40af;
}

.reg-btn {
  background: #1e40af;
  color: white;
  text-decoration: none;
  font-size: 0.8125rem;
  font-weight: 700;
  padding: 0.5rem 1.25rem;
  border-radius: 8px;
  transition: all 0.25s ease;
}

.reg-btn:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px -2px rgba(30, 64, 175, 0.3);
}

.auth-icon-btn {
  background: white;
  color: #1e40af;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  text-decoration: none;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  transition: all 0.2s;
}

.auth-icon-btn:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.logout-text-btn {
  background: none;
  border: none;
  color: #64748b;
  font-weight: 600;
  font-size: 0.8125rem;
  cursor: pointer;
  transition: color 0.2s;
}

.logout-text-btn:hover {
  color: #ef4444;
}

.mobile-nav {
  display: none;
}

@media (max-width: 1024px) {
  .nav-horizontal, .auth-cluster {
    display: none;
  }
  
  .mobile-open {
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
    background: #eef4fb;
    padding: 1.25rem 1.5rem;
    gap: 0.375rem;
    border-bottom: 2px solid #d6e4f0;
    transform: translateY(-110%);
    opacity: 0;
    transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 999;
  }

  .mobile-nav.open {
    transform: translateY(0);
    opacity: 1;
  }

  .mobile-nav a {
    text-decoration: none;
    color: #1e293b;
    font-weight: 600;
    padding: 0.875rem 1rem;
    background: white;
    border-radius: 8px;
    text-align: center;
    transition: all 0.2s;
  }

  .mobile-nav a:hover {
    background: #dbeafe;
    color: #1e40af;
  }

  .mobile-auth-stack {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    margin-top: 0.5rem;
  }

  .mobile-auth-stack a.primary {
    background: #1e40af;
    color: white;
  }
}
</style>
