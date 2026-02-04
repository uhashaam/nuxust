<template>
  <div class="news-page">
    <header class="page-hero">
      <div class="hero-glow"></div>
      <div class="container hero-content">
        <span class="tag">Industry Insights</span>
        <h1>{{ searchActive ? 'Search Results' : 'Latest News & Updates' }}</h1>
        <p v-if="searchActive">Showing insights for "{{ searchQuery }}"</p>
        <p v-else>Expert analysis, industry trends, and deep dives into the future of technology.</p>
      </div>
    </header>

    <div class="container">
      <div class="category-filter">
        <button
          :class="{ active: !selectedCategory }"
          @click="selectedCategory = null"
        >
          All News
        </button>
        <button
          v-for="cat in categories"
          :key="cat"
          :class="{ active: selectedCategory === cat }"
          @click="selectedCategory = cat"
        >
          {{ formatCategory(cat) }}
        </button>
      </div>

      <div class="news-grid">
        <article v-for="article in filteredNews" :key="article.id" class="news-card">
          <div class="card-image">
            <img :src="article.image || '/images/news-placeholder.jpg'" :alt="article.title" />
            <span v-if="article.featured" class="featured-tag">⭐ Featured</span>
          </div>
          <div class="card-content">
            <div class="card-meta">
              <span class="category">{{ formatCategory(article.category) }}</span>
              <span class="date">{{ formatDate(article.publishedAt) }}</span>
            </div>
            <h2>{{ article.title }}</h2>
            <p>{{ article.excerpt }}</p>
            <div class="card-footer">
              <span class="author">By {{ article.author }}</span>
              <NuxtLink :to="`/news/${article.slug}`" class="read-more">
                Read More →
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>

      <div v-if="filteredNews.length === 0" class="empty-state">
        <div class="empty-icon">📰</div>
        <h3>No news articles found</h3>
        <p v-if="searchActive">Try searching for other keywords or explore our categories.</p>
        <p v-else>Check back later for updates in this category</p>
        <el-button v-if="searchActive" type="primary" plain class="mt-4" @click="clearSearch">Clear Search</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useHead, useRoute, navigateTo } from 'nuxt/app'


const { newsList, categories } = useNews()

const selectedCategory = ref<string | null>(null)
const route = useRoute()

const searchQuery = computed(() => route.query.q as string || '')
const searchActive = computed(() => !!searchQuery.value)

const filteredNews = computed(() => {
  let list = newsList.value
  
  if (selectedCategory.value) {
    list = list.filter(item => item.category === selectedCategory.value)
  }
  
  if (searchActive.value) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(item => 
      item.title.toLowerCase().includes(q) || 
      item.excerpt.toLowerCase().includes(q) ||
      item.content?.toLowerCase().includes(q) ||
      item.tags?.some(t => t.toLowerCase().includes(q))
    )
  }
  
  return list
})

const clearSearch = () => {
  navigateTo('/news')
}

const formatCategory = (cat: string) => {
  return cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

useHead({
  title: 'News & Updates',
  meta: [
    { name: 'description', content: 'Latest industry news and company updates' }
  ]
})
</script>

<style scoped>
.news-page {
  min-height: 100vh;
  background: #f8fafc;
}

.page-hero {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  padding: 8rem 0 6rem;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
  transform: translate(-50%, -50%);
}

.tag {
  color: #818cf8;
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: 0.1em;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  display: block;
}

.page-hero h1 {
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 1rem;
}

.hero-content p {
  font-size: 1.25rem;
  color: #94a3b8;
  max-width: 600px;
  margin: 0 auto;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.category-filter {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  justify-content: center;
}

.category-filter button {
  padding: 0.75rem 1.5rem;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 50px;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-filter button:hover {
  border-color: #667eea;
  color: #667eea;
  transform: translateY(-2px);
}

.category-filter button.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: #667eea;
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.news-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.news-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

.card-image {
  position: relative;
  height: 220px;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.news-card:hover .card-image img {
  transform: scale(1.1);
}

.featured-tag {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.95);
  color: #fbbf24;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card-content {
  padding: 1.5rem;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.category {
  display: inline-block;
  padding: 0.375rem 0.75rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
}

.date {
  color: #94a3b8;
  font-size: 0.875rem;
}

.card-content h2 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1.3;
}

.card-content p {
  color: #64748b;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #f1f5f9;
}

.author {
  color: #94a3b8;
  font-size: 0.875rem;
  font-weight: 500;
}

.read-more {
  color: #667eea;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
}

.read-more:hover {
  color: #764ba2;
  transform: translateX(4px);
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-icon {
  font-size: 5rem;
  margin-bottom: 1rem;
  opacity: 0.3;
}

.empty-state h3 {
  color: #1e293b;
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
}

.empty-state p {
  color: #64748b;
}

@media (max-width: 768px) {
  .news-grid {
    grid-template-columns: 1fr;
  }
  
  .category-filter {
    justify-content: flex-start;
  }
}
</style>
