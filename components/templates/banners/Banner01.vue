<template>
  <div class="banner-01" :style="{ backgroundImage: `url(${bgImage})` }">
    <div class="overlay"></div>
    <div class="content">
      <div class="tech-icons">
        <el-icon class="icon"><Cpu /></el-icon>
        <el-icon class="icon"><Setting /></el-icon>
      </div>
      <h1 class="industry-name">{{ industryName }}</h1>
      <p class="slogan">{{ siteSlogan }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Cpu, Setting } from '@element-plus/icons-vue'

interface Props {
  industryName: string
  siteSlogan: string
  backgroundImage?: string
}

const props = defineProps<Props>()

const bgImage = props.backgroundImage || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1920&h=500'
</script>

<style scoped>
.banner-01 {
  width: 100%;
  height: 500px;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(30, 58, 138, 0.9) 0%, rgba(59, 130, 246, 0.7) 100%);
}

.content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: #ffffff;
  max-width: 1000px;
  padding: 0 2rem;
}

.tech-icons {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.8;
}

.icon {
  font-size: 3rem;
  filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.3));
}

.industry-name {
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  font-family: 'Inter', sans-serif;
}

.slogan {
  font-size: 1.25rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .banner-01 {
    height: 350px;
  }
  .industry-name {
    font-size: 2.5rem;
  }
  .slogan {
    font-size: 1rem;
  }
}
</style>
