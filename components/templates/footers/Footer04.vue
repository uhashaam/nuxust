<template>
  <footer class="footer-04">
    <div class="footer-container">
      <div class="logo-group">
        <span class="logo">b-2b<span class="dot">.</span>com</span>
        <span class="sub" v-if="subdomain">{{ subdomain }}</span>
      </div>
      <p class="copyright">© 2026 b-2b.com</p>
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
.footer-04 {
  background: transparent;
  padding: 3rem 0;
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
  gap: 0.625rem;
}

.logo {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 1.25rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.03em;
}

.dot {
  color: #0f172a;
}

.sub {
  font-size: 0.6875rem;
  font-weight: 400;
  color: #94a3b8;
  text-transform: lowercase;
  letter-spacing: 0.02em;
}

.copyright {
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 400;
}

@media (max-width: 640px) {
  .footer-container {
    flex-direction: column;
    gap: 0.75rem;
    text-align: center;
  }
}
</style>
