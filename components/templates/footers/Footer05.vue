<template>
  <footer class="footer-05">
    <div class="footer-container">
      <div class="footer-grid">
        <div class="column">
          <div class="domain-name">b-2b<span class="dot">.</span>com</div>
          <div class="industry" v-if="subdomain">{{ subdomain }}</div>
        </div>
        
        <div class="column center">
          <p>© 2026 b-2b.com. All rights reserved.</p>
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
  background: #eef4fb;
  padding: 3.5rem 0;
  border-top: 1px solid #d6e4f0;
}

.footer-container {
  max-width: 1360px;
  margin: 0 auto;
  padding: 0 2.5rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
}

.domain-name {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 1.4rem;
  font-weight: 800;
  color: #1e3a8a;
  letter-spacing: -0.03em;
}

.dot {
  color: #3b82f6;
}

.industry {
  font-size: 0.6875rem;
  font-weight: 700;
  color: #3b82f6;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-top: 0.25rem;
}

.center {
  text-align: center;
}

.center p {
  color: #1e40af;
  font-weight: 500;
  font-size: 0.8125rem;
}

.right {
  display: flex;
  justify-content: flex-end;
}

.contact-box {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.8125rem;
  color: #3b82f6;
  font-weight: 500;
}

.privacy {
  color: #1e40af;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}

.privacy:hover {
  color: #1d4ed8;
}

.sep {
  color: #93c5fd;
}

.mail {
  color: #64748b;
}

@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 1.5rem;
  }
  
  .right {
    justify-content: center;
  }
}
</style>
