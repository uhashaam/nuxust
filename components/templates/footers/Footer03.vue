<template>
  <footer class="footer-03">
    <div class="footer-container">
      <div class="footer-grid">
        <div class="footer-column">
          <div class="brand">
            <span class="logo">b-2b.com</span>
            <span class="industry-label" v-if="subdomain">{{ subdomain }}</span>
          </div>
          <p class="copyright">© 2026 b-2b.com.<br>All Rights Reserved.</p>
        </div>
        
        <div class="footer-column">
          <h4 class="column-title">Contact Details</h4>
          <ul class="contact-list">
            <li>Email: info@b-2b.com</li>
            <li>Tel: +1 (888) 123-4567</li>
            <li>HQ: Industrial Zone A, Tech Park</li>
          </ul>
        </div>

        <div class="footer-column">
          <h4 class="column-title">Navigation</h4>
          <nav class="footer-nav">
            <a :href="subdomain ? `/i/${subdomain}` : '/'">Home</a>
            <a :href="subdomain ? `/i/${subdomain}/products` : '/products'">Technologies</a>
            <a :href="subdomain ? `/i/${subdomain}/news` : '/news'">News Center</a>
            <a :href="subdomain ? `/i/${subdomain}/about` : '/about'">About Us</a>
            <a :href="subdomain ? `/i/${subdomain}/contact` : '/contact'">Contact</a>
            <a :href="subdomain ? `/i/${subdomain}/privacy` : '/privacy'" class="privacy-link">Privacy Policy</a>
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
</script>

<style scoped>
.footer-03 {
  background: #020617;
  color: #f8fafc;
  padding: 7rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.footer-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.logo {
  font-family: 'Outfit', sans-serif;
  font-size: 1.75rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #ffffff;
}

.industry-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #94a3b8;
  border: 1px solid #334155;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.copyright {
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.6;
}

.column-title {
  font-family: 'Outfit', sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 2rem;
  color: #ffffff;
  letter-spacing: 0.05em;
}

.contact-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.contact-list li {
  font-size: 0.9375rem;
  color: #94a3b8;
  margin-bottom: 1rem;
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-nav a {
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.9375rem;
  font-weight: 500;
  transition: color 0.2s;
}

.footer-nav a:hover {
  color: #ffffff;
}

.privacy-link {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #334155;
}

@media (max-width: 1024px) {
  .footer-grid {
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}
</style>
