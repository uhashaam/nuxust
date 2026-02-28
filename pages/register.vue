
<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>Create Account</h2>
      <p class="subtitle">Join the B2B Network</p>

      <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
        <el-form-item label="Username" prop="username">
          <el-input v-model="form.username" placeholder="Enter username" />
        </el-form-item>

        <el-form-item label="Email Address" prop="email">
          <el-input v-model="form.email" type="email" placeholder="Enter email" />
        </el-form-item>

        <el-form-item label="Password" prop="password">
          <el-input v-model="form.password" type="password" show-password placeholder="Enter password" />
        </el-form-item>

        <el-form-item label="Confirm Password" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" type="password" show-password placeholder="Confirm password" />
        </el-form-item>

        <el-button type="primary" size="large" class="submit-btn" :loading="isLoading" @click="handleRegister">
          Register
        </el-button>

        <div class="auth-footer">
          <p>Already have an account? <NuxtLink to="/login">Login here</NuxtLink></p>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useAuth } from '~/composables/useAuth'
import type { FormInstance, FormRules } from 'element-plus'

const { register, isLoading } = useAuth()
const formRef = ref<FormInstance>()

const form = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please confirm password'))
  } else if (value !== form.password) {
    callback(new Error("Passwords don't match!"))
  } else {
    callback()
  }
}

const rules = reactive<FormRules>({
  username: [{ required: true, message: 'Please enter username', trigger: 'blur' }],
  email: [
    { required: true, message: 'Please enter email', trigger: 'blur' },
    { type: 'email', message: 'Please enter valid email', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Please enter password', trigger: 'blur' },
    { min: 8, message: 'Length should be at least 8 characters', trigger: 'blur' }
  ],
  confirmPassword: [{ validator: validatePass2, trigger: 'blur' }]
})

const route = useRoute()
const selectedPlan = computed(() => route.query.plan as string)

const handleRegister = async () => {
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        await register({
          username: form.username,
          email: form.email,
          password: form.password,
          plan: selectedPlan.value || 'user'
        })
        navigateTo('/dashboard')
      } catch (error: any) {
        ElMessage.error(error.statusMessage || 'Registration failed')
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

.submit-btn {
  width: 100%;
  margin-top: 1rem;
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
