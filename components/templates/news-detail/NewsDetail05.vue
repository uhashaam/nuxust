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
      <img :src="image" :alt="title" fetchpriority="high" />
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
          <div class="image-wrapper" v-if="item.image">
            <img :src="item.image" :alt="item.title" loading="lazy" />
          </div>
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
  padding: 5rem 2rem 6rem;
  background: #ffffff;
  font-family: 'Inter', sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 3.5rem;
}

.title {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #94a3b8; /* Light gray bold title as requested */
  margin: 0 0 1.25rem 0;
  line-height: 1.25;
  letter-spacing: -0.01em;
}

.author-meta {
  font-size: 0.8125rem;
  font-weight: 500;
  color: #cbd5e1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.fresh-image {
  margin-bottom: 3.5rem;
  border-radius: 16px;
  overflow: hidden;
}

.fresh-image img {
  width: 100%;
  display: block;
}

.content {
  font-size: 1.0625rem;
  line-height: 1.8;
  color: #475569; /* Light-colored body text (dark gray) as requested */
  font-weight: 300;
}

.content :deep(p) {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #f1f5f9; /* Thin line breaks separate paragraphs as requested */
}

.content :deep(p):last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.content :deep(h2) {
  text-align: center;
  color: #64748b;
  font-weight: 700;
  font-size: 1.5rem;
  margin: 3.5rem 0 1.5rem;
  border-bottom: none;
  padding-bottom: 0;
}

.content :deep(img) {
  max-width: 100%;
  border-radius: 12px;
  margin: 2rem 0;
}

.fresh-rec {
  margin-top: 6rem;
}

.rec-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.rec-header span {
  font-size: 0.6875rem;
  font-weight: 700;
  color: #94a3b8;
  letter-spacing: 0.15em;
}

.line {
  height: 1px;
  width: 60px;
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
  transform: translateY(-4px);
}

.image-wrapper {
  margin-bottom: 1rem;
  border-radius: 50%;
  overflow: hidden;
  aspect-ratio: 1;
  border: 4px solid #f8fafc;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
  transition: border-color 0.3s;
}

.rec-mini-card:hover .image-wrapper {
  border-color: #f1f5f9;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.rec-mini-card h5 {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 0.8125rem;
  font-weight: 600;
  margin: 0;
  color: #64748b;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .title { font-size: 1.75rem; }
  .rec-row { grid-template-columns: repeat(2, 1fr); gap: 2rem 1rem; }
}
</style>
