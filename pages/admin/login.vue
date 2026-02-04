<template>
  <div class="login-container">
    <div class="login-background">
      <div class="floating-blobs">
        <div class="blob blob-1"></div>
        <div class="blob blob-2"></div>
      </div>
    </div>
    
    <el-card class="login-card" shadow="always">
      <template #header>
        <div class="login-header">
          <div class="logo-circle">📑</div>
          <h1>Admin Portal</h1>
          <p>Please enter your credentials to continue</p>
        </div>
      </template>
      
      <el-form :model="form" @submit.prevent="handleLogin" label-position="top">
        <el-form-item label="Admin Password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="Enter password"
            show-password
            size="large"
            :prefix-icon="Lock"
          />
        </el-form-item>
        
        <div class="form-footer">
          <el-button
            type="primary"
            class="login-btn"
            size="large"
            native-type="submit"
            :loading="loading"
          >
            Authenticate
          </el-button>
        </div>
        
        <el-alert
          v-if="error"
          :title="error"
          type="error"
          show-icon
          :closable="false"
          class="error-alert"
        />
      </el-form>
      
      <div class="card-footer">
        <el-button link @click="navigateTo('/')">← Back to Main Site</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { navigateTo } from 'nuxt/app'
import { Lock } from '@element-plus/icons-vue'

definePageMeta({
  layout: false
})

const { login } = useAuth()
const loading = ref(false)
const error = ref('')

const form = reactive({
  password: ''
})

const handleLogin = async () => {
  if (!form.password) {
    error.value = 'Password is required'
    return
  }
  
  loading.value = true
  error.value = ''
  
  // Artificial delay for professional feel
  await new Promise(resolve => setTimeout(resolve, 800))
  
  const success = login(form.password)
  
  if (success) {
    navigateTo('/admin')
  } else {
    error.value = 'Invalid administrative password'
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8fafc;
  position: relative;
  overflow: hidden;
  padding: 2rem;
}

.login-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.floating-blobs {
  position: relative;
  width: 100%;
  height: 100%;
}

.blob {
  position: absolute;
  width: 500px;
  height: 500px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%);
  filter: blur(80px);
  border-radius: 50%;
  animation: drift 20s infinite alternate ease-in-out;
}

.blob-1 {
  top: -100px;
  right: -100px;
}

.blob-2 {
  bottom: -150px;
  left: -100px;
  animation-duration: 25s;
  animation-delay: -5s;
}

@keyframes drift {
  from { transform: translate(0, 0) scale(1); }
  to { transform: translate(40px, 40px) scale(1.1); }
}

.login-card {
  width: 100%;
  max-width: 440px;
  position: relative;
  z-index: 1;
  border-radius: 16px;
  border: none;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1);
}

.login-header {
  text-align: center;
  padding: 1rem 0;
}

.logo-circle {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  margin: 0 auto 1.5rem;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  box-shadow: 0 8px 16px -4px rgba(99, 102, 241, 0.4);
}

.login-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 1.75rem;
  font-weight: 800;
  color: #1e293b;
}

.login-header p {
  margin: 0;
  color: #64748b;
  font-size: 0.95rem;
}

.login-btn {
  width: 100%;
  height: 48px;
  border-radius: 10px;
  font-weight: 700;
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  border: none;
}

.login-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.error-alert {
  margin-top: 1.5rem;
}

.card-footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #f1f5f9;
}

:deep(.el-form-item__label) {
  font-weight: 600;
  color: #475569;
}

:deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px #e2e8f0 inset;
  border-radius: 10px;
  padding: 0.5rem 1rem;
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #6366f1 inset !important;
}
</style>
