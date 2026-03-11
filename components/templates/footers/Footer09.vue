<template>
  <footer class="footer-09">
    <div class="footer-container">
      <div class="footer-wrap">
        <div class="left">
          <span class="logo">B-2B . COM</span>
          <span class="sub" v-if="subdomain">// {{ subdomain }}</span>
        </div>
        
        <div class="center">
          <p>© 2026 CORPORATE IDENTITY. ALL RIGHTS RESERVED.</p>
        </div>

        <div class="right">
          <nav class="inline-nav">
            <a :href="subdomain ? `/i/${subdomain}/products` : '/products'">TECHNOLOGIES</a>
            <span class="sep">•</span>
            <a :href="subdomain ? `/i/${subdomain}/privacy` : '/privacy'">PRIVACY</a>
            <span class="sep">•</span>
            <a :href="subdomain ? `/i/${subdomain}/contact` : '/contact'">CONTACT</a>
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
.footer-09 {
  background: #ffffff;
  padding: 6rem 0;
  border-top: 4px solid #0f172a;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-family: 'Outfit', sans-serif;
  font-size: 1.65rem;
  font-weight: 900;
  color: #0f172a;
  letter-spacing: -0.03em;
}

.sub {
  margin-left: 1.5rem;
  font-weight: 800;
  color: #6366f1;
  font-size: 0.875rem;
}

.center p {
  font-size: 0.75rem;
  font-weight: 750;
  color: #000;
  letter-spacing: 0.1em;
}

.right {
  display: flex;
}

.inline-nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.inline-nav a {
  text-decoration: none;
  font-size: 0.75rem;
  font-weight: 900;
  color: #000;
  letter-spacing: 0.1em;
  transition: color 0.2s;
}

.inline-nav a:hover {
  color: #6366f1;
}

.sep {
  color: #e2e8f0;
}

@media (max-width: 1024px) {
  .footer-wrap {
    flex-direction: column;
    gap: 3rem;
    text-align: center;
  }
}
</style>
