<template>
  <header class="header-10">
    <div class="header-container">
      <div class="branding">
        <a href="/" class="domain-logo">b-2b.com</a>
        <span class="industry-label">{{ industryName }}</span>
      </div>
      
      <nav class="retro-nav">
        <a :href="`/i/${subdomain}`" class="nav-item">Home</a>
        <a :href="`/i/${subdomain}/news`" class="nav-item">News Center</a>
        <a :href="`/i/${subdomain}/about`" class="nav-item">About Us</a>
        <a :href="`/i/${subdomain}/contact`" class="nav-item">Contact</a>
        <a v-if="!user" href="https://b-2b.com/login" class="nav-item">Login</a>
        <div class="user-retro" v-else>
          <a href="https://b-2b.com/dashboard" class="nav-item">Dashboard</a>
          <button class="retro-logout" @click="logout">EXIT</button>
        </div>
      </nav>

      <button class="menu-btn" @click="isOpen = !isOpen">
        <span class="btn-text">{{ isOpen ? 'CLOSE' : 'MENU' }}</span>
      </button>

      <div class="mobile-overlay" :class="{ 'visible': isOpen }">
        <nav class="mobile-links">
          <a :href="`/i/${subdomain}`" @click="isOpen = false">HOME</a>
          <a :href="`/i/${subdomain}/news`" @click="isOpen = false">NEWS CENTER</a>
          <a :href="`/i/${subdomain}/about`" @click="isOpen = false">ABOUT US</a>
          <a :href="`/i/${subdomain}/contact`" @click="isOpen = false">CONTACT</a>
          <template v-if="!user">
            <a href="https://b-2b.com/login" @click="isOpen = false">LOGIN</a>
            <a href="https://b-2b.com/register" @click="isOpen = false">REGISTER</a>
          </template>
          <template v-else>
            <a href="https://b-2b.com/dashboard" @click="isOpen = false">DASHBOARD</a>
            <a href="#" @click.prevent="logout(); isOpen = false">LOGOUT</a>
          </template>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'

const { user, logout } = useAuth()

defineProps<{
  industryName: string
  subdomain?: string
}>()

const isOpen = ref(false)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

.header-10 {
  background: #ffffff;
  color: #0f0f0f;
  height: 68px;
  display: flex;
  align-items: center;
  border-bottom: 1.5px solid #0f0f0f;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.branding {
  display: flex;
  align-items: baseline;
  gap: 1.25rem;
}

.domain-logo {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f0f0f;
  text-decoration: none;
  letter-spacing: -0.02em;
  font-style: italic;
}

.industry-label {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: #737373;
}

.retro-nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-item {
  text-decoration: none;
  color: #0f0f0f;
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0.25rem 0;
  position: relative;
}

.nav-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background: #0f0f0f;
  transition: width 0.35s ease;
}

.nav-item:hover::after {
  width: 100%;
}

.user-retro {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.retro-logout {
  background: none;
  border: 1px solid #0f0f0f;
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 0.5625rem;
  padding: 0.25rem 0.625rem;
  cursor: pointer;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  transition: all 0.25s ease;
}

.retro-logout:hover {
  background: #0f0f0f;
  color: #ffffff;
}

.menu-btn {
  display: none;
  background: none;
  border: 1px solid #0f0f0f;
  padding: 0.4rem 0.875rem;
  cursor: pointer;
  transition: all 0.25s ease;
}

.menu-btn:hover {
  background: #0f0f0f;
  color: #ffffff;
}

.btn-text {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.mobile-overlay {
  display: none;
}

@media (max-width: 768px) {
  .retro-nav {
    display: none;
  }
  
  .menu-btn {
    display: block;
    z-index: 1001;
  }

  .mobile-overlay {
    display: flex;
    position: fixed;
    inset: 0;
    background: #ffffff;
    z-index: 1000;
    padding: 5rem 2rem;
    transform: translateY(-100%);
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    align-items: flex-start;
    justify-content: center;
  }

  .mobile-overlay.visible {
    transform: translateY(0);
  }

  .mobile-links {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
  }

  .mobile-links a {
    font-family: 'Inter', 'Outfit', sans-serif;
    font-size: 1.25rem;
    font-weight: 400;
    color: #0f0f0f;
    text-decoration: none;
    letter-spacing: 0.12em;
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 0.75rem;
    transition: opacity 0.2s;
  }

  .mobile-links a:hover {
    opacity: 0.5;
  }

  .mobile-links a:last-child {
    border-bottom: none;
  }
}
</style>
