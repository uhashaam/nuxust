<template>
  <div class="banner-02" :style="{ backgroundImage: `url(${bgImage})` }">
    <div class="base-overlay"></div>
    <div class="metallic-sheen"></div>
    <div class="noise-texture"></div>
    <div class="banner-content">
      <div class="metallic-frame">
        <div class="corner tl"></div>
        <div class="corner tr"></div>
        <div class="corner bl"></div>
        <div class="corner br"></div>
        <h1 class="industry-name">{{ industryName }}</h1>
        <div class="separator"></div>
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
  background-color: #1f2937;
}

.base-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    160deg,
    rgba(31, 41, 55, 0.85) 0%,
    rgba(55, 65, 81, 0.75) 50%,
    rgba(31, 41, 55, 0.9) 100%
  );
}

.metallic-sheen {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    transparent 30%,
    rgba(255, 255, 255, 0.03) 40%,
    rgba(255, 255, 255, 0.08) 50%,
    rgba(255, 255, 255, 0.03) 60%,
    transparent 70%
  );
  pointer-events: none;
}

.noise-texture {
  position: absolute;
  inset: 0;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  pointer-events: none;
}

.banner-content {
  position: relative;
  z-index: 2;
  padding: 2rem;
}

.metallic-frame {
  position: relative;
  background: linear-gradient(
    145deg,
    rgba(209, 213, 219, 0.95) 0%,
    rgba(156, 163, 175, 0.9) 40%,
    rgba(107, 114, 128, 0.85) 100%
  );
  padding: 3rem 4.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    inset 0 -1px 0 rgba(0, 0, 0, 0.15);
}

.corner {
  position: absolute;
  width: 16px;
  height: 16px;
  border-color: rgba(0, 0, 0, 0.4);
  border-style: solid;
}
.corner.tl { top: 8px; left: 8px; border-width: 2px 0 0 2px; }
.corner.tr { top: 8px; right: 8px; border-width: 2px 2px 0 0; }
.corner.bl { bottom: 8px; left: 8px; border-width: 0 0 2px 2px; }
.corner.br { bottom: 8px; right: 8px; border-width: 0 2px 2px 0; }

.industry-name {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 3.5rem;
  font-weight: 900;
  color: #111827;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: -0.03em;
  line-height: 1;
}

.separator {
  width: 50px;
  height: 3px;
  background: rgba(0, 0, 0, 0.3);
  margin: 1.25rem 0;
}

.slogan {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 1rem;
  color: #374151;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

@media (max-width: 768px) {
  .banner-02 { height: 380px; }
  .metallic-frame { padding: 2rem 2.5rem; }
  .industry-name { font-size: 2rem; }
  .slogan { font-size: 0.8125rem; letter-spacing: 0.08em; }
}
</style>
