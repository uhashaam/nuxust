<template>
  <div class="news-list-03">
    <div class="grid-container">
      <div v-for="item in newsItems" :key="item.id" class="grid-card" @click="navigateTo(subdomain ? `/i/${subdomain}/news/${item.slug}` : `/news/${item.slug}`)">
        <div v-if="item.image" class="card-image">
          <img :src="item.image" :alt="item.title" loading="lazy" />
          <div class="card-overlay">
            <span class="view-tag">View Article</span>
          </div>
        </div>
        <div class="card-body">
          <span class="pub-date">{{ item.publishedAt }}</span>
          <h3 class="card-title">{{ item.title }}</h3>
        </div>
      </div>
    </div>
    
    <!-- Pagination -->
    <div v-if="totalPages > 1" class="pagination-wrapper">
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

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Multi-column as requested */
  gap: 2.5rem;
}

.grid-card {
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 15px -3px rgba(0, 0, 0, 0.03), 0 2px 6px -2px rgba(0, 0, 0, 0.02);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.grid-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.03);
}

.card-image {
  position: relative;
  width: 100%;
  height: 240px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.grid-card:hover .card-image img {
  transform: scale(1.1);
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.grid-card:hover .card-overlay {
  opacity: 1;
}

.view-tag {
  color: white;
  padding: 0.5rem 1.25rem;
  border: 1px solid white;
  border-radius: 99px;
  font-weight: 700;
  font-size: 0.875rem;
  backdrop-filter: blur(4px);
}

.card-body {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.pub-date {
  font-size: 0.8125rem;
  color: #64748b;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
}

.card-title {
  font-family: 'Outfit', sans-serif;
  font-size: 1.25rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  line-height: 1.3;
  letter-spacing: -0.01em;
}

.pagination-wrapper {
  margin-top: 4rem;
  display: flex;
  justify-content: center;
}

@media (max-width: 1024px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .grid-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .card-image {
    height: 200px;
  }
}
</style>
