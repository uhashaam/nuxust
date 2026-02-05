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
                  <NuxtImg :src="article.image" :alt="article.title" width="280" height="180" />
                </div>
                <div class="feed-content">
                  <span class="cat">{{ article.category }}</span>
                  <h3>{{ article.title }}</h3>
                  <p>{{ article.excerpt }}</p>
                  <div class="feed-footer">
                    <span>{{ article.publishedAt }}</span>
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

    <section class="categorized-listings">
      <div class="container">
        <div v-for="cat in categories.slice(0, 3)" :key="cat" class="category-block">
          <div class="block-header">
            <h2>{{ cat }}</h2>
            <el-button link @click="navigateTo(`/news/category/${cat}`)">View All {{ cat }} News →</el-button>
          </div>
          <div class="category-grid">
            <article v-for="article in newsByCat(cat).slice(0, 4)" :key="article.id" class="mini-article" @click="navigateTo(`/news/${article.slug}`)">
              <div class="mini-img">
                <NuxtImg :src="article.image" :alt="article.title" width="120" height="80" />
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

const newsByCat = (cat: string) => {
  return newsList.value.filter(n => n.category === cat)
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

useHead({
  title: config.value.brandName,
  meta: [
    { name: 'description', content: config.value.companyFullName }
  ]
})
</script>

<style scoped>
.homepage {
  background-color: #f8fafc;
  color: #0f172a;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* News Hero */
.news-hero {
  position: relative;
  height: 600px;
  /* Background handled by NuxtImg now */
  display: flex;
  align-items: center;
  color: white;
  overflow: hidden;
  padding-top: 80px; /* Adjust for fixed header */
}

.hero-bg-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.hero-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(15, 23, 42, 0.95) 20%, rgba(15, 23, 42, 0.4) 100%);
}

.hero-content-wrapper {
  position: relative;
  z-index: 10;
  max-width: 800px;
}

.featured-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: #6366f1;
  padding: 0.5rem 1.25rem;
  border-radius: 99px;
  font-weight: 800;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 2rem;
}

.pulse {
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(255, 255, 255, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
}

.news-hero h1.hero-main-title {
  font-size: clamp(3rem, 6vw, 4.5rem);
  font-weight: 950;
  line-height: 1.05;
  margin-bottom: 2rem;
  letter-spacing: -0.03em;
  background: linear-gradient(to bottom, #ffffff, #94a3b8);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-description {
  font-size: 1.35rem;
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 3.5rem;
  max-width: 650px;
}

.hero-btn-outline {
  height: 56px;
  padding: 0 2.5rem !important;
  font-size: 1.125rem !important;
  font-weight: 800 !important;
  border-radius: 12px !important;
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  color: white !important;
  transition: all 0.3s !important;
}

.hero-btn-outline:hover {
  background: rgba(255, 255, 255, 0.1) !important;
  border-color: rgba(255, 255, 255, 0.4) !important;
}

.hero-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 600;
  color: #94a3b8;
  margin-bottom: 3rem;
}

.dot {
  width: 4px;
  height: 4px;
  background: #475569;
  border-radius: 50%;
}

.hero-btn {
  height: 56px;
  padding: 0 2.5rem !important;
  font-size: 1.125rem !important;
  font-weight: 800 !important;
  border-radius: 12px !important;
}

/* Trending Ticker */
.trending-ticker-section {
  background: #0f172a;
  color: white;
  padding: 1rem 0;
  border-bottom: 1px solid #1e293b;
}

.ticker-wrapper {
  display: flex;
  align-items: center;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.ticker-label {
  background: #ef4444;
  padding: 0.25rem 0.75rem;
  font-weight: 900;
  font-size: 0.75rem;
  border-radius: 4px;
}

.ticker-content {
  display: flex;
  gap: 3rem;
  overflow: hidden;
  white-space: nowrap;
}

.ticker-item {
  font-weight: 600;
  font-size: 0.9375rem;
  cursor: pointer;
  transition: color 0.3s;
}

.ticker-item:hover {
  color: #6366f1;
}

/* Main Grid Layout */
.main-news-grid {
  padding: 5rem 0;
}

.grid-layout {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 4rem;
}

.section-title {
  margin-bottom: 3rem;
}

.section-title h2 {
  font-size: 1.875rem;
  font-weight: 900;
  margin-bottom: 0.75rem;
}

.section-title .line {
  height: 4px;
  width: 40px;
  background: #6366f1;
}

.news-feed {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.feed-item {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2rem;
  cursor: pointer;
}

.feed-img {
  height: 180px;
  border-radius: 16px;
  overflow: hidden;
}

.feed-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.feed-item:hover .feed-img img {
  transform: scale(1.05);
}

.cat {
  color: #6366f1;
  font-weight: 800;
  font-size: 0.8125rem;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
  display: block;
}

.feed-content h3 {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 0.75rem;
  line-height: 1.3;
  transition: color 0.3s;
}

.feed-item:hover h3 {
  color: #6366f1;
}

.feed-content p {
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.feed-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #94a3b8;
  font-weight: 600;
  font-size: 0.875rem;
}

/* Side Panel */
.side-panel {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.side-section h3 {
  font-size: 1.125rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.category-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.cat-pill {
  padding: 0.5rem 1rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 99px;
  font-weight: 700;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s;
}

.cat-pill:hover {
  border-color: #6366f1;
  color: #6366f1;
}

.tech-mini-cards {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.tech-mini-card {
  display: flex;
  gap: 1.25rem;
  align-items: center;
  cursor: pointer;
}

.tech-mini-card img {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  object-fit: cover;
}

.mini-info h4 {
  font-size: 0.9375rem;
  font-weight: 800;
  margin-bottom: 0.25rem;
}

.mini-info span {
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 700;
  text-transform: uppercase;
}

.view-all-tech {
  margin-top: 2rem;
  font-weight: 800 !important;
  color: #6366f1 !important;
}

/* Spotlight Section */
.spotlight-section {
  padding: 5rem 0;
}

.spotlight-card {
  background: #0f172a;
  border-radius: 32px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
  color: white;
}

.spotlight-content {
  padding: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.spotlight-content h2 {
  font-size: 2.5rem;
  font-weight: 900;
  margin: 1.5rem 0;
  line-height: 1.1;
}

.spotlight-content p {
  font-size: 1.125rem;
  color: #94a3b8;
  margin-bottom: 3rem;
}

.spotlight-btn {
  height: 56px;
  padding: 0 2.5rem !important;
  font-weight: 800 !important;
  border-radius: 12px !important;
}

.spotlight-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Newsletter Highlight */
.newsletter-highlight {
  padding-bottom: 8rem;
}

.newsletter-box {
  background: white;
  padding: 5rem;
  border-radius: 32px;
  text-align: center;
  border: 1px solid #e2e8f0;
}

.newsletter-box h2 {
  font-size: 2.25rem;
  font-weight: 900;
  margin-bottom: 1rem;
}

.newsletter-box p {
  color: #64748b;
  font-size: 1.125rem;
  margin-bottom: 3rem;
}

.form-row {
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  gap: 1rem;
}

.form-row :deep(.el-input__inner) {
  height: 56px;
  border-radius: 12px;
}

.form-row .el-button {
  height: 56px;
  padding: 0 2rem;
  border-radius: 12px;
  font-weight: 800;
}

/* Categorized Listings Style */
.categorized-listings {
  padding: 5rem 0;
  background: #fff;
}

.category-block {
  margin-bottom: 4rem;
}

.block-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f1f5f9;
}

.block-header h2 {
  font-size: 1.75rem;
  font-weight: 900;
  text-transform: capitalize;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.mini-article {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  cursor: pointer;
}

.mini-img {
  height: 150px;
  border-radius: 12px;
  overflow: hidden;
}

.mini-img :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.mini-article:hover .mini-img :deep(img) {
  transform: scale(1.1);
}

.mini-content h4 {
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  line-height: 1.4;
  color: #1e293b;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.mini-content span {
  font-size: 0.875rem;
  color: #94a3b8;
  font-weight: 600;
}

@media (max-width: 1024px) {
  .category-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .category-grid { grid-template-columns: 1fr; }
}

@media (max-width: 1024px) {
  .grid-layout { grid-template-columns: 1fr; gap: 5rem; }
  .spotlight-card { grid-template-columns: 1fr; }
  .spotlight-content { padding: 3rem; }
}

@media (max-width: 768px) {
  .feed-item { grid-template-columns: 1fr; }
  .news-hero { height: auto; min-height: 500px; padding: 10rem 0 5rem; }
  .newsletter-box { padding: 3rem 1.5rem; }
  .form-row { flex-direction: column; }
  
  /* Mobile padding adjustments */
  .spotlight-content { padding: 2.5rem; }
  .hero-main-title { font-size: 2.5rem !important; }
  .section-title h2 { font-size: 1.5rem; }
  .newsletter-box h2 { font-size: 1.75rem; }
}

</style>
