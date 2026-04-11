<template>
  <footer class="footer-10">
    <div class="footer-container">
      <div class="content">
        <div class="logo">b-2b.com</div>
        <div class="sub-label" v-if="subdomain">— {{ subdomain }} —</div>
        <p class="copyright">© 2026 b-2b.com — All Rights Reserved</p>
        <div class="bottom-links">
          <a href="/privacy">Privacy Policy</a>
          <span class="sep">|</span>
          <a :href="getPath(\'/contact\', subdomain)">Contact</a>
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
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

.footer-10 {
  background: #faf8f3;
  color: #3d3629;
  padding: 4rem 0;
  font-family: 'Playfair Display', Georgia, serif;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.footer-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.75rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c2417;
  letter-spacing: -0.02em;
  font-style: italic;
}

.sub-label {
  font-size: 0.75rem;
  color: #a89e8e;
  letter-spacing: 0.15em;
  font-style: normal;
  font-family: 'Inter', 'Outfit', sans-serif;
  text-transform: uppercase;
}

.copyright {
  font-size: 0.875rem;
  color: #7a7060;
  font-style: italic;
}

.bottom-links {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 0.6875rem;
  color: #a89e8e;
  margin-top: 0.25rem;
}

.bottom-links a {
  color: #7a7060;
  text-decoration: none;
  transition: color 0.3s;
  font-weight: 500;
  letter-spacing: 0.04em;
}

.bottom-links a:hover {
  color: #2c2417;
}

.sep {
  color: #d6cfc3;
}
</style>
