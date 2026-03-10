<template>
  <div class="industry-site">
    <!-- Dynamic Banner / Hero -->
    <component 
      :is="bannerComponent" 
      v-if="siteData"
      :industry-name="siteData.industryName"
      :site-slogan="`Innovation in ${siteData.industryName} technology.`"
    />

    <main class="content-wrapper">
      <div v-if="pending" class="container loading-state">
        <el-skeleton :rows="10" animated />
      </div>

      <div v-else-if="error || !siteData" class="container error-state">
        <el-result
          icon="error"
          title="Site Not Found"
          sub-title="The industry site you are looking for does not exist."
        >
          <template #extra>
            <el-button type="primary" @click="navigateTo('/')">Back to Home</el-button>
          </template>
        </el-result>
      </div>

      <div v-else class="site-sections">
        <!-- 1. Trending Ticker -->
        <section v-if="trendingNewsList.length > 0" class="ticker-section">
          <div class="ticker-wrapper">
            <div class="ticker-label">BREAKING</div>
            <div class="ticker-content">
              <div class="ticker-track">
                <span v-for="news in trendingNewsList" :key="news.id" class="ticker-item" @click="navigateTo(`/news/${news.slug}`)">
                  {{ news.title }}
                </span>
                <!-- Duplicate for seamless loop -->
                <span v-for="news in trendingNewsList" :key="news.id + '-rep'" class="ticker-item" @click="navigateTo(`/news/${news.slug}`)">
                  {{ news.title }}
                </span>
              </div>
            </div>
          </div>
        </section>

        <!-- 2. Main Intelligence Grid -->
        <section class="main-intelligence">
          <div class="container narrate">
            <div class="grid-layout">
              <div class="primary-feed">
                <div class="section-header">
                  <h2>{{ siteData.industryName }} Intelligence</h2>
                  <div class="line"></div>
                </div>
                
                <!-- Dynamic News List Style -->
                <component 
                  :is="newsListComponent"
                  :news-items="displayNewsList"
                  :current-page="1"
                  :total-pages="1"
                />
              </div>

              <!-- Side Panel -->
              <aside class="side-panel">
                <div class="side-section">
                  <h3>Intelligence Categories</h3>
                  <div class="category-list">
                    <div v-for="cat in categoryList" :key="cat" class="cat-pill" @click="navigateTo(`/news/category/${cat}`)">
                      {{ cat }}
                    </div>
                  </div>
                </div>

                <div class="side-section referenced-tech">
                  <h3>Featured Technologies</h3>
                  <div class="tech-mini-cards">
                    <div v-for="product in featuredProdList" :key="product.id" class="tech-mini-card" @click="navigateTo(`/products/${product.slug}`)">
                      <img :src="product.image" alt="" />
                      <div class="mini-info">
                        <h4>{{ product.name }}</h4>
                        <span>{{ product.category }}</span>
                      </div>
                    </div>
                  </div>
                  <el-button link class="view-all-tech" @click="navigateTo('/products')">View Industry Catalog →</el-button>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <!-- 3. Spotlight -->
        <section class="spotlight">
          <div class="container">
            <div class="spotlight-card">
              <div class="spotlight-content">
                <span class="tag">Industry Spotlight</span>
                <h2>The Future of {{ siteData.industryName }}</h2>
                <p>Strategic insights and market forecasts for the automated industrial landscape.</p>
                <el-button type="primary" plain class="spotlight-btn">Read More</el-button>
              </div>
              <div class="spotlight-image">
                <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80" alt="Spotlight" />
              </div>
            </div>
          </div>
        </section>

        <!-- 4. Categorized Listings -->
        <section v-if="categoryList.length > 0" class="categorized-listings">
          <div class="container">
            <div v-for="cat in categoryList.slice(0, 3)" :key="cat" class="category-block">
              <div class="block-header">
                <h2>{{ cat }}</h2>
                <el-button link @click="navigateTo(`/news/category/${cat}`)">View All →</el-button>
              </div>
              <div class="category-mini-grid">
                <article v-for="article in getNewsByCategory(cat).slice(0, 4)" :key="article.id" class="mini-article" @click="navigateTo(`/news/${article.slug}`)">
                  <div class="mini-img">
                    <img :src="article.image || '/images/news-placeholder.jpg'" :alt="article.title" width="120" height="80" />
                  </div>
                  <div class="mini-content">
                    <h4>{{ article.title }}</h4>
                    <span>{{ article.publishedAt }}</span>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <!-- 5. Newsletter -->
        <section class="newsletter-section">
          <div class="container">
            <div class="newsletter-box">
              <h2>{{ siteData.industryName }} Briefings</h2>
              <p>The specialized weekly update for industry professionals.</p>
              <div class="form-row">
                <el-input placeholder="Enter Professional Email" />
                <el-button type="primary">Subscribe</el-button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useAsyncData, useHead, navigateTo, resolveComponent } from '#imports'

definePageMeta({
  layout: 'industry'
})

const route = useRoute()
const subdomain = route.params.subdomain as string

import Banner01 from '~/components/templates/banners/Banner01.vue'
import NewsList01 from '~/components/templates/news-list/NewsList01.vue'

const { data, pending, error } = await useAsyncData(`site-${subdomain}`, () => 
  $fetch(`/api/industry-sites/${subdomain}`)
)

const siteData = computed(() => data.value?.site)

const { data: newsData, pending: newsPending } = await useAsyncData(`news-${subdomain}`, () => 
  $fetch(`/api/news/by-site/${subdomain}`)
)

const remoteNews = computed(() => newsData.value?.news || [])
const { productList } = useProducts()

const displayNewsList = computed(() => remoteNews.value.slice(0, 5))
const trendingNewsList = computed(() => remoteNews.value.filter(n => n.trending))

const categoryList = computed(() => {
  const cats = new Set(remoteNews.value.map(n => n.category))
  return Array.from(cats)
})

const featuredProdList = computed(() => (productList.value || []).slice(0, 3))

const getNewsByCategory = (cat: string) => {
  return remoteNews.value.filter(n => n.category === cat)
}

const bannerComponent = computed(() => {
  if (!siteData.value) return Banner01
  const id = siteData.value.bannerStyleId || 1
  return resolveComponent(`Banner${String(id).padStart(2, '0')}`)
})

const newsListComponent = computed(() => {
  if (!siteData.value) return NewsList01
  const id = siteData.value.newsListStyleId || 1
  return resolveComponent(`NewsList${String(id).padStart(2, '0')}`)
})

useHead({
  title: computed(() => siteData.value ? `${siteData.value.industryName} - Intelligence Hub` : 'Industry Hub'),
  meta: [
    { name: 'description', content: computed(() => `Leading insights for the ${siteData.value?.industryName} sector.`) }
  ]
})
</script>

<style scoped>
.industry-site { background-color: #f8fafc; color: #0f172a; }
.container { max-width: 1280px; margin: 0 auto; padding: 0 2rem; }

/* Ticker */
.ticker-section { background: #0f172a; color: white; padding: 1rem 0; border-bottom: 1px solid #1e293b; overflow: hidden; }
.ticker-wrapper { display: flex; align-items: center; gap: 2rem; max-width: 1400px; margin: 0 auto; padding: 0 2rem; }
.ticker-label { background: #ef4444; padding: 0.25rem 0.75rem; font-weight: 900; font-size: 0.75rem; border-radius: 4px; flex-shrink: 0; }
.ticker-content { display: flex; gap: 3rem; overflow: hidden; white-space: nowrap; }
.ticker-item { font-weight: 600; font-size: 0.9375rem; cursor: pointer; transition: color 0.3s; margin-right: 3rem; }
.ticker-item:hover { color: #6366f1; }
.ticker-track { display: inline-block; animation: tickerMove 30s linear infinite; }
@keyframes tickerMove { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

/* Intelligence Grid */
.main-intelligence { padding: 5rem 0; }
.grid-layout { display: grid; grid-template-columns: 1fr 350px; gap: 4rem; }
.section-header { margin-bottom: 3rem; }
.section-header h2 { font-size: 1.875rem; font-weight: 900; margin-bottom: 0.75rem; }
.section-header .line { height: 4px; width: 40px; background: #6366f1; }

.side-panel { display: flex; flex-direction: column; gap: 4rem; }
.side-section h3 { font-size: 1.125rem; font-weight: 900; margin-bottom: 1.5rem; text-transform: uppercase; letter-spacing: 0.05em; }
.category-list { display: flex; flex-wrap: wrap; gap: 0.75rem; }
.cat-pill { padding: 0.5rem 1rem; background: white; border: 1px solid #e2e8f0; border-radius: 99px; font-weight: 700; font-size: 0.875rem; cursor: pointer; transition: all 0.3s; }
.cat-pill:hover { border-color: #6366f1; color: #6366f1; }
.tech-mini-cards { display: flex; flex-direction: column; gap: 1.5rem; }
.tech-mini-card { display: flex; gap: 1.25rem; align-items: center; cursor: pointer; }
.tech-mini-card img { width: 64px; height: 64px; border-radius: 12px; object-fit: cover; }
.mini-info h4 { font-size: 0.9375rem; font-weight: 800; margin-bottom: 0.25rem; }
.mini-info span { font-size: 0.75rem; color: #94a3b8; font-weight: 700; text-transform: uppercase; }
.view-all-tech { margin-top: 2rem; font-weight: 800 !important; color: #6366f1 !important; }

/* Spotlight */
.spotlight { padding: 5rem 0; }
.spotlight-card { background: #0f172a; border-radius: 32px; display: grid; grid-template-columns: 1fr 1fr; overflow: hidden; color: white; }
.spotlight-content { padding: 5rem; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; }
.spotlight-content h2 { font-size: 2.5rem; font-weight: 900; margin: 1.5rem 0; line-height: 1.1; }
.spotlight-content p { font-size: 1.125rem; color: #94a3b8; margin-bottom: 3rem; }
.spotlight-btn { height: 56px; padding: 0 2.5rem !important; font-weight: 800 !important; border-radius: 12px !important; }
.spotlight-image img { width: 100%; height: 100%; object-fit: cover; }

/* Categorized Listings */
.categorized-listings { padding: 5rem 0; background: #fff; }
.category-block { margin-bottom: 4rem; }
.block-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 2px solid #f1f5f9; }
.block-header h2 { font-size: 1.75rem; font-weight: 900; text-transform: capitalize; }
.category-mini-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; }
.mini-article { display: flex; flex-direction: column; gap: 1rem; cursor: pointer; }
.mini-img { height: 150px; border-radius: 12px; overflow: hidden; }
.mini-img :deep(img) { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
.mini-article:hover .mini-img :deep(img) { transform: scale(1.1); }
.mini-content h4 { font-size: 1.125rem; font-weight: 700; margin-bottom: 0.5rem; line-height: 1.4; color: #1e293b; display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.mini-content span { font-size: 0.875rem; color: #94a3b8; font-weight: 600; }

/* Newsletter */
.newsletter-section { padding-bottom: 8rem; }
.newsletter-box { background: white; padding: 5rem; border-radius: 32px; text-align: center; border: 1px solid #e2e8f0; }
.newsletter-box h2 { font-size: 2.25rem; font-weight: 900; margin-bottom: 1rem; }
.newsletter-box p { color: #64748b; font-size: 1.125rem; margin-bottom: 3rem; }
.form-row { max-width: 500px; margin: 0 auto; display: flex; gap: 1rem; }
.form-row :deep(.el-input__inner) { height: 56px; border-radius: 12px; }
.form-row .el-button { height: 56px; padding: 0 2rem; border-radius: 12px; font-weight: 800; }

.loading-state, .error-state { display: flex; justify-content: center; align-items: center; min-height: 400px; }

@media (max-width: 1024px) {
  .grid-layout { grid-template-columns: 1fr; gap: 5rem; }
  .spotlight-card { grid-template-columns: 1fr; }
  .category-mini-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .category-mini-grid { grid-template-columns: 1fr; }
  .spotlight-content { padding: 2.5rem; }
}
</style>
