<template>
  <footer class="footer-07">
    <div class="footer-container">
      <div class="main-content">
        <div class="brand">
          <span class="logo">b-2b<span class="dot">.</span>com</span>
          <span class="sub" v-if="subdomain">| {{ subdomain }}</span>
        </div>
        <p class="copyright">© 2026 b-2b.com. All rights reserved.</p>
        <div class="base-links">
          <a href="/privacy">Privacy Policy</a>
          <span class="sep">·</span>
          <a :href="getPath('/contact', subdomain)">Contact Us</a>
        </div>
        <div class="feedback-row">
          <a href="/feedback" class="feedback-link">Feedback Entry →</a>
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
.footer-07 {
  background: #fafbfc;
  padding: 3.5rem 0;
  border-top: 1px solid #f1f5f9;
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
  gap: 0.625rem;
}

.brand {
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 1.25rem;
  color: #0f172a;
  letter-spacing: -0.03em;
}

.dot {
  color: #22c55e;
}

.sub {
  font-weight: 500;
  color: #94a3b8;
  font-size: 0.8125rem;
}

.copyright {
  color: #94a3b8;
  font-size: 0.8125rem;
}

.base-links {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.base-links a {
  color: #64748b;
  text-decoration: none;
  font-size: 0.75rem;
  font-weight: 500;
  transition: color 0.2s;
}

.base-links a:hover {
  color: #0f172a;
}

.sep {
  color: #cbd5e1;
  font-size: 0.75rem;
}

.feedback-row {
  margin-top: 1.5rem;
  opacity: 0.4;
  transition: opacity 0.3s;
}

.feedback-row:hover {
  opacity: 1;
}

.feedback-link {
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: color 0.2s;
}

.feedback-link:hover {
  color: #22c55e;
}
</style>
