<template>
  <article class="news-detail-03">
    <div class="industrial-frame">
      <header class="header">
        <h1 class="title">{{ title }}</h1>
        <div class="meta">
          <div class="meta-item">
            <el-icon class="icon"><Setting /></el-icon>
            <span>{{ publishedAt }}</span>
          </div>
          <div class="meta-item">
            <el-icon class="icon"><User /></el-icon>
            <span>{{ author }}</span>
          </div>
        </div>
      </header>

      <div v-if="image" class="featured-image">
        <img :src="image" :alt="title" />
      </div>
      
      <div class="content" v-html="content"></div>

      <div v-if="relatedNews && relatedNews.length" class="related-industrial">
        <h3>RELATED REPORTS</h3>
        <div class="related-list">
          <div 
            v-for="item in relatedNews" 
            :key="item.id" 
            class="related-card"
            @click="navigateTo(subdomain ? `/i/${subdomain}/news/${item.slug}` : `/news/${item.slug}`)"
          >
            <img v-if="item.image" :src="item.image" :alt="item.title" />
            <div class="card-text">
              <h4>{{ item.title }}</h4>
              <span v-if="item.publishedAt">{{ item.publishedAt }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { navigateTo } from 'nuxt/app'
import { Setting, User } from '@element-plus/icons-vue'

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
.news-detail-03 {
  max-width: 920px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f1f5f9;
}

.industrial-frame {
  background: #ffffff;
  padding: 3rem;
  border: 3px solid #334155;
  box-shadow: 6px 6px 0px #cbd5e1;
}

.title {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 2.25rem;
  font-weight: 900;
  color: #1e293b;
  margin: 0 0 1.5rem 0;
  line-height: 1.15;
  text-transform: uppercase;
  letter-spacing: -0.01em;
}

.meta {
  display: flex;
  gap: 2rem;
  margin-bottom: 2.5rem;
  padding-bottom: 1.25rem;
  border-bottom: 2px solid #e2e8f0;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-weight: 600;
  font-size: 0.8125rem;
}

.icon {
  font-size: 1rem;
  color: #475569;
}

.featured-image {
  margin-bottom: 3rem;
  border: 2px solid #e2e8f0;
}

.featured-image img {
  width: 100%;
  display: block;
  filter: grayscale(15%);
}

.content {
  font-size: 1.0625rem;
  line-height: 1.7;
  color: #334155;
}

.content :deep(p) {
  margin-bottom: 1.5rem;
  background: linear-gradient(transparent 92%, rgba(51, 65, 85, 0.04) 92%);
}

.content :deep(h2) {
  font-weight: 900;
  color: #0f172a;
  text-transform: uppercase;
  font-size: 1.375rem;
  margin: 3rem 0 1.5rem;
  letter-spacing: 0.02em;
}

.content :deep(img) {
  max-width: 100%;
  border: 2px solid #e2e8f0;
  margin: 1.5rem 0;
}

.related-industrial {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 3px solid #334155;
}

.related-industrial h3 {
  font-size: 0.75rem;
  font-weight: 900;
  color: #475569;
  margin-bottom: 1.5rem;
  letter-spacing: 0.12em;
}

.related-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.related-card {
  display: flex;
  gap: 1.25rem;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  border-left: 3px solid #334155;
  transition: all 0.25s ease;
}

.related-card:hover {
  background: #f8fafc;
  border-left-width: 6px;
  transform: translateX(3px);
}

.related-card img {
  width: 100px;
  height: 68px;
  object-fit: cover;
  flex-shrink: 0;
}

.card-text h4 {
  margin: 0 0 0.375rem 0;
  font-size: 0.9375rem;
  font-weight: 700;
  color: #1e293b;
}

.card-text span {
  font-size: 0.6875rem;
  color: #94a3b8;
  font-weight: 600;
}

@media (max-width: 768px) {
  .news-detail-03 { padding: 1rem; }
  .industrial-frame { padding: 1.5rem; }
  .title { font-size: 1.5rem; }
  .meta { flex-direction: column; gap: 0.75rem; }
}
</style>
