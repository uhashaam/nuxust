<template>
  <div class="page-container">
      <div class="page-header">
        <el-button @click="handleBack">← Back to List</el-button>
        <h2>{{ isNew ? 'Add New Product' : 'Edit Product' }}</h2>
      </div>

      <el-card class="form-card" shadow="never">
        <el-form :model="form" label-position="top" ref="formRef" :rules="rules">
          <div class="form-grid">
            <div class="main-form">
              <el-tabs type="border-card" class="product-tabs">
                <el-tab-pane label="Basic Information">
                  <el-form-item label="Product Name" prop="name">
                    <el-input v-model="form.name" placeholder="Enter product name" />
                  </el-form-item>

                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-form-item label="Price ($)" prop="price">
                        <el-input-number v-model="form.price" :min="0" style="width: 100%" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="Category" prop="category">
                        <el-select v-model="form.category" placeholder="Select category" style="width: 100%">
                          <el-option label="Software" value="Software" />
                          <el-option label="SaaS" value="SaaS" />
                          <el-option label="Hardware" value="Hardware" />
                          <el-option label="Services" value="Services" />
                          <el-option label="Tools" value="Tools" />
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-form-item label="Short Description" prop="shortDescription">
                    <el-input v-model="form.shortDescription" placeholder="Quick catchphrase" />
                  </el-form-item>

                  <el-form-item label="External Reference Link" prop="externalLink">
                    <el-input v-model="form.externalLink" placeholder="https://external-resource.com" />
                  </el-form-item>

                  <el-form-item label="Detailed Description" prop="description">
                    <div class="admin-editor-wrapper">
                      <div ref="editorRef"></div>
                    </div>
                  </el-form-item>

                  <el-form-item label="Specifications">
                    <div v-for="(val, key) in form.specifications" :key="key" class="spec-row">
                      <el-input v-model="tempSpecKey[key]" placeholder="Feature" style="width: 150px" />
                      <el-input v-model="form.specifications[key]" placeholder="Value" />
                      <el-button type="danger" link @click="removeSpec(key)">Remove</el-button>
                    </div>
                    <el-button type="primary" link @click="addSpec">+ Add Specification</el-button>
                  </el-form-item>
                </el-tab-pane>

                <el-tab-pane label="SEO & Search">
                  <div class="seo-fields">
                    <el-form-item label="URL Slug (Optional)">
                      <el-input v-model="form.slug" placeholder="e.g. name-of-product" />
                      <p class="help-text">Leave blank to auto-generate from name. Use only lowercase, numbers, and hyphens.</p>
                    </el-form-item>

                    <el-form-item label="Browser Title (SEO Title)">
                      <el-input v-model="form.metaTitle" placeholder="Custom product title for SEO" />
                    </el-form-item>

                    <el-form-item label="Meta Description">
                      <el-input 
                        v-model="form.metaDescription" 
                        type="textarea" 
                        :rows="4" 
                        placeholder="Snippet for search engine results"
                      />
                    </el-form-item>

                    <el-form-item label="Keywords">
                      <el-input v-model="form.metaKeywords" placeholder="Keywords (e.g., ai, cloud, enterprise)" />
                    </el-form-item>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>

            <div class="form-sidebar">
              <el-form-item label="Product Image">
                <div 
                  class="product-uploader"
                  @click="mediaLibraryVisible = true"
                >
                  <img v-if="form.image" :src="form.image" class="preview-image" />
                  <div v-else class="upload-placeholder">
                    <el-icon class="uploader-icon"><Plus /></el-icon>
                    <span>Choose from Library</span>
                  </div>
                </div>
                <div v-if="form.image" class="upload-actions">
                  <p class="alt-status" v-if="form.imageAlt">✅ Alt text set</p>
                  <p class="alt-status warning" v-else>⚠️ Missing alt text</p>
                  <el-button link type="danger" @click="form.image = ''; form.imageAlt = ''">Remove Image</el-button>
                </div>
              </el-form-item>

              <el-form-item label="Display Settings">
                <el-checkbox v-model="form.featured">Featured Product</el-checkbox>
                <p class="help-text">Featured products appear on the homepage.</p>
              </el-form-item>

              <div class="submit-section">
                <el-button type="primary" size="large" @click="handleSave" :loading="saving" style="width: 100%">
                  💾 Save Product
                </el-button>
              </div>
            </div>
          </div>
        </el-form>
      </el-card>
    </div>

    <MediaLibrary 
      v-model="mediaLibraryVisible" 
      @select="handleMediaSelect" 
    />
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import { useRoute, navigateTo } from 'nuxt/app'
import { useProducts } from '~/composables/useProducts'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const route = useRoute()
const { getProductById, addProduct, updateProduct } = useProducts()

const isNew = route.params.id === 'new'
const saving = ref(false)
const formRef = ref()
const mediaLibraryVisible = ref(false)
const tempSpecKey = reactive<Record<string, string>>({})

const form = ref<Omit<Product, 'id'>>({
  name: '',
  category: 'Software',
  price: 0,
  shortDescription: '',
  description: '',
  image: '',
  imageAlt: '',
  gallery: [],
  specifications: {},
  featured: false,
  externalLink: '',
  metaTitle: '',
  metaDescription: '',
  metaKeywords: '',
  slug: ''
})

const rules = {
  name: [{ required: true, message: 'Please enter name', trigger: 'blur' }],
  price: [{ required: true, message: 'Please enter price', trigger: 'blur' }],
  category: [{ required: true, message: 'Please select category', trigger: 'change' }]
}

const quill = ref<any>(null)
const editorRef = ref<HTMLElement | null>(null)

onMounted(async () => {
  if (process.client) {
    const QuillModule = await import('quill')
    const Q = QuillModule.default
    
    await nextTick()
    
    if (editorRef.value) {
      quill.value = new Q(editorRef.value, {
        theme: 'snow',
        placeholder: 'Full product details...',
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean']
          ]
        }
      })

      // Set initial content if editing
      if (!isNew) {
        const existing = getProductById(route.params.id as string)
        if (existing) {
          // Exclude 'id' to match Omit<Product, 'id'>
          const { id, ...data } = existing
          form.value = {
            ...data,
            description: data.description || '',
            image: data.image || '',
            imageAlt: data.imageAlt || '',
            metaTitle: data.metaTitle || '',
            metaDescription: data.metaDescription || '',
            metaKeywords: data.metaKeywords || '',
            slug: data.slug || ''
          }
          if (quill.value) {
            quill.value.root.innerHTML = form.value.description
          }
        }
      }

      // Sync Quill content to form.description
      quill.value.on('text-change', () => {
        form.value.description = quill.value.root.innerHTML
      })
    }
  }
})

const handleMediaSelect = (asset: { url: string; alt: string }) => {
  form.value.image = asset.url
  form.value.imageAlt = asset.alt
}

const handleBack = () => {
  navigateTo('/admin/products')
}

const addSpec = () => {
  const key = `feature_${Date.now()}`
  form.value.specifications[key] = ''
  tempSpecKey[key] = ''
}

const removeSpec = (key: string) => {
  delete form.value.specifications[key]
  delete tempSpecKey[key]
}

const handleSave = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      saving.value = true
      try {
        if (isNew) {
          addProduct(form.value)
        } else {
          updateProduct(route.params.id as string, form.value)
        }
        ElMessage.success('Product saved successfully')
        navigateTo('/admin/products')
      } catch (err) {
        ElMessage.error('Failed to save')
      } finally {
        saving.value = false
      }
    }
  })
}
</script>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.admin-editor-wrapper {
  width: 100%;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
}

.page-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
}

.form-card {
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 2rem;
}

.product-uploader {
  border: 2px dashed #e2e8f0;
  border-radius: 12px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  background: #f8fafc;
}

.product-uploader:hover {
  border-color: #3b82f6;
  background: #f1f5f9;
}

.upload-placeholder {
  height: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  gap: 0.5rem;
  padding: 1rem;
  text-align: center;
}

.uploader-icon {
  font-size: 32px;
}

.preview-image {
  width: 100%;
  height: 240px;
  object-fit: contain;
  display: block;
}

.spec-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.help-text {
  font-size: 12px;
  color: #64748b;
  margin-top: 4px;
}

.submit-section {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #f1f5f9;
}

@media (max-width: 992px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
