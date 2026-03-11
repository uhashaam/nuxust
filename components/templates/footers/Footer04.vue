<template>
  <footer class="footer-04">
    <div class="footer-container">
      <div class="logo-group">
        <span class="logo">b-2b.com</span>
        <span class="sub" v-if="subdomain">{{ subdomain }}</span>
      </div>
      <p class="copyright">© 2026 b-2b.com</p>
      <div class="links">
        <a :href="subdomain ? `/i/${subdomain}/products` : '/products'">Technologies</a>
        <span class="sep">/</span>
        <a href="/privacy">Privacy</a>
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
.footer-04 {
  background: transparent;
  padding: 6rem 0;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-group {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.logo {
  font-family: 'Outfit', sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.02em;
}

.sub {
  font-size: 0.75rem;
  font-weight: 400;
  color: #64748b;
  text-transform: lowercase;
}

.copyright {
  font-size: 0.8125rem;
  color: #94a3b8;
  font-weight: 500;
}

.links a {
  font-size: 0.8125rem;
  color: #000000;
  text-decoration: none;
  font-weight: 600;
}

@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
}
</style>
