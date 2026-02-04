<template>
  <div class="product-detail">
    <div v-if="product" class="product-wrapper">
      <header class="detail-hero">
        <div class="container">
          <div class="breadcrumb">
            <NuxtLink to="/">Home</NuxtLink>
            <el-icon><ArrowRight /></el-icon>
            <NuxtLink to="/products">Technologies</NuxtLink>
            <el-icon><ArrowRight /></el-icon>
            <span>{{ product.name }}</span>
          </div>
          
          <span class="cat-pill">{{ product.category }}</span>
          <h1>{{ product.name }}</h1>
          
          <div class="product-meta">
            <div class="meta-item">
              <span class="label">Price</span>
              <span class="value">${{ product.price }}</span>
            </div>
          </div>
        </div>
      </header>

      <div class="container main-grid">
        <div class="primary-content">
          <div class="main-image">
            <NuxtImg 
              :src="product.image" 
              :alt="product.imageAlt || product.name"
              width="900"
              height="500"
              class="rounded-img"
            />
          </div>

          <div class="product-description">
            <h3>Technical Overview</h3>
            <div class="description-body" v-html="product.description"></div>
          </div>

          <div v-if="product.specifications" class="specifications-section">
            <h3>Specifications</h3>
            <div class="specs-grid">
              <div v-for="(val, key) in product.specifications" :key="key" class="spec-item">
                <span class="spec-label">{{ key }}</span>
                <span class="spec-value">{{ val }}</span>
              </div>
            </div>
          </div>
        </div>

        <aside class="side-actions">
          <div class="sticky-side">
            <div class="action-card">
              <h3>Interested in this tech?</h3>
              <p>Contact our technical experts for a deep dive into how this solution fits your enterprise.</p>
              <el-button type="primary" class="contact-btn" @click="navigateTo('/contact')">Request Technical Brief</el-button>
              <el-button v-if="product.externalLink" plain class="external-btn" @click="openExternal(product.externalLink)">View Documentation</el-button>
            </div>
          </div>
        </aside>
      </div>
    </div>

    <div v-else class="not-found container">
      <h2>Technology not found</h2>
      <el-button type="primary" @click="navigateTo('/products')">Back to Catalog</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'

const route = useRoute()
const { getProductBySlug, getProductById } = useProducts()
const { config } = useCompanyConfig()

const product = computed(() => {
  const s = route.params.slug as string
  return getProductBySlug(s) || getProductById(s)
})

const openExternal = (url: string) => {
  window.open(url, '_blank')
}

useSeoMeta({
  title: () => (product.value?.metaTitle || product.value?.name || 'Technology') + ' | ' + config.value.brandName,
  description: () => product.value?.metaDescription || product.value?.shortDescription,
  keywords: () => product.value?.metaKeywords
})
</script>

<style scoped>
.product-detail {
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
  background: #10b981;
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
}

.product-meta {
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
  font-size: 1.5rem;
  font-weight: 800;
  color: #10b981;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 4rem;
}

.main-grid {
  display: grid;
  grid-template-columns: 1fr 400px;
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

.main-image {
  margin-bottom: 4rem;
}

.rounded-img {
  width: 100%;
  height: auto;
  border-radius: 20px;
}

.product-description h3, .specifications-section h3 {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 2rem;
  color: #1e293b;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f1f5f9;
}

.description-body {
  font-size: 1.125rem;
  line-height: 1.8;
  color: #475569;
}

.description-body :deep(h2) { font-size: 1.5rem; margin-top: 2rem; color: #1e293b; }

.specifications-section {
  margin-top: 5rem;
}

.specs-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.spec-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 16px;
}

.spec-item .spec-label {
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 800;
  text-transform: uppercase;
}

.spec-item .spec-value {
  font-weight: 700;
  color: #1e293b;
}

.sticky-side {
  position: sticky;
  top: 120px;
}

.action-card {
  background: #0f172a;
  color: white;
  padding: 3rem;
  border-radius: 32px;
}

.action-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.action-card p {
  color: #94a3b8;
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.contact-btn {
  width: 100%;
  height: 56px;
  border-radius: 12px;
  font-weight: 800;
  margin-bottom: 1rem;
}

.external-btn {
  width: 100%;
  height: 56px;
  border-radius: 12px;
  font-weight: 800;
  background: transparent !important;
  color: white !important;
  border-color: #334155 !important;
}

@media (max-width: 1024px) {
  .main-grid { grid-template-columns: 1fr; }
  .container { padding: 0 2rem; }
}
</style>
