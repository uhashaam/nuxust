<template>
  <footer class="footer-06">
    <div class="footer-container">
      <div class="left-col">
        <h4 class="title">Connect with Humans</h4>
        <div class="contacts">
          <div class="contact-item">
            <el-icon><Message /></el-icon>
            <span>contact@b-2b.com</span>
          </div>
          <div class="contact-item">
            <el-icon><Phone /></el-icon>
            <span>+1 (800) B2B-TEAM</span>
          </div>
        </div>
      </div>
      <div class="right-col">
        <div class="brand-row">
          <span class="logo">b-2b.com</span>
          <span class="tag" v-if="subdomain">{{ subdomain }}</span>
        </div>
        <div class="bottom-links">
          <span>© 2026 b-2b.com</span>
          <span class="divider">•</span>
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
</script>

<style scoped>
.footer-06 {
  background: #0f172a;
  color: #ffffff;
  padding: 5rem 0;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
}

.title {
  font-size: 1.125rem;
  font-weight: 800;
  margin-bottom: 2rem;
  text-transform: uppercase;
  color: #3b82f6;
}

.contacts {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #94a3b8;
  font-weight: 500;
}

.contact-item .el-icon {
  font-size: 1.25rem;
  color: #ffffff;
}

.right-col {
  text-align: right;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.brand-row {
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  gap: 1rem;
  margin-bottom: 2rem;
}

.logo {
  font-size: 1.75rem;
  font-weight: 900;
}

.tag {
  font-size: 0.75rem;
  color: #3b82f6;
  font-weight: 700;
  text-transform: uppercase;
}

.bottom-links {
  color: #475569;
  font-size: 0.8125rem;
  font-weight: 600;
}

.divider {
  margin: 0 0.75rem;
}

.bottom-links a {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s;
}

.bottom-links a:hover {
  color: #ffffff;
}

@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    gap: 4rem;
    text-align: center;
  }
  
  .right-col, .brand-row {
    text-align: center;
    justify-content: center;
  }
}
</style>
