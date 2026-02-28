<template>
  <header :class="['main-header', { 'is-scrolled': isScrolled }]">
    <div class="container header-container">
      <NuxtLink :to="subdomain ? `/i/${subdomain}` : '/'" class="logo">
        <span class="logo-icon">🚀</span>
        <span class="logo-text">{{ config.companyAbbreviation }}</span>
      </NuxtLink>

      <nav class="nav-links">
        <NuxtLink :to="subdomain ? `/i/${subdomain}` : '/'" class="nav-item" active-class="active">Home</NuxtLink>
        
        <el-dropdown trigger="hover" class="nav-dropdown">
          <span class="nav-item" :class="{ active: route.path.includes('/news') }">
            News <el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="cat in categories" :key="cat" @click="navigateTo(subdomain ? `/i/${subdomain}/news?category=${cat}` : `/news/category/${cat}`)">
                {{ cat }}
              </el-dropdown-item>
              <el-dropdown-item divided @click="navigateTo(subdomain ? `/i/${subdomain}/news` : '/news')">All News</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        
        <NuxtLink v-if="!subdomain" to="/products" class="nav-item" active-class="active">Technologies</NuxtLink>
        <NuxtLink :to="subdomain ? `/i/${subdomain}/about` : '/about'" class="nav-item" active-class="active">About</NuxtLink>
        <NuxtLink :to="subdomain ? `/i/${subdomain}/contact` : '/contact'" class="nav-item" active-class="active">Contact</NuxtLink>
      </nav>

      <div class="search-box">
        <el-input
          v-model="searchQuery"
          placeholder="Search news..."
          :prefix-icon="Search"
          clearable
          @keyup.enter="handleSearch"
        />
      </div>

      <div class="header-actions">
        <template v-if="user">
          <el-button type="primary" class="admin-btn" @click="navigateTo('/dashboard')">
            Dashboard
          </el-button>
          <el-button @click="logout">Logout</el-button>
        </template>
        <template v-else>
          <NuxtLink to="/login" class="nav-item portal-link">Login</NuxtLink>
          <el-button type="primary" class="admin-btn" @click="navigateTo('/register')">
            Join Now
          </el-button>
        </template>
        
        <button class="mobile-menu-btn" @click="isMobileMenuOpen = !isMobileMenuOpen">
          <el-icon><Menu v-if="!isMobileMenuOpen" /><Close v-else /></el-icon>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <transition name="fade">
      <div v-if="isMobileMenuOpen" class="mobile-menu-overlay" @click="isMobileMenuOpen = false">
        <nav class="mobile-nav" @click.stop>
          <NuxtLink :to="subdomain ? `/i/${subdomain}` : '/'" class="mobile-nav-item" @click="isMobileMenuOpen = false">Home</NuxtLink>
          <NuxtLink v-if="!subdomain" to="/products" class="mobile-nav-item" @click="isMobileMenuOpen = false">Technologies</NuxtLink>
          <NuxtLink :to="subdomain ? `/i/${subdomain}/about` : '/about'" class="mobile-nav-item" @click="isMobileMenuOpen = false">About</NuxtLink>
          <NuxtLink :to="subdomain ? `/i/${subdomain}/contact` : '/contact'" class="mobile-nav-item" @click="isMobileMenuOpen = false">Contact</NuxtLink>
          
          <div class="mobile-search">
            <el-input
              v-model="searchQuery"
              placeholder="Search news..."
              :prefix-icon="Search"
              clearable
              @keyup.enter="handleSearchWithClose"
            />
          </div>

          <div class="mobile-actions">
            <template v-if="user">
              <el-button type="primary" class="admin-btn" @click="navigateTo('/dashboard')">Dashboard</el-button>
              <el-button @click="logout">Logout</el-button>
            </template>
            <template v-else>
              <el-button type="primary" class="admin-btn" @click="navigateTo('/login')">Login</el-button>
              <el-button @click="navigateTo('/register')">Register</el-button>
            </template>
          </div>
        </nav>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Search, ArrowDown, Menu, Close } from '@element-plus/icons-vue'
import { navigateTo, useRoute } from 'nuxt/app'
import { useAuth } from '~/composables/useAuth'

const props = defineProps<{
  subdomain?: string
}>()

const { config } = useCompanyConfig()
const { categories } = useNews()
const { user, logout } = useAuth()
const route = useRoute()
const searchQuery = ref('')
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const handleAdminClick = () => {
  isMobileMenuOpen.value = false
  navigateTo('/admin')
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    const url = props.subdomain 
      ? `/i/${props.subdomain}/news?q=${encodeURIComponent(searchQuery.value.trim())}`
      : `/news?q=${encodeURIComponent(searchQuery.value.trim())}`
    navigateTo(url)
  }
}

const handleSearchWithClose = () => {
  handleSearch()
  isMobileMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.main-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  z-index: 1000;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(8px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.main-header.is-scrolled {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  height: 70px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1600px;
  padding: 0 4rem;
  margin: 0 auto;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  font-weight: 800;
  font-size: 1.5rem;
  color: white;
  transition: color 0.3s;
}

.is-scrolled .logo {
  color: #0f172a;
}

.logo-icon {
  font-size: 1.75rem;
}

.nav-links {
  display: flex;
  gap: 2.5rem;
}

.nav-item {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s;
  position: relative;
}

.nav-item:hover {
  color: white;
}

.is-scrolled .nav-item {
  color: #475569;
}

.is-scrolled .nav-item:hover,
.is-scrolled .nav-item.active {
  color: #6366f1;
}

.nav-item.active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 2px;
  background: #6366f1;
  border-radius: 2px;
}

.portal-link {
  margin-right: -0.5rem;
}

.search-box {
  width: 250px;
}

:deep(.el-input__wrapper) {
  background: rgba(255, 255, 255, 0.08);
  box-shadow: none !important;
  border: 1.5px solid rgba(255, 255, 255, 0.7) !important;
  border-radius: 99px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

:deep(.el-input__wrapper):hover {
  border-color: rgba(255, 255, 255, 1) !important;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.12) !important;
}

:deep(.el-input__wrapper.is-focus) {
  border-color: #a5b4fc !important;
  box-shadow: 0 0 0 3px rgba(165, 180, 252, 0.3) !important;
}

.is-scrolled :deep(.el-input__wrapper) {
  background: #f1f5f9;
  border-color: #94a3b8 !important;
}

.is-scrolled :deep(.el-input__wrapper):hover {
  border-color: #6366f1 !important;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12) !important;
}

:deep(.el-input__inner) {
  color: white !important;
}

:deep(.el-input__inner::placeholder) {
  color: rgba(255, 255, 255, 0.55) !important;
}

.is-scrolled :deep(.el-input__inner) {
  color: #0f172a !important;
}

.is-scrolled :deep(.el-input__inner::placeholder) {
  color: #94a3b8 !important;
}

/* Search icon — white on dark, dark on scrolled */
:deep(.el-input__prefix-inner .el-icon) {
  color: rgba(255, 255, 255, 0.85) !important;
  font-size: 16px;
}

.is-scrolled :deep(.el-input__prefix-inner .el-icon) {
  color: #64748b !important;
}

/* Clear button */
:deep(.el-input__suffix-inner .el-icon) {
  color: rgba(255, 255, 255, 0.7) !important;
}

.is-scrolled :deep(.el-input__suffix-inner .el-icon) {
  color: #64748b !important;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.admin-btn {
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%) !important;
  border: none !important;
  font-weight: 700 !important;
  padding: 0.75rem 1.5rem !important;
  border-radius: 10px !important;
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

.is-scrolled .mobile-menu-btn {
  color: #0f172a;
}

/* Mobile Menu */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(10px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  text-align: center;
}

.mobile-nav-item {
  font-size: 2rem;
  font-weight: 800;
  color: white;
  text-decoration: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .header-container {
    padding: 0 1.5rem;
  }
  
  .nav-links,
  .search-box {
    display: none;
  }
  
  .mobile-menu-btn {
    display: block;
  }
  
  .admin-btn {
    display: none;
  }
  
  .mobile-actions .admin-btn {
    display: inline-block;
  }
  
  .mobile-search {
    margin: 1rem 0;
    width: 100%;
    padding: 0 1.5rem;
  }
  
  /* Ensure input text is visible in mobile menu */
  .mobile-search :deep(.el-input__inner) {
    color: white !important;
    text-align: center;
  }
  
  .mobile-search :deep(.el-input__wrapper) {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 99px;
  }
}
</style>
