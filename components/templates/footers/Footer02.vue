<template>
  <footer class="footer-02">
    <div class="footer-container">
      <div class="left-section">
        <div class="brand">
          <span class="logo">b-2b<span class="dot">.</span>com</span>
          <span class="subdomain-badge" v-if="subdomain">{{ subdomain }}</span>
        </div>
        <p class="copyright">© 2026 b-2b.com. All rights reserved.</p>
      </div>
      <div class="right-section">
        <div class="contact">
          <h4>Contact</h4>
          <p>Email: contact@b-2b.com</p>
          <p>Phone: +1 (555) 000-0000</p>
        </div>
        <div class="links-col">
          <h4>Legal</h4>
          <a href="/privacy">Privacy Policy</a>
          <a :href="getPath('/contact', subdomain)">Support</a>
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
.footer-02 {
  background: #f7f8fa;
  padding: 4rem 0;
  border-top: 1px solid #eceef1;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.logo {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 1.4rem;
  color: #0f172a;
  letter-spacing: -0.03em;
}

.dot {
  color: #f59e0b;
}

.subdomain-badge {
  background: #ffffff;
  padding: 0.2rem 0.625rem;
  border-radius: 4px;
  font-size: 0.6875rem;
  font-weight: 700;
  color: #64748b;
  border: 1px solid #e2e8f0;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.copyright {
  color: #94a3b8;
  font-size: 0.8125rem;
}

.right-section {
  display: flex;
  gap: 4rem;
}

.contact h4,
.links-col h4 {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 0.6875rem;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 1rem;
}

.contact p {
  color: #64748b;
  font-size: 0.8125rem;
  margin-bottom: 0.375rem;
  line-height: 1.5;
}

.links-col {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.links-col a {
  color: #64748b;
  text-decoration: none;
  font-size: 0.8125rem;
  font-weight: 500;
  transition: color 0.2s;
}

.links-col a:hover {
  color: #0f172a;
}

@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    gap: 2.5rem;
  }
  
  .right-section {
    flex-direction: column;
    gap: 2rem;
  }
}
</style>
