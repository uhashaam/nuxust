<template>
  <footer class="footer-10">
    <div class="footer-container">
      <div class="content">
        <div class="logo">b-2b.com</div>
        <div class="sub-label" v-if="subdomain">〔 {{ subdomain }} 〕</div>
        <p class="copyright">© 2026 b-2b.com 著作権所有</p>
        <div class="bottom-links">
          <a :href="subdomain ? `/i/${subdomain}/privacy` : '/privacy'">隐私政策</a>
          <span class="sep">｜</span>
          <a :href="subdomain ? `/i/${subdomain}/contact` : '/contact'">联系我们</a>
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
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&display=swap');

.footer-10 {
  background: #fdfaf5;
  color: #2c2c2c;
  padding: 6rem 0;
  font-family: 'Noto Serif SC', serif;
  border-top: 1px solid #e5e0d8;
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
  gap: 2rem;
}

.logo {
  font-size: 1.75rem;
  font-weight: 700;
  color: #000;
}

.sub-label {
  font-size: 0.8125rem;
  color: #8c8c8c;
}

.copyright {
  font-size: 0.9375rem;
  color: #595959;
}

.bottom-links {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  color: #8c8c8c;
}

.bottom-links a {
  color: inherit;
  text-decoration: none;
  transition: color 0.3s;
}

.bottom-links a:hover {
  color: #000;
}

.sep {
  color: #e5e0d8;
}
</style>
