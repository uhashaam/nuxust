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
                    <el-form-item label="Focus Keyword">
                      <el-input v-model="form.focusKeyword" placeholder="Primary keyword for this article" />
                      <p class="help-text">Used for live SEO analysis scoring.</p>
                    </el-form-item>

                    <el-form-item label="URL Slug">
                      <el-input v-model="form.slug" placeholder="e.g. title-of-article" />
                      <p class="help-text">Leave blank to auto-generate from title.</p>
                    </el-form-item>

                    <el-form-item label="Meta Title (SEO Title)">
                      <el-input v-model="form.seoTitle" placeholder="Custom page title for search engines" />
                      <div class="char-count" :class="charClass(form.seoTitle, 50, 60)">
                        {{ (form.seoTitle || '').length }}/60 chars
                      </div>
                    </el-form-item>

                    <el-form-item label="Meta Description">
                      <el-input 
                        v-model="form.metaDescription" 
                        type="textarea" 
                        :rows="4" 
                        placeholder="Page description for search results"
                      />
                      <div class="char-count" :class="charClass(form.metaDescription, 150, 160)">
                        {{ (form.metaDescription || '').length }}/160 chars
                      </div>
                    </el-form-item>

                    <el-form-item label="Canonical URL">
                      <el-input v-model="form.canonicalUrl" placeholder="https://..." />
                    </el-form-item>

                    <el-form-item label="OG Image URL">
                      <el-input v-model="form.ogImageUrl" placeholder="https://..." />
                    </el-form-item>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>

            <div class="form-sidebar">
              <div class="seo-sidebar-card">
                <div class="seo-score-header">
                  <span class="seo-label">SEO Analysis</span>
                  <div class="seo-score-badge" :class="scoreClass">
                    {{ seoResult.percentage }}
                  </div>
                </div>
                <div class="seo-progress-bg">
                  <div class="seo-progress-fill" :style="{ width: seoResult.percentage + '%' }" :class="scoreClass"></div>
                </div>
                <div class="seo-checklist">
                  <div v-for="check in seoResult.checks" :key="check.id" class="seo-check-item">
                    <span class="check-icon">{{ check.status === 'pass' ? '✅' : check.status === 'warn' ? '⚠️' : '❌' }}</span>
                    <span class="check-text">{{ check.label }}</span>
                  </div>
                </div>
              </div>

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

              <el-form-item label="Target Industry Subdomain" prop="siteId">
                <el-select v-model="form.siteId" placeholder="Select industry subdomain" filterable style="width: 100%" :loading="!sites.length">
                  <el-option label="None / Main Domain" value="" />
                  <el-option v-for="site in sites" :key="site.id" :label="site.subdomain" :value="site.id">
                    <span>{{ site.subdomain }} <small class="text-slate-400">({{ site.name }})</small></span>
                  </el-option>
                </el-select>
                <p class="help-text">Select which industry site this news belongs to.</p>
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
import { ref, onMounted, nextTick, computed } from 'vue'
import { useRoute, navigateTo, useAsyncData } from '#imports'
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
  middleware: 'admin-auth'
})

const { data: sitesData } = await useAsyncData('admin-all-sites', () => 
  $fetch('/api/sites/all')
)
const sites = computed(() => sitesData.value?.sites || [])

const route = useRoute()
const { getNewsById } = useNews()

const isNew = route.params.id === 'new'
const saving = ref(false)
const formRef = ref()

const mediaLibraryVisible = ref(false)

const form = ref<Omit<NewsItem, 'id'> & { siteId?: string }>({
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
  seoTitle: '',
  metaDescription: '',
  metaKeywords: '',
  slug: '',
  siteId: '',
  focusKeyword: '',
  ogImageUrl: '',
  canonicalUrl: '',
  robotsMeta: 'index,follow',
  seoScore: 0
})

// === SEO ANALYSIS LOGIC ===
const seoResult = computed(() => {
  const content = form.value.content || ''
  const plainText = content.replace(/<[^>]*>/g, '').trim()
  const wordCount = plainText ? plainText.split(/\s+/).length : 0
  const title = form.value.title || ''
  const seoTitle = form.value.seoTitle || title
  const desc = form.value.metaDescription || ''
  const keyword = (form.value.focusKeyword || '').toLowerCase().trim()

  const checks = []
  let points = 0

  // Title 
  const tLen = seoTitle.length
  if (tLen >= 50 && tLen <= 60) { checks.push({ id: 1, label: 'Title length', status: 'pass' }); points += 20 }
  else { checks.push({ id: 1, label: 'Title length', status: 'fail' }); points += 5 }

  // Desc
  const dLen = desc.length
  if (dLen >= 150 && dLen <= 160) { checks.push({ id: 2, label: 'Desc length', status: 'pass' }); points += 20 }
  else { checks.push({ id: 2, label: 'Desc length', status: 'fail' }); points += 5 }

  // Keyword in Title
  if (keyword && seoTitle.toLowerCase().includes(keyword)) { checks.push({ id: 3, label: 'Keyword in title', status: 'pass' }); points += 20 }
  else { checks.push({ id: 3, label: 'Keyword in title', status: 'fail' }) }

  // Keyword in Desc
  if (keyword && desc.toLowerCase().includes(keyword)) { checks.push({ id: 4, label: 'Keyword in desc', status: 'pass' }); points += 15 }
  else { checks.push({ id: 4, label: 'Keyword in desc', status: 'fail' }) }

  // Content Word Count
  if (wordCount >= 600) { checks.push({ id: 5, label: 'Content length (600+)', status: 'pass' }); points += 25 }
  else if (wordCount >= 300) { checks.push({ id: 5, label: 'Content length', status: 'warn' }); points += 10 }
  else { checks.push({ id: 5, label: 'Content too short', status: 'fail' }) }

  const percentage = Math.min(points, 100)
  return { percentage, checks }
})

const scoreClass = computed(() => {
  const s = seoResult.value.percentage
  if (s >= 80) return 'score-green'
  if (s >= 50) return 'score-orange'
  return 'score-red'
})

const charClass = (text: string | undefined | null, min: number, max: number) => {
  const len = (text || '').length
  if (len === 0) return ''
  if (len >= min && len <= max) return 'text-success'
  return 'text-warning'
}

const rules = {
  title: [{ required: true, message: 'Please enter title', trigger: 'blur' }],
  content: [{ required: true, message: 'Please enter content', trigger: 'blur' }],
  siteId: [{ required: false, message: 'Please select an industry', trigger: 'change' }]
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
            metaKeywords: data.metaKeywords || '',
            slug: data.slug || '',
            siteId: data.siteId || '',
            seoTitle: data.seo_title || data.metaTitle || '',
            focusKeyword: data.focus_keyword || '',
            ogImageUrl: data.og_image_url || '',
            canonicalUrl: data.canonical_url || '',
            robotsMeta: data.robots_meta || 'index,follow',
            seoScore: data.seo_score || 0
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

const handleMediaSelect = (asset: { url: string; alt: string; token?: string }) => {
  form.value.image = asset.url
  form.value.imageAlt = asset.alt
  if (asset.token) {
    (form.value as any).imageToken = asset.token
  }
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
          await $fetch('/api/news/create', {
            method: 'POST',
            body: {
              title: form.value.title,
              content: form.value.content,
              slug: form.value.slug,
              siteId: form.value.siteId,
              image_url: (form.value as any).imageToken || form.value.image,
              featured: form.value.featured,
              trending: form.value.trending,
              author: form.value.author,
              publishedAt: form.value.publishedAt,
              // SEO fields
              seoTitle: form.value.seoTitle,
              metaDescription: form.value.metaDescription,
              focusKeyword: form.value.focusKeyword,
              ogImageUrl: form.value.ogImageUrl,
              canonicalUrl: form.value.canonicalUrl,
              robotsMeta: form.value.robotsMeta,
              seoScore: seoResult.value.percentage
            }
          })
        } else {
          await $fetch('/api/news/update', {
            method: 'POST',
            body: {
              id: route.params.id,
              title: form.value.title,
              content: form.value.content,
              slug: form.value.slug,
              siteId: form.value.siteId,
              release_status: (form.value as any).featured ? 'Trending' : 'Published',
              featured_image: (form.value as any).imageToken || form.value.image,
              author: form.value.author,
              publishedAt: form.value.publishedAt,
              // SEO fields
              seoTitle: form.value.seoTitle,
              metaDescription: form.value.metaDescription,
              focusKeyword: form.value.focusKeyword,
              ogImageUrl: form.value.ogImageUrl,
              canonicalUrl: form.value.canonicalUrl,
              robotsMeta: form.value.robotsMeta,
              seoScore: seoResult.value.percentage
            }
          })
        }
        ElMessage.success('Saved successfully')
        navigateTo('/admin/news')
      } catch (err: any) {
        ElMessage.error(err.message || 'Failed to save')
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

/* SEO Sidebar Styling */
.seo-sidebar-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
}

.seo-score-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.seo-label {
  font-weight: 700;
  color: #1e293b;
  font-size: 0.9rem;
}

.seo-score-badge {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  color: white;
  font-size: 1rem;
}

.seo-progress-bg {
  height: 8px;
  background: #f1f5f9;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.seo-progress-fill {
  height: 100%;
  transition: width 0.3s ease;
}

.score-green { background: #10b981; }
.score-orange { background: #f59e0b; }
.score-red { background: #ef4444; }

.seo-checklist {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.seo-check-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #475569;
}

.char-count {
  text-align: right;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  font-weight: 600;
}

.text-success { color: #10b981; }
.text-warning { color: #f59e0b; }

@media (max-width: 992px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  .form-sidebar {
    order: -1;
  }
}
</style>
