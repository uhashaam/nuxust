<template>
  <footer class="footer-03">
    <div class="footer-container">
      <div class="footer-grid">
        <div class="footer-column">
          <div class="brand">
            <span class="logo">b-2b<span class="dot">.</span>com</span>
            <span class="industry-label" v-if="subdomain">{{ subdomain }}</span>
          </div>
          <p class="copyright">© 2026 b-2b.com.<br>All Rights Reserved.</p>
        </div>
        
        <div class="footer-column">
          <h4 class="column-title">Contact</h4>
          <ul class="contact-list">
            <li>Email: info@b-2b.com</li>
            <li>Tel: +1 (888) 123-4567</li>
            <li>HQ: Industrial Zone A, Tech Park</li>
          </ul>
        </div>

        <div class="footer-column">
          <h4 class="column-title">Navigation</h4>
          <nav class="footer-nav">
            <a :href="getPath('/', subdomain)">Home</a>
            <a :href="getPath('/news', subdomain)">News Center</a>
            <a :href="getPath('/about', subdomain)">About Us</a>
            <a :href="getPath('/contact', subdomain)">Contact</a>
            <a href="/privacy" class="privacy-link">Privacy Policy</a>
          </nav>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
defineProps<{
  subdomain?: string
}>()
const { getPath } = useSubdomainNav()
</script>

<style scoped>
.footer-03 {
  background: #111827;
  color: #f8fafc;
  padding: 4.5rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
}

.footer-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2.5rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.logo {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #ffffff;
}

.dot {
  color: #60a5fa;
}

.industry-label {
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #64748b;
  border: 1px solid #334155;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  letter-spacing: 0.08em;
}

.copyright {
  font-size: 0.8125rem;
  color: #475569;
  line-height: 1.7;
}

.column-title {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  color: #94a3b8;
  letter-spacing: 0.1em;
}

.contact-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.contact-list li {
  font-size: 0.8125rem;
  color: #64748b;
  margin-bottom: 0.75rem;
  line-height: 1.5;
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.footer-nav a {
  color: #64748b;
  text-decoration: none;
  font-size: 0.8125rem;
  font-weight: 500;
  transition: color 0.2s;
}

.footer-nav a:hover {
  color: #ffffff;
}

.privacy-link {
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}
</style>
