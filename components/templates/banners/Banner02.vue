<template>
  <div class="banner-02" :style="{ backgroundImage: `url(${bgImage})` }">
    <div class="base-overlay"></div>
    <div class="metallic-accents"></div>
    <div class="banner-content">
      <div class="metallic-frame">
        <h1 class="industry-name">{{ industryName }}</h1>
        <p class="slogan">{{ siteSlogan }}</p>
      </div>
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
// Using real-world industry visual as requested
const bgImage = props.backgroundImage || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1920&h=500'
</script>

<style scoped>
.banner-02 {
  width: 100%;
  height: 500px;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #374151; /* Dark gray base */
}

.base-overlay {
  position: absolute;
  inset: 0;
  background: rgba(55, 65, 81, 0.4);
}

.metallic-accents {
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.05) 45%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.05) 55%, transparent 60%);
  pointer-events: none;
}

.banner-content {
  position: relative;
  z-index: 2;
  padding: 2rem;
}

.metallic-frame {
  background: linear-gradient(135deg, #e2e8f0 0%, #94a3b8 50%, #64748b 100%);
  padding: 3rem 4rem;
  border: 8px solid;
  border-image: linear-gradient(to bottom right, #cbd5e1, #475569, #94a3b8) 1;
  box-shadow: 
    0 20px 25px -5px rgba(0, 0, 0, 0.5),
    inset 0 0 20px rgba(0, 0, 0, 0.2);
  transform: skew(-2deg);
}

.industry-name {
  font-size: 4rem;
  font-weight: 900;
  color: #000000; /* Bold in black as requested */
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
  font-family: 'Arial Black', sans-serif;
  letter-spacing: -0.05em;
  line-height: 1;
}

.slogan {
  font-size: 1.25rem;
  color: #1a202c; /* Near black slogan */
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  border-top: 2px solid #475569;
  padding-top: 1rem;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .banner-02 { height: 350px; }
  .metallic-frame { padding: 1.5rem 2rem; }
  .industry-name { font-size: 2.25rem; }
  .slogan { font-size: 0.875rem; letter-spacing: 0.1em; }
}
</style>
