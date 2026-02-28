<template>
  <footer class="footer-08">
    <div class="footer-container">
      <div class="footer-grid">
        <div class="column">
          <div class="logo">b-2b.com</div>
          <p class="copyright">© 2026 b-2b.com</p>
          <div class="subdomain" v-if="subdomain">Industry: {{ subdomain }}</div>
        </div>
        
        <div class="column">
          <h4>Industry Overview</h4>
          <p class="overview-text">Providing professional supply chain solutions and intelligence for global B2B sectors.</p>
        </div>

        <div class="column">
          <h4>Contact & Support</h4>
          <nav class="links">
            <a href="mailto:support@b-2b.com">support@b-2b.com</a>
            <a :href="subdomain ? `/i/${subdomain}/contact` : '/contact'">Support Center</a>
            <a :href="subdomain ? `/i/${subdomain}/privacy` : '/privacy'">User Agreement</a>
          </nav>
        </div>

        <div class="column">
          <h4>Navigation</h4>
          <nav class="links">
            <a :href="subdomain ? `/i/${subdomain}` : '/'">Home</a>
            <a :href="subdomain ? `/i/${subdomain}/news` : '/news'">News Center</a>
            <a :href="subdomain ? `/i/${subdomain}/about` : '/about'">About Us</a>
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
.footer-08 {
  background: #ffffff;
  padding: 6rem 0;
  border-top: 1px solid #e2e8f0;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4rem;
}

.column h4 {
  font-size: 0.8125rem;
  font-weight: 800;
  text-transform: uppercase;
  color: #1e293b;
  margin-bottom: 2rem;
  letter-spacing: 0.05em;
}

.logo {
  font-size: 1.5rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
}

.copyright {
  color: #94a3b8;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.subdomain {
  color: #64748b;
  font-size: 0.75rem;
  font-weight: 700;
}

.overview-text {
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.6;
}

.links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.links a {
  color: #64748b;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 0.2s;
}

.links a:hover {
  color: #0f172a;
}

@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
  }
}

@media (max-width: 640px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
}
</style>
