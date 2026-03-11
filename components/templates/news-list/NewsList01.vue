<template>
  <div class="news-list-01">
    <div v-for="item in newsItems" :key="item.id" class="news-card" @click="navigateTo(subdomain ? `/i/${subdomain}/news/${item.slug}` : `/news/${item.slug}`)">
      <div v-if="item.image" class="thumbnail-col">
        <img :src="item.image" :alt="item.title" loading="lazy" />
      </div>
      <div class="content-col">
        <div class="header-row">
          <h3 class="news-title">{{ item.title }}</h3>
          <span class="pub-date">{{ item.publishedAt }}</span>
        </div>
        <p v-if="item.excerpt" class="excerpt">{{ item.excerpt }}</p>
        <div class="footer-row">
          <el-button link type="primary">Read More →</el-button>
        </div>
      </div>
    </div>
    
    <!-- Pagination -->
    <div v-if="totalPages > 1" class="pagination-wrapper">
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
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.news-card {
  display: flex;
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px -3px rgba(0, 0, 0, 0.03), 0 2px 6px -2px rgba(0, 0, 0, 0.02);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); /* Premium lift */
  cursor: pointer;
  border: 1px solid rgba(15, 23, 42, 0.04);
}

.news-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.03);
}

.thumbnail-col {
  width: 300px;
  height: 200px;
  flex-shrink: 0;
  overflow: hidden;
}

.thumbnail-col img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.news-card:hover .thumbnail-col img {
  transform: scale(1.05);
}

.content-col {
  flex: 1;
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.news-title {
  font-family: 'Outfit', sans-serif;
  font-size: 1.35rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  line-height: 1.3;
  letter-spacing: -0.01em;
}

.pub-date {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 600;
  white-space: nowrap;
}

.excerpt {
  font-size: 0.9375rem;
  color: #475569;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.footer-row {
  margin-top: auto;
}

.pagination-wrapper {
  margin-top: 3rem;
  display: flex;
  justify-content: center;
}

@media (max-width: 768px) {
  .news-card {
    flex-direction: column;
  }
  .thumbnail-col {
    width: 100%;
    height: 180px;
  }
  .content-col {
    padding: 1.5rem;
  }
  .header-row {
    flex-direction: column;
    gap: 0.25rem;
  }
}
</style>
