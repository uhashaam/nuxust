<template>
  <footer class="footer-06">
    <div class="footer-container">
      <div class="left-col">
        <h4 class="title">Get In Touch</h4>
        <div class="contacts">
          <div class="contact-item">
            <el-icon><Message /></el-icon>
            <span>contact@b-2b.com</span>
          </div>
          <div class="contact-item">
            <el-icon><Phone /></el-icon>
            <span>+1 (800) 222-4567</span>
          </div>
        </div>
      </div>
      <div class="right-col">
        <div class="brand-row">
          <span class="logo">b-2b<span class="dot">.</span>com</span>
          <span class="tag" v-if="subdomain">{{ subdomain }}</span>
        </div>
        <div class="bottom-links">
          <span>© 2026 b-2b.com</span>
          <span class="divider">·</span>
          <a href="/privacy">Privacy Policy</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Message, Phone } from '@element-plus/icons-vue'

defineProps<{
  subdomain?: string
}>()
const { getPath } = useSubdomainNav()
</script>

<style scoped>
.footer-06 {
  background: #0f172a;
  color: #ffffff;
  padding: 4rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.title {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 0.6875rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #3b82f6;
}

.contacts {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #94a3b8;
  font-size: 0.8125rem;
  font-weight: 500;
}

.contact-item .el-icon {
  font-size: 1rem;
  color: #60a5fa;
}

.right-col {
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1.25rem;
}

.brand-row {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
}

.logo {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #f8fafc;
}

.dot {
  color: #3b82f6;
}

.tag {
  font-size: 0.625rem;
  color: #3b82f6;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.bottom-links {
  color: #475569;
  font-size: 0.75rem;
  font-weight: 500;
}

.divider {
  margin: 0 0.5rem;
}

.bottom-links a {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s;
}

.bottom-links a:hover {
  color: #94a3b8;
}

@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    align-items: center;
    gap: 3rem;
    text-align: center;
  }
  
  .right-col {
    text-align: center;
    align-items: center;
  }

  .contacts {
    align-items: center;
  }
}
</style>
