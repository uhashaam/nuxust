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
.about-page {
  background: #f8fafc;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

.hero-section {
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  color: white;
  padding: 6rem 0 4rem;
  text-align: center;
}

.hero-section h1 {
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.5rem;
  color: #e0e7ff;
  font-weight: 300;
}

.mission-section {
  padding: 6rem 0;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.text-content h2 {
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 2rem;
  color: #0f172a;
}

.text-content p {
  font-size: 1.125rem;
  line-height: 1.8;
  color: #475569;
  margin-bottom: 1.5rem;
  white-space: pre-line; /* Handle line breaks in dynamic text */
}

.stats-grid {
  display: grid;
  gap: 2rem;
}

.stat-card {
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 900;
  color: #3b82f6;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  color: #64748b;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.values-section {
  padding: 6rem 0;
  background: white;
}

.values-section h2 {
  font-size: 2.5rem;
  font-weight: 900;
  text-align: center;
  margin-bottom: 4rem;
  color: #0f172a;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.value-card {
  background: #f8fafc;
  padding: 2.5rem 2rem;
  border-radius: 16px;
  text-align: center;
  transition: transform 0.3s;
}

.value-card:hover {
  transform: translateY(-8px);
}

.icon {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.value-card h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 1rem;
}

.value-card p {
  color: #64748b;
  line-height: 1.6;
}

.cta-section {
  padding: 6rem 0;
  background: #0f172a;
  color: white;
  text-align: center;
}

.cta-section h2 {
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 1rem;
}

.cta-section p {
  font-size: 1.25rem;
  color: #94a3b8;
  margin-bottom: 2.5rem;
}

@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
  
  .values-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2.5rem;
  }
}
</style>
