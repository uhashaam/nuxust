<template>
  <div class="industry-news-page">
    <section class="news-hero">
      <div class="container">
        <h1>{{ siteData?.industryName }} News</h1>
        <p>Latest updates and insights from the {{ siteData?.industryName }} sector.</p>
      </div>
    </section>

    <section class="news-content">
      <div class="container">
        <!-- Dynamic News List Style -->
        <component 
          :is="newsListComponent"
          :news-items="industryNews"
          :current-page="currentPage"
          :total-pages="totalPages"
          :subdomain="route.params.subdomain"
          @page-change="handlePageChange"
        />

        <div v-if="industryNews.length === 0" class="empty-state">
          <h3>No news found for {{ siteData?.industryName }}</h3>
          <p>Check back later for updates.</p>
          <el-button @click="navigateTo('/')">Back to Home</el-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, inject } from 'vue'
import { useRoute, useHead, navigateTo, resolveComponent } from '#imports'

// Import List Styles
import NewsList01 from '~/components/templates/news-list/NewsList01.vue'

definePageMeta({
  layout: 'industry'
})

const route = useRoute()
const subdomain = route.params.subdomain as string
const siteData = inject<any>('industrySiteData')

// Fetch news for this specific subdomain
const { data: newsData } = await useAsyncData(`news-${subdomain}`, () =>
  $fetch(`/api/news/by-site/${subdomain}`)
)
const industryNews = computed(() => (newsData.value as any)?.news ?? [])

const currentPage = ref(1)
const itemsPerPage = 8

const totalPages = computed(() => Math.ceil(industryNews.value.length / itemsPerPage))

const newsListComponent = computed(() => {
  if (!siteData?.value) return NewsList01
  const id = siteData.value.newsListStyleId || 1
  return resolveComponent(`NewsList${String(id).padStart(2, '0')}`)
})

const handlePageChange = (page: number) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

useHead({
  title: computed(() => `${siteData?.value?.industryName || 'Industry'} News`),
  meta: [
    { name: 'description', content: computed(() => `Latest news for ${siteData?.value?.industryName}`) }
  ]
})
</script>

<style scoped>
.industry-news-page {
  background: #f8fafc;
  min-height: 100vh;
}

.news-hero {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  color: white;
  padding: 6rem 0 4rem;
  text-align: center;
}

.news-hero h1 {
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 1rem;
}

.news-hero p {
  font-size: 1.25rem;
  color: #94a3b8;
}

.news-content {
  padding: 4rem 0;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

.empty-state {
  text-align: center;
  padding: 4rem;
  color: #64748b;
}

@media (max-width: 768px) {
  .news-hero h1 { font-size: 2rem; }
}
</style>
