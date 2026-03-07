<template>
  <div class="auth-container">
    <div class="auth-card">
      <!-- Step 1: Registration Form -->
      <template v-if="step === 1">
        <div class="step-header">
          <h2>Create Account</h2>
          <p class="subtitle">Join the B2B Network</p>
        </div>

        <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
          <el-form-item label="Username" prop="username">
            <el-input v-model="form.username" placeholder="Enter username" id="reg-username" />
          </el-form-item>

          <el-form-item label="Email Address" prop="email">
            <el-input v-model="form.email" type="email" placeholder="Enter email" id="reg-email" />
          </el-form-item>

          <el-form-item label="Password" prop="password">
            <el-input v-model="form.password" type="password" show-password placeholder="Enter password (min 8 chars)" id="reg-password" />
          </el-form-item>

          <el-form-item label="Confirm Password" prop="confirmPassword">
            <el-input v-model="form.confirmPassword" type="password" show-password placeholder="Confirm password" id="reg-confirm-password" />
          </el-form-item>

          <el-button type="primary" size="large" class="submit-btn" :loading="isLoading" @click="handleSendCode" id="btn-send-code">
            Send Verification Code
          </el-button>

          <div class="auth-footer">
            <p>Already have an account? <NuxtLink to="/login">Login here</NuxtLink></p>
          </div>
        </el-form>
      </template>

      <!-- Step 2: Email Verification -->
      <template v-if="step === 2">
        <div class="step-header">
          <div class="step-icon">✉️</div>
          <h2>Verify Your Email</h2>
          <p class="subtitle">
            We sent a 6-digit code to<br/>
            <strong>{{ form.email }}</strong>
          </p>
        </div>

        <el-form label-position="top">
          <el-form-item label="Verification Code">
            <el-input
              v-model="verificationCode"
              placeholder="Enter 6-digit code"
              maxlength="6"
              size="large"
              class="code-input"
              id="reg-verification-code"
            />
          </el-form-item>

          <el-button type="primary" size="large" class="submit-btn" :loading="isLoading" @click="handleRegister" id="btn-complete-registration">
            Complete Registration
          </el-button>

          <div class="resend-row">
            <span>Didn't receive the code?</span>
            <el-button link type="primary" :disabled="resendCooldown > 0" @click="handleSendCode" id="btn-resend-code">
              {{ resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code' }}
            </el-button>
          </div>

          <div class="back-row">
            <el-button link @click="step = 1" id="btn-back-to-form">← Back to form</el-button>
          </div>
        </el-form>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const step = ref(1)
const isLoading = ref(false)
const verificationCode = ref('')
const resendCooldown = ref(0)
const formRef = ref<FormInstance>()

const form = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const validatePass2 = (_rule: any, value: any, callback: any) => {
  if (value === '') callback(new Error('Please confirm password'))
  else if (value !== form.password) callback(new Error("Passwords don't match!"))
  else callback()
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

const startResendCountdown = () => {
  resendCooldown.value = 60
  const timer = setInterval(() => {
    resendCooldown.value--
    if (resendCooldown.value <= 0) clearInterval(timer)
  }, 1000)
}

const handleSendCode = async () => {
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (!valid) return
    isLoading.value = true
    try {
      await $fetch('/api/auth/send-registration-code', {
        method: 'POST',
        body: { email: form.email }
      })
      step.value = 2
      startResendCountdown()
      ElMessage.success('Verification code sent to your email!')
    } catch (error: any) {
      ElMessage.error(error.data?.message || error.data?.statusMessage || error.message || 'Failed to send verification code')
    } finally {
      isLoading.value = false
    }
  })
}

const route = useRoute()
const selectedPlan = computed(() => route.query.plan as string)

const handleRegister = async () => {
  if (!verificationCode.value || verificationCode.value.length !== 6) {
    ElMessage.error('Please enter the 6-digit verification code')
    return
  }
  isLoading.value = true
  try {
    await $fetch('/api/auth/register', {
      method: 'POST',
      body: {
        username: form.username,
        email: form.email,
        password: form.password,
        verificationCode: verificationCode.value,
        plan: selectedPlan.value || 'user'
      }
    })
    ElMessage.success('Account created successfully! Welcome aboard!')
    navigateTo('/dashboard')
  } catch (error: any) {
    ElMessage.error(error.data?.statusMessage || error.data?.message || error.message || 'Registration failed')
  } finally {
    isLoading.value = false
  }
}

definePageMeta({ layout: 'default' })
</script>

<style scoped>
.auth-container {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f0f4ff 0%, #f8fafc 100%);
  padding: 2rem 1rem;
}

.auth-card {
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 480px;
}

.step-header {
  text-align: center;
  margin-bottom: 2rem;
}

.step-icon {
  font-size: 3rem;
  margin-bottom: 0.75rem;
}

h2 {
  font-size: 1.875rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #64748b;
  line-height: 1.6;
}

.submit-btn {
  width: 100%;
  margin-top: 0.5rem;
}

.code-input :deep(.el-input__inner) {
  text-align: center;
  font-size: 1.5rem;
  letter-spacing: 6px;
  font-weight: 700;
}

.resend-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #64748b;
}

.back-row {
  text-align: center;
  margin-top: 0.5rem;
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
