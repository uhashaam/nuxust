<template>
  <header class="header-05">
    <div class="header-container">
      <div class="brand-section">
        <a href="/" class="domain-logo">b-2b.com</a>
        <div class="industry-box">
          <el-icon class="industry-icon"><Setting /></el-icon>
          <span class="industry-name">{{ industryName }}</span>
        </div>
      </div>
      
      <nav class="nav-right">
        <a :href="`/i/${subdomain}`" class="nav-item">Home</a>
        <a href="https://b-2b.com/pricing" class="nav-item">Packages</a>
        <a :href="`/i/${subdomain}/news`" class="nav-item">News</a>
        <a :href="`/i/${subdomain}/about`" class="nav-item">About</a>
        <a :href="`/i/${subdomain}/contact`" class="nav-item">Contact</a>

        <div class="auth-pill">
          <template v-if="user">
            <a href="https://b-2b.com/dashboard" class="user-name">Dashboard</a>
            <el-icon class="logout-icon" @click="logout"><SwitchButton /></el-icon>
          </template>
          <template v-else>
            <a href="https://b-2b.com/login" class="login-mini">Login</a>
            <a href="https://b-2b.com/register" class="join-pill">Join</a>
          </template>
        </div>
      </nav>

      <button class="mobile-btn" @click="isOpen = !isOpen">
        <el-icon><Menu v-if="!isOpen" /><Close v-else /></el-icon>
      </button>

      <div class="mobile-nav" :class="{ 'active': isOpen }">
        <a :href="`/i/${subdomain}`" @click="isOpen = false">Home</a>
        <a href="https://b-2b.com/pricing" @click="isOpen = false">Packages</a>
        <a :href="`/i/${subdomain}/news`" @click="isOpen = false">News Center</a>
        <a :href="`/i/${subdomain}/about`" @click="isOpen = false">About Us</a>
        <a :href="`/i/${subdomain}/contact`" @click="isOpen = false">Contact</a>
        <div class="mobile-auth-tray" v-if="!user">
          <a href="https://b-2b.com/login" @click="isOpen = false">Login</a>
          <a href="https://b-2b.com/register" @click="isOpen = false" class="highlight">Register</a>
        </div>
        <div class="mobile-auth-tray" v-else>
          <a href="https://b-2b.com/dashboard" @click="isOpen = false">Dashboard</a>
          <a href="#" @click.prevent="logout(); isOpen = false">Logout</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Menu, Close, Setting, SwitchButton } from '@element-plus/icons-vue'
import { useAuth } from '~/composables/useAuth'

defineProps<{
  industryName: string
  subdomain?: string
}>()

const { user, logout } = useAuth()
const isOpen = ref(false)
</script>

<style scoped>
.header-05 {
  background: #ffffff;
  height: 80px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f1f5f9;
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

.brand-section {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.domain-logo {
  font-size: 1.25rem;
  font-weight: 800;
  color: #0f172a;
  text-decoration: none;
  background: #f8fafc;
  padding: 0.5rem 1rem;
  border-radius: 8px;
}

.industry-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
}

.industry-icon {
  font-size: 1.25rem;
  color: #3b82f6;
}

.industry-name {
  font-weight: 700;
  font-size: 0.9375rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.nav-right {
  display: flex;
  gap: 1.5rem;
}

.nav-item {
  text-decoration: none;
  color: #1e293b;
  font-weight: 600;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.2s;
}

.nav-item:hover {
  background: #f1f5f9;
  color: #3b82f6;
}

.auth-pill {
  display: flex;
  align-items: center;
  background: #f1f5f9;
  padding: 0.25rem 0.25rem 0.25rem 1rem;
  border-radius: 99px;
  gap: 1rem;
  margin-left: 1rem;
}

.login-mini {
  text-decoration: none;
  font-size: 0.75rem;
  font-weight: 800;
  color: #64748b;
  text-transform: uppercase;
}

.join-pill {
  background: #3b82f6;
  color: white;
  text-decoration: none;
  font-size: 0.75rem;
  font-weight: 800;
  padding: 0.5rem 1.25rem;
  border-radius: 99px;
  text-transform: uppercase;
}

.user-name {
  font-size: 0.875rem;
  font-weight: 700;
  color: #1e293b;
  text-decoration: none;
}

.logout-icon {
  cursor: pointer;
  color: #94a3b8;
  padding: 0.5rem;
  border-radius: 50%;
  background: white;
  transition: all 0.2s;
}

.logout-icon:hover {
  color: #ef4444;
  background: #fee2e2;
}

.mobile-btn {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.mobile-nav {
  display: none;
}

@media (max-width: 1024px) {
  .nav-right {
    display: none;
  }
  
  .mobile-btn {
    display: block;
  }

  .mobile-auth-tray {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .mobile-auth-tray a.highlight {
    background: #3b82f6 !important;
    color: white !important;
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
    gap: 1rem;
    border-bottom: 1px solid #f1f5f9;
    transform: translateY(-100%);
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 1000;
  }

  .mobile-nav.active {
    transform: translateY(0);
    opacity: 1;
  }

  .mobile-nav a {
    text-decoration: none;
    color: #1e293b;
    font-weight: 700;
    padding: 1rem;
    border-radius: 8px;
    background: #f8fafc;
  }
}
</style>
