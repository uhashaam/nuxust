<template>
  <div class="products-page">
    <header class="page-hero">
      <div class="hero-glow"></div>
      <div class="container hero-content">
        <span class="tag">Our Portfolio</span>
        <h1>Industrial Excellence</h1>
        <p>Discover our range of premium solutions engineered for the modern enterprise.</p>
      </div>
    </header>

    <div class="container">
      <div class="category-filter">
        <button
          :class="{ active: !selectedCategory }"
          @click="selectedCategory = null"
        >
          All Technologies
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

      <div class="products-grid">
        <article v-for="product in filteredProducts" :key="product.id" class="product-card">
          <div class="card-image">
            <img :src="product.image || '/images/product-placeholder.jpg'" :alt="product.name" />
            <span v-if="product.featured" class="featured-tag">⭐ Featured</span>
          </div>
          <div class="card-content">
            <div class="card-category">
              {{ formatCategory(product.category) }}
            </div>
            <h2>{{ product.name }}</h2>
            <p>{{ product.shortDescription }}</p>
            <div class="card-footer">
              <NuxtLink :to="`/products/${product.slug}`" class="view-details">
                Technical Reference →
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>

      <div v-if="filteredProducts.length === 0" class="empty-state">
        <div class="empty-icon">📦</div>
        <h3>No technologies found</h3>
        <p>Check back later for entries in this category</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useHead } from 'nuxt/app'


const { productList, categories } = useProducts()

const selectedCategory = ref<string | null>(null)

const filteredProducts = computed(() => {
  if (!selectedCategory.value) return productList.value
  return productList.value.filter(item => item.category === selectedCategory.value)
})

const formatCategory = (cat: string) => {
  return cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

useHead({
  title: 'Technology Catalog',
  meta: [
    { name: 'description', content: 'Comprehensive portfolio of industrial technologies and strategic solutions.' }
  ]
})
</script>

<style scoped>
.products-page {
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
  border-color: #6366f1;
  color: #6366f1;
  transform: translateY(-2px);
}

.category-filter button.active {
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  border-color: #6366f1;
  color: white;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.product-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

.card-image {
  position: relative;
  height: 250px;
  overflow: hidden;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.product-card:hover .card-image img {
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

.card-category {
  display: inline-block;
  padding: 0.375rem 0.75rem;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 1rem;
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

.price {
  font-size: 1.75rem;
  font-weight: 800;
  color: #10b981;
}

.view-details {
  color: #6366f1;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
}

.view-details:hover {
  color: #4f46e5;
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
  .products-grid {
    grid-template-columns: 1fr;
  }
  
  .category-filter {
    justify-content: flex-start;
  }
}
</style>
