<template>
  <div class="news-list-05">
    <div 
      v-for="item in newsItems" 
      :key="item.id" 
      class="tech-list-row" 
      @click="navigateTo(subdomain ? `/i/${subdomain}/news/${item.slug}` : `/news/${item.slug}`)"
    >
      <div class="icon-indicator">
        <!-- Tech blue icon requested -->
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="content-block">
        <div class="meta-row">
          <h3 class="title">{{ item.title }}</h3>
          <!-- Gray italicized date requested -->
          <span class="date">{{ item.publishedAt }}</span>
        </div>
        <!-- Summary with ellipsis, expands on hover -->
        <div class="summary-container">
          <p class="excerpt">{{ item.excerpt }}</p>
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
.news-list-05 {
  max-width: 900px;
  margin: 0 auto;
}

.tech-list-row {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem 1rem;
  background: transparent;
  border-bottom: 1px solid rgba(59, 130, 246, 0.15); /* Tech blue subtle border */
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.tech-list-row::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: #3b82f6;
  transform: scaleY(0);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
}

.tech-list-row:hover {
  background: #f8fafc;
  padding-left: 2rem;
  box-shadow: inset 0 0 20px rgba(59, 130, 246, 0.05);
}

.tech-list-row:hover::before {
  transform: scaleY(1);
}

.icon-indicator {
  flex-shrink: 0;
  margin-top: 0.25rem;
  opacity: 0.7;
  transition: opacity 0.3s;
}

.tech-list-row:hover .icon-indicator {
  opacity: 1;
}

.content-block {
  flex: 1;
  min-width: 0;
}

.meta-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 2rem;
  margin-bottom: 0.5rem;
}

.title {
  font-family: 'Inter', 'Outfit', sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  flex: 1;
  letter-spacing: -0.01em;
  transition: color 0.2s;
}

.tech-list-row:hover .title {
  color: #3b82f6;
}

.date {
  font-size: 0.8125rem;
  color: #94a3b8; /* Gray date requested */
  font-style: italic; /* Italicized date requested */
  white-space: nowrap;
}

.summary-container {
  overflow: hidden;
}

.excerpt {
  font-size: 0.9375rem;
  color: #64748b;
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* Ellipsis for summary requested */
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: all 0.4s ease;
}

.tech-list-row:hover .excerpt {
  -webkit-line-clamp: unset;
  line-clamp: unset; /* Reveal full text on hover requested */
  color: #475569;
}

.pagination-wrapper {
  margin-top: 4rem;
  display: flex;
  justify-content: center;
}

@media (max-width: 640px) {
  .meta-row {
    flex-direction: column;
    gap: 0.5rem;
  }
  .tech-list-row {
    padding: 1.5rem 0;
  }
}
</style>
