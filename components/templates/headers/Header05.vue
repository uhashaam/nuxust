<template>
  <header class="header-05">
    <div class="header-container">
      <div class="brand-section">
        <a href="/" class="domain-logo">b-2b<span class="dot">.</span>com</a>
        <div class="industry-box">
          <el-icon class="industry-icon"><component :is="getIndustryIcon(industryName)" /></el-icon>
          <span class="industry-name">{{ industryName }}</span>
        </div>
      </div>
      
      <nav class="nav-right">
        <a :href="`/i/${subdomain}`" class="nav-item">Home</a>
        <a :href="`/i/${subdomain}/news`" class="nav-item">News Center</a>
        <a :href="`/i/${subdomain}/about`" class="nav-item">About Us</a>
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
import { Menu, Close, SwitchButton } from '@element-plus/icons-vue'
import { useAuth } from '~/composables/useAuth'
import { getIndustryIcon } from '~/utils/icons'

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
  height: 72px;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand-section {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.domain-logo {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 1.25rem;
  font-weight: 800;
  color: #0f172a;
  text-decoration: none;
  letter-spacing: -0.03em;
}

.dot {
  color: #3b82f6;
}

.industry-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  background: #f8fafc;
  padding: 0.375rem 0.75rem;
  border-radius: 8px;
  border: 1px solid #f1f5f9;
}

.industry-icon {
  font-size: 1rem;
  color: #3b82f6;
}

.industry-name {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-weight: 600;
  font-size: 0.8125rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #64748b;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.nav-item {
  text-decoration: none;
  color: #64748b;
  font-weight: 500;
  font-size: 0.8125rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 0.5rem 0.875rem;
  border-radius: 6px;
  transition: all 0.25s ease;
}

.nav-item:hover {
  background: #f8fafc;
  color: #0f172a;
}

.auth-pill {
  display: flex;
  align-items: center;
  background: #f1f5f9;
  padding: 0.25rem 0.3rem 0.25rem 0.875rem;
  border-radius: 99px;
  gap: 0.75rem;
  margin-left: 0.75rem;
}

.login-mini {
  text-decoration: none;
  font-size: 0.75rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.join-pill {
  background: #3b82f6;
  color: white;
  text-decoration: none;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.5rem 1.125rem;
  border-radius: 99px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  transition: all 0.25s ease;
}

.join-pill:hover {
  background: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px -2px rgba(59, 130, 246, 0.35);
}

.user-name {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #1e293b;
  text-decoration: none;
}

.logout-icon {
  cursor: pointer;
  color: #94a3b8;
  padding: 0.4rem;
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
  font-size: 1.35rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  color: #334155;
}

.mobile-btn:hover {
  background: #f1f5f9;
}

.mobile-nav {
  display: none;
}

@media (max-width: 1024px) {
  .nav-right {
    display: none;
  }
  
  .mobile-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mobile-auth-tray {
    margin-top: 0.5rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }

  .mobile-auth-tray a.highlight {
    background: #3b82f6 !important;
    color: white !important;
  }

  .mobile-nav {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 72px;
    left: 0;
    right: 0;
    background: white;
    padding: 1.25rem 1.5rem;
    gap: 0.25rem;
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
    color: #1e293b;
    font-weight: 600;
    padding: 0.875rem 1rem;
    border-radius: 8px;
    background: #f8fafc;
    text-align: center;
    transition: all 0.2s;
  }

  .mobile-nav a:hover {
    background: #f1f5f9;
  }
}
</style>
