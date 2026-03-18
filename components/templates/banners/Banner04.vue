<template>
  <div class="banner-04">
    <div class="grid-pattern"></div>
    <div class="professional-overlay"></div>
    <div class="banner-content">
      <div class="line-top"></div>
      <h1 class="industry-name">{{ industryName }}</h1>
      <p class="slogan">{{ siteSlogan }}</p>
      <div class="line-bottom"></div>
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
.banner-04 {
  width: 100%;
  height: 500px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    #eef2f7 0%,
    #e2e8f0 30%,
    #dbeafe 60%,
    #e0e7ff 100%
  );
  overflow: hidden;
}

.grid-pattern {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
}

.professional-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at 70% 30%,
    rgba(59, 130, 246, 0.06) 0%,
    transparent 60%
  );
  pointer-events: none;
}

.banner-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 800px;
  padding: 0 2rem;
}

.line-top,
.line-bottom {
  width: 48px;
  height: 2px;
  background: linear-gradient(90deg, #3b82f6, #818cf8);
  margin: 1.5rem auto;
  border-radius: 1px;
}

.industry-name {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 3.25rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.slogan {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 1.0625rem;
  color: #64748b;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-top: 1rem;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .banner-04 {
    height: 350px;
  }
  .industry-name {
    font-size: 2.25rem;
  }
  .slogan {
    font-size: 0.8125rem;
    letter-spacing: 0.12em;
  }
}
</style>
