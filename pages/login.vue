
<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>Welcome Back</h2>
      <p class="subtitle">Sign in to your account</p>

      <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
        <el-form-item label="Email or Username" prop="identifier">
          <el-input v-model="form.identifier" placeholder="Enter email or username" />
        </el-form-item>

        <el-form-item label="Password" prop="password">
          <el-input v-model="form.password" type="password" show-password placeholder="Enter password" />
        </el-form-item>

        <div class="remember-forgot">
          <el-checkbox v-model="form.remember">Remember me</el-checkbox>
          <NuxtLink to="/forgot-password" class="forgot-link">Forgot password?</NuxtLink>
        </div>

        <el-button type="primary" size="large" class="submit-btn" :loading="isLoading" @click="handleLogin">
          Sign In
        </el-button>

        <div class="auth-footer">
          <p>Don't have an account? <NuxtLink to="/register">Register now</NuxtLink></p>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useAuth } from '~/composables/useAuth'
import type { FormInstance, FormRules } from 'element-plus'

const { login, isLoading } = useAuth()
const route = useRoute()
const formRef = ref<FormInstance>()

const form = reactive({
  identifier: '',
  password: '',
  remember: false
})

const rules = reactive<FormRules>({
  identifier: [
    { required: true, message: 'Please enter email or username', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Please enter password', trigger: 'blur' }
  ]
})

const handleLogin = async () => {
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        await login({
          identifier: form.identifier,
          password: form.password
        })
        
        // Redirect to intended page or dashboard
        const redirect = route.query.redirect as string || '/dashboard'
        navigateTo(redirect)
      } catch (error: any) {
        const msg = error.data?.statusMessage || error.statusMessage || 'Login failed';
        ElMessage.error(msg);
      }
    }
  })
}

definePageMeta({
  layout: 'default'
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8fafc;
  background-image: radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.05), transparent 50%),
                    radial-gradient(circle at 90% 80%, rgba(168, 85, 247, 0.05), transparent 50%);
  font-family: 'Inter', -apple-system, sans-serif;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}
.auth-container::before {
  content: ''; position: absolute; top: -20%; right: -10%; width: 50vw; height: 50vw;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 60%);
  border-radius: 50%; pointer-events: none;
}

.auth-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 4rem 3.5rem;
  border-radius: 24px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(226, 232, 240, 0.8);
  width: 100%;
  max-width: 480px;
  position: relative;
  z-index: 2;
  animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }

h2 {
  font-size: 2.25rem;
  font-weight: 900;
  color: #0f172a;
  text-align: center;
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
}

.subtitle {
  text-align: center;
  color: #64748b;
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
}

:deep(.el-form-item) { margin-bottom: 1.75rem; }
:deep(.el-form-item__label) { font-weight: 700; color: #1e293b; padding-bottom: 0.5rem; }

:deep(.el-input__wrapper) {
  box-shadow: inset 0 0 0 1px #cbd5e1 !important;
  border-radius: 12px;
  background: #f8fafc;
  transition: all 0.3s ease;
  padding: 0.25rem 0.75rem;
}
:deep(.el-input__wrapper:hover) { box-shadow: inset 0 0 0 1px #94a3b8 !important; }
:deep(.el-input__wrapper.is-focus) { box-shadow: inset 0 0 0 2px #4f46e5 !important; background: white; }
:deep(.el-input__inner) { font-size: 1.05rem; height: 44px; color: #0f172a; }

.remember-forgot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0 2rem;
}

:deep(.el-checkbox__label) { color: #475569; font-weight: 500; }

.submit-btn {
  width: 100%;
  height: 56px;
  border-radius: 14px;
  font-size: 1.15rem;
  font-weight: 800;
  background: linear-gradient(135deg, #4f46e5 0%, #7e22ce 100%) !important;
  border: none !important;
  box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.4);
  transition: all 0.3s ease;
}
.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 30px -5px rgba(79, 70, 229, 0.5);
  filter: brightness(1.1);
}

.auth-footer {
  margin-top: 2.5rem;
  text-align: center;
  color: #64748b;
  font-size: 1.05rem;
}

.auth-footer a {
  color: #4f46e5;
  text-decoration: none;
  font-weight: 800;
  margin-left: 0.25rem;
}
.auth-footer a:hover { text-decoration: underline; color: #3730a3; }

.forgot-link {
  color: #4f46e5;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 600;
  transition: color 0.2s;
}
.forgot-link:hover { color: #3730a3; text-decoration: underline; }

@media (max-width: 768px) {
  .auth-card { padding: 3rem 2rem; }
  h2 { font-size: 1.875rem; }
}
</style>
