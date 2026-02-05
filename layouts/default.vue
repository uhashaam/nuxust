<template>
  <div class="default-layout">
    <TheHeader />
    <main class="page-content">
      <slot />
    </main>
    <footer class="main-footer">
      <div class="container footer-grid">
        <div class="footer-brand">
          <div class="logo">
            <span class="logo-icon">🚀</span>
            <span class="logo-text">{{ config.companyAbbreviation }}</span>
          </div>
          <p class="brand-description">{{ config.companyFullName }} - Leading the industrial digital transformation.</p>
        </div>
        
        <div class="footer-links">
          <h4>Navigation</h4>
          <NuxtLink to="/">Home</NuxtLink>
          <NuxtLink to="/products">Products</NuxtLink>
          <NuxtLink to="/about">About Us</NuxtLink>
          <NuxtLink to="/news">News</NuxtLink>
          <NuxtLink to="/contact">Contact</NuxtLink>
        </div>

        <div class="footer-contact">
          <h4>Contact Us</h4>
          <p>📧 {{ config.email }}</p>
          <p>📞 {{ config.phoneNumber }}</p>
          <p>📍 {{ config.contactAddress }}</p>
        </div>

        <div class="footer-admin">
          <h4>Administrative</h4>
          <NuxtLink to="/admin">Admin Panel</NuxtLink>
          <div class="filing-info">
             <p>Registration: {{ config.registrationNumber }}</p>
             <p>Domain: {{ config.domainInfo }}</p>
          </div>
          <p class="copyright">{{ config.copyrightText }}</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { config } = useCompanyConfig()
</script>

<style scoped>
.default-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

:global(body) {
  margin: 0 !important;
  padding: 0 !important;
  overflow-x: hidden;
  background: #f8fafc;
}

:global(html) {
  margin: 0 !important;
  padding: 0 !important;
}

.page-content {
  flex: 1;
}

.main-footer {
  background: #0f172a;
  color: #94a3b8;
  padding: 6rem 0 4rem;
  border-top: 1px solid #1e293b;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 4rem;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 4rem;
}

.footer-brand .logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: white;
  text-decoration: none;
  font-weight: 800;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.brand-description {
  max-width: 300px;
  line-height: 1.6;
}

.main-footer h4 {
  color: white;
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.footer-links, .footer-contact, .footer-admin {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-links a, .footer-admin a {
  color: #94a3b8;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-links a:hover, .footer-admin a:hover {
  color: #6366f1;
}

.footer-contact p {
  margin: 0;
}

.copyright {
  margin-top: 2rem;
  font-size: 0.875rem;
  opacity: 0.6;
}

@media (max-width: 992px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }
}

@media (max-width: 768px) {
  .main-footer {
    padding: 3rem 0;
  }
  
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    padding: 0 1.5rem;
  }
}

@media (max-width: 576px) {
  .footer-grid {
    gap: 2rem;
  }
}
</style>
