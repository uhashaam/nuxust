<template>
  <div class="banner-05" :style="{ backgroundImage: `url(${bgImage})` }">
    <div class="color-base"></div>
    <div class="texture-overlay"></div>
    <div class="vignette"></div>
    <div class="banner-content">
      <h1 class="industry-name">{{ industryName }}</h1>
      <div class="accent-line"></div>
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
const bgImage = props.backgroundImage || 'https://images.unsplash.com/photo-1517581177682-a022bb7ca511?auto=format&fit=crop&q=80&w=1920&h=500'
</script>

<style scoped>
.banner-05 {
  width: 100%;
  height: 500px;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2a1f12;
}

.color-base {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    160deg,
    rgba(42, 31, 18, 0.88) 0%,
    rgba(30, 25, 15, 0.82) 40%,
    rgba(20, 35, 20, 0.85) 100%
  );
}

.texture-overlay {
  position: absolute;
  inset: 0;
  opacity: 0.06;
  background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E");
  background-size: 20px 20px;
  pointer-events: none;
}

.vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at center,
    transparent 30%,
    rgba(0, 0, 0, 0.5) 100%
  );
  pointer-events: none;
}

.banner-content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 0 2rem;
  max-width: 900px;
}

.industry-name {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 4rem;
  font-weight: 900;
  color: #ffffff;
  margin: 0;
  text-shadow:
    0 4px 20px rgba(0, 0, 0, 0.6),
    0 2px 6px rgba(0, 0, 0, 0.4);
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.accent-line {
  width: 40px;
  height: 3px;
  background: rgba(255, 255, 255, 0.35);
  margin: 1.5rem auto;
  border-radius: 2px;
}

.slogan {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 1.125rem;
  color: rgba(248, 250, 252, 0.85);
  font-weight: 400;
  letter-spacing: 0.06em;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  line-height: 1.6;
  max-width: 550px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .banner-05 {
    height: 380px;
  }
  .industry-name {
    font-size: 2.5rem;
  }
  .slogan {
    font-size: 0.9375rem;
  }
}
</style>
