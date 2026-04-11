<template>
  <header class="header-06">
    <div class="header-container">
      <div class="logo-area">
        <a href="/" class="domain-logo">b-2b<span class="dot">.</span>com</a>
        <span class="industry-name">{{ industryName }}</span>
      </div>
      
      <nav class="nav-center">
        <a :href="getPath(\'\', subdomain)" class="nav-item"><span>Home</span></a>
        <a :href="getPath(\'/news\', subdomain)" class="nav-item"><span>News Center</span></a>
        <a :href="getPath(\'/about\', subdomain)" class="nav-item"><span>About Us</span></a>
        <a :href="getPath(\'/contact\', subdomain)" class="nav-item"><span>Contact</span></a>
      </nav>

      <div class="right-panel">
        <div class="auth-box">
          <template v-if="user">
            <a href="https://b-2b.com/dashboard" class="nav-item mini"><span>Dashboard</span></a>
            <button class="logout-btn" @click="logout">Logout</button>
          </template>
          <template v-else>
            <a href="https://b-2b.com/login" class="nav-item mini"><span>Login</span></a>
            <a href="https://b-2b.com/register" class="join-btn">Join</a>
          </template>
        </div>
        <button class="menu-button" @click="mobileOpen = !mobileOpen">
          <el-icon><Menu v-if="!mobileOpen" /><Close v-else /></el-icon>
        </button>
      </div>

      <div class="mobile-menu" :class="{ 'is-open': mobileOpen }">
        <a :href="getPath(\'\', subdomain)" @click="mobileOpen = false">Home</a>
        <a :href="getPath(\'/news\', subdomain)" @click="mobileOpen = false">News Center</a>
        <a :href="getPath(\'/about\', subdomain)" @click="mobileOpen = false">About Us</a>
        <a :href="getPath(\'/contact\', subdomain)" @click="mobileOpen = false">Contact</a>
        <div class="mobile-auth-btn" v-if="!user">
          <a href="https://b-2b.com/login" @click="mobileOpen = false">Login</a>
          <a href="https://b-2b.com/register" @click="mobileOpen = false" class="highlight">Register</a>
        </div>
        <div class="mobile-auth-btn" v-else>
          <a href="https://b-2b.com/dashboard" @click="mobileOpen = false">Dashboard</a>
          <a href="#" @click.prevent="logout(); mobileOpen = false">Logout</a>
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
const mobileOpen = ref(false)
</script>

<style scoped>
.header-06 {
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  color: #ffffff;
  height: 72px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.header-container {
  max-width: 1360px;
  margin: 0 auto;
  padding: 0 2.5rem;
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 3rem;
}

.logo-area {
  display: flex;
  align-items: baseline;
  gap: 0.625rem;
}

.domain-logo {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 1.35rem;
  font-weight: 800;
  color: #ffffff;
  text-decoration: none;
  letter-spacing: -0.03em;
}

.dot {
  color: #3b82f6;
}

.industry-name {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #64748b;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.nav-center {
  display: flex;
  justify-content: center;
  gap: 2.5rem;
}

.nav-item {
  color: rgba(248, 250, 252, 0.75);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  position: relative;
  padding: 0.5rem 0;
  transition: color 0.25s ease;
  letter-spacing: 0.02em;
}

.nav-item span {
  position: relative;
  z-index: 1;
}

.nav-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #3b82f6;
  transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 2px;
}

.nav-item:hover {
  color: #ffffff;
}

.nav-item:hover::after {
  width: 100%;
}

.menu-button {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.35rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background 0.2s;
}

.menu-button:hover {
  background: rgba(255, 255, 255, 0.06);
}

.auth-box {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-item.mini {
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.5);
}

.nav-item.mini:hover {
  color: #ffffff;
}

.join-btn {
  background: #3b82f6;
  color: white;
  text-decoration: none;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.5rem 1.25rem;
  border-radius: 8px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  transition: all 0.25s ease;
}

.join-btn:hover {
  background: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 4px 16px -2px rgba(59, 130, 246, 0.4);
}

.logout-btn {
  background: rgba(255, 255, 255, 0.06);
  border: none;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  transition: all 0.2s;
}

.logout-btn:hover {
  background: rgba(239, 68, 68, 0.15);
  color: #fca5a5;
}

.mobile-menu {
  display: none;
}

@media (max-width: 1024px) {
  .nav-center {
    display: none;
  }
  
  .auth-box {
    display: none;
  }

  .menu-button {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mobile-menu {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 72px;
    left: 0;
    right: 0;
    background: #0f172a;
    padding: 1.5rem 2rem;
    gap: 0.375rem;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    transform: translateY(-110%);
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1000;
  }

  .mobile-menu.is-open {
    transform: translateY(0);
    opacity: 1;
  }

  .mobile-menu a {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    font-size: 1rem;
    font-weight: 600;
    text-align: center;
    padding: 1rem;
    border-radius: 8px;
    transition: background 0.2s;
  }

  .mobile-menu a:hover {
    background: rgba(255, 255, 255, 0.04);
    color: white;
  }

  .mobile-auth-btn {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    margin-top: 0.75rem;
  }

  .mobile-auth-btn a.highlight {
    background: #3b82f6;
    color: white;
  }
}
</style>
