<template>
  <div class="banner-03" :style="{ backgroundImage: `url(${bgImage})` }">
    <div class="soft-overlay"></div>
    <div class="banner-content">
      <h1 class="industry-name">{{ industryName }}</h1>
      <div class="divider"></div>
      <p class="slogan">{{ siteSlogan }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  industryName: string
  siteSlogan: string
  backgroundImage?: string
}

const props = defineProps<Props>()
const bgImage = props.backgroundImage || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&q=80&w=1920&h=500'
</script>

<style scoped>
.banner-03 {
  width: 100%;
  height: 500px;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8fafc;
}

.soft-overlay {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.6);
}

.banner-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 800px;
}

.industry-name {
  font-size: 3.5rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 1.5rem;
  letter-spacing: -0.04em;
  font-family: 'Outfit', sans-serif;
}

.divider {
  width: 40px;
  height: 2px;
  background: #cbd5e1;
  margin: 0 auto 2rem;
}

.slogan {
  font-size: 1.25rem;
  color: #64748b;
  font-weight: 300;
  line-height: 1.6;
  letter-spacing: 0.05em;
}

@media (max-width: 768px) {
  .banner-03 {
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
