<template>
  <footer class="footer-07">
    <div class="footer-container">
      <div class="main-content">
        <div class="brand">
          <span class="logo">b-2b.com</span>
          <span class="sub" v-if="subdomain">| {{ subdomain }}</span>
        </div>
        <p class="copyright">© 2026 b-2b.com. All rights reserved.</p>
        <div class="base-links">
          <a :href="subdomain ? `/i/${subdomain}/products` : '/products'">Technologies</a>
          <span class="dot">•</span>
          <a :href="subdomain ? `/i/${subdomain}/privacy` : '/privacy'">Privacy Policy</a>
          <span class="dot">•</span>
          <a :href="subdomain ? `/i/${subdomain}/contact` : '/contact'">Contact Us</a>
        </div>
        <div class="feedback-row">
          <a href="/feedback" class="feedback-link">Feedback Entry</a>
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
.footer-07 {
  background: #ffffff;
  padding: 7rem 0;
  border-top: 1px solid rgba(15, 23, 42, 0.04);
}

.footer-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
}

.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.brand {
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo {
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 1.5rem;
  color: #0f172a;
  letter-spacing: -0.02em;
}

.sub {
  font-weight: 500;
  color: #94a3b8;
  font-size: 0.875rem;
}

.copyright {
  color: #64748b;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.base-links {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 3rem;
}

.base-links a {
  color: #64748b;
  text-decoration: none;
  font-size: 0.8125rem;
  font-weight: 600;
}

.dot {
  color: #cbd5e1;
}

.feedback-row {
  opacity: 0.5;
  transition: opacity 0.3s;
}

.feedback-row:hover {
  opacity: 1;
}

.feedback-link {
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
</style>
