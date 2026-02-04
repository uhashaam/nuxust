<template>
  <div class="page-container">
      <div class="page-header">
        <div class="header-content">
          <h2>News Management</h2>
          <p>Create, edit, and organize your news articles</p>
        </div>
        <el-button type="primary" @click="handleCreate">
          ➕ Create New Article
        </el-button>
      </div>

      <el-card class="table-card" shadow="never">
        <el-table :data="newsList" style="width: 100%" v-loading="loading">
          <el-table-column label="Image" width="120">
            <template #default="{ row }">
              <el-image
                :src="row.image || '/images/news-placeholder.jpg'"
                class="news-thumb"
                fit="cover"
              >
                <template #error>
                  <div class="image-slot">
                    <el-icon><Picture /></el-icon>
                  </div>
                </template>
              </el-image>
            </template>
          </el-table-column>
          
          <el-table-column prop="title" label="Title" min-width="250" show-overflow-tooltip />
          
          <el-table-column prop="category" label="Category" width="150" />
          
          <el-table-column prop="publishedAt" label="Published Date" width="160" />
          
          <el-table-column label="Status" width="120">
            <template #default="{ row }">
              <el-tag :type="row.featured ? 'success' : 'info'" size="small">
                {{ row.featured ? 'Featured' : 'Standard' }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column label="Actions" width="180" fixed="right">
            <template #default="{ row }">
              <el-button-group>
                <el-button size="small" @click="handleEdit(row.id)">
                  Edit
                </el-button>
                <el-button size="small" type="danger" @click="handleDelete(row.id)">
                  Delete
                </el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useNews } from '~/composables/useNews'
import { navigateTo } from 'nuxt/app'
import { Picture } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const { newsList, deleteNews } = useNews()
const loading = ref(false)

const handleCreate = () => {
  navigateTo('/admin/news/new')
}

const handleEdit = (id: string) => {
  navigateTo(`/admin/news/${id}`)
}

const handleDelete = async (id: string) => {
  try {
    await ElMessageBox.confirm(
      'Are you sure you want to delete this news article?',
      'Warning',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }
    )
    deleteNews(id)
    ElMessage.success('Deleted successfully')
  } catch {
    // Cancelled
  }
}
</script>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.page-header h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
}

.page-header p {
  margin: 0;
  color: #64748b;
}

.table-card {
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.news-thumb {
  width: 80px;
  height: 60px;
  border-radius: 8px;
  background: #f1f5f9;
}

.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #94a3b8;
  font-size: 20px;
}

:deep(.el-table__header) {
  background-color: #f8fafc;
}
</style>
