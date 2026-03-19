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
  padding: 3.5rem;
  border-radius: 24px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(226, 232, 240, 0.8);
  width: 100%;
  max-width: 500px;
  position: relative;
  z-index: 2;
  animation: slideUp 0.5s ease-out;
}
@keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

.step-header { text-align: center; margin-bottom: 2.5rem; }

.step-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: inline-block;
  padding: 1rem;
  background: linear-gradient(135deg, #e0e7ff 0%, #ede9fe 100%);
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.15);
}

h2 {
  font-size: 2.25rem;
  font-weight: 900;
  color: #0f172a;
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
}

.subtitle { color: #64748b; line-height: 1.6; font-size: 1.05rem; }

:deep(.el-form-item) { margin-bottom: 1.5rem; }
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
  margin-top: 1rem;
}
.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 30px -5px rgba(79, 70, 229, 0.5);
  filter: brightness(1.1);
}

.code-input :deep(.el-input__inner) {
  text-align: center; font-size: 1.5rem; letter-spacing: 12px; font-weight: 800; color: #4f46e5;
}

.resend-row {
  display: flex; align-items: center; justify-content: center; gap: 0.5rem;
  margin-top: 1.5rem; font-size: 0.95rem; color: #64748b; font-weight: 500;
}
.resend-row :deep(.el-button) { font-weight: 700; color: #4f46e5; }

.back-row { text-align: center; margin-top: 1rem; }
.back-row :deep(.el-button) { color: #64748b; font-weight: 600; font-size: 0.95rem; }
.back-row :deep(.el-button:hover) { color: #0f172a; }

.auth-footer { margin-top: 2.5rem; text-align: center; color: #64748b; font-size: 1.05rem; }
.auth-footer a { color: #4f46e5; text-decoration: none; font-weight: 800; margin-left: 0.25rem; }
.auth-footer a:hover { text-decoration: underline; color: #3730a3; }

@media (max-width: 768px) {
  .auth-card { padding: 2.5rem 2rem; }
  h2 { font-size: 1.875rem; }
}
</style>
