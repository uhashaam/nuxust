<template>
  <footer class="footer-05">
    <div class="footer-container">
      <div class="footer-grid">
        <div class="column">
          <div class="domain-name">b-2b.com</div>
          <div class="industry" v-if="subdomain">{{ subdomain }}</div>
        </div>
        
        <div class="column center">
          <p>© 2026 b-2b.com All rights reserved.</p>
        </div>

        <div class="column right">
          <div class="contact-box">
            <a href="/privacy" class="privacy">Privacy Policy</a>
            <span class="sep">|</span>
            <span class="mail">contact@b-2b.com</span>
          </div>
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
.footer-05 {
  background: #f0f7ff;
  padding: 3rem 0;
  border-top: 2px solid #dbeafe;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
}

.domain-name {
  font-size: 1.5rem;
  font-weight: 900;
  color: #1e3a8a;
  letter-spacing: -0.02em;
}

.industry {
  font-size: 0.8125rem;
  font-weight: 700;
  color: #3b82f6;
  text-transform: uppercase;
}

.center {
  text-align: center;
  color: #1e40af;
  font-weight: 600;
  font-size: 0.875rem;
}

.right {
  display: flex;
  justify-content: flex-end;
}

.contact-box {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.875rem;
  color: #1e40af;
  font-weight: 500;
}

.privacy {
  color: #2563eb;
  text-decoration: none;
  font-weight: 700;
}

.sep {
  color: #bfdbfe;
}

@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }
  
  .right {
    justify-content: center;
  }
}
</style>
