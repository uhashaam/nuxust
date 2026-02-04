<template>
  <div class="page-container">
      <div class="page-header">
        <div class="header-content">
          <h2>Product Management</h2>
          <p>Organize your products, prices, and categories</p>
        </div>
        <el-button type="primary" @click="handleCreate">
          ➕ Add New Product
        </el-button>
      </div>

      <el-card class="table-card" shadow="never">
        <el-table :data="productList" style="width: 100%" v-loading="loading">
          <el-table-column label="Image" width="100">
            <template #default="{ row }">
              <el-image
                :src="row.image || '/images/product-placeholder.jpg'"
                class="product-thumb"
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
          
          <el-table-column prop="name" label="Product Name" min-width="200" show-overflow-tooltip />
          
          <el-table-column prop="category" label="Category" width="140" />
          
          <el-table-column prop="price" label="Price" width="120">
            <template #default="{ row }">
              <span class="price-tag">${{ row.price.toLocaleString() }}</span>
            </template>
          </el-table-column>
          
          <el-table-column label="Featured" width="100" align="center">
            <template #default="{ row }">
              <el-icon v-if="row.featured" color="#eab308"><StarFilled /></el-icon>
              <el-icon v-else color="#94a3b8"><Star /></el-icon>
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
import { useProducts } from '~/composables/useProducts'
import { navigateTo } from 'nuxt/app'
import { Picture, Star, StarFilled } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const { productList, deleteProduct } = useProducts()
const loading = ref(false)

const handleCreate = () => {
  navigateTo('/admin/products/new')
}

const handleEdit = (id: string) => {
  navigateTo(`/admin/products/${id}`)
}

const handleDelete = async (id: string) => {
  try {
    await ElMessageBox.confirm(
      'Are you sure you want to delete this product?',
      'Warning',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }
    )
    deleteProduct(id)
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

.product-thumb {
  width: 60px;
  height: 60px;
  border-radius: 6px;
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

.price-tag {
  font-weight: 700;
  color: #10b981;
}

:deep(.el-table__header) {
  background-color: #f8fafc;
}
</style>
