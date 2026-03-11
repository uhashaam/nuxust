<template>
  <div class="news-list-04">
    <div v-for="item in newsItems" :key="item.id" class="line-item" @click="navigateTo(subdomain ? `/i/${subdomain}/news/${item.slug}` : `/news/${item.slug}`)">
      <div class="item-main">
        <h3 class="news-title">{{ item.title }}</h3>
        <span class="pub-date">{{ item.publishedAt }}</span>
      </div>
      <div class="item-summary" v-if="item.excerpt">
        <p class="excerpt">{{ item.excerpt }}</p>
      </div>
      <div class="item-action">
        <span class="arrow">VIEW DETAILS →</span>
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
.news-list-04 {
  max-width: 1000px;
  margin: 0 auto;
}

.line-item {
  padding: 3.5rem 2rem;
  border-bottom: 1px solid rgba(15, 23, 42, 0.08); /* Sophisticated thin line */
  border-radius: 12px;
  cursor: pointer;
  display: grid;
  grid-template-columns: 1fr 200px;
  gap: 2rem;
  align-items: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.line-item:hover {
  background: #f8fafc;
  transform: translateX(8px);
  box-shadow: -10px 0 20px -10px rgba(0, 0, 0, 0.05); /* Soft side shadow */
}

.line-item:last-child {
  border-bottom: none;
}

.item-main {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.news-title {
  font-family: 'Outfit', sans-serif;
  font-size: 1.85rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.pub-date {
  font-size: 0.9375rem;
  color: #64748b;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.item-summary {
  grid-column: 1 / -1;
  max-width: 800px;
}

.excerpt {
  font-size: 1.0625rem;
  color: #475569;
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.item-action {
  justify-self: end;
  grid-column: 2;
  grid-row: 1;
}

.arrow {
  font-weight: 900;
  font-size: 0.8125rem;
  color: #94a3b8;
  letter-spacing: 0.1em;
  transition: color 0.3s ease;
}

.line-item:hover .arrow {
  color: #3b82f6;
}

.pagination-wrapper {
  margin-top: 5rem;
  display: flex;
  justify-content: center;
}

@media (max-width: 768px) {
  .line-item {
    grid-template-columns: 1fr;
    padding: 2rem 0;
    gap: 1.5rem;
  }
  .item-action {
    grid-column: 1;
    justify-self: flex-start;
  }
  .news-title {
    font-size: 1.375rem;
  }
}
</style>
