<template>
  <article class="news-detail-03">
    <div class="industrial-frame">
      <header class="header">
        <h1 class="title">{{ title }}</h1>
        <div class="meta">
          <div class="meta-item">
            <el-icon class="icon"><Setting /></el-icon> <!-- Industrial icon -->
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
        <h3>EQUIPMENT INSIGHTS</h3>
        <div class="related-list">
          <div 
            v-for="item in relatedNews" 
            :key="item.id" 
            class="related-card"
            @click="navigateTo(subdomain ? `/i/${subdomain}/news/${item.slug}` : `/news/${item.slug}`)"
          >
            <img :src="item.image" :alt="item.title" />
            <div class="card-text">
              <h4>{{ item.title }}</h4>
              <span>{{ item.publishedAt }}</span>
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
  max-width: 1000px;
  margin: 2rem auto;
  padding: 3rem;
  background: #f1f5f9; /* Subtle shading for the page */
}

.industrial-frame {
  background: #ffffff;
  padding: 4rem;
  border: 4px solid #334155; /* Heavy industry feel */
  box-shadow: 10px 10px 0px #cbd5e1;
}

.title {
  font-family: 'Outfit', sans-serif;
  font-size: 3rem;
  font-weight: 900;
  color: #0f172a; /* Bold dark gray title as requested */
  margin: 0 0 2rem 0;
  line-height: 1.1;
  text-transform: uppercase;
  letter-spacing: -0.02em;
}

.meta {
  display: flex;
  gap: 3rem;
  margin-bottom: 3rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #e2e8f0;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #64748b;
  font-weight: 700;
  font-size: 0.875rem;
}

.icon {
  font-size: 1.25rem;
  color: #334155;
}

.featured-image {
  margin-bottom: 4rem;
  border: 2px solid #e2e8f0;
}

.featured-image img {
  width: 100%;
  filter: grayscale(20%);
}

.content {
  font-size: 1.125rem;
  line-height: 1.7;
  color: #334155;
}

.content :deep(p) {
  margin-bottom: 2rem;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.08); /* Slightly more apparent subtle shading */
}

.content :deep(h2) {
  font-weight: 900;
  color: #0f172a;
  text-transform: uppercase;
  margin: 4rem 0 2rem;
}

.related-industrial {
  margin-top: 5rem;
  padding-top: 3rem;
  border-top: 4px solid #334155;
}

.related-industrial h3 {
  font-size: 1.25rem;
  font-weight: 900;
  color: #334155;
  margin-bottom: 2rem;
  letter-spacing: 0.1em;
}

.related-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.related-card {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  background: #ffffff;
  padding: 1.25rem;
  cursor: pointer;
  border-left: 4px solid #334155;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.related-card:hover {
  background: #f8fafc;
  border-left-width: 10px;
  transform: translateY(-2px);
  box-shadow: 4px 8px 15px rgba(0, 0, 0, 0.1);
}

.related-card img {
  width: 120px;
  height: 80px;
  object-fit: cover;
}

.card-text h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 800;
}

.card-text span {
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 700;
}

@media (max-width: 768px) {
  .news-detail-03 { padding: 1rem; }
  .industrial-frame { padding: 2rem; }
  .title { font-size: 1.75rem; }
  .meta { flex-direction: column; gap: 1rem; }
}
</style>
