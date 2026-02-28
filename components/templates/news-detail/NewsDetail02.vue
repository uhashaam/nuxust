<template>
  <article class="news-detail-02">
    <div class="tech-header">
      <div class="blue-accent-line"></div>
      <div class="header-main">
        <h1 class="title">{{ title }}</h1>
        <div class="meta">
          <span class="pub-date">{{ publishedAt }}</span>
          <span class="author">By {{ author }}</span>
        </div>
      </div>
    </div>

    <div v-if="image" class="tech-image">
      <img :src="image" :alt="title" />
      <div class="image-scan-effect"></div>
    </div>
    
    <div class="content" v-html="content"></div>
    
    <div v-if="relatedNews && relatedNews.length" class="tech-recommendations">
      <div class="rec-header">
        <span class="rec-label">CONNECTED INSIGHTS</span>
        <div class="rec-line"></div>
      </div>
      <div class="rec-list">
        <div 
          v-for="item in relatedNews" 
          :key="item.id" 
          class="rec-card"
          @click="navigateTo(subdomain ? `/i/${subdomain}/news/${item.slug}` : `/news/${item.slug}`)"
        >
          <div class="rec-dot"></div>
          <p>{{ item.title }}</p>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { navigateTo } from 'nuxt/app'

interface Props {
  title: string
  publishedAt: string
  author: string
  content: string
  relatedNews?: any[]
  image?: string
  subdomain?: string
}

defineProps<Props>()
</script>

<style scoped>
.news-detail-02 {
  max-width: 900px;
  margin: 0 auto;
  padding: 4rem 2rem;
  background: #fcfdfe;
}

.tech-header {
  display: flex;
  gap: 2rem;
  margin-bottom: 4rem;
}

.blue-accent-line {
  width: 6px;
  min-height: 80px;
  background: #3b82f6; /* Blue vertical line as requested */
  flex-shrink: 0;
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
}

.title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #0f172a;
  line-height: 1.25;
  margin-bottom: 1rem;
}

.meta {
  display: flex;
  gap: 2rem;
  font-size: 0.875rem;
  color: #94a3b8;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.tech-image {
  position: relative;
  margin-bottom: 4rem;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

.tech-image img {
  width: 100%;
  opacity: 0.9;
}

.image-scan-effect {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(rgba(59, 130, 246, 0), rgba(59, 130, 246, 0.05));
  pointer-events: none;
}

.content {
  font-size: 1.0625rem;
  line-height: 1.8;
  color: #64748b; /* Thin gray body text as requested */
  font-weight: 300;
}

.content :deep(strong), .content :deep(b) {
  color: #3b82f6; /* Bold key content in blue as requested */
  font-weight: 700;
}

.content :deep(h2) {
  color: #1e3a8a;
  font-size: 1.5rem;
  margin-top: 3rem;
}

.tech-recommendations {
  margin-top: 5rem;
  padding: 2rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
}

.rec-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.rec-label {
  font-size: 0.75rem;
  font-weight: 900;
  color: #3b82f6;
  letter-spacing: 0.1em;
}

.rec-line {
  flex: 1;
  height: 1px;
  background: #e2e8f0;
}

.rec-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.rec-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.rec-card:hover {
  transform: translateX(10px);
  color: #3b82f6;
}

.rec-dot {
  width: 6px;
  height: 6px;
  background: #3b82f6;
  border-radius: 50%;
}

.rec-card p {
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .tech-header { flex-direction: column; gap: 1rem; }
  .blue-accent-line { width: 100%; height: 6px; min-height: 6px; }
  .title { font-size: 1.75rem; }
}
</style>
