<template>
  <footer class="footer-01">
    <div class="footer-container">
      <div class="footer-content">
        <div class="branding">
          <span class="logo">b-2b<span class="dot">.</span>com</span>
          <span class="subdomain-tag" v-if="subdomain">{{ subdomain }}</span>
        </div>
        <p class="copyright">© 2026 b-2b.com. All rights reserved.</p>
        <div class="contact-info">
          <span>Contact: support@b-2b.com</span>
        </div>
        <div class="links">
          <a href="/privacy" class="link">Privacy Policy</a>
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
.footer-01 {
  background: #ffffff;
  padding: 3.5rem 0;
  border-top: 1px solid #f1f5f9;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.75rem;
}

.branding {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.25rem;
}

.logo {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 1.25rem;
  color: #0f172a;
  letter-spacing: -0.03em;
}

.dot {
  color: #6366f1;
}

.subdomain-tag {
  color: #94a3b8;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.125rem 0.5rem;
  background: #f8fafc;
  border-radius: 4px;
  border: 1px solid #f1f5f9;
}

.copyright {
  color: #94a3b8;
  font-size: 0.8125rem;
  font-weight: 400;
}

.contact-info {
  color: #94a3b8;
  font-size: 0.8125rem;
}

.links {
  display: flex;
  gap: 1rem;
  margin-top: 0.25rem;
}

.link {
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.75rem;
  font-weight: 500;
  transition: color 0.2s;
  letter-spacing: 0.02em;
}

.link:hover {
  color: #475569;
}
</style>
