<template>
  <div class="news-list-02">
    <div 
      v-for="item in newsItems" 
      :key="item.id" 
      class="list-item" 
      @click="navigateTo(subdomain ? `/i/${subdomain}/news/${item.slug}` : `/news/${item.slug}`)"
    >
      <div class="item-header">
        <h3 class="title">{{ item.title }}</h3>
        <span class="date">{{ item.publishedAt }}</span>
      </div>
      <p v-if="item.excerpt" class="abstract">{{ item.excerpt }}</p>
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
.news-list-02 {
  max-width: 900px;
  margin: 0 auto;
}

.list-item {
  padding: 2.25rem 0;
  border-bottom: 1px solid #e2e8f0; /* Thin line separator requested */
  cursor: pointer;
  transition: all 0.25s ease;
}

.list-item:hover {
  background-color: #f8fafc;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  border-radius: 8px;
  border-bottom-color: transparent;
}

.list-item:last-child {
  border-bottom: none;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 2rem;
  margin-bottom: 1rem;
}

.title {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 1.375rem;
  font-weight: 800; /* Bold title as requested */
  color: #0f172a;
  margin: 0;
  flex: 1;
  text-align: left; /* Left-aligned as requested */
  letter-spacing: -0.01em;
  line-height: 1.3;
}

.date {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
  text-align: right; /* Right-aligned as requested */
  white-space: nowrap;
}

.abstract {
  font-size: 1rem;
  color: #475569;
  line-height: 1.6;
  margin: 0;
  display: block; /* Abstract on a new line as requested */
}

.pagination-container {
  margin-top: 3.5rem;
  padding: 1rem 0;
  display: flex;
  justify-content: center;
}

@media (max-width: 640px) {
  .item-header {
    flex-direction: column;
    gap: 0.5rem;
  }
  .date {
    text-align: left;
  }
  .title {
    font-size: 1.125rem;
  }
}
</style>
