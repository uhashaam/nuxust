<template>
  <div class="banner-05" :style="{ backgroundImage: `url(${bgImage})` }">
    <div class="texture-overlay"></div>
    <div class="vignette"></div>
    <div class="banner-content">
      <h1 class="industry-name">{{ industryName }}</h1>
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
// Using heavy texture visual as requested (stone/earth pattern)
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
  background-color: #261a0d; /* Dark brown base */
}

.texture-overlay {
  position: absolute;
  inset: 0;
  opacity: 0.3;
  background-image: url("https://www.transparenttextures.com/patterns/natural-paper.png");
}

.vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, transparent 0%, rgba(0,0,0,0.7) 100%);
}

.banner-content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 0 2rem;
}

.industry-name {
  font-size: 4.5rem;
  font-weight: 800;
  color: #ffffff; /* White text as requested */
  margin: 0;
  text-shadow: 4px 4px 15px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0,0,0,0.5); /* Shadow effect as requested */
  text-transform: uppercase;
  font-family: 'Georgia', serif;
  letter-spacing: 0.05em;
}

.slogan {
  font-size: 1.5rem;
  color: #f8fafc;
  font-weight: 500;
  letter-spacing: 0.1em;
  margin-top: 1.5rem;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8); /* Shadow effect */
  opacity: 0.9;
}

@media (max-width: 768px) {
  .banner-05 { height: 350px; }
  .industry-name { font-size: 2.75rem; }
  .slogan { font-size: 1.125rem; }
}
</style>
