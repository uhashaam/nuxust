<template>
  <div class="category-page">
    <header class="category-hero">
      <div class="container hero-content">
        <span class="tag">Category</span>
        <h1 class="category-title">{{ categoryName }}</h1>
        <p>Exploring the latest insights and trends in {{ categoryName }}.</p>
      </div>
    </header>

    <div class="container content-section">
      <div class="controls">
        <div class="results-count">
          Showing {{ filteredNews.length }} results
        </div>
        <div class="sort-controls">
          <span class="label">Sort by:</span>
          <el-select v-model="sortBy" placeholder="Select" style="width: 150px">
            <el-option label="Latest" value="latest" />
            <el-option label="Popular" value="popular" />
            <el-option label="Oldest" value="oldest" />
          </el-select>
        </div>
      </div>

      <div class="news-list">
        <article 
          v-for="article in paginatedNews" 
          :key="article.id" 
          class="news-item"
          @click="navigateTo(`/news/${article.slug}`)"
        >
          <div class="item-img">
            <NuxtImg :src="article.image" :alt="article.title" width="300" height="200" />
          </div>
          <div class="item-info">
            <div class="item-meta">
              <span class="date">{{ article.publishedAt }}</span>
              <span class="author">By {{ article.author }}</span>
            </div>
            <h3>{{ article.title }}</h3>
            <p>{{ article.excerpt }}</p>
            <div class="item-tags">
              <span v-for="tag in article.tags" :key="tag" class="small-tag">#{{ tag }}</span>
            </div>
          </div>
        </article>
      </div>

      <div v-if="filteredNews.length > itemsPerPage" class="pagination-wrapper">
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="itemsPerPage"
          layout="prev, pager, next"
          :total="filteredNews.length"
          background
        />
      </div>

      <div v-if="filteredNews.length === 0" class="empty-state">
        <p>No articles found in this category.</p>
        <el-button type="primary" plain @click="navigateTo('/news')">Back to News</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
const route = useRoute()
const categoryId = computed(() => route.params.id as string)
const categoryName = computed(() => categoryId.value.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '))

const { newsList } = useNews()
const sortBy = ref('latest')
const currentPage = ref(1)
const itemsPerPage = 10

const filteredNews = computed(() => {
  let list = newsList.value.filter(n => n.category === categoryId.value)
  
  if (sortBy.value === 'popular') {
    list = [...list].sort((a, b) => {
      const aScore = (a.featured ? 2 : 0) + (a.trending ? 1 : 0)
      const bScore = (b.featured ? 2 : 0) + (b.trending ? 1 : 0)
      return bScore - aScore
    })
  } else if (sortBy.value === 'oldest') {
    list = [...list].sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime())
  } else {
    list = [...list].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  }
  
  return list
})

const paginatedNews = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredNews.value.slice(start, end)
})

useHead({
  title: `${categoryName.value} - Industry News`,
  meta: [
    { name: 'description', content: `Browse all articles under the ${categoryName.value} category.` }
  ]
})
</script>

<style scoped>
.category-page {
  background: #f8fafc;
  min-height: 100vh;
}

.category-hero {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  padding: 8rem 0 6rem;
  color: white;
  text-align: center;
}

.tag {
  color: #818cf8;
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: 0.1em;
  font-size: 0.875rem;
}

.category-title {
  font-size: 3.5rem;
  font-weight: 900;
  margin: 1rem 0;
  text-transform: capitalize;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
}

.content-section {
  padding: 4rem 0 8rem;
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.results-count {
  font-weight: 600;
  color: #64748b;
}

.sort-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.sort-controls .label {
  font-weight: 700;
  color: #1e293b;
}

.news-list {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.news-item {
  display: flex;
  gap: 2rem;
  background: white;
  padding: 1.5rem;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
  cursor: pointer;
  transition: all 0.3s;
}

.news-item:hover {
  transform: translateX(10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
}

.item-img {
  width: 300px;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
}

.item-img :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.item-meta {
  display: flex;
  gap: 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #94a3b8;
  margin-bottom: 1rem;
}

.item-info h3 {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: #1e293b;
  line-height: 1.3;
}

.item-info p {
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.small-tag {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  color: #6366f1;
  margin-right: 0.75rem;
}

.pagination-wrapper {
  margin-top: 4rem;
  display: flex;
  justify-content: center;
}

.empty-state {
  text-align: center;
  padding: 4rem 0;
}

.empty-state p {
  font-size: 1.25rem;
  color: #64748b;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .news-item { flex-direction: column; }
  .item-img { width: 100%; }
  .category-title { font-size: 2.5rem; }
}
</style>
