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
      <div class="image-tint"></div>
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
  max-width: 820px;
  margin: 0 auto;
  padding: 4rem 2rem 6rem;
  font-family: 'Inter', sans-serif;
}

.tech-header {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.blue-accent-line {
  width: 4px;
  min-height: 60px;
  background: linear-gradient(180deg, #3b82f6, #60a5fa);
  flex-shrink: 0;
  border-radius: 2px;
}

.title {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 2.25rem;
  font-weight: 800;
  color: #0f172a;
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin-bottom: 0.875rem;
}

.meta {
  display: flex;
  gap: 1.5rem;
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.tech-image {
  position: relative;
  margin-bottom: 3rem;
  border-radius: 8px;
  overflow: hidden;
}

.tech-image img {
  width: 100%;
  display: block;
}

.image-tint {
  position: absolute;
  inset: 0;
  background: linear-gradient(transparent 60%, rgba(59, 130, 246, 0.04) 100%);
  pointer-events: none;
}

.content {
  font-size: 1rem;
  line-height: 1.75;
  color: #94a3b8;
  font-weight: 300;
}

.content :deep(strong),
.content :deep(b) {
  color: #3b82f6;
  font-weight: 700;
}

.content :deep(p) {
  margin-bottom: 1.5rem;
}

.content :deep(h2) {
  color: #1e3a8a;
  font-size: 1.375rem;
  font-weight: 700;
  margin: 2.5rem 0 1.25rem;
}

.content :deep(img) {
  max-width: 100%;
  border-radius: 6px;
  margin: 1.5rem 0;
}

.tech-recommendations {
  margin-top: 4rem;
  padding: 1.5rem;
  background: #f8fafc;
  border: 1px solid #f1f5f9;
  border-radius: 10px;
}

.rec-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.rec-label {
  font-size: 0.625rem;
  font-weight: 800;
  color: #3b82f6;
  letter-spacing: 0.12em;
  flex-shrink: 0;
}

.rec-line {
  flex: 1;
  height: 1px;
  background: #e2e8f0;
}

.rec-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.rec-card {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  cursor: pointer;
  padding: 0.875rem 1rem;
  border-radius: 8px;
  transition: all 0.25s ease;
}

.rec-card:hover {
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.08);
  transform: translateX(4px);
}

.rec-card:hover p {
  color: #3b82f6;
}

.rec-dot {
  width: 5px;
  height: 5px;
  background: #3b82f6;
  border-radius: 50%;
  flex-shrink: 0;
}

.rec-card p {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 500;
  color: #475569;
  transition: color 0.2s;
}

@media (max-width: 768px) {
  .tech-header { flex-direction: column; gap: 0.75rem; }
  .blue-accent-line { width: 100%; height: 4px; min-height: 4px; }
  .title { font-size: 1.75rem; }
}
</style>
