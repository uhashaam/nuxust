/// <reference types="nuxt/app" />
<template>
  <div class="dashboard">
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">📰</div>
          <div class="stat-info">
            <div class="stat-value">{{ newsCount }}</div>
            <div class="stat-label">Total News</div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">📦</div>
          <div class="stat-info">
            <div class="stat-value">{{ productCount }}</div>
            <div class="stat-label">Total Products</div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">🏷️</div>
          <div class="stat-info">
            <div class="stat-value">{{ newsCategories.length }}</div>
            <div class="stat-label">News Categories</div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">📑</div>
          <div class="stat-info">
            <div class="stat-value">{{ productCategories.length }}</div>
            <div class="stat-label">Product Categories</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">🖼️</div>
          <div class="stat-info">
            <div class="stat-value">{{ mediaList.length }}</div>
            <div class="stat-label">Media Assets</div>
          </div>
        </div>
      </div>

      <div class="quick-actions">
        <h2>Quick Actions</h2>
        <div class="action-grid">
          <button class="action-btn" @click="navigateTo('/admin/news')">
            <span class="action-icon">➕</span>
            <span>Add News</span>
          </button>
          <button class="action-btn" @click="navigateTo('/admin/products')">
            <span class="action-icon">🔧</span>
            <span>Add Product</span>
          </button>
          <button class="action-btn" @click="navigateTo('/admin/config/basic')">
            <span class="action-icon">⚙️</span>
            <span>Site Settings</span>
          </button>
          <button class="action-btn" @click="mediaLibraryVisible = true">
            <span class="action-icon">🖼️</span>
            <span>Media Library</span>
          </button>
          <button class="action-btn" @click="navigateTo('/')">
            <span class="action-icon">👁️</span>
            <span>Preview Site</span>
          </button>
        </div>
      </div>

      <div class="recent-activity">
        <h2>Recent News</h2>
        <div class="activity-list">
          <div v-for="item in recentNews" :key="item.id" class="activity-item">
            <div class="activity-icon">📰</div>
            <div class="activity-content">
              <div class="activity-title">{{ item.title }}</div>
              <div class="activity-meta">{{ item.category }} • {{ item.publishedAt }}</div>
            </div>
            <button class="btn-edit" @click="navigateTo(`/admin/news/${item.id}`)">Edit</button>
          </div>
        </div>
      </div>
    </div>

    <MediaLibrary v-model="mediaLibraryVisible" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { navigateTo } from 'nuxt/app'


definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const { newsList, categories: newsCategories } = useNews()
const { productList, categories: productCategories } = useProducts()
const { mediaList } = useMedia()

const mediaLibraryVisible = ref(false)

const newsCount = computed(() => newsList.value.length)
const productCount = computed(() => productList.value.length)
const recentNews = computed(() => newsList.value.slice(0, 5))
</script>

<style scoped>
.dashboard {
  max-width: 1400px;
}

h2 {
  margin: 0 0 1.5rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  color: white;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
}

.stat-card:nth-child(2) {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.stat-card:nth-child(3) {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.stat-card:nth-child(4) {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.stat-icon {
  font-size: 3rem;
  opacity: 0.9;
}

.stat-info {
  flex: 1;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  opacity: 0.9;
  font-weight: 500;
}

.quick-actions {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1.25rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  color: #334155;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn:hover {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  border-color: #3b82f6;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(59, 130, 246, 0.3);
}

.action-icon {
  font-size: 1.5rem;
}

.recent-activity {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.activity-item:hover {
  background: #f1f5f9;
  transform: translateX(5px);
}

.activity-icon {
  font-size: 2rem;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
}

.activity-content {
  flex: 1;
}

.activity-title {
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.activity-meta {
  font-size: 0.875rem;
  color: #64748b;
}

.btn-edit {
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-edit:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .action-grid {
    grid-template-columns: 1fr;
  }
}
</style>
