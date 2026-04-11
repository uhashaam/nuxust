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
                <div v-if="displayNewsList.length === 0" class="no-news-placeholder">
                  <el-empty 
                    description="Intelligence reports are currently being compiled for this sector. Please check back shortly for updates."
                    :image-size="120"
                  />
                </div>
                <component 
                  v-else
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
if (productList.value.length === 0) {
  const { data: prodData } = await useAsyncData(`sub-products-${subdomain}`, () => $fetch('/api/products/all'))
  if ((prodData.value as any)?.success) {
    productList.value = (prodData.value as any).products
  }
}

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
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

.industry-site {
  background-color: #f8fafc;
  background-image: radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.04), transparent 50%),
                    radial-gradient(circle at 90% 80%, rgba(168, 85, 247, 0.04), transparent 50%);
  color: #0f172a;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  overflow-x: hidden;
  min-height: 100vh;
}

.container { max-width: 1280px; margin: 0 auto; padding: 0 2rem; position: relative; z-index: 2; }

/* Dynamic Banner/Hero gets injected, but let's give the content wrapper a gentle entrance fade */
.content-wrapper { animation: fadeIn 0.8s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }

/* Ticker - Premium Dark Header */
.ticker-section { background: linear-gradient(90deg, #020617 0%, #0f172a 50%, #020617 100%); color: white; padding: 1.2rem 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); box-shadow: inset 0 -10px 20px -10px rgba(0,0,0,0.5); overflow: hidden; }
.ticker-wrapper { display: flex; align-items: center; gap: 2rem; max-width: 1400px; margin: 0 auto; padding: 0 2rem; }
.ticker-label { background: linear-gradient(135deg, #dc2626 0%, #ea580c 100%); padding: 0.35rem 1rem; font-weight: 900; font-size: 0.8rem; border-radius: 6px; flex-shrink: 0; letter-spacing: 0.1em; box-shadow: 0 0 15px rgba(239, 68, 68, 0.4); }
.ticker-content { display: flex; gap: 3rem; overflow: hidden; white-space: nowrap; mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent); }
.ticker-item { font-weight: 600; font-size: 0.95rem; cursor: pointer; transition: all 0.3s ease; margin-right: 3rem; color: #cbd5e1; }
.ticker-item:hover { color: #818cf8; text-shadow: 0 0 10px rgba(129, 140, 248, 0.4); }
.ticker-track { display: inline-flex; animation: tickerMove 35s linear infinite; }
@keyframes tickerMove { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

/* Main Intelligence Grid */
.main-intelligence { padding: 6rem 0; }
.grid-layout { display: grid; grid-template-columns: 1fr 380px; gap: 5rem; }
.section-header { margin-bottom: 3.5rem; }
.section-header h2 { font-size: 2.25rem; font-weight: 900; margin-bottom: 1rem; color: #020617; line-height: 1.2; text-shadow: 0px 4px 15px rgba(0,0,0,0.03); }
.section-header .line { height: 5px; width: 60px; background: linear-gradient(90deg, #4f46e5, #a855f7); border-radius: 5px; }

/* Side Panel (Categories & Tech) */
.side-panel { display: flex; flex-direction: column; gap: 4.5rem; animation: slideInRight 1s ease-out both 0.3s; }
@keyframes slideInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }

.side-section h3 { font-size: 1.25rem; font-weight: 900; margin-bottom: 1.5rem; text-transform: uppercase; letter-spacing: 0.08em; color: #020617; position: relative; padding-bottom: 0.5rem; }
.side-section h3::after { content: ''; position: absolute; bottom: 0; left: 0; width: 40px; height: 3px; background: #4f46e5; border-radius: 3px; }

.category-list { display: flex; flex-wrap: wrap; gap: 0.85rem; }
.cat-pill { padding: 0.6rem 1.25rem; background: rgba(255,255,255,0.8); backdrop-filter: blur(5px); border: 1px solid #cbd5e1; border-radius: 99px; font-weight: 600; font-size: 0.9rem; cursor: pointer; transition: all 0.3s ease; color: #475569; }
.cat-pill:hover { border-color: #6366f1; color: #fff; background: #6366f1; transform: translateY(-2px); box-shadow: 0 6px 15px rgba(99, 102, 241, 0.3); }

.tech-mini-cards { display: flex; flex-direction: column; gap: 1.2rem; }
.tech-mini-card { display: flex; gap: 1.25rem; align-items: center; cursor: pointer; padding: 1rem; background: rgba(255,255,255,0.8); border-radius: 16px; border: 1px solid #f1f5f9; backdrop-filter: blur(5px); transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.tech-mini-card:hover { transform: translateX(8px) scale(1.02); border-color: #cbd5e1; box-shadow: 0 10px 20px -5px rgba(0,0,0,0.08); background: white; }
.tech-mini-card img { width: 64px; height: 64px; border-radius: 12px; object-fit: cover; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
.mini-info h4 { font-size: 1rem; font-weight: 800; margin-bottom: 0.3rem; color: #0f172a; }
.mini-info span { font-size: 0.75rem; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
.view-all-tech { margin-top: 1.5rem; font-weight: 800 !important; color: #4f46e5 !important; font-size: 1rem !important; }

/* Spotlight - Premium Glass Card */
.spotlight { padding: 6rem 0; }
.spotlight-card { background: radial-gradient(circle at top right, #1e1b4b, #020617); border-radius: 32px; display: grid; grid-template-columns: 1.2fr 1fr; overflow: hidden; color: white; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); position: relative; }
.spotlight-card::before { content: ''; position: absolute; inset: 0; border-radius: 32px; padding: 2px; background: linear-gradient(45deg, rgba(255,255,255,0.1), transparent, rgba(99,102,241,0.3)); -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none; }
.spotlight-content { padding: 5rem 6rem; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; z-index: 1; }
.spotlight-content .tag { background: rgba(99, 102, 241, 0.2); color: #818cf8; padding: 0.5rem 1rem; border-radius: 99px; font-weight: 800; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1.5rem; border: 1px solid rgba(99, 102, 241, 0.3); }
.spotlight-content h2 { font-size: 2.75rem; font-weight: 900; margin-bottom: 1.5rem; line-height: 1.1; background: linear-gradient(to right, #fff, #c7d2fe); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.spotlight-content p { font-size: 1.2rem; color: #94a3b8; margin-bottom: 3.5rem; line-height: 1.6; }
.spotlight-btn { height: 56px; padding: 0 3rem !important; font-weight: 800 !important; border-radius: 99px !important; background: transparent !important; color: white !important; border: 2px solid rgba(255,255,255,0.3) !important; transition: all 0.3s ease !important; }
.spotlight-btn:hover { background: white !important; color: #020617 !important; border-color: white !important; transform: translateY(-3px); box-shadow: 0 10px 20px rgba(255,255,255,0.2); }
.spotlight-image { position: relative; }
.spotlight-image::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to right, #020617 0%, transparent 40%); }
.spotlight-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s ease; }
.spotlight-card:hover .spotlight-image img { transform: scale(1.05); }

/* Categorized Listings */
.categorized-listings { padding: 6rem 0; background: rgba(255,255,255,0.5); backdrop-filter: blur(10px); border-top: 1px solid rgba(255,255,255,0.6); }
.category-block { margin-bottom: 5rem; }
.block-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2.5rem; padding-bottom: 1rem; border-bottom: 2px solid rgba(226, 232, 240, 0.6); }
.block-header h2 { font-size: 2rem; font-weight: 900; text-transform: capitalize; color: #020617; }
.block-header .el-button { font-weight: 800; color: #4f46e5; font-size: 1rem; transition: transform 0.2s; }
.block-header .el-button:hover { transform: translateX(5px); }

.category-mini-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2.5rem; }
.mini-article { display: flex; flex-direction: column; gap: 1.2rem; cursor: pointer; padding: 1.2rem; background: white; border-radius: 20px; border: 1px solid rgba(226, 232, 240, 0.5); box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.03); transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.mini-article:hover { transform: translateY(-8px); box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.1); border-color: #cbd5e1; }
.mini-img { height: 180px; border-radius: 12px; overflow: hidden; position: relative; }
.mini-img::after { content: ''; position: absolute; inset: 0; box-shadow: inset 0 0 0 1px rgba(0,0,0,0.05); border-radius: 12px; pointer-events: none; }
.mini-img :deep(img) { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
.mini-article:hover .mini-img :deep(img) { transform: scale(1.1); }
.mini-content h4 { font-size: 1.15rem; font-weight: 800; margin-bottom: 0.5rem; line-height: 1.45; color: #0f172a; display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; transition: color 0.3s; }
.mini-article:hover h4 { color: #4f46e5; }
.mini-content span { font-size: 0.85rem; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }

/* Newsletter */
.newsletter-section { padding-bottom: 8rem; }
.newsletter-box { background: linear-gradient(135deg, #4f46e5 0%, #7e22ce 100%); padding: 6rem; border-radius: 40px; text-align: center; color: white; position: relative; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(79, 70, 229, 0.3); }
.newsletter-box::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%); pointer-events: none; }
.newsletter-box h2 { font-size: 2.75rem; font-weight: 900; margin-bottom: 1rem; text-shadow: 0 2px 10px rgba(0,0,0,0.1); }
.newsletter-box p { color: #e0e7ff; font-size: 1.25rem; margin-bottom: 3rem; font-weight: 500; }
.form-row { max-width: 550px; margin: 0 auto; display: flex; gap: 1rem; background: white; padding: 0.5rem; border-radius: 99px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); position: relative; z-index: 10; }
.form-row :deep(.el-input__inner) { height: 56px; border: none !important; border-radius: 99px; font-size: 1.1rem; padding: 0 1.5rem; background: transparent !important; box-shadow: none !important; }
.form-row .el-button { height: 56px; padding: 0 3rem; border-radius: 99px; font-weight: 800; font-size: 1.1rem; background: #020617; border: none; transition: all 0.3s ease; }
.form-row .el-button:hover { background: #1e293b; transform: scale(1.02); }

.loading-state, .error-state { display: flex; justify-content: center; align-items: center; min-height: 400px; }

@media (max-width: 1024px) {
  .grid-layout { grid-template-columns: 1fr; gap: 4rem; }
  .spotlight-card { grid-template-columns: 1fr; }
  .spotlight-content { padding: 4rem; }
  .category-mini-grid { grid-template-columns: repeat(2, 1fr); }
  .spotlight-image { height: 400px; }
  .spotlight-image::after { background: linear-gradient(to top, #020617 0%, transparent 50%); }
}

@media (max-width: 768px) {
  .container { padding: 0 1.5rem; }
  .category-mini-grid { grid-template-columns: 1fr; gap: 1.5rem; }
  .spotlight-content { padding: 2.5rem; }
  .newsletter-box { padding: 4rem 2rem; border-radius: 24px; }
  .form-row { flex-direction: column; background: transparent; box-shadow: none; gap: 1rem; padding: 0; }
  .form-row :deep(.el-input__inner) { background: white !important; }
  .form-row .el-button { width: 100%; border-radius: 12px; }
  .form-row :deep(.el-input__wrapper) { border-radius: 12px; }
  .section-header h2 { font-size: 1.75rem; }
}
</style>
