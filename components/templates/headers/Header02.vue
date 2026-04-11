<template>
  <header class="header-02">
    <div class="header-container">
      <div class="logo-section">
        <a href="/" class="domain-logo">b-2b<span class="dot">.</span>com</a>
        <span class="separator">/</span>
        <span class="industry-name">{{ industryName }}</span>
      </div>
      
      <nav class="nav-center">
        <a :href="getPath(\'\', subdomain)" class="nav-item">Home</a>
        <a :href="getPath(\'/news\', subdomain)" class="nav-item">News Center</a>
        <a :href="getPath(\'/about\', subdomain)" class="nav-item">About Us</a>
        <a :href="getPath(\'/contact\', subdomain)" class="nav-item">Contact</a>
      </nav>

      <div class="right-actions">
        <template v-if="user">
          <a href="https://b-2b.com/dashboard" class="action-link">Dashboard</a>
          <el-button link @click="logout">Logout</el-button>
        </template>
        <template v-else>
          <a href="https://b-2b.com/login" class="action-link">Login</a>
          <a href="https://b-2b.com/register" class="register-btn">Register</a>
        </template>
      </div>

      <button class="mobile-toggle" @click="menuOpen = !menuOpen">
        <el-icon><Menu v-if="!menuOpen" /><Close v-else /></el-icon>
      </button>

      <div class="mobile-nav" :class="{ 'is-open': menuOpen }">
        <a :href="getPath(\'\', subdomain)" @click="menuOpen = false">Home</a>
        <a :href="getPath(\'/news\', subdomain)" @click="menuOpen = false">News Center</a>
        <a :href="getPath(\'/about\', subdomain)" @click="menuOpen = false">About Us</a>
        <a :href="getPath(\'/contact\', subdomain)" @click="menuOpen = false">Contact</a>
        <div class="mobile-split" v-if="!user">
          <a href="https://b-2b.com/login" @click="menuOpen = false">Login</a>
          <a href="https://b-2b.com/register" @click="menuOpen = false" class="primary">Join Now</a>
        </div>
        <div class="mobile-split" v-else>
          <a href="https://b-2b.com/dashboard" @click="menuOpen = false">Dashboard</a>
          <a href="#" @click.prevent="logout(); menuOpen = false">Logout</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Menu, Close } from '@element-plus/icons-vue'
import { useAuth } from '~/composables/useAuth'

defineProps<{
  industryName: string
  subdomain?: string
}>()

const { user, logout } = useAuth()
const { getPath } = useSubdomainNav()
const menuOpen = ref(false)
</script>

<style scoped>
.header-02 {
  background: #f5f6f8;
  height: 80px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e8eaed;
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

.logo-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.domain-logo {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-weight: 800;
  color: #1a1a2e;
  text-decoration: none;
  font-size: 1.2rem;
  letter-spacing: -0.03em;
}

.dot {
  color: #f59e0b;
}

.separator {
  color: #d1d5db;
  font-weight: 300;
  margin: 0 0.125rem;
}

.industry-name {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-weight: 600;
  color: #6b7280;
  font-size: 0.9375rem;
  letter-spacing: 0.02em;
}

.nav-center {
  display: flex;
  gap: 0.375rem;
  background: #ffffff;
  padding: 0.3rem;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.03);
}

.nav-item {
  text-decoration: none;
  color: #6b7280;
  font-weight: 600;
  font-size: 0.8125rem;
  padding: 0.625rem 1.25rem;
  border-radius: 10px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 0.01em;
}

.nav-item:hover {
  background: #1a1a2e;
  color: #ffffff;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px -2px rgba(26, 26, 46, 0.25);
}

.mobile-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.35rem;
  cursor: pointer;
  color: #334155;
  padding: 0.5rem;
  border-radius: 8px;
}

.mobile-toggle:hover {
  background: #e8eaed;
}

.right-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
}

.action-link {
  text-decoration: none;
  color: #6b7280;
  font-weight: 500;
  font-size: 0.8125rem;
  transition: color 0.2s;
}

.action-link:hover {
  color: #1a1a2e;
}

.register-btn {
  background: #1a1a2e;
  color: white;
  text-decoration: none;
  padding: 0.5rem 1.25rem;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.8125rem;
  transition: all 0.25s ease;
}

.register-btn:hover {
  background: #2d2d4a;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px -2px rgba(26, 26, 46, 0.25);
}

.mobile-nav {
  display: none;
}

@media (max-width: 1024px) {
  .header-container {
    display: flex;
    justify-content: space-between;
  }
  
  .nav-center, .right-actions {
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
    top: 80px;
    left: 0;
    right: 0;
    background: #f5f6f8;
    padding: 1.5rem;
    gap: 0.5rem;
    border-bottom: 2px solid #e8eaed;
    transform: translateY(-110%);
    opacity: 0;
    transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 999;
  }

  .mobile-nav.is-open {
    transform: translateY(0);
    opacity: 1;
  }

  .mobile-nav a {
    text-decoration: none;
    color: #334155;
    font-weight: 700;
    padding: 1rem;
    border-radius: 10px;
    background: white;
    text-align: center;
    transition: all 0.2s;
  }

  .mobile-nav a:hover {
    background: #1a1a2e;
    color: white;
  }

  .mobile-split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    margin-top: 0.75rem;
  }

  .mobile-split a.primary {
    background: #1a1a2e;
    color: white;
  }
}
</style>
