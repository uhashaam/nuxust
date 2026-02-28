<template>
  <footer class="footer-02">
    <div class="footer-container">
      <div class="left-section">
        <div class="brand">
          <span class="logo">b-2b.com</span>
          <span class="subdomain" v-if="subdomain">{{ subdomain }}</span>
        </div>
        <p class="copyright">© 2026 b-2b.com. All rights reserved.</p>
      </div>
      <div class="right-section">
        <div class="contact">
          <h4>Contact Us</h4>
          <p>Email: contact@b-2b.com</p>
          <p>Phone: +1 (555) 000-0000</p>
        </div>
        <div class="links">
          <a href="/privacy">Privacy Policy</a>
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
.footer-02 {
  background: #f8fafc;
  padding: 4rem 0;
  border-top: 1px solid #e2e8f0;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.logo {
  font-weight: 800;
  font-size: 1.5rem;
  color: #1e293b;
}

.subdomain {
  background: #ffffff;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #64748b;
  border: 1px solid #e2e8f0;
}

.copyright {
  color: #94a3b8;
  font-size: 0.875rem;
}

.right-section {
  display: flex;
  gap: 4rem;
}

.contact h4 {
  font-size: 0.875rem;
  font-weight: 700;
  color: #1e293b;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.contact p {
  color: #64748b;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.links a {
  color: #6366f1;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 600;
}

@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    gap: 3rem;
  }
  
  .right-section {
    flex-direction: column;
    gap: 2rem;
  }
}
</style>
