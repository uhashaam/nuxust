
<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>Welcome Back</h2>
      <p class="subtitle">Sign in to your account</p>

      <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
        <el-form-item label="Email Address" prop="email">
          <el-input v-model="form.email" type="email" placeholder="Enter email" />
        </el-form-item>

        <el-form-item label="Password" prop="password">
          <el-input v-model="form.password" type="password" show-password placeholder="Enter password" />
        </el-form-item>

        <div class="remember-forgot">
          <el-checkbox v-model="form.remember">Remember me</el-checkbox>
          <!-- <NuxtLink to="/forgot-password">Forgot password?</NuxtLink> -->
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
  email: '',
  password: '',
  remember: false
})

const rules = reactive<FormRules>({
  email: [
    { required: true, message: 'Please enter email', trigger: 'blur' },
    { type: 'email', message: 'Please enter valid email', trigger: 'blur' }
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
          email: form.email,
          password: form.password
        })
        
        // Redirect to intended page or dashboard
        const redirect = route.query.redirect as string || '/dashboard'
        navigateTo(redirect)
      } catch (error: any) {
        ElMessage.error(error.statusMessage || 'Login failed')
      }
    }
  })
}

definePageMeta({
  layout: 'default'
})
</script>

<style scoped>
.auth-container {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8fafc;
}

.auth-card {
  background: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  width: 100%;
  max-width: 480px;
}

h2 {
  font-size: 1.875rem;
  font-weight: 700;
  color: #0f172a;
  text-align: center;
  margin-bottom: 0.5rem;
}

.subtitle {
  text-align: center;
  color: #64748b;
  margin-bottom: 2rem;
}

.remember-forgot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.submit-btn {
  width: 100%;
}

.auth-footer {
  margin-top: 1.5rem;
  text-align: center;
  color: #64748b;
  font-size: 0.875rem;
}

.auth-footer a {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 600;
}

.auth-footer a:hover {
  text-decoration: underline;
}
</style>
