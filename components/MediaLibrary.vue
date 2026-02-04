<template>
  <el-dialog
    v-model="visible"
    title="Media Library"
    width="80%"
    top="5vh"
    append-to-body
    class="media-dialog"
  >
    <div class="media-container">
      <div class="media-sidebar">
        <el-upload
          class="media-uploader"
          action="#"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="handleUpload"
        >
          <el-button type="primary" :icon="Plus">Upload New</el-button>
        </el-upload>
        
        <div v-if="selectedItem" class="media-details">
          <h3>Asset Details</h3>
          <div class="detail-preview">
            <img :src="selectedItem.url" :alt="selectedItem.alt" />
          </div>
          <el-form label-position="top">
            <el-form-item label="Alt Text (SEO)">
              <el-input 
                v-model="selectedItem.alt" 
                type="textarea" 
                :rows="3" 
                @blur="updateMediaAlt"
                placeholder="Describe this image for search engines..."
              />
            </el-form-item>
            <div class="file-info">
              <p><strong>Name:</strong> {{ selectedItem.name }}</p>
              <p><strong>Type:</strong> {{ selectedItem.type }}</p>
              <p><strong>Size:</strong> {{ (selectedItem.size / 1024).toFixed(2) }} KB</p>
            </div>
          </el-form>
          <el-button type="danger" plain @click="handleDelete" :icon="Delete">Delete Asset</el-button>
        </div>
      </div>

      <div class="media-grid">
        <div 
          v-for="item in mediaList" 
          :key="item.id" 
          class="media-item"
          :class="{ active: selectedItem?.id === item.id }"
          @click="selectedItem = item"
        >
          <img :src="item.url" :alt="item.alt" />
          <div class="item-overlay">
            <el-icon v-if="selectedItem?.id === item.id"><Check /></el-icon>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="visible = false">Cancel</el-button>
        <el-button type="primary" @click="handleConfirm" :disabled="!selectedItem">
          Select Asset
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Plus, Delete, Check } from '@element-plus/icons-vue'
import { useMedia, type MediaItem } from '~/composables/useMedia'
import { ElMessageBox, ElMessage } from 'element-plus'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue', 'select'])

const visible = ref(props.modelValue)
const selectedItem = ref<MediaItem | null>(null)
const { mediaList, addMedia, updateMedia, deleteMedia } = useMedia()

watch(() => props.modelValue, (val) => {
  visible.value = val
})

watch(visible, (val) => {
  emit('update:modelValue', val)
})

const handleUpload = (file: any) => {
  const reader = new FileReader()
  reader.readAsDataURL(file.raw)
  reader.onload = () => {
    const newItem = addMedia({
      url: reader.result as string,
      name: file.name,
      alt: '',
      type: file.raw.type,
      size: file.raw.size
    })
    selectedItem.value = newItem
    ElMessage.success('Image uploaded to library')
  }
}

const updateMediaAlt = () => {
  if (selectedItem.value) {
    updateMedia(selectedItem.value.id, { alt: selectedItem.value.alt })
  }
}

const handleDelete = () => {
  if (!selectedItem.value) return
  ElMessageBox.confirm('Are you sure you want to delete this asset?', 'Warning', {
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
    type: 'warning'
  }).then(() => {
    deleteMedia(selectedItem.value!.id)
    selectedItem.value = null
    ElMessage.success('Asset deleted')
  })
}

const handleConfirm = () => {
  if (selectedItem.value) {
    emit('select', { 
      url: selectedItem.value.url, 
      alt: selectedItem.value.alt 
    })
    visible.value = false
  }
}
</script>

<style scoped>
.media-container {
  display: flex;
  gap: 2rem;
  height: 60vh;
}

.media-sidebar {
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border-right: 1px solid #e2e8f0;
  padding-right: 1.5rem;
  overflow-y: auto;
}

.media-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  padding: 0.5rem;
  overflow-y: auto;
}

.media-item {
  aspect-ratio: 1;
  position: relative;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid transparent;
  transition: all 0.2s;
}

.media-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.media-item.active {
  border-color: #3b82f6;
}

.media-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(59, 130, 246, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
}

.media-item.active .item-overlay {
  opacity: 1;
}

.media-item.active .item-overlay el-icon {
  font-size: 24px;
  color: #3b82f6;
  background: #fff;
  border-radius: 50%;
  padding: 4px;
}

.detail-preview {
  margin: 1rem 0;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  aspect-ratio: 16/9;
}

.detail-preview img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #f8fafc;
}

.file-info {
  font-size: 13px;
  color: #64748b;
  margin-bottom: 1.5rem;
}

.file-info p {
  margin: 4px 0;
}

.media-details h3 {
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  color: #1e293b;
}
</style>
