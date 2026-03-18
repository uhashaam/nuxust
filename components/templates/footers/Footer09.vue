<template>
  <footer class="footer-09">
    <div class="footer-container">
      <div class="footer-wrap">
        <div class="left">
          <span class="logo">B-2B<span class="dot">.</span>COM</span>
          <span class="sub" v-if="subdomain">// {{ subdomain }}</span>
        </div>
        
        <div class="center">
          <p>© 2026 B-2B.COM · ALL RIGHTS RESERVED</p>
        </div>

        <div class="right">
          <nav class="inline-nav">
            <a href="/privacy">PRIVACY</a>
            <span class="sep">·</span>
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
  padding: 3rem 0;
  border-top: 3px solid #0f172a;
}

.footer-container {
  max-width: 1360px;
  margin: 0 auto;
  padding: 0 2.5rem;
}

.footer-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left {
  display: flex;
  align-items: baseline;
  gap: 1rem;
}

.logo {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 1.25rem;
  font-weight: 900;
  color: #0f172a;
  letter-spacing: 0.02em;
}

.dot {
  color: #6366f1;
}

.sub {
  font-weight: 700;
  color: #6366f1;
  font-size: 0.75rem;
  letter-spacing: 0.04em;
}

.center p {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 0.625rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: 0.12em;
}

.right {
  display: flex;
}

.inline-nav {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.inline-nav a {
  text-decoration: none;
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 0.625rem;
  font-weight: 900;
  color: #0f172a;
  letter-spacing: 0.12em;
  transition: color 0.2s;
}

.inline-nav a:hover {
  color: #6366f1;
}

.sep {
  color: #e2e8f0;
}

@media (max-width: 768px) {
  .footer-wrap {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }

  .left {
    justify-content: center;
  }
}
</style>
