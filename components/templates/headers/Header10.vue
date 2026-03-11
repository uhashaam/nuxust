<template>
  <header class="header-10">
    <div class="header-container">
      <div class="branding">
        <a href="/" class="domain-logo">b-2b.com</a>
        <span class="industry-label">{{ industryName }}</span>
      </div>
      
      <nav class="retro-nav">
        <a :href="`/i/${subdomain}`" class="nav-item">Home</a>
        <a :href="`/i/${subdomain}/products`" class="nav-item">Technologies</a>
        <a href="https://b-2b.com/pricing" class="nav-item">Packages</a>
        <a :href="`/i/${subdomain}/news`" class="nav-item">News</a>
        <a :href="`/i/${subdomain}/about`" class="nav-item">About</a>
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
          <a :href="`/i/${subdomain}/products`" @click="isOpen = false">TECHNOLOGIES</a>
          <a href="https://b-2b.com/pricing" @click="isOpen = false">PACKAGES</a>
          <a :href="`/i/${subdomain}/news`" @click="isOpen = false">NEWS CENTER</a>
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
  color: #000000;
  height: 75px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid #000000;
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
  gap: 1.5rem;
}

.domain-logo {
  font-family: 'Playfair Display', serif;
  font-size: 1.75rem;
  font-weight: 700;
  color: #000000;
  text-decoration: none;
  letter-spacing: -0.02em;
  font-style: italic;
}

.industry-label {
  font-family: 'Outfit', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.25em;
}

.retro-nav {
  display: flex;
  gap: 2.5rem;
}

.nav-item {
  text-decoration: none;
  color: #000000;
  font-size: 0.8125rem;
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
  background: #000000;
  transition: width 0.3s ease;
}

.nav-item:hover::after {
  width: 100%;
}

.user-retro {
  display: flex;
  align-items: center;
  gap: 2.5rem;
}

.retro-logout {
  background: none;
  border: 1px solid #000;
  font-size: 0.625rem;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  letter-spacing: 0.1em;
}

.menu-btn {
  display: none;
  background: none;
  border: 1px solid #000000;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.btn-text {
  font-size: 0.75rem;
  letter-spacing: 0.2em;
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
    background: white;
    z-index: 1000;
    padding: 6rem 2rem;
    transform: translateY(-100%);
    transition: transform 0.4s ease;
  }

  .mobile-overlay.visible {
    transform: translateY(0);
  }

  .mobile-links {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .mobile-links a {
    font-size: 1.5rem;
    color: black;
    text-decoration: none;
    letter-spacing: 0.1em;
    border-bottom: 1px solid #eee;
    padding-bottom: 0.5rem;
  }
}
</style>
