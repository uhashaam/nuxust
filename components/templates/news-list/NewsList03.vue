<template>
  <div class="news-list-03">
    <div class="grid-layout">
      <div 
        v-for="item in newsItems" 
        :key="item.id" 
        class="grid-card" 
        @click="navigateTo(subdomain ? `/i/${subdomain}/news/${item.slug}` : `/news/${item.slug}`)"
      >
        <div v-if="item.image" class="image-box">
          <img :src="item.image" :alt="item.title" loading="lazy" />
        </div>
        <div class="text-box">
          <h3 class="title">{{ item.title }}</h3>
          <span class="date">{{ item.publishedAt }}</span>
        </div>
      </div>
    </div>
    
    <!-- Pagination -->
    <div v-if="totalPages > 1" class="pagination-container">
      <el-pagination
        background
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
.news-list-03 {
  max-width: 1280px;
  margin: 0 auto;
}

.grid-layout {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Multi-column arrangement */
  gap: 2rem;
}

.grid-card {
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.grid-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 14px 24px rgba(0, 0, 0, 0.08);
}

.image-box {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

.image-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.grid-card:hover .image-box img {
  transform: scale(1.05);
}

.text-box {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.title {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 1rem 0;
  line-height: 1.4;
  letter-spacing: -0.01em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.date {
  font-size: 0.8125rem;
  color: #94a3b8;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: auto;
}

.pagination-container {
  margin-top: 4rem;
  display: flex;
  justify-content: center;
}

@media (max-width: 1024px) {
  .grid-layout {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .grid-layout {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
