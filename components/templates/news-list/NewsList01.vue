<template>
  <div class="news-list-01">
    <div 
      v-for="item in newsItems" 
      :key="item.id" 
      class="news-card" 
      @click="navigateTo(subdomain ? `/i/${subdomain}/news/${item.slug}` : `/news/${item.slug}`)"
    >
      <div v-if="item.image" class="thumbnail-wrapper">
        <img :src="item.image" :alt="item.title" loading="lazy" />
      </div>
      <div class="card-content">
        <div class="card-header">
          <h3 class="title">{{ item.title }}</h3>
          <span class="date">{{ item.publishedAt }}</span>
        </div>
        <p v-if="item.excerpt" class="summary">{{ item.excerpt }}</p>
      </div>
    </div>
    
    <!-- Pagination -->
    <div v-if="totalPages > 1" class="pagination-container">
      <el-pagination
        layout="prev, pager, next"
        :total="totalPages * 10"
        :current-page="currentPage"
        @current-change="$emit('page-change', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { navigateTo } from 'nuxt/app'

interface Props {
  newsItems: any[]
  currentPage: number
  totalPages: number
  subdomain?: string
}

defineProps<Props>()
defineEmits(['page-change'])
</script>

<style scoped>
.news-list-01 {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 960px;
  margin: 0 auto;
}

.news-card {
  display: flex;
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.04), 0 2px 6px -2px rgba(0, 0, 0, 0.02);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); /* Hover-up animation requested */
  cursor: pointer;
  border: 1px solid #f1f5f9;
}

.news-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px -6px rgba(0, 0, 0, 0.08), 0 8px 12px -6px rgba(0, 0, 0, 0.04);
}

.thumbnail-wrapper {
  width: 280px;
  height: 180px;
  flex-shrink: 0;
  overflow: hidden;
}

.thumbnail-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.news-card:hover .thumbnail-wrapper img {
  transform: scale(1.03);
}

.card-content {
  flex: 1;
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 0.875rem;
}

.title {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  line-height: 1.35;
  letter-spacing: -0.01em;
}

.date {
  font-size: 0.8125rem;
  color: #94a3b8;
  font-weight: 500;
  white-space: nowrap;
  margin-top: 0.25rem;
}

.summary {
  font-size: 0.9375rem;
  color: #475569;
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.pagination-container {
  margin-top: 3rem;
  display: flex;
  justify-content: center;
}

@media (max-width: 768px) {
  .news-card {
    flex-direction: column;
  }
  .thumbnail-wrapper {
    width: 100%;
    height: 200px;
  }
  .card-content {
    padding: 1.5rem;
  }
  .card-header {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
