<template>
  <article class="news-detail-01">
    <header class="article-header">
      <h1 class="title">{{ title }}</h1>
      <div class="meta">
        <span class="pub-date">{{ publishedAt }}</span>
        <span class="author">By {{ author }}</span>
      </div>
    </header>

    <div v-if="image" class="featured-image">
      <img :src="image" :alt="title" />
    </div>
    
    <div class="content" v-html="content"></div>
    
    <div v-if="relatedNews && relatedNews.length" class="recommendations">
      <h3 class="rec-title">Related Recommendations</h3>
      <div class="rec-grid">
        <div 
          v-for="item in relatedNews" 
          :key="item.id" 
          class="rec-item"
          @click="navigateTo(subdomain ? `/i/${subdomain}/news/${item.slug}` : `/news/${item.slug}`)"
        >
          <img :src="item.image" :alt="item.title" class="rec-img" />
          <h4 class="rec-name">{{ item.title }}</h4>
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
  max-width: 850px;
  margin: 0 auto;
  padding: 5rem 2rem;
  font-family: 'Inter', sans-serif;
}

.article-header {
  margin-bottom: 4rem;
}

.title {
  text-align: center; /* Centered title as requested */
  font-size: 3rem;
  font-weight: 800; /* Bold as requested */
  color: #000000; /* Black as requested */
  margin: 0 0 1.5rem 0;
  line-height: 1.2;
}

.meta {
  display: flex;
  justify-content: flex-start; /* Left-aligned meta as requested */
  gap: 2rem;
  color: #64748b; /* Gray as requested */
  font-size: 0.9375rem;
  font-weight: 500;
  margin-left: 0; /* Ensure it stays left */
}

.featured-image {
  margin-bottom: 3rem;
  border-radius: 12px;
  overflow: hidden;
}

.featured-image img {
  width: 100%;
  height: auto;
  display: block;
}

.content {
  font-size: 1.125rem;
  line-height: 1.5; /* 1.5x line spacing as requested */
  color: #1f2937;
  margin-bottom: 5rem;
}

.content :deep(p) {
  margin-bottom: 1.5rem;
}

.content :deep(h2) {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 3rem 0 1.5rem;
}

.recommendations {
  border-top: 1px solid #e2e8f0;
  padding-top: 3rem;
}

.rec-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 2rem;
}

.rec-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.rec-item {
  display: flex;
  gap: 1rem;
  cursor: pointer;
  transition: opacity 0.2s;
}

.rec-item:hover {
  opacity: 0.7;
}

.rec-img {
  width: 100px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}

.rec-name {
  font-size: 0.9375rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .title { font-size: 2rem; }
  .rec-grid { grid-template-columns: 1fr; }
}
</style>
