<template>
  <div class="homepage">
    <header class="news-hero">
      <div class="hero-bg-container">
        <NuxtImg 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80" 
          alt="Global Industry Intelligence"
          class="hero-bg-img"
          format="webp"
          loading="eager"
          fetchpriority="high"
        />
      </div>
      <div class="hero-overlay"></div>
      <div class="container hero-content-wrapper">
        <h1 class="hero-main-title">Intelligence & Strategic Insights for Global Industry</h1>
        <p class="hero-description">Leading the digital transformation through high-impact technical analysis and enterprise-grade intelligence reports.</p>
        <div class="hero-actions">
          <el-button type="primary" class="hero-btn" @click="navigateTo('/news')">
            Explore Insights
          </el-button>
          <el-button class="hero-btn-outline" @click="navigateTo('/products')">
            View Technologies
          </el-button>
        </div>
      </div>
    </header>

    <section class="trending-ticker-section">
      <div class="ticker-wrapper">
        <div class="ticker-label">BREAKING</div>
        <div class="ticker-content">
          <div class="ticker-track">
            <span v-for="news in trendingNews" :key="news.id" class="ticker-item" @click="navigateTo(`/news/${news.slug}`)">
              {{ news.title }}
            </span>
            <!-- Repeat for seamless animation if needed, but for now simple list -->
            <span v-for="news in trendingNews" :key="news.id + '-rep'" class="ticker-item" @click="navigateTo(`/news/${news.slug}`)">
              {{ news.title }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <section class="main-news-grid">
      <div class="container narrate">
        <div class="grid-layout">
          <div class="primary-feed">
            <div class="section-title">
              <h2>Latest Intelligence</h2>
              <div class="line"></div>
            </div>
            
            <div class="news-feed">
              <article v-for="article in popularNews.slice(0, 5)" :key="article.id" class="feed-item" @click="navigateTo(`/news/${article.slug}`)">
                <div class="feed-img">
                  <img :src="article.image || '/images/news-placeholder.jpg'" :alt="article.title" width="280" height="180" />
                </div>
                <div class="feed-content">
                  <span class="cat">{{ article.category }}</span>
                  <h3>{{ article.title }}</h3>
                  <p>{{ article.excerpt }}</p>
                  <div class="feed-footer">
                    <span>{{ formatDate(article.publishedAt) }}</span>
                    <el-icon><Right /></el-icon>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <aside class="side-panel">
            <div class="side-section">
              <h3>News Categories</h3>
              <div class="category-list">
                <div v-for="cat in categories" :key="cat" class="cat-pill" @click="navigateTo(`/news/category/${cat}`)">
                  {{ cat }}
                </div>
              </div>
            </div>

            <div class="side-section referenced-tech">
              <h3>Strategic Technologies</h3>
              <div class="tech-mini-cards">
                <div v-for="product in featuredProducts" :key="product.id" class="tech-mini-card" @click="navigateTo(`/products/${product.slug}`)">
                  <img :src="product.image" alt="" />
                  <div class="mini-info">
                    <h4>{{ product.name }}</h4>
                    <span>{{ product.category }}</span>
                  </div>
                </div>
              </div>
              <el-button link class="view-all-tech" @click="navigateTo('/products')">View Global Catalog →</el-button>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <section class="spotlight-section">
      <div class="container">
        <div class="spotlight-card">
          <div class="spotlight-content">
            <span class="tag">Industry Spotlight</span>
            <h2>Digital Transformation in Manufacturing 2024</h2>
            <p>Our comprehensive report on how AI is reshaping the industrial landscape.</p>
            <el-button type="primary" plain class="spotlight-btn">Download Whitepaper</el-button>
          </div>
          <div class="spotlight-image">
            <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80" alt="Spotlight" />
          </div>
        </div>
      </div>
    </section>

    <section class="subdomain-platforms">
      <div class="container">
        <div class="section-header">
          <div>
            <h2>Our Industry Platforms</h2>
            <p class="section-sub">Specialized intelligence hubs for each sector</p>
          </div>
          <el-button link class="view-all-link" @click="navigateTo('/news')">View All News →</el-button>
        </div>
        
        <div class="platforms-grid">
          <div 
            v-for="site in larkSites" 
            :key="site.id" 
            class="platform-card"
            @click="navigateTo(`/i/${site.subdomain}`)"
          >
            <div class="platform-icon">🏭</div>
            <div class="platform-info">
              <h3>{{ site.subdomain }}</h3>
              <p>{{ site.name }}</p>
              <span class="visit-link">Visit Platform →</span>
            </div>
          </div>

          <div v-if="!larkSites.length" class="platform-loading">
            <el-skeleton :rows="2" animated />
          </div>
        </div>
      </div>
    </section>

    <section class="newsletter-highlight">
      <div class="container">
        <div class="newsletter-box">
          <h2>Intelligence in Your Inbox</h2>
          <p>The weekly briefing for industry leaders.</p>
          <div class="form-row">
            <el-input placeholder="Email Address" />
            <el-button type="primary">Subscribe</el-button>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer is now handled globally in layouts/default.vue -->
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useHead, navigateTo } from 'nuxt/app'
import { ArrowRight, Right } from '@element-plus/icons-vue'

const { config } = useCompanyConfig()
const { productList } = useProducts()
const { newsList, popularNews, categories } = useNews()

// Fetch real subdomain sites from Lark with SSR support
const { data: sitesData } = await useAsyncData('home-sites', () => $fetch('/api/sites/all'))
const larkSites = computed(() => (sitesData.value as any)?.sites || [])

// Fetch news and products with SSR support to ensure hydration
const { data: homeNewsData } = await useAsyncData('home-news', () => $fetch('/api/news/all'))
const { data: homeProductsData } = await useAsyncData('home-products', () => $fetch('/api/products/all'))

// Hydrate shared states if data is available from SSR
if (homeNewsData.value?.success) {
  newsList.value = (homeNewsData.value as any).news
}
if (homeProductsData.value?.success) {
  productList.value = (homeProductsData.value as any).products
}

const featuredArticle = computed(() => 
  newsList.value.find(n => n.featured) || newsList.value[0]
)

const trendingNews = computed(() => 
  newsList.value.filter(n => n.trending)
)

const latestNews = computed(() =>
  newsList.value.slice(0, 4)
)

const featuredProducts = computed(() =>
  productList.value.slice(0, 3)
)

const formatDate = (dateStr: string) => {
  if (!dateStr) return 'Recent'
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

useHead({
  title: config.value.brandName,
  meta: [
    { name: 'description', content: config.value.companyFullName }
  ]
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

.homepage {
  background-color: #f8fafc;
  background-image: radial-gradient(circle at 15% 50%, rgba(99, 102, 241, 0.05), transparent 40%),
                    radial-gradient(circle at 85% 30%, rgba(168, 85, 247, 0.05), transparent 40%);
  color: #0f172a;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  overflow-x: hidden;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Base Animations */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* News Hero */
.news-hero {
  position: relative;
  height: 680px;
  display: flex;
  align-items: center;
  color: white;
  overflow: hidden;
  padding-top: 80px;
}

.hero-bg-container {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 0;
}

.hero-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.05);
  animation: bgZoom 20s ease-out infinite alternate;
}
@keyframes bgZoom { from { transform: scale(1); } to { transform: scale(1.08); } }

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(8, 15, 37, 0.95) 0%, rgba(15, 23, 42, 0.6) 50%, transparent 100%);
  backdrop-filter: blur(4px);
  z-index: 1;
}

.hero-content-wrapper {
  position: relative;
  z-index: 10;
  max-width: 850px;
  animation: fadeInUp 1s ease-out;
}

.hero-main-title {
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 2rem;
  letter-spacing: -0.03em;
  background: linear-gradient(to right, #ffffff, #c7d2fe);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0px 4px 20px rgba(255, 255, 255, 0.1);
}

.hero-description {
  font-size: 1.35rem;
  color: #e2e8f0;
  line-height: 1.6;
  margin-bottom: 3.5rem;
  max-width: 650px;
  font-weight: 500;
}

.hero-actions { display: flex; gap: 1rem; }

.hero-btn {
  height: 60px;
  padding: 0 3rem !important;
  font-size: 1.125rem !important;
  font-weight: 800 !important;
  border-radius: 99px !important;
  background: linear-gradient(135deg, #4f46e5 0%, #7e22ce 100%) !important;
  border: none !important;
  color: white !important;
  box-shadow: 0 10px 30px -5px rgba(79, 70, 229, 0.5);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
}

.hero-btn:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 20px 40px -5px rgba(79, 70, 229, 0.7);
  filter: brightness(1.15);
}

.hero-btn-outline {
  height: 60px;
  padding: 0 3rem !important;
  font-size: 1.125rem !important;
  font-weight: 800 !important;
  border-radius: 99px !important;
  background: rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  color: white !important;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
}

.hero-btn-outline:hover {
  background: rgba(255, 255, 255, 0.15) !important;
  border-color: #fff !important;
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 10px 30px -5px rgba(255, 255, 255, 0.15);
}

/* Trending Ticker */
.trending-ticker-section {
  background: linear-gradient(90deg, #020617 0%, #0f172a 50%, #020617 100%);
  color: white;
  padding: 1.2rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: inset 0 -10px 20px -10px rgba(0,0,0,0.5);
}

.ticker-wrapper { display: flex; align-items: center; gap: 2rem; max-width: 1400px; margin: 0 auto; padding: 0 2rem; }

.ticker-label {
  background: #ef4444;
  background: linear-gradient(135deg, #dc2626 0%, #ea580c 100%);
  padding: 0.35rem 1rem;
  font-weight: 900;
  font-size: 0.8rem;
  border-radius: 6px;
  letter-spacing: 0.1em;
  box-shadow: 0 0 15px rgba(239, 68, 68, 0.4);
}

.ticker-content { display: flex; gap: 3rem; overflow: hidden; white-space: nowrap; mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent); }

.ticker-track {
  display: flex; gap: 3rem; animation: scrollTicker 30s linear infinite;
}
@keyframes scrollTicker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

.ticker-item {
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #cbd5e1;
}
.ticker-item:hover { color: #818cf8; text-shadow: 0 0 10px rgba(129, 140, 248, 0.4); }

/* Main Grid Layout */
.main-news-grid { padding: 6rem 0; }
.grid-layout { display: grid; grid-template-columns: 1fr 380px; gap: 5rem; }

.section-title h2 { font-size: 2.25rem; font-weight: 900; margin-bottom: 1rem; color: #020617; }
.section-title .line { height: 5px; width: 60px; background: linear-gradient(90deg, #4f46e5, #a855f7); border-radius: 5px; margin-bottom: 3rem; }

.news-feed { display: flex; flex-direction: column; gap: 2.5rem; }

.feed-item {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2.5rem;
  cursor: pointer;
  background: white;
  padding: 1.5rem;
  border-radius: 24px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.feed-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1), 0 10px 20px -5px rgba(0, 0, 0, 0.04);
  border-color: #cbd5e1;
}

.feed-img { height: 200px; border-radius: 16px; overflow: hidden; position: relative; }
.feed-img::after { content: ''; position: absolute; inset: 0; background: linear-gradient(toba, transparent, rgba(0,0,0,0.1)); }
.feed-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
.feed-item:hover .feed-img img { transform: scale(1.08); }

.feed-content { display: flex; flex-direction: column; justify-content: center; }

.cat { color: #6366f1; font-weight: 800; font-size: 0.85rem; text-transform: uppercase; margin-bottom: 1rem; display: inline-block; letter-spacing: 0.05em; background: rgba(99, 102, 241, 0.1); padding: 0.3rem 0.8rem; border-radius: 99px; width: fit-content; }

.feed-content h3 { font-size: 1.6rem; font-weight: 800; margin-bottom: 1rem; line-height: 1.35; color: #0f172a; transition: color 0.3s; }
.feed-item:hover h3 { color: #4f46e5; }

.feed-content p { color: #475569; line-height: 1.7; margin-bottom: 1.5rem; font-size: 1.05rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

.feed-footer { margin-top: auto; display: flex; justify-content: space-between; align-items: center; color: #94a3b8; font-weight: 600; font-size: 0.9rem; border-top: 1px solid #f1f5f9; padding-top: 1rem; }

/* Side Panel */
.side-panel { display: flex; flex-direction: column; gap: 4.5rem; }

.side-section h3 { font-size: 1.25rem; font-weight: 900; margin-bottom: 1.5rem; text-transform: uppercase; letter-spacing: 0.08em; color: #020617; position: relative; padding-bottom: 0.5rem; }
.side-section h3::after { content: ''; position: absolute; bottom: 0; left: 0; width: 40px; height: 3px; background: #4f46e5; border-radius: 3px; }

.category-list { display: flex; flex-wrap: wrap; gap: 0.85rem; }
.cat-pill { padding: 0.6rem 1.25rem; background: white; border: 1px solid #cbd5e1; border-radius: 99px; font-weight: 600; font-size: 0.9rem; cursor: pointer; transition: all 0.3s ease; color: #475569; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
.cat-pill:hover { border-color: #6366f1; color: #fff; background: #6366f1; transform: translateY(-2px); box-shadow: 0 6px 15px rgba(99, 102, 241, 0.3); }

.tech-mini-cards { display: flex; flex-direction: column; gap: 1.2rem; }
.tech-mini-card { display: flex; gap: 1.25rem; align-items: center; cursor: pointer; padding: 1rem; background: white; border-radius: 16px; border: 1px solid #f1f5f9; transition: all 0.3s ease; }
.tech-mini-card:hover { transform: translateX(8px); border-color: #cbd5e1; box-shadow: 0 10px 20px -5px rgba(0,0,0,0.05); }
.tech-mini-card img { width: 64px; height: 64px; border-radius: 12px; object-fit: cover; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
.mini-info h4 { font-size: 1rem; font-weight: 800; margin-bottom: 0.3rem; color: #0f172a; }
.mini-info span { font-size: 0.75rem; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }

.view-all-tech { margin-top: 1.5rem; font-weight: 800 !important; color: #4f46e5 !important; font-size: 1rem !important; }

/* Spotlight Section */
.spotlight-section { padding: 6rem 0; }
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
.spotlight-image img { width: 100%; height: 100%; object-fit: cover; }

/* Subdomain Platforms */
.subdomain-platforms { padding: 6rem 0; }
.section-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 4rem; }
.section-header h2 { font-size: 2.25rem; font-weight: 900; color: #020617; }
.section-sub { color: #64748b; font-size: 1.1rem; margin-top: 0.5rem; font-weight: 500; }
.view-all-link { font-weight: 800 !important; color: #4f46e5 !important; font-size: 1rem !important; }

.platforms-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem; }
.platform-card { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); border: 1px solid #e2e8f0; border-radius: 24px; padding: 2rem; cursor: pointer; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); display: flex; flex-direction: column; gap: 1.5rem; position: relative; overflow: hidden; }
.platform-card::after { content: ''; position: absolute; top: 0; right: 0; width: 100px; height: 100px; background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%); border-radius: 50%; padding: 0; pointer-events: none; transition: transform 0.4s ease; transform: translate(30%, -30%); }
.platform-card:hover { transform: translateY(-8px); border-color: #cbd5e1; box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.08); background: white; }
.platform-card:hover::after { transform: translate(10%, -10%) scale(2); }

.platform-icon { font-size: 2rem; background: linear-gradient(135deg, #e0e7ff 0%, #ede9fe 100%); border-radius: 16px; width: 64px; height: 64px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(99, 102, 241, 0.1); }
.platform-info h3 { font-size: 1.25rem; font-weight: 800; color: #0f172a; text-transform: capitalize; margin-bottom: 0.5rem; }
.platform-info p { font-size: 0.95rem; color: #475569; margin-bottom: 1rem; line-height: 1.5; }
.visit-link { color: #4f46e5; font-weight: 800; font-size: 0.9rem; display: flex; align-items: center; gap: 0.5rem; transition: gap 0.3s; }
.platform-card:hover .visit-link { gap: 0.8rem; }

/* Newsletter Highlight */
.newsletter-highlight { padding-bottom: 8rem; }
.newsletter-box { background: linear-gradient(135deg, #4f46e5 0%, #7e22ce 100%); padding: 6rem; border-radius: 40px; text-align: center; color: white; position: relative; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(79, 70, 229, 0.3); }
.newsletter-box::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%); pointer-events: none; }
.newsletter-box h2 { font-size: 2.75rem; font-weight: 900; margin-bottom: 1rem; text-shadow: 0 2px 10px rgba(0,0,0,0.1); }
.newsletter-box p { color: #e0e7ff; font-size: 1.25rem; margin-bottom: 3rem; font-weight: 500; }

.form-row { max-width: 550px; margin: 0 auto; display: flex; gap: 1rem; background: white; padding: 0.5rem; border-radius: 99px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); position: relative; z-index: 10; }
.form-row :deep(.el-input__inner) { height: 56px; border: none !important; border-radius: 99px; font-size: 1.1rem; padding: 0 1.5rem; background: transparent !important; box-shadow: none !important; }
.form-row .el-button { height: 56px; padding: 0 3rem; border-radius: 99px; font-weight: 800; font-size: 1.1rem; background: #020617; border: none; transition: all 0.3s ease; }
.form-row .el-button:hover { background: #1e293b; transform: scale(1.02); }

@media (max-width: 1024px) {
  .grid-layout { grid-template-columns: 1fr; gap: 4rem; }
  .spotlight-card { grid-template-columns: 1fr; }
  .spotlight-content { padding: 4rem; }
  .spotlight-image { height: 400px; }
  .spotlight-image::after { background: linear-gradient(to top, #020617 0%, transparent 50%); }
}

@media (max-width: 768px) {
  .container { padding: 0 1.5rem; }
  .feed-item { grid-template-columns: 1fr; gap: 1.5rem; padding: 1rem; }
  .feed-img { height: 220px; }
  .news-hero { height: auto; min-height: 600px; padding: 8rem 0 4rem; }
  .newsletter-box { padding: 4rem 2rem; border-radius: 24px; }
  .form-row { flex-direction: column; background: transparent; box-shadow: none; gap: 1rem; padding: 0; }
  .form-row :deep(.el-input__inner) { background: white !important; }
  .form-row .el-button { width: 100%; border-radius: 12px; }
  .form-row :deep(.el-input__wrapper) { border-radius: 12px; }
  .spotlight-content { padding: 2.5rem; }
  .hero-main-title { font-size: 2.5rem !important; }
  .hero-actions { flex-direction: column; width: 100%; gap: 1rem; }
  .hero-actions :deep(.el-button) { margin: 0; width: 100%; height: 54px; }
  .section-title h2 { font-size: 1.75rem; }
  .newsletter-box h2 { font-size: 2rem; }
  .platforms-grid { grid-template-columns: 1fr; }
}
</style>
