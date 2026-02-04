<template>
  <div class="tag-page">
    <header class="tag-hero">
      <div class="container hero-content">
        <span class="tag-label">Topic</span>
        <h1 class="tag-title">#{{ tagName }}</h1>
        <p>Articles related to the topic of {{ tagName }}.</p>
      </div>
    </header>

    <div class="container content-section">
      <div class="news-grid">
        <article 
          v-for="article in taggedNews" 
          :key="article.id" 
          class="compact-card"
          @click="navigateTo(`/news/${article.slug}`)"
        >
          <div class="card-img">
            <NuxtImg :src="article.image" :alt="article.title" width="400" height="250" />
            <span class="cat-badge">{{ article.category }}</span>
          </div>
          <div class="card-body">
            <span class="date">{{ article.publishedAt }}</span>
            <h3>{{ article.title }}</h3>
            <p>{{ article.excerpt }}</p>
          </div>
        </article>
      </div>

      <div v-if="taggedNews.length === 0" class="empty-state">
        <p>No articles found with this tag.</p>
        <el-button type="primary" plain @click="navigateTo('/news')">Back to News</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const route = useRoute()
const tagName = computed(() => route.params.name as string)

const { newsList } = useNews()

const taggedNews = computed(() => {
  return newsList.value.filter(n => n.tags && n.tags.includes(tagName.value))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
})

useHead({
  title: `Articles tagged with #${tagName.value}`,
  meta: [
    { name: 'description', content: `Explore all news and analysis related to ${tagName.value}.` }
  ]
})
</script>

<style scoped>
.tag-page {
  background: #f8fafc;
  min-height: 100vh;
}

.tag-hero {
  background: #0f172a;
  padding: 8rem 0 6rem;
  color: white;
  text-align: center;
}

.tag-label {
  color: #6366f1;
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: 0.1em;
}

.tag-title {
  font-size: 3.5rem;
  font-weight: 900;
  margin: 1rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.content-section {
  padding: 5rem 0 8rem;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2.5rem;
}

.compact-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s;
}

.compact-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.card-img {
  position: relative;
  height: 220px;
}

.card-img :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cat-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(99, 102, 241, 0.9);
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
}

.card-body {
  padding: 1.5rem;
}

.date {
  font-size: 0.8125rem;
  color: #94a3b8;
  font-weight: 600;
  display: block;
  margin-bottom: 0.75rem;
}

.card-body h3 {
  font-size: 1.25rem;
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.4;
  color: #1e293b;
}

.card-body p {
  color: #64748b;
  font-size: 0.9375rem;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.empty-state {
  text-align: center;
  padding: 5rem 0;
}

@media (max-width: 640px) {
  .tag-title { font-size: 2.5rem; }
}
</style>
