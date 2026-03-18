<template>
  <article class="news-detail-04">
    <div class="business-header">
      <h1 class="title">{{ title }}</h1>
      <div class="header-meta">
        <span class="author">By {{ author }}</span>
        <span class="pub-date">{{ publishedAt }}</span>
      </div>
    </div>

    <div v-if="image" class="business-image">
      <img :src="image" :alt="title" />
    </div>
    
    <div class="content" v-html="content"></div>

    <div v-if="relatedNews && relatedNews.length" class="business-rec">
      <div class="rec-header">
        <h3>Recommended Reading</h3>
      </div>
      <div class="rec-grid">
        <div 
          v-for="item in relatedNews" 
          :key="item.id" 
          class="rec-item"
          @click="navigateTo(subdomain ? `/i/${subdomain}/news/${item.slug}` : `/news/${item.slug}`)"
        >
          <div class="rec-content">
            <h4>{{ item.title }}</h4>
            <span v-if="item.publishedAt">{{ item.publishedAt }}</span>
          </div>
          <el-icon class="rec-arrow"><Right /></el-icon>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { navigateTo } from 'nuxt/app'
import { Right } from '@element-plus/icons-vue'

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
.news-detail-04 {
  max-width: 860px;
  margin: 0 auto;
  padding: 5rem 2rem 6rem;
  font-family: 'Inter', sans-serif;
  color: #1a1a1a;
  background: #ffffff;
}

.business-header {
  margin-bottom: 4rem;
  border-bottom: 3px solid #0f172a;
  padding-bottom: 1.5rem;
}

.title {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 2.75rem;
  font-weight: 800;
  color: #000000; /* Bold black title as requested */
  margin: 0 0 1.25rem 0;
  line-height: 1.15;
  text-align: left; /* Left-aligned as requested */
  letter-spacing: -0.02em;
}

.header-meta {
  display: flex;
  justify-content: space-between; /* Right-aligned date as requested */
  align-items: center;
}

.author {
  font-weight: 700;
  font-size: 0.9375rem;
  color: #0f172a;
}

.pub-date {
  font-weight: 500;
  font-size: 0.875rem;
  color: #64748b; /* Gray as requested */
}

.business-image {
  margin-bottom: 4rem;
}

.business-image img {
  width: 100%;
  border-radius: 6px;
  display: block;
}

.content {
  font-size: 1.125rem;
  line-height: 1.6; /* ~1.6x line spacing as requested */
  color: #334155;
  -webkit-font-smoothing: antialiased;
}

.content :deep(p) {
  margin-bottom: 2rem; /* Moderate paragraph spacing as requested */
}

.content :deep(h2) {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 1.75rem;
  font-weight: 800;
  margin: 3.5rem 0 1.5rem;
  color: #000000;
}

.content :deep(img) {
  max-width: 100%;
  border-radius: 6px;
  margin: 2rem 0;
}

.business-rec {
  margin-top: 5rem;
  background: #f8fafc;
  padding: 3rem;
  border-radius: 12px;
  border: 1px solid #f1f5f9;
}

.rec-header h3 {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 1rem;
  font-weight: 800;
  margin: 0 0 2rem 0;
  text-transform: uppercase;
  color: #0f172a;
  letter-spacing: 0.05em;
}

.rec-grid {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.rec-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  background: #ffffff;
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
}

.rec-item:hover {
  border-color: #cbd5e1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transform: translateX(4px);
}

.rec-content h4 {
  margin: 0 0 0.375rem 0;
  font-size: 1.0625rem;
  font-weight: 600;
  color: #0f172a;
}

.rec-content span {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 500;
}

.rec-arrow {
  font-size: 1.25rem;
  color: #94a3b8;
  transition: transform 0.2s;
}

.rec-item:hover .rec-arrow {
  color: #0f172a;
  transform: translateX(4px);
}

@media (max-width: 768px) {
  .title { font-size: 2rem; }
  .business-rec { padding: 1.5rem; }
  .header-meta { flex-direction: column; align-items: flex-start; gap: 0.5rem; }
}
</style>
