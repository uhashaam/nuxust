<template>
  <footer class="footer-08">
    <div class="footer-container">
      <div class="footer-grid">
        <div class="column">
          <div class="logo">b-2b<span class="dot">.</span>com</div>
          <p class="copyright">© 2026 b-2b.com</p>
          <div class="subdomain-label" v-if="subdomain">{{ subdomain }}</div>
        </div>
        
        <div class="column">
          <h4>Contact & Support</h4>
          <nav class="links">
            <a href="mailto:support@b-2b.com">support@b-2b.com</a>
            <a :href="getPath('/contact', subdomain)">Support Center</a>
            <a href="/privacy">Privacy Policy</a>
          </nav>
        </div>

        <div class="column">
          <h4>Industry Overview</h4>
          <p class="overview-text">Professional B2B supply chain solutions and industry intelligence for global sectors.</p>
        </div>

        <div class="column">
          <h4>Navigation</h4>
          <nav class="links">
            <a :href="getPath('/', subdomain)">Home</a>
            <a :href="getPath('/news', subdomain)">News Center</a>
            <a :href="getPath('/about', subdomain)">About Us</a>
            <a :href="getPath('/contact', subdomain)">Contact</a>
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
.footer-08 {
  background: #ffffff;
  padding: 4rem 0;
  border-top: 1px solid #e2e8f0;
}

.footer-container {
  max-width: 1360px;
  margin: 0 auto;
  padding: 0 2.5rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;
}

.column h4 {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #94a3b8;
  margin-bottom: 1.25rem;
  letter-spacing: 0.08em;
}

.logo {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 1.4rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.03em;
  margin-bottom: 1rem;
}

.dot {
  color: #3b82f6;
}

.copyright {
  color: #94a3b8;
  font-size: 0.8125rem;
  margin-bottom: 0.375rem;
}

.subdomain-label {
  color: #64748b;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.overview-text {
  font-size: 0.8125rem;
  color: #64748b;
  line-height: 1.7;
}

.links {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.links a {
  color: #64748b;
  text-decoration: none;
  font-size: 0.8125rem;
  font-weight: 500;
  transition: color 0.2s;
}

.links a:hover {
  color: #0f172a;
}

@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
  }
}

@media (max-width: 640px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
}
</style>
