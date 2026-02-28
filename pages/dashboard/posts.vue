<template>
  <div class="posts-page">
    <div class="container py-12">
      <div class="max-w-4xl mx-auto">
        <el-button link @click="navigateTo('/dashboard')" class="mb-4">
          <el-icon><ArrowLeft /></el-icon> Back to Dashboard
        </el-button>
        
        <div class="flex items-center justify-between mb-8">
          <h1 class="text-3xl font-bold text-slate-900">My Published Posts</h1>
          <el-button type="primary" @click="navigateTo('/dashboard/new-post')">Create New Post</el-button>
        </div>

        <el-card class="posts-card">
          <div v-if="pending" class="py-12 text-center">
            <el-skeleton :rows="10" animated />
          </div>
          
          <div v-else-if="posts.length === 0" class="py-12 text-center">
            <el-empty description="You haven't published any news yet." />
          </div>

          <div v-else class="post-list">
            <div v-for="post in posts" :key="post.id" class="post-item">
              <div class="post-main">
                <h4 class="post-title">{{ post.title }}</h4>
                <div class="post-meta">
                  <span>{{ post.date }}</span>
                  <span class="divider">•</span>
                  <el-tag size="small" :type="post.status === 'Published' ? 'success' : 'info'">
                    {{ post.status || 'Published' }}
                  </el-tag>
                </div>
              </div>
              <div class="post-actions">
                <el-button link type="primary">Edit</el-button>
                <el-button link type="danger" @click="handleDelete(post.id)">Delete</el-button>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft } from '@element-plus/icons-vue'

const { data: dashboardData, pending, refresh } = await useAsyncData('dashboard-stats-full', () => 
  $fetch('/api/dashboard/stats')
)

const posts = computed(() => dashboardData.value?.posts || [])

const handleDelete = async (postId: string) => {
  try {
    await ElMessageBox.confirm(
      'Are you sure you want to delete this post?',
      'Warning',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }
    )
    
    await $fetch('/api/news/delete', {
      method: 'POST',
      body: { id: postId }
    })
    
    ElMessage.success('Post deleted successfully')
    await refresh()
  } catch (error: any) {
    if (error !== 'cancel') {
      ElMessage.error(error.message || 'Failed to delete post')
    }
  }
}

definePageMeta({
  middleware: 'auth'
})
</script>

<style scoped>
.posts-page {
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

.max-w-4xl { max-width: 56rem; }
.mx-auto { margin-left: auto; margin-right: auto; }
.mb-4 { margin-bottom: 1rem; }
.mb-8 { margin-bottom: 2rem; }
.text-3xl { font-size: 1.875rem; }
.font-bold { font-weight: 700; }
.text-slate-900 { color: #0f172a; }

.post-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
  border-bottom: 1px solid #f1f5f9;
}

.post-item:last-child {
  border-bottom: none;
}

.post-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.5rem;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: #64748b;
}

.divider {
  color: #cbd5e1;
}
</style>
