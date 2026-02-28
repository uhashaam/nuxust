<template>
  <div class="news-list-05">
    <div v-for="item in newsItems" :key="item.id" class="tech-row" @click="navigateTo(subdomain ? `/i/${subdomain}/news/${item.slug}` : `/news/${item.slug}`)">
      <div class="icon-col">
        <div class="tech-icon">
          <el-icon><Cpu /></el-icon>
        </div>
      </div>
      <div class="content-col">
        <div class="title-meta">
          <h3 class="news-title">{{ item.title }}</h3>
          <span class="pub-date">{{ item.publishedAt }}</span>
        </div>
        <div class="summary-wrapper" :class="{ 'expanded': hoverId === item.id }" @mouseenter="hoverId = item.id" @mouseleave="hoverId = null">
          <p class="excerpt">{{ item.excerpt }}</p>
        </div>
      </div>
      <div class="action-col">
        <el-icon class="pulse-icon"><Connection /></el-icon>
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
import { ref } from 'vue'
import { navigateTo } from 'nuxt/app'
import { Cpu, Connection } from '@element-plus/icons-vue'

interface Props {
  newsItems: any[]
  currentPage: number
  totalPages: number
  subdomain?: string
}

defineProps<Props>()
defineEmits(['page-change'])

const hoverId = ref<string | null>(null)
</script>

<style scoped>
.news-list-05 {
  max-width: 1000px;
  margin: 0 auto;
}

.tech-row {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  background: #ffffff;
  border: 1px solid #e0f2fe;
  border-radius: 8px;
  margin-bottom: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.tech-row::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: #3b82f6;
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.tech-row:hover {
  background: #f0f9ff;
  border-color: #3b82f6;
  transform: translateX(10px);
}

.tech-row:hover::before {
  transform: scaleY(1);
}

.icon-col {
  flex-shrink: 0;
}

.tech-icon {
  width: 40px;
  height: 40px;
  background: #eff6ff;
  color: #3b82f6; /* Blue icons as requested */
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 1.25rem;
}

.content-col {
  flex: 1;
  min-width: 0;
}

.title-meta {
  display: flex;
  align-items: baseline;
  gap: 1.5rem;
  margin-bottom: 0.5rem;
}

.news-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: #1e3a8a;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pub-date {
  font-size: 0.8125rem;
  color: #94a3b8;
  font-style: italic; /* Gray italicized dates as requested */
  white-space: nowrap;
}

.summary-wrapper {
  position: relative;
}

.excerpt {
  font-size: 0.875rem;
  color: #475569;
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* Ellipsis as requested */
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: all 0.3s ease;
}

.summary-wrapper.expanded .excerpt {
  -webkit-line-clamp: unset;
  line-clamp: unset; /* Reveal on hover as requested */
}

.action-col {
  display: flex;
  align-items: center;
  color: #cbd5e1;
}

.pulse-icon {
  font-size: 1.5rem;
}

.tech-row:hover .pulse-icon {
  color: #3b82f6;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
}

.pagination-wrapper {
  margin-top: 3rem;
  display: flex;
  justify-content: center;
}

@media (max-width: 640px) {
  .title-meta {
    flex-direction: column;
    gap: 0.25rem;
  }
}
</style>
