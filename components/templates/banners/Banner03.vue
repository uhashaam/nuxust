<template>
  <div class="banner-03">
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

defineProps<Props>()
</script>

<style scoped>
.banner-03 {
  width: 100%;
  height: 500px;
  background: #fafbfc;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.banner-03::before {
  content: '';
  position: absolute;
  top: -200px;
  right: -200px;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: rgba(241, 245, 249, 0.8);
  pointer-events: none;
}

.banner-03::after {
  content: '';
  position: absolute;
  bottom: -150px;
  left: -100px;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: rgba(241, 245, 249, 0.6);
  pointer-events: none;
}

.banner-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 700px;
  padding: 0 2rem;
}

.industry-name {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 3rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 1.25rem 0;
  letter-spacing: -0.03em;
  line-height: 1.15;
}

.divider {
  width: 36px;
  height: 2px;
  background: #cbd5e1;
  margin: 0 auto 1.5rem;
}

.slogan {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 1.0625rem;
  color: #94a3b8;
  font-weight: 400;
  line-height: 1.7;
  letter-spacing: 0.02em;
}

@media (max-width: 768px) {
  .banner-03 {
    height: 350px;
  }
  .industry-name {
    font-size: 2.25rem;
  }
  .slogan {
    font-size: 0.9375rem;
  }
}
</style>
