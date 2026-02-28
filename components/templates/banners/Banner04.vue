<template>
  <div class="banner-04" :style="{ backgroundImage: `url(${bgImage})` }">
    <div class="grid-pattern"></div>
    <div class="professional-overlay"></div>
    <div class="banner-content">
      <div class="decorator-line Top"></div>
      <h1 class="industry-name">{{ industryName }}</h1>
      <p class="slogan">{{ siteSlogan }}</p>
      <div class="decorator-line Bottom"></div>
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
const bgImage = props.backgroundImage || 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1920&h=500'
</script>

<style scoped>
.banner-04 {
  width: 100%;
  height: 500px;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.grid-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(#cbd5e1 1px, transparent 1px);
  background-size: 30px 30px;
  opacity: 0.2;
}

.professional-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(241, 245, 249, 0.9) 0%, rgba(203, 213, 225, 0.7) 100%);
}

.banner-content {
  position: relative;
  z-index: 1;
  text-align: center;
}

.decorator-line {
  width: 60px;
  height: 3px;
  background: #3b82f6;
  margin: 1.5rem auto;
}

.industry-name {
  font-size: 4rem;
  font-weight: 900;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.01em;
}

.slogan {
  font-size: 1.125rem;
  color: #475569;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .banner-04 {
    height: 350px;
  }
  .industry-name {
    font-size: 2.5rem;
  }
  .slogan {
    font-size: 0.875rem;
    letter-spacing: 0.15em;
  }
}
</style>
