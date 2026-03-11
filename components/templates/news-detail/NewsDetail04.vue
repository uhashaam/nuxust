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
      <h3>Recommended Reports</h3>
      <div class="rec-grid">
        <div 
          v-for="item in relatedNews" 
          :key="item.id" 
          class="rec-item"
          @click="navigateTo(subdomain ? `/i/${subdomain}/news/${item.slug}` : `/news/${item.slug}`)"
        >
          <div class="rec-content">
            <h4>{{ item.title }}</h4>
            <span>{{ item.publishedAt }}</span>
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
  max-width: 900px;
  margin: 0 auto;
  padding: 6rem 2rem;
  color: #1a1a1a;
  background: #ffffff;
}

.business-header {
  margin-bottom: 5rem;
  border-bottom: 4px solid #000000;
  padding-bottom: 2rem;
}

.title {
  font-family: 'Outfit', sans-serif;
  font-size: 3.5rem;
  font-weight: 900;
  color: #0f172a;
  margin: 0 0 1rem 0;
  line-height: 1.1;
  text-align: left;
  letter-spacing: -0.02em;
}

.header-meta {
  display: flex;
  justify-content: space-between; /* Right-aligned date as requested */
  align-items: center;
}

.author {
  font-weight: 700;
  font-size: 1rem;
  color: #1a1a1a;
}

.pub-date {
  font-weight: 500;
  font-size: 1rem;
  color: #94a3b8; /* Gray as requested */
}

.business-image {
  margin-bottom: 5rem;
}

.business-image img {
  width: 100%;
  border-radius: 4px;
}

.content {
  font-size: 1.125rem;
  line-height: 1.8; /* Premium legibility */
  color: #334155;
  letter-spacing: -0.01em;
  -webkit-font-smoothing: antialiased;
}

.content :deep(p) {
  margin-bottom: 2.2rem; /* Moderate paragraph spacing as requested */
}

.content :deep(h2) {
  font-size: 2rem;
  font-weight: 800;
  margin: 4rem 0 2rem;
  color: #000000;
}

.business-rec {
  margin-top: 8rem;
  background: #f8fafc;
  padding: 4rem;
  border-radius: 16px;
}

.business-rec h3 {
  font-size: 1.5rem;
  font-weight: 900;
  margin-bottom: 3rem;
  text-transform: uppercase;
}

.rec-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.rec-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: #ffffff;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.03), 0 2px 4px -2px rgba(0, 0, 0, 0.02);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.rec-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04);
}

.rec-content h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
  font-weight: 700;
}

.rec-content span {
  font-size: 0.8125rem;
  color: #94a3b8;
  font-weight: 600;
}

.rec-arrow {
  font-size: 1.5rem;
  color: #cbd5e1;
}

@media (max-width: 768px) {
  .title { font-size: 2.25rem; }
  .business-rec { padding: 2rem; }
}
</style>
