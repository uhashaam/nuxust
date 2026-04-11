<template>
  <div class="header-03-wrapper">
    <header class="header-03">
      <div class="logo-section">
        <a href="/" class="domain-logo">b-2b<span class="dot">.</span>com</a>
        <div class="industry-badge">{{ industryName }}</div>
      </div>
      
      <nav class="nav-vertical">
        <a :href="getPath('/', subdomain)" class="nav-item">
          <span class="nav-indicator"></span>
          <span class="label">Home</span>
        </a>
        <a :href="getPath('/news', subdomain)" class="nav-item">
          <span class="nav-indicator"></span>
          <span class="label">News Center</span>
        </a>
        <a :href="getPath('/about', subdomain)" class="nav-item">
          <span class="nav-indicator"></span>
          <span class="label">About Us</span>
        </a>
        <a :href="getPath('/contact', subdomain)" class="nav-item">
          <span class="nav-indicator"></span>
          <span class="label">Contact</span>
        </a>
        <div class="auth-sidebar-group">
          <template v-if="user">
            <a href="https://b-2b.com/dashboard" class="nav-item">
              <span class="nav-indicator"></span>
              <span class="label">Dashboard</span>
            </a>
            <a href="#" @click.prevent="logout" class="nav-item">
              <span class="nav-indicator"></span>
              <span class="label">Logout</span>
            </a>
          </template>
          <template v-else>
            <a href="https://b-2b.com/login" class="nav-item">
              <span class="nav-indicator"></span>
              <span class="label">Login</span>
            </a>
            <a href="https://b-2b.com/register" class="nav-item cta-link">
              <span class="nav-indicator"></span>
              <span class="label">Join Now</span>
            </a>
          </template>
        </div>
      </nav>

      <div class="header-footer">
        <p>© 2026 {{ industryName }}</p>
      </div>
    </header>

    <!-- Mobile Header -->
    <header class="mobile-header-03">
      <div class="mobile-container">
        <a href="/" class="mobile-logo">b-2b<span class="dot">.</span>com</a>
        <button class="menu-toggle" @click="menuOpen = !menuOpen">
          <el-icon><Menu v-if="!menuOpen" /><Close v-else /></el-icon>
        </button>
      </div>
      <div class="mobile-drawer" :class="{ 'is-open': menuOpen }">
        <nav class="mobile-nav">
          <a :href="getPath('/', subdomain)" @click="menuOpen = false">Home</a>
          <a :href="getPath('/news', subdomain)" @click="menuOpen = false">News Center</a>
          <a :href="getPath('/about', subdomain)" @click="menuOpen = false">About Us</a>
          <a :href="getPath('/contact', subdomain)" @click="menuOpen = false">Contact</a>
          <div class="mobile-auth-section" v-if="!user">
            <a href="https://b-2b.com/login" @click="menuOpen = false">Login</a>
            <a href="https://b-2b.com/register" @click="menuOpen = false" class="cta">Register</a>
          </div>
          <div class="mobile-auth-section" v-else>
            <a href="https://b-2b.com/dashboard" @click="menuOpen = false">Dashboard</a>
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

defineProps<{
  industryName: string
  subdomain?: string
}>()

const { user, logout } = useAuth()
const { getPath } = useSubdomainNav()
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
  width: 260px;
  background: #1b1f2e;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 2.5rem 1.75rem;
  z-index: 1000;
  border-right: 1px solid rgba(255, 255, 255, 0.06);
}

.logo-section {
  margin-bottom: 3rem;
}

.domain-logo {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  color: #ffffff;
  text-decoration: none;
  display: block;
  margin-bottom: 0.75rem;
  letter-spacing: -0.03em;
}

.dot {
  color: #60a5fa;
}

.industry-badge {
  font-size: 0.6875rem;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  background: rgba(255, 255, 255, 0.05);
  padding: 0.375rem 0.75rem;
  display: inline-block;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.nav-vertical {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex-grow: 1;
}

.nav-item {
  color: #94a3b8;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.875rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0.75rem 0.875rem;
  border-radius: 8px;
  letter-spacing: 0.01em;
}

.nav-indicator {
  width: 3px;
  height: 0;
  background: #60a5fa;
  border-radius: 4px;
  transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-item:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.04);
}

.nav-item:hover .nav-indicator {
  height: 18px;
}

.cta-link .label {
  color: #60a5fa;
}

.auth-sidebar-group {
  margin-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.header-footer {
  font-size: 0.6875rem;
  color: #475569;
  letter-spacing: 0.02em;
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
    height: 64px;
    background: #1b1f2e;
    z-index: 1001;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  .mobile-container {
    height: 100%;
    padding: 0 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .mobile-logo {
    font-family: 'Inter', 'Outfit', sans-serif;
    font-size: 1.2rem;
    font-weight: 800;
    color: white;
    text-decoration: none;
    letter-spacing: -0.03em;
  }

  .menu-toggle {
    background: none;
    border: none;
    color: white;
    font-size: 1.35rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 8px;
    transition: background 0.2s;
  }

  .menu-toggle:hover {
    background: rgba(255, 255, 255, 0.06);
  }

  .mobile-drawer {
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    bottom: 0;
    background: #141725;
    transform: translateX(-100%);
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    padding: 1.5rem;
  }

  .mobile-drawer.is-open {
    transform: translateX(0);
  }

  .mobile-nav {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .mobile-nav a {
    color: #e2e8f0;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 600;
    padding: 1rem;
    border-radius: 8px;
    transition: background 0.2s;
  }

  .mobile-nav a:hover {
    background: rgba(255, 255, 255, 0.04);
  }

  .mobile-auth-section {
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    padding-top: 1rem;
    margin-top: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .mobile-auth-section .cta {
    background: #60a5fa;
    color: #0f172a;
    font-weight: 700;
    text-align: center;
    border-radius: 8px;
  }
}
</style>
