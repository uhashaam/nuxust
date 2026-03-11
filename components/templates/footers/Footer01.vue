<template>
  <footer class="footer-01">
    <div class="footer-container">
      <div class="footer-content">
        <div class="branding">
          <span class="logo">b-2b.com</span>
          <span class="subdomain" v-if="subdomain">{{ subdomain }}</span>
        </div>
        <p class="copyright">© 2026 b-2b.com. All rights reserved.</p>
        <div class="contact-info">
          <span>Contact: support@b-2b.com</span>
        </div>
        <div class="links">
          <a :href="subdomain ? `/i/${subdomain}/products` : '/products'" class="link">Technologies</a>
          <span class="sep" v-if="subdomain">|</span>
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
  background: #fcfdfe;
  padding: 6rem 0;
  border-top: 1px solid rgba(15, 23, 42, 0.04);
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
  gap: 1.5rem;
}

.branding {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo {
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 1.5rem;
  color: #0f172a;
  letter-spacing: -0.02em;
}

.subdomain {
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
}

.copyright {
  color: #64748b;
  font-size: 0.875rem;
}

.contact-info {
  color: #64748b;
  font-size: 0.875rem;
}

.link {
  color: #64748b;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s;
}

.link:hover {
  color: #0f172a;
}
</style>
