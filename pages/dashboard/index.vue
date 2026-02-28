<template>
  <div class="dashboard-page">
    <div class="container py-12">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-slate-900">Personal Center</h1>
          <p class="text-slate-600">Welcome back, {{ user?.username }}</p>
        </div>
        <div class="flex gap-4">
          <el-button 
            v-if="user?.role?.toLowerCase() === 'admin'" 
            type="warning" 
            @click="navigateTo('/admin/news')"
          >
            Admin Panel
          </el-button>
          <el-button type="primary" @click="navigateTo('/dashboard/new-post')">Create New Post</el-button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Sidebar: Plan Info -->
        <div class="lg:col-span-1">
          <el-card class="plan-info-card">
            <template #header>
              <div class="card-header">
                <span class="font-bold">Member Plan</span>
                <el-tag :type="planColor">{{ userPlan?.name || 'Free' }}</el-tag>
              </div>
            </template>
            <div class="plan-details">
              <div class="detail-item">
                <span class="label">Status:</span>
                <span class="value capitalize text-green-600 font-semibold">{{ user?.status }}</span>
              </div>
              <div class="detail-item">
                <span class="label">Publishing Limit:</span>
                <div class="flex flex-col gap-1">
                  <span v-if="userPlan.dailyLimit > 0" class="value">{{ userPlan.dailyLimit }} articles/day</span>
                  <span v-if="userPlan.weeklyLimit > 0" class="value">{{ userPlan.weeklyLimit }} articles/week</span>
                  <span v-if="userPlan.dailyLimit === 0 && userPlan.weeklyLimit === 0 && userPlan.name !== 'Admin'" class="value text-slate-400">View Only</span>
                  <span v-if="userPlan.name === 'Admin'" class="value">Unlimited</span>
                </div>
              </div>
              <div class="detail-item">
                <span class="label">Weekly Usage:</span>
                <div class="usage-bar mt-2">
                  <el-progress :percentage="usagePercentage" :status="planColor" />
                  <p class="text-xs text-slate-500 mt-1">
                    {{ usedPosts }} of {{ weeklyLimit }} articles used
                  </p>
                  <div class="remaining-posts mt-4 p-3 bg-slate-50 border border-slate-100 rounded-lg">
                    <span class="text-xs text-slate-500 block uppercase tracking-wider font-bold mb-1">Remaining This Week</span>
                    <span class="text-2xl font-black text-slate-900">{{ remainingPosts }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-8">
              <el-button class="w-full" @click="navigateTo('/pricing')">Upgrade Plan</el-button>
            </div>
          </el-card>
        </div>

        <!-- Main: Recent Posts -->
        <div class="lg:col-span-2">
          <el-card class="posts-card">
            <template #header>
              <div class="flex items-center justify-between">
                <span class="font-bold">My Recent Posts</span>
                <el-button link @click="navigateTo('/dashboard/posts')">View All</el-button>
              </div>
            </template>
            
            <div v-if="loading" class="py-12 text-center">
              <el-skeleton :rows="5" animated />
            </div>
            
            <div v-else-if="posts.length === 0" class="py-12 text-center">
              <el-empty description="You haven't posted any news yet" />
            </div>

            <div v-else class="post-list">
              <div v-for="post in posts" :key="post.id" class="post-item">
                <div class="post-main">
                  <h4 class="post-title">{{ post.title }}</h4>
                  <div class="post-meta">
                    <span>{{ post.date }}</span>
                    <span class="divider">•</span>
                    <el-tag size="small" :type="post.status === 'published' ? 'success' : 'info'">
                      {{ post.status }}
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
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'

const { user } = useAuth()
const loading = ref(true)
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

const { data: dashboardData, pending: dashboardPending, refresh } = await useAsyncData('dashboard-stats', () => 
  $fetch('/api/dashboard/stats')
)

const posts = computed(() => dashboardData.value?.posts || [])
const usedPosts = ref(0) // Logic for used posts could be derived if needed

const userPlan = computed(() => dashboardData.value?.plan || { name: 'Free', dailyLimit: 0, weeklyLimit: 0 })
const weeklyLimit = computed(() => Number(userPlan.value.weeklyLimit || 0))
const totalLimit = weeklyLimit // for compatibility
const remainingPosts = computed(() => Number(dashboardData.value?.user?.remainingPosts || 0))

const usagePercentage = computed(() => {
  const planName = userPlan.value.name?.toLowerCase()
  if (weeklyLimit.value === 0) return 0
  if (planName === 'admin') return 0
  const used = Math.max(0, weeklyLimit.value - remainingPosts.value)
  usedPosts.value = used
  return Math.min(100, (used / weeklyLimit.value) * 100)
})

const planColor = computed(() => {
  const planName = userPlan.value.name?.toLowerCase() || ''
  if (planName === 'admin') return 'primary'
  if (planName.includes('vip4')) return 'danger'
  if (planName.includes('vip3')) return 'danger'
  if (planName.includes('vip2')) return 'warning'
  if (planName.includes('vip1')) return 'success'
  return 'info'
})

onMounted(() => {
  loading.value = false
})

definePageMeta({
  middleware: 'auth'
})
</script>

<style scoped>
.dashboard-page {
  background: #f8fafc;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
}

.detail-item .label {
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 0.25rem;
}

.detail-item .value {
  font-weight: 600;
  color: #0f172a;
}

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
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.5rem;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.8125rem;
  color: #64748b;
}

.divider {
  color: #cbd5e1;
}

.capitalize { text-transform: capitalize; }
.w-full { width: 100%; }
.mt-8 { margin-top: 2rem; }
.py-12 { padding-top: 3rem; padding-bottom: 3rem; }
.text-center { text-align: center; }
.mb-8 { margin-bottom: 2rem; }
.text-3xl { font-size: 1.875rem; }
.font-bold { font-weight: 700; }
.text-slate-900 { color: #0f172a; }
.text-slate-600 { color: #475569; }
.grid { display: grid; }
.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.gap-8 { gap: 2rem; }

@media (min-width: 1024px) {
  .lg\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .lg\:col-span-1 { grid-column: span 1 / span 1; }
  .lg\:col-span-2 { grid-column: span 2 / span 2; }
}

.flex { display: flex; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.mb-4 { margin-bottom: 1rem; }
.mt-2 { margin-top: 0.5rem; }
.mt-1 { margin-top: 0.25rem; }
.text-xs { font-size: 0.75rem; }
.text-slate-500 { color: #64748b; }
.text-green-600 { color: #16a34a; }
.font-semibold { font-weight: 600; }
</style>
