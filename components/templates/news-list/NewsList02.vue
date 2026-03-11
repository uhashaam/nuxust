<template>
  <div class="news-list-02">
    <div v-for="item in newsItems" :key="item.id" class="news-item" @click="navigateTo(subdomain ? `/i/${subdomain}/news/${item.slug}` : `/news/${item.slug}`)">
      <div class="item-header">
        <h3 class="news-title">{{ item.title }}</h3>
        <span class="pub-date">{{ item.publishedAt }}</span>
      </div>
      <div class="abstract-row">
        <p v-if="item.excerpt" class="excerpt">{{ item.excerpt }}</p>
      </div>
      <div class="item-footer">
        <span class="read-more">Read Full Report →</span>
      </div>
    </div>
    
    <!-- Pagination -->
    <div v-if="totalPages > 1" class="pagination-wrapper">
      <el-pagination
        small
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

.news-item {
  padding: 2.5rem 0;
  border-bottom: 1px solid rgba(15, 23, 42, 0.08); /* Sophisticated subtle line */
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.news-item:hover {
  background-color: #f8fafc;
  padding-left: 1rem;
  padding-right: 1rem;
}

.news-item:last-child {
  border-bottom: none;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 2rem;
  margin-bottom: 1rem;
}

.news-title {
  font-family: 'Outfit', sans-serif;
  font-size: 1.5rem;
  font-weight: 800; /* Bold titles as requested */
  color: #0f172a;
  margin: 0;
  flex: 1;
  text-align: left; /* Left-aligned as requested */
  letter-spacing: -0.01em;
}

.pub-date {
  font-size: 0.875rem;
  color: #94a3b8;
  font-weight: 500;
  text-align: right; /* Right-aligned as requested */
  white-space: nowrap;
}

.abstract-row {
  margin-bottom: 1rem;
}

.excerpt {
  font-size: 1rem;
  color: #475569;
  line-height: 1.7;
  margin: 0;
  display: block; /* Abstract on a new line as requested */
}

.item-footer {
  display: flex;
  justify-content: flex-end;
}

.read-more {
  font-size: 0.875rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.news-item:hover .read-more {
  color: #3b82f6;
}

.pagination-wrapper {
  margin-top: 3rem;
  padding: 2rem 0;
  display: flex;
  justify-content: center;
}

@media (max-width: 640px) {
  .item-header {
    flex-direction: column;
    gap: 0.5rem;
  }
  .pub-date {
    text-align: left;
  }
  .news-title {
    font-size: 1.25rem;
  }
}
</style>
