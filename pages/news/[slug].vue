<template>
  <div class="news-detail">
    <div v-if="article" class="article-wrapper">
      <header class="detail-hero">
        <div class="container">
          <div class="breadcrumb">
            <NuxtLink to="/">Home</NuxtLink>
            <el-icon><ArrowRight /></el-icon>
            <NuxtLink to="/news">News</NuxtLink>
            <el-icon><ArrowRight /></el-icon>
            <span>{{ article.title }}</span>
          </div>
          
          <span class="cat-pill">{{ article.category }}</span>
          <h1>{{ article.title }}</h1>
          
          <div class="article-meta">
            <div class="meta-item">
              <span class="label">Published</span>
              <span class="value">{{ article.publishedAt }}</span>
            </div>
            <div class="meta-item">
              <span class="label">Author</span>
              <span class="value">{{ article.author }}</span>
            </div>
          </div>
        </div>
      </header>

      <div class="container main-grid">
        <article class="primary-content">
          <div class="featured-image">
            <NuxtImg 
              :src="article.image" 
              :alt="article.imageAlt || article.title"
              width="900"
              height="500"
              class="rounded-img"
            />
          </div>

          <div class="markdown-body" v-html="parsedContent"></div>

          <div class="article-tags">
            <h3>Tags</h3>
            <div class="tags-list">
              <span 
                v-for="tag in article.tags" 
                :key="tag" 
                class="tag-item"
                @click="navigateTo(`/news/tag/${tag}`)"
              >
                #{{ tag }}
              </span>
            </div>
          </div>
        </article>

        <aside class="side-recommendations">
          <div class="sticky-side">
            <h3>Related Insights</h3>
            <div class="recommendations-list">
              <div 
                v-for="item in relatedArticles" 
                :key="item.id" 
                class="rec-card"
                @click="navigateTo(`/news/${item.slug}`)"
              >
                <NuxtImg :src="item.image" :alt="item.title" width="100" height="70" />
                <div class="rec-info">
                  <h4>{{ item.title }}</h4>
                  <span class="date">{{ item.publishedAt }}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>

    <div v-else class="not-found container">
      <h2>Article not found</h2>
      <el-button type="primary" @click="navigateTo('/news')">Back to Insights</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { marked } from 'marked'
import { ArrowRight } from '@element-plus/icons-vue'

const route = useRoute()
const { getNewsBySlug, getNewsById, newsList } = useNews()
const { config } = useCompanyConfig()

const article = computed(() => {
  const s = route.params.slug as string
  return getNewsBySlug(s) || getNewsById(s)
})

const parsedContent = computed(() => {
  if (!article.value?.content) return ''
  return marked.parse(article.value.content)
})

const relatedArticles = computed(() => {
  if (!article.value) return []
  return newsList.value
    .filter(n => n.id !== article.value?.id && n.category === article.value?.category)
    .slice(0, 4)
})

useSeoMeta({
  title: () => (article.value?.metaTitle || article.value?.title || 'Article') + ' | ' + config.value.brandName,
  description: () => article.value?.metaDescription || article.value?.excerpt,
  keywords: () => (article.value?.metaKeywords || article.value?.tags?.join(', '))
})
</script>

<style scoped>
.news-detail {
  background: #f8fafc;
  min-height: 100vh;
}

.detail-hero {
  background: #0f172a;
  color: white;
  padding: 8rem 0 4rem;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #94a3b8;
  margin-bottom: 2rem;
}

.breadcrumb a {
  color: white;
  text-decoration: none;
  font-weight: 600;
}

.cat-pill {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: #6366f1;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
}

.detail-hero h1 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 2.5rem;
  max-width: 900px;
}

.article-meta {
  display: flex;
  gap: 4rem;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.meta-item .label {
  font-size: 0.75rem;
  color: #64748b;
  text-transform: uppercase;
  font-weight: 800;
}

.meta-item .value {
  font-weight: 700;
  color: #f1f5f9;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 4rem;
}

.main-grid {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 6rem;
  padding-top: 4rem;
  padding-bottom: 8rem;
}

.primary-content {
  background: white;
  padding: 4rem;
  border-radius: 32px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
}

.featured-image {
  margin-bottom: 4rem;
}

.rounded-img {
  width: 100%;
  height: auto;
  border-radius: 20px;
}

.markdown-body {
  font-size: 1.25rem;
  line-height: 1.8;
  color: #1e293b;
}

.markdown-body :deep(h2) { font-size: 2rem; margin: 3rem 0 1.5rem; }
.markdown-body :deep(h3) { font-size: 1.5rem; margin: 2rem 0 1rem; }
.markdown-body :deep(p) { margin-bottom: 1.5rem; }
.markdown-body :deep(ul), .markdown-body :deep(ol) { margin-bottom: 1.5rem; padding-left: 2rem; }

.article-tags {
  margin-top: 5rem;
  padding-top: 3rem;
  border-top: 1px solid #f1f5f9;
}

.article-tags h3 {
  font-size: 1.25rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.tag-item {
  padding: 0.5rem 1rem;
  background: #f1f5f9;
  border-radius: 99px;
  font-weight: 700;
  color: #6366f1;
  font-size: 0.875rem;
  cursor: pointer;
}

.side-recommendations h3 {
  font-size: 1.25rem;
  font-weight: 900;
  text-transform: uppercase;
  margin-bottom: 2rem;
  letter-spacing: 0.05em;
}

.sticky-side {
  position: sticky;
  top: 120px;
}

.recommendations-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.rec-card {
  display: flex;
  gap: 1rem;
  align-items: center;
  cursor: pointer;
  transition: opacity 0.3s;
}

.rec-card:hover {
  opacity: 0.7;
}

.rec-card :deep(img) {
  width: 100px;
  height: 70px;
  border-radius: 8px;
  object-fit: cover;
}

.rec-info h4 {
  font-size: 0.9375rem;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 0.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.rec-info .date {
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 600;
}

@media (max-width: 1024px) {
  .main-grid { grid-template-columns: 1fr; gap: 4rem; }
  .side-recommendations { order: 2; }
  .container { padding: 0 2rem; }
}

@media (max-width: 768px) {
  .primary-content { padding: 2rem; border-radius: 0; }
  .detail-hero h1 { font-size: 2rem; }
}
</style>
