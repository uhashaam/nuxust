<template>
  <div class="page-container">
      <div class="page-header">
        <el-button @click="handleBack">← Back to List</el-button>
        <h2>{{ isNew ? 'Create New Article' : 'Edit News Article' }}</h2>
      </div>

      <el-card class="form-card" shadow="never">
        <el-form :model="form" label-position="top" ref="formRef" :rules="rules">
          <div class="form-grid">
            <div class="main-form">
              <el-tabs type="border-card" class="editor-tabs">
                <el-tab-pane label="Content Editing">
                  <el-form-item label="Article Title" prop="title">
                    <el-input v-model="form.title" placeholder="Enter article title" />
                  </el-form-item>

                  <el-form-item label="Excerpt / Summary" prop="excerpt">
                    <el-input 
                      v-model="form.excerpt" 
                      type="textarea" 
                      :rows="3" 
                      placeholder="Short summary for the news list"
                    />
                  </el-form-item>

                  <el-form-item label="Post Content" prop="content">
                    <div class="admin-editor-wrapper">
                      <div ref="editorRef"></div>
                    </div>
                  </el-form-item>
                </el-tab-pane>

                <el-tab-pane label="SEO Optimization">
                  <div class="seo-fields">
                    <el-form-item label="URL Slug (Optional)">
                      <el-input v-model="form.slug" placeholder="e.g. title-of-article" />
                      <p class="help-text">Leave blank to auto-generate from title. Use only lowercase, numbers, and hyphens.</p>
                    </el-form-item>

                    <el-form-item label="Meta Title (SEO Title)">
                      <el-input v-model="form.metaTitle" placeholder="Custom page title for search engines" />
                      <p class="help-text">Recommended length: 50-60 characters.</p>
                    </el-form-item>

                    <el-form-item label="Meta Description">
                      <el-input 
                        v-model="form.metaDescription" 
                        type="textarea" 
                        :rows="4" 
                        placeholder="Page description for search results"
                      />
                      <p class="help-text">Recommended length: 150-160 characters.</p>
                    </el-form-item>

                    <el-form-item label="Meta Keywords">
                      <el-input v-model="form.metaKeywords" placeholder="Keywords separated by commas" />
                    </el-form-item>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>

            <div class="form-sidebar">
              <el-form-item label="Featured Image">
                <div 
                  class="news-uploader"
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

              <el-form-item label="Category" prop="category">
                <el-select v-model="form.category" placeholder="Select or type to add" filterable allow-create default-first-option style="width: 100%">
                  <el-option v-for="cat in categories" :key="cat" :label="cat" :value="cat" />
                </el-select>
                <p class="help-text">Type a new name and press enter to create it.</p>
              </el-form-item>

              <el-form-item label="Author" prop="author">
                <el-input v-model="form.author" placeholder="Author name" />
              </el-form-item>

              <el-form-item label="Published Date" prop="publishedAt">
                <el-date-picker
                  v-model="form.publishedAt"
                  type="date"
                  placeholder="Select date"
                  style="width: 100%"
                  value-format="YYYY-MM-DD"
                />
              </el-form-item>

              <el-form-item label="Status">
                <div class="checkbox-group">
                  <el-checkbox v-model="form.featured">Featured Post</el-checkbox>
                  <el-checkbox v-model="form.trending">Trending Article</el-checkbox>
                </div>
              </el-form-item>

              <div class="submit-section">
                <el-button type="primary" size="large" @click="handleSave" :loading="saving" style="width: 100%">
                  💾 Save Article
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
import { ref, onMounted, nextTick } from 'vue'
import { useRoute, navigateTo } from 'nuxt/app'
import { useNews } from '~/composables/useNews'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

// Dynamic import for Quill to avoid SSR issues
let Quill: any
if (process.client) {
  import('quill').then((m) => {
    Quill = m.default
  })
}

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})



const categories = ref(['Industry', 'Enterprise', 'Policy', 'Market', 'Strategy'])
const route = useRoute()
const { getNewsById, addNews, updateNews } = useNews()

const isNew = route.params.id === 'new'
const saving = ref(false)
const formRef = ref()

const mediaLibraryVisible = ref(false)

const form = ref<Omit<NewsItem, 'id'>>({
  title: '',
  category: 'Industry',
  content: '',
  excerpt: '',
  image: '',
  imageAlt: '',
  author: 'Admin',
  publishedAt: new Date().toISOString().split('T')[0],
  featured: false,
  trending: false,
  metaTitle: '',
  metaDescription: '',
  metaKeywords: '',
  slug: ''
})

const rules = {
  title: [{ required: true, message: 'Please enter title', trigger: 'blur' }],
  content: [{ required: true, message: 'Please enter content', trigger: 'blur' }],
  category: [{ required: true, message: 'Please select category', trigger: 'change' }]
}

const quill = ref<any>(null)
const editorRef = ref<HTMLElement | null>(null)

onMounted(async () => {
  if (process.client) {
    const QuillModule = await import('quill')
    const Q = QuillModule.default
    
    // Use nextTick to ensure the ref is bound to the DOM
    await nextTick()
    
    if (editorRef.value) {
      quill.value = new Q(editorRef.value, {
        theme: 'snow',
        placeholder: 'Start writing your professional article...',
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean']
          ]
        }
      })

      // Set initial content if editing
      if (!isNew) {
        const existing = getNewsById(route.params.id as string)
        if (existing) {
          // Exclude 'id' and explicitly map to Omit<NewsItem, 'id'>
          const { id, ...data } = existing
          form.value = {
            title: data.title || '',
            category: data.category || 'Industry',
            content: data.content || '',
            excerpt: data.excerpt || '',
            image: data.image || '',
            imageAlt: data.imageAlt || '',
            author: data.author || 'Admin',
            publishedAt: data.publishedAt || new Date().toISOString().split('T')[0],
            featured: data.featured || false,
            trending: data.trending || false,
            metaTitle: data.metaTitle || '',
            metaDescription: data.metaDescription || '',
            metaKeywords: data.metaKeywords || '',
            slug: data.slug || ''
          }
          if (quill.value) {
            quill.value.root.innerHTML = form.value.content
          }
        }
      }

      // Sync Quill content to form.content
      quill.value.on('text-change', () => {
        form.value.content = quill.value.root.innerHTML
      })
    }
  }
})

const handleMediaSelect = (asset: { url: string; alt: string }) => {
  form.value.image = asset.url
  form.value.imageAlt = asset.alt
}

const handleBack = () => {
  navigateTo('/admin/news')
}

const handleSave = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      saving.value = true
      try {
        if (isNew) {
          addNews(form.value)
        } else {
          updateNews(route.params.id as string, form.value)
        }
        ElMessage.success('Saved successfully')
        navigateTo('/admin/news')
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
  grid-template-columns: 1fr 320px;
  gap: 2rem;
}

.admin-editor-wrapper {
  width: 100%;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
}

.professional-editor {
  :deep(.el-textarea__inner) {
    min-height: 400px;
    font-size: 16px;
    line-height: 1.6;
    padding: 1.5rem;
    background: #fff;
    border: 1px solid #e2e8f0;
    transition: all 0.3s;
  }
  
  :deep(.el-textarea__inner:focus) {
    border-color: #3b82f6;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
  }
}

.news-uploader {
  border: 2px dashed #e2e8f0;
  border-radius: 12px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  background: #f8fafc;
}

.news-uploader:hover {
  border-color: #3b82f6;
  background: #f1f5f9;
}

.upload-placeholder {
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  gap: 0.5rem;
}

.uploader-icon {
  font-size: 28px;
}

.preview-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
}

.help-text {
  font-size: 12px;
  color: #64748b;
  margin-top: 4px;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}


.upload-actions {
  margin-top: 0.5rem;
  text-align: right;
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
  .form-sidebar {
    order: -1;
  }
}
</style>
