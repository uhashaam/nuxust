<template>
  <div class="about-page">
    <section class="hero-section">
      <div class="container">
        <h1>About {{ siteData?.industryName || 'Our Industry' }}</h1>
        <p class="subtitle">Your Specialized News Source</p>
      </div>
    </section>

    <section class="mission-section">
      <div class="container">
        <div class="content-grid">
          <div class="text-content">
            <h2>Our Mission</h2>
            <!-- Dynamic About Text -->
            <div v-if="siteData?.aboutText" class="dynamic-about">
              <p>{{ siteData.aboutText }}</p>
            </div>
            <!-- Fallback Text -->
            <div v-else class="fallback-about">
              <p>
                Welcome to {{ siteData?.industryName || 'our' }} News - your dedicated intelligence hub for the {{ siteData?.industryName || 'industry' }} sector.
                We provide comprehensive, accurate, and timely coverage of developments shaping this dynamic industry.
              </p>
              <p>
                Our platform connects industry leaders, decision-makers, and innovators with the insights they need to stay ahead.
              </p>
            </div>
          </div>
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-number">24/7</div>
              <div class="stat-label">News Coverage</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">Global</div>
              <div class="stat-label">Industry Reach</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="values-section">
      <div class="container">
        <h2>Our Commitment</h2>
        <div class="values-grid">
          <div class="value-card">
            <div class="icon">📊</div>
            <h3>Industry Focus</h3>
            <p>Dedicated coverage of {{ siteData?.industryName || 'the industry' }} sector with expert analysis.</p>
          </div>
          <div class="value-card">
            <div class="icon">⚡</div>
            <h3>Real-Time Updates</h3>
            <p>Breaking news and developments as they happen in your industry.</p>
          </div>
          <div class="value-card">
            <div class="icon">🎯</div>
            <h3>Relevant Content</h3>
            <p>Curated news that matters to {{ siteData?.industryName || 'industry' }} professionals.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <h2>Stay Informed</h2>
        <p>Get the latest {{ siteData?.industryName || 'industry' }} news delivered to you.</p>
        <el-button type="primary" size="large" @click="navigateTo(`/i/${subdomain}/contact`)">Contact Us</el-button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue'
import { useRoute, navigateTo, useHead } from 'nuxt/app'

const route = useRoute()
const subdomain = computed(() => route.params.subdomain as string)
const siteData = inject<any>('industrySiteData')

useHead({
  title: computed(() => `About ${siteData?.value?.industryName || 'Us'} - B2B News Station`),
  meta: [
    { name: 'description', content: computed(() => `Learn about ${siteData?.value?.industryName || 'our'} industry news coverage and our commitment to delivering quality insights.`) }
  ]
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

.about-page {
  background-color: #f8fafc;
  background-image: radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.04), transparent 50%),
                    radial-gradient(circle at 90% 80%, rgba(168, 85, 247, 0.04), transparent 50%);
  color: #0f172a;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  min-height: 100vh;
}

.container { max-width: 1280px; margin: 0 auto; padding: 0 2rem; }

.hero-section {
  background: linear-gradient(135deg, #020617 0%, #0f172a 100%);
  color: white;
  padding: 8rem 0 6rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-section::after {
  content: '';
  position: absolute;
  top: -50%; left: -50%;
  width: 200%; height: 200%;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 60%);
  pointer-events: none;
}

.hero-section h1 {
  font-size: clamp(3rem, 5vw, 4rem);
  font-weight: 900;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #ffffff, #c7d2fe);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.1;
  position: relative;
  z-index: 2;
  animation: fadeInUp 0.8s ease-out;
}
@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

.subtitle {
  font-size: 1.35rem;
  color: #cbd5e1;
  font-weight: 500;
  position: relative;
  z-index: 2;
  animation: fadeInUp 1s ease-out;
}

.mission-section { padding: 8rem 0; }

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
}

.text-content h2 {
  font-size: 2.75rem;
  font-weight: 900;
  margin-bottom: 2rem;
  color: #020617;
  letter-spacing: -0.02em;
}

.text-content p {
  font-size: 1.15rem;
  line-height: 1.8;
  color: #475569;
  margin-bottom: 1.5rem;
  white-space: pre-line;
}

.stats-grid { display: grid; gap: 2.5rem; }

.stat-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 2.5rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 4px 15px -5px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(226, 232, 240, 0.8);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.stat-card:hover {
  transform: translateX(-5px) translateY(-5px);
  box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.1);
  border-color: #cbd5e1;
}

.stat-number {
  font-size: 3rem;
  font-weight: 900;
  background: linear-gradient(135deg, #4f46e5 0%, #7e22ce 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1.05rem;
  color: #64748b;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.values-section {
  padding: 8rem 0;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(226, 232, 240, 0.6);
}

.values-section h2 {
  font-size: 2.75rem;
  font-weight: 900;
  text-align: center;
  margin-bottom: 5rem;
  color: #020617;
  letter-spacing: -0.02em;
}

.values-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.5rem; }

.value-card {
  background: rgba(255, 255, 255, 0.9);
  padding: 3.5rem 2.5rem;
  border-radius: 20px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 15px -5px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(226, 232, 240, 0.8);
}
.value-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.1);
  border-color: #cbd5e1;
}

.icon {
  font-size: 2.75rem;
  margin-bottom: 1.5rem;
  display: inline-block;
  padding: 1rem;
  background: linear-gradient(135deg, #e0e7ff 0%, #ede9fe 100%);
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.1);
}

.value-card h3 { font-size: 1.5rem; font-weight: 800; color: #020617; margin-bottom: 1rem; }
.value-card p { color: #475569; line-height: 1.7; font-size: 1.05rem; }

.cta-section {
  padding: 8rem 0;
  background: linear-gradient(135deg, #020617 0%, #0f172a 100%);
  color: white;
  text-align: center;
  position: relative;
}
.cta-section::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(to right, transparent, rgba(99, 102, 241, 0.5), transparent);
}

.cta-section h2 {
  font-size: 2.75rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  background: linear-gradient(to right, #ffffff, #c7d2fe);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.cta-section p { font-size: 1.35rem; color: #cbd5e1; margin-bottom: 3rem; font-weight: 500; }

:deep(.el-button) {
  height: 64px;
  padding: 0 3rem;
  border-radius: 14px;
  font-weight: 800;
  font-size: 1.15rem;
  background: linear-gradient(135deg, #4f46e5 0%, #7e22ce 100%) !important;
  border: none !important;
  box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.4);
  color: white !important;
  transition: all 0.3s ease;
}
:deep(.el-button:hover) { transform: translateY(-3px); box-shadow: 0 15px 35px -5px rgba(79, 70, 229, 0.6); filter: brightness(1.1); }

@media (max-width: 1024px) {
  .content-grid { grid-template-columns: 1fr; gap: 4rem; }
  .values-grid { grid-template-columns: 1fr; }
}

@media (max-width: 768px) {
  .container { padding: 0 1.5rem; }
  .hero-section { padding: 8rem 0 6rem; }
  .hero-section h1 { font-size: 2.5rem; }
  .cta-section { padding: 6rem 0; }
  .cta-section h2 { font-size: 2.25rem; }
}
</style>
