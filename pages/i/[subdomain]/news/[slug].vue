<template>
  <div class="industry-news-detail">
    <div v-if="article">
      <!-- Pass industry context to navigation -->
      <component 
        :is="detailComponent"
        :title="article.title"
        :published-at="article.publishedAt"
        :author="article.author"
        :content="parsedContent"
        :related-news="relatedArticles"
        :image="article.image"
        :subdomain="route.params.subdomain"
      />
    </div>

    <div v-else class="not-found container">
      <h2>Article not found</h2>
      <el-button type="primary" @click="navigateTo(`/i/${route.params.subdomain}/news`)">Back to News</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { useRoute, useHead, navigateTo } from 'nuxt/app'
import { marked } from 'marked'

// Import Detail Styles
import NewsDetail01 from '~/components/templates/news-detail/NewsDetail01.vue'

definePageMeta({
  layout: 'industry'
})

const route = useRoute()
const { getNewsBySlug, getNewsById, newsList } = useNews()
const siteData = inject<any>('industrySiteData')

const article = computed(() => {
  const s = route.params.slug as string
  return getNewsBySlug(s) || getNewsById(s)
})

const detailComponent = computed(() => {
  const styleId = siteData?.value?.newsDetailStyleId || 1
  return `NewsDetail${String(styleId).padStart(2, '0')}`
})

const parsedContent = computed(() => {
  if (!article.value?.content) return ''
  return marked.parse(article.value.content)
})

const relatedArticles = computed(() => {
  if (!article.value) return []
  // Filter by same industry or category
  return newsList.value
    .filter(n => n.id !== article.value?.id && (n.industry === article.value?.industry || n.category === article.value?.category))
    .slice(0, 4)
})

useHead({
  title: computed(() => article.value ? `${article.value.title} - ${siteData?.value?.industryName}` : 'Article Not Found'),
  meta: [
    { name: 'description', content: computed(() => article.value?.excerpt || '') }
  ]
})
</script>

<style scoped>
.industry-news-detail {
  background: #ffffff;
  min-height: 100vh;
}

.not-found {
  padding: 100px 20px;
  text-align: center;
}
</style>
