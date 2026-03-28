<template>
  <div class="banner-01" :style="{ backgroundImage: `url(${bgImage})` }">
    <div class="overlay"></div>
    <div class="glow-effect"></div>
    <div class="grid-lines"></div>
    <div class="content">
      <div class="tech-icons">
        <div class="icon-ring">
          <el-icon class="icon"><Cpu /></el-icon>
        </div>
        <div class="icon-ring">
          <el-icon class="icon"><Setting /></el-icon>
        </div>
        <div class="icon-ring">
          <el-icon class="icon"><Monitor /></el-icon>
        </div>
      </div>
      <h1 class="industry-name">{{ industryName }}</h1>
      <div class="divider-line"></div>
      <p class="slogan">{{ siteSlogan }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Cpu, Setting, Monitor } from '@element-plus/icons-vue'

interface Props {
  industryName: string
  siteSlogan: string
  backgroundImage?: string
}

const props = defineProps<Props>()
const bgImage = props.backgroundImage || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1920&h=500'

useHead({
  link: [{ rel: 'preload', as: 'image', href: bgImage }]
})
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
  background: linear-gradient(
    135deg,
    rgba(7, 11, 28, 0.92) 0%,
    rgba(15, 23, 60, 0.88) 30%,
    rgba(30, 64, 175, 0.82) 70%,
    rgba(59, 130, 246, 0.75) 100%
  );
}

.glow-effect {
  position: absolute;
  top: -50%;
  right: -20%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, transparent 65%);
  pointer-events: none;
}

.grid-lines {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(59, 130, 246, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.06) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
}

.content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: #ffffff;
  max-width: 900px;
  padding: 0 2rem;
}

.tech-icons {
  display: flex;
  justify-content: center;
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.icon-ring {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.icon {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.7);
}

.industry-name {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 3.5rem;
  font-weight: 800;
  margin: 0 0 1rem 0;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
  line-height: 1.1;
}

.divider-line {
  width: 48px;
  height: 3px;
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
  margin: 0 auto 1.25rem;
  border-radius: 2px;
}

.slogan {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 1.0625rem;
  font-weight: 400;
  letter-spacing: 0.04em;
  opacity: 0.75;
  max-width: 550px;
  margin: 0 auto;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .banner-01 {
    height: 380px;
  }
  .industry-name {
    font-size: 2.25rem;
  }
  .slogan {
    font-size: 0.9375rem;
  }
  .tech-icons {
    gap: 0.75rem;
  }
  .icon-ring {
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }
  .icon {
    font-size: 1.125rem;
  }
}
</style>
