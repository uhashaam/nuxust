<template>
  <header class="header-09">
    <div class="header-container">
      <div class="left-section">
        <div class="icon-stack">
          <el-icon class="ind-icon"><component :is="getIndustryIcon(industryName)" /></el-icon>
        </div>
        <a href="/" class="domain-logo">b-2b<span class="dot">.</span>com</a>
      </div>
      
      <div class="center-section">
        <h1 class="industry-name">{{ industryName }}</h1>
      </div>

      <nav class="nav-right">
        <a :href="getPath(\'\', subdomain)" class="nav-item">Home</a>
        <a :href="getPath(\'/news\', subdomain)" class="nav-item">News Center</a>
        <a :href="getPath(\'/about\', subdomain)" class="nav-item">About Us</a>
        <a :href="getPath(\'/contact\', subdomain)" class="nav-item">Contact</a>
        <div class="auth-side" v-if="!user">
          <a href="https://b-2b.com/login" class="nav-item">Login</a>
        </div>
        <div class="auth-side" v-else>
          <a href="https://b-2b.com/dashboard" class="nav-item accent">Dashboard</a>
          <button class="logout-btn" @click="logout">Logout</button>
        </div>
      </nav>

      <button class="mobile-toggle" @click="isOpen = !isOpen">
        <el-icon><Menu v-if="!isOpen" /><Close v-else /></el-icon>
      </button>

      <div class="mobile-nav" :class="{ 'active': isOpen }">
        <a :href="getPath(\'\', subdomain)" @click="isOpen = false">Home</a>
        <a :href="getPath(\'/news\', subdomain)" @click="isOpen = false">News Center</a>
        <a :href="getPath(\'/about\', subdomain)" @click="isOpen = false">About Us</a>
        <a :href="getPath(\'/contact\', subdomain)" @click="isOpen = false">Contact</a>
        <div class="mobile-auth-row" v-if="!user">
          <a href="https://b-2b.com/login" @click="isOpen = false">Login</a>
          <a href="https://b-2b.com/register" @click="isOpen = false" class="primary">Sign Up</a>
        </div>
        <div class="mobile-auth-row" v-else>
          <a href="https://b-2b.com/dashboard" @click="isOpen = false">Dashboard</a>
          <a href="#" @click.prevent="logout(); isOpen = false">Logout</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Menu, Close } from '@element-plus/icons-vue'
import { useAuth } from '~/composables/useAuth'
import { getIndustryIcon } from '~/utils/icons'

defineProps<{
  industryName: string
  subdomain?: string
}>()

const { user, logout } = useAuth()
const { getPath } = useSubdomainNav()
const isOpen = ref(false)
</script>

<style scoped>
.header-09 {
  background: #ffffff;
  height: 76px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f1f5f9;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-container {
  max-width: 1360px;
  margin: 0 auto;
  padding: 0 2.5rem;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}

.left-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.icon-stack {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #eef2ff, #e0e7ff);
  border-radius: 10px;
}

.ind-icon {
  font-size: 1rem;
  color: #6366f1;
}

.domain-logo {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 1.2rem;
  font-weight: 800;
  color: #0f172a;
  text-decoration: none;
  letter-spacing: -0.03em;
}

.dot {
  color: #6366f1;
}

.center-section {
  text-align: center;
}

.industry-name {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 1.05rem;
  font-weight: 800;
  color: #0f172a;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin: 0;
}

.nav-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.25rem;
}

.nav-item {
  text-decoration: none;
  color: #64748b;
  font-weight: 500;
  font-size: 0.8125rem;
  transition: color 0.2s;
  padding: 0.5rem 0.625rem;
  border-radius: 6px;
  letter-spacing: 0.01em;
}

.nav-item:hover {
  color: #6366f1;
  background: #f8fafc;
}

.auth-side {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: 0.5rem;
  border-left: 1px solid #f1f5f9;
  padding-left: 0.75rem;
}

.nav-item.accent {
  color: #6366f1;
  font-weight: 600;
}

.logout-btn {
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 0.6875rem;
  font-weight: 700;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.375rem 0.5rem;
  border-radius: 4px;
  transition: all 0.2s;
}

.logout-btn:hover {
  color: #ef4444;
  background: #fef2f2;
}

.mobile-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.35rem;
  cursor: pointer;
  justify-self: end;
  padding: 0.5rem;
  border-radius: 8px;
  color: #334155;
}

.mobile-toggle:hover {
  background: #f1f5f9;
}

.mobile-nav {
  display: none;
}

@media (max-width: 1200px) {
  .header-container {
    display: flex;
    justify-content: space-between;
  }
  
  .nav-right {
    display: none;
  }
  
  .mobile-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mobile-nav {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 76px;
    left: 0;
    right: 0;
    background: white;
    padding: 1.25rem 1.5rem;
    gap: 0.375rem;
    border-bottom: 1px solid #f1f5f9;
    transform: translateY(-110%);
    opacity: 0;
    transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1000;
    box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.08);
  }

  .mobile-nav.active {
    transform: translateY(0);
    opacity: 1;
  }

  .mobile-nav a {
    text-decoration: none;
    color: #0f172a;
    font-weight: 600;
    padding: 0.875rem 1rem;
    background: #f8fafc;
    border-radius: 8px;
    text-align: center;
    transition: all 0.2s;
  }

  .mobile-nav a:hover {
    background: #eef2ff;
    color: #6366f1;
  }

  .mobile-auth-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .mobile-auth-row a.primary {
    background: #6366f1;
    color: white;
  }
}
</style>
