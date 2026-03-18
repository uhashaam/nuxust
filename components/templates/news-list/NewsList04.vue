<template>
  <div class="news-list-04">
    <div 
      v-for="item in newsItems" 
      :key="item.id" 
      class="thick-line-item" 
      @click="navigateTo(subdomain ? `/i/${subdomain}/news/${item.slug}` : `/news/${item.slug}`)"
    >
      <div class="header-group">
        <h3 class="news-title">{{ item.title }}</h3>
        <span class="pub-date">{{ item.publishedAt }}</span>
      </div>
      <div v-if="item.excerpt" class="summary-box">
        <p class="excerpt">{{ item.excerpt }}</p>
      </div>
      <div class="action-arrow">
        <span class="icon-arrow">→</span>
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

.thick-line-item {
  padding: 3.5rem 0;
  border-bottom: 4px solid #1e293b; /* Thick line separator requested */
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transition: all 0.3s ease;
  position: relative;
}

.thick-line-item:last-child {
  border-bottom-width: 8px; /* Extra weight at the end */
}

.thick-line-item:hover {
  background: #f8fafc;
  padding-left: 2rem;
  padding-right: 2rem;
  border-bottom-color: #3b82f6;
}

.header-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-right: 4rem;
}

.news-title {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 2rem;
  font-weight: 900;
  color: #0f172a;
  margin: 0;
  line-height: 1.15;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.pub-date {
  font-size: 0.9375rem;
  color: #64748b;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.summary-box {
  max-width: 800px;
}

.excerpt {
  font-size: 1.125rem;
  color: #475569;
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-weight: 500;
}

.action-arrow {
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.icon-arrow {
  font-size: 2.5rem;
  color: #3b82f6;
  font-weight: 900;
}

.thick-line-item:hover .action-arrow {
  opacity: 1;
  right: 2rem;
}

.pagination-wrapper {
  margin-top: 5rem;
  display: flex;
  justify-content: center;
}

@media (max-width: 768px) {
  .thick-line-item {
    padding: 2.5rem 0;
  }
  .thick-line-item:hover {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .news-title {
    font-size: 1.5rem;
  }
  .action-arrow {
    display: none;
  }
  .header-group {
    padding-right: 0;
  }
}
</style>
