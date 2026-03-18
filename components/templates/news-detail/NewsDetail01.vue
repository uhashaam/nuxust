<template>
  <article class="news-detail-01">
    <header class="article-header">
      <h1 class="title">{{ title }}</h1>
      <div class="meta">
        <span class="pub-date">{{ publishedAt }}</span>
        <span class="separator">·</span>
        <span class="author">{{ author }}</span>
      </div>
    </header>

    <div v-if="image" class="featured-image">
      <img :src="image" :alt="title" />
    </div>
    
    <div class="content" v-html="content"></div>
    
    <div v-if="relatedNews && relatedNews.length" class="recommendations">
      <h3 class="rec-title">Related Articles</h3>
      <div class="rec-grid">
        <div 
          v-for="item in relatedNews" 
          :key="item.id" 
          class="rec-item"
          @click="navigateTo(subdomain ? `/i/${subdomain}/news/${item.slug}` : `/news/${item.slug}`)"
        >
          <img v-if="item.image" :src="item.image" :alt="item.title" class="rec-img" />
          <div class="rec-text">
            <h4 class="rec-name">{{ item.title }}</h4>
            <span class="rec-date" v-if="item.publishedAt">{{ item.publishedAt }}</span>
          </div>
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
.news-detail-01 {
  max-width: 780px;
  margin: 0 auto;
  padding: 4rem 2rem 6rem;
  font-family: 'Inter', sans-serif;
}

.article-header {
  margin-bottom: 3rem;
}

.title {
  text-align: center;
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 2.5rem;
  font-weight: 800;
  color: #0f0f0f;
  margin: 0 0 1.25rem 0;
  line-height: 1.2;
  letter-spacing: -0.03em;
}

.meta {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  color: #94a3b8;
  font-size: 0.8125rem;
  font-weight: 400;
}

.separator {
  color: #d1d5db;
}

.featured-image {
  margin-bottom: 2.5rem;
  border-radius: 8px;
  overflow: hidden;
}

.featured-image img {
  width: 100%;
  height: auto;
  display: block;
}

.content {
  font-size: 1.0625rem;
  line-height: 1.5;
  color: #334155;
  -webkit-font-smoothing: antialiased;
}

.content :deep(p) {
  margin-bottom: 1.375rem;
}

.content :deep(h2) {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  margin: 2.5rem 0 1.25rem;
}

.content :deep(img) {
  max-width: 100%;
  border-radius: 6px;
  margin: 1.5rem 0;
}

.recommendations {
  border-top: 1px solid #f1f5f9;
  padding-top: 2.5rem;
  margin-top: 4rem;
}

.rec-title {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 0.8125rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #94a3b8;
  margin-bottom: 1.5rem;
}

.rec-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}

.rec-item {
  display: flex;
  gap: 1rem;
  cursor: pointer;
  padding: 1rem;
  border-radius: 8px;
  transition: background 0.2s;
}

.rec-item:hover {
  background: #f8fafc;
}

.rec-img {
  width: 100px;
  height: 68px;
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;
}

.rec-text {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.rec-name {
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.4;
  color: #1e293b;
}

.rec-date {
  font-size: 0.6875rem;
  color: #94a3b8;
}

@media (max-width: 768px) {
  .title { font-size: 1.75rem; }
  .rec-grid { grid-template-columns: 1fr; }
}
</style>
