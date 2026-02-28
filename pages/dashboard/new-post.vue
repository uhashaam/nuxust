<template>
  <div class="new-post-page">
    <div class="container py-12">
      <div class="max-w-3xl mx-auto">
        <el-button link @click="navigateTo('/dashboard')" class="mb-4">
          <el-icon><ArrowLeft /></el-icon> Back to Dashboard
        </el-button>
        
        <h1 class="text-3xl font-bold text-slate-900 mb-8">Create New Post</h1>

        <el-card class="limit-warning mb-8" :class="{ 'warning-border': !canPost }">
          <div class="flex items-center gap-4 text-slate-700">
            <el-icon size="24" :class="canPost ? 'text-green-500' : 'text-amber-500'">
              <Check v-if="canPost" /><Warning v-else />
            </el-icon>
            <div class="flex-grow">
              <p class="font-bold">{{ canPost ? 'Capacity Status' : 'Publishing Limit Reached' }}</p>
              <p class="text-sm">Plan: <strong>{{ userPlan?.name }}</strong> ({{ currentLimit }})</p>
              <div class="mt-2 flex items-center justify-between">
                <span class="text-xs">Posts Remaining (Week):</span>
                <span class="text-lg font-black" :class="remainingPosts > 0 || userPlan?.name?.toLowerCase() === 'admin' ? 'text-green-600' : 'text-red-600'">
                  {{ userPlan?.name?.toLowerCase() === 'admin' ? 'Unlimited' : remainingPosts }}
                </span>
              </div>
            </div>
          </div>
          <el-button v-if="!canPost || user?.planId === 'free'" type="primary" class="mt-4 w-full" @click="navigateTo('/pricing')">
            {{ user?.planId === 'free' ? 'Upgrade to Unlock Publishing' : 'Upgrade for More Posts' }}
          </el-button>
        </el-card>

        <el-form 
          :model="form" 
          :rules="rules" 
          ref="formRef" 
          label-position="top"
          :disabled="!canPost"
        >
          <el-form-item label="Title" prop="title">
            <el-input v-model="form.title" placeholder="Enter article title" />
          </el-form-item>

          <!-- Featured Image -->
          <el-form-item label="Featured Image" prop="image_url">
            <div class="image-selector-container">
              <div v-if="form.image_url" class="image-preview-wrapper mb-4">
                <img :src="form.image_url" alt="Featured Image Preview" class="image-preview" />
                <div class="image-overlay">
                  <el-button type="primary" circle @click="showMediaLibrary = true">
                    <el-icon><Edit /></el-icon>
                  </el-button>
                  <el-button type="danger" circle @click="form.image_url = ''">
                    <el-icon><Delete /></el-icon>
                  </el-button>
                </div>
              </div>
              <div v-else class="upload-placeholder" @click="showMediaLibrary = true">
                <el-icon class="upload-icon"><Plus /></el-icon>
                <span>Click to select or upload image</span>
              </div>
            </div>
            <el-input v-model="form.image_url" type="hidden" />
          </el-form-item>

          <!-- Media Library Dialog -->
          <MediaLibrary 
            v-model="showMediaLibrary" 
            @select="handleMediaSelect" 
          />

          <el-form-item label="Target Industry Subdomain" prop="siteId">
            <el-select v-model="form.siteId" placeholder="Select industry subdomain" class="w-full" :loading="!sites.length">
              <el-option 
                v-for="site in sites" 
                :key="site.id" 
                :label="site.subdomain" 
                :value="site.id" 
              />
            </el-select>
            <div class="mt-1 text-xs text-slate-500 italic">
              * Your article will be published to the selected industry subdomain site.
            </div>
          </el-form-item>

          <el-form-item label="Content" prop="content">
            <div ref="editorRef" class="editor-container"></div>
            <el-input v-model="form.content" type="hidden" />
          </el-form-item>

          <el-form-item class="mt-8">
            <el-button type="primary" size="large" :loading="submitting" @click="submitForm">
              Publish Article
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, Warning, Check, Plus, Edit, Delete } from '@element-plus/icons-vue'
import { useAuth } from '~/composables/useAuth'

const { user } = useAuth()
const formRef = ref()
const editorRef = ref()
const submitting = ref(false)
const showMediaLibrary = ref(false)
let quill: any = null

useHead({
  link: [
    { rel: 'stylesheet', href: 'https://cdn.quilljs.com/1.3.6/quill.snow.css' }
  ],
  script: [
    { src: 'https://cdn.quilljs.com/1.3.6/quill.min.js' }
  ]
})

const { data: dashboardData } = await useAsyncData('dashboard-stats', () => 
  $fetch('/api/dashboard/stats')
)

const { data: sitesData } = await useAsyncData('all-sites', () => 
  $fetch('/api/sites/all')
)

const userPlan = computed(() => dashboardData.value?.plan || { name: 'Free', limit: 0 })
const remainingPosts = computed(() => Number(dashboardData.value?.user?.remainingPosts || 0))
const sites = computed(() => sitesData.value?.sites || [])

const form = reactive({
  title: '',
  image_url: '',
  siteId: '',
  content: ''
})

const rules = {
  title: [{ required: true, message: 'Title is required', trigger: 'blur' }],
  siteId: [{ required: true, message: 'Target selection is required', trigger: 'change' }],
  content: [{ required: true, message: 'Content is required', trigger: 'blur' }]
}

onMounted(() => {
  // Wait for Quill script to load
  const initQuill = () => {
    if (typeof (window as any).Quill !== 'undefined') {
      quill = new (window as any).Quill(editorRef.value, {
        modules: {
          toolbar: [
            [{ font: [] }, { size: [] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ color: [] }, { background: [] }],
            [{ script: 'super' }, { script: 'sub' }],
            [{ header: '1' }, { header: '2' }, 'blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            [{ direction: 'rtl' }, { align: [] }],
            ['link', 'image', 'video', 'formula'],
            ['clean']
          ]
        },
        placeholder: 'Write your article content here...',
        theme: 'snow'
      })

      quill.on('text-change', () => {
        form.content = quill.root.innerHTML
        if (form.content === '<p><br></p>') form.content = ''
      })
    } else {
      setTimeout(initQuill, 100)
    }
  }
  initQuill()
})

const canPost = computed(() => {
  if (!user.value) return false
  const role = user.value.role?.toLowerCase()
  if (role === 'admin') return true
  if (remainingPosts.value <= 0) return false
  return true
})

const currentLimit = computed(() => {
  const name = userPlan.value.name || 'Free'
  return `${name} Plan`
})

const handleMediaSelect = (media: { url: string; alt: string; token?: string }) => {
  // Use cloud token if available, otherwise fallback to URL
  if (media.token) {
    form.image_url = media.token
  } else if (media.url && !media.url.startsWith('data:')) {
    // Only use URL if it's not a base64 Data URL
    form.image_url = media.url
  } else {
    // If it's base64 and no token, we warn or reset
    form.image_url = ''
    ElMessage.warning('This image is not yet available in the cloud. Please re-upload it.')
  }
  showMediaLibrary.value = false
}

const submitForm = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      submitting.value = true
      try {
        const payload = { ...form }
        // Ensure we send the token if it's available, otherwise fallback to URL
        // In this flow, form.image_url now holds either the token or the URL
        
        await $fetch('/api/news/create', {
          method: 'POST',
          body: payload
        })
        ElMessage.success('Article published successfully!')
        navigateTo('/dashboard')
      } catch (error: any) {
        ElMessage.error(error.message || 'Failed to publish article')
      } finally {
        submitting.value = false
      }
    }
  })
}

definePageMeta({
  middleware: 'auth'
})
</script>

<style scoped>
.new-post-page {
  background: white;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .container {
    padding-left: 20px;
    padding-right: 20px;
  }
}

.max-w-3xl { max-width: 48rem; }
.mx-auto { margin-left: auto; margin-right: auto; }
.mb-4 { margin-bottom: 1rem; }
.mb-8 { margin-bottom: 2rem; }
.mt-4 { margin-top: 1rem; }
.mt-8 { margin-top: 2rem; }
.text-3xl { font-size: 1.875rem; }
.font-bold { font-weight: 700; }
.text-slate-900 { color: #0f172a; }
.w-full { width: 100%; }

.limit-warning {
  background: #fffbeb;
  border: 1px solid #fde68a;
}

.editor-container {
  height: 400px;
  width: 100%;
}

:deep(.ql-editor) {
  min-height: 300px;
  font-size: 16px;
  color: #1e293b;
}

:deep(.ql-toolbar.ql-snow) {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background: #f8fafc;
}

:deep(.ql-container.ql-snow) {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

/* Image Selector Styles */
.image-selector-container {
  width: 100%;
}

.image-preview-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

.image-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  opacity: 0;
  transition: opacity 0.2s;
}

.image-preview-wrapper:hover .image-overlay {
  opacity: 1;
}

.upload-placeholder {
  width: 100%;
  aspect-ratio: 16/9;
  border: 2px dashed #e2e8f0;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  cursor: pointer;
  color: #64748b;
  transition: all 0.2s;
}

.upload-placeholder:hover {
  border-color: #3b82f6;
  background: #f8fafc;
  color: #3b82f6;
}

.upload-icon {
  font-size: 2rem;
}
</style>
