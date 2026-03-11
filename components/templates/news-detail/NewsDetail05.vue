<template>
  <article class="news-detail-05">
    <header class="header">
      <h1 class="title">{{ title }}</h1>
      <div class="author-meta">
        <span class="author">{{ author }}</span>
        <span class="dot">·</span>
        <span class="date">{{ publishedAt }}</span>
      </div>
    </header>

    <div v-if="image" class="fresh-image">
      <img :src="image" :alt="title" />
    </div>
    
    <div class="content" v-html="content"></div>

    <div v-if="relatedNews && relatedNews.length" class="fresh-rec">
      <div class="rec-header">
        <div class="line"></div>
        <span>FRESH DISCOVERIES</span>
        <div class="line"></div>
      </div>
      <div class="rec-row">
        <div 
          v-for="item in relatedNews" 
          :key="item.id" 
          class="rec-mini-card"
          @click="navigateTo(subdomain ? `/i/${subdomain}/news/${item.slug}` : `/news/${item.slug}`)"
        >
          <img :src="item.image" :alt="item.title" />
          <h5>{{ item.title }}</h5>
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
.news-detail-05 {
  max-width: 800px;
  margin: 0 auto;
  padding: 6rem 2rem;
  background: #ffffff;
}

.header {
  text-align: center;
  margin-bottom: 4rem;
}

.title {
  font-family: 'Outfit', sans-serif;
  font-size: 3rem;
  font-weight: 800;
  color: #64748b;
  margin: 0 0 1.5rem 0;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.author-meta {
  font-size: 0.9375rem;
  font-weight: 500;
  color: #64748b;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.fresh-image {
  margin-bottom: 4rem;
  border-radius: 24px;
  overflow: hidden;
}

.fresh-image img {
  width: 100%;
  opacity: 0.95;
}

.content {
  font-size: 1.125rem;
  line-height: 1.8;
  color: #475569; /* Dark gray body text as requested */
}

.content :deep(p) {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #f1f5f9; /* Thin line breaks as requested */
}

.content :deep(p):last-child {
  border-bottom: none;
}

.content :deep(h2) {
  text-align: center;
  color: #94a3b8;
  font-weight: 800;
  margin: 4rem 0 2rem;
}

.fresh-rec {
  margin-top: 8rem;
}

.rec-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 4rem;
}

.rec-header span {
  font-size: 0.8125rem;
  font-weight: 800;
  color: #cbd5e1;
  letter-spacing: 0.2em;
}

.line {
  height: 1px;
  width: 100px;
  background: #f1f5f9;
}

.rec-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.rec-mini-card {
  text-align: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.rec-mini-card:hover {
  transform: translateY(-6px);
}

.rec-mini-card img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 50%; /* Playful/Fresh look for Agri/Beauty */
  margin-bottom: 1rem;
  border: 4px solid #f8fafc;
}

.rec-mini-card h5 {
  font-size: 0.875rem;
  font-weight: 700;
  margin: 0;
  color: #64748b;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 768px) {
  .title { font-size: 2rem; }
  .rec-row { grid-template-columns: repeat(2, 1fr); }
}
</style>
