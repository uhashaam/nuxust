<template>
  <div class="auth-container">
    <div class="auth-card">
      <!-- Step 1: Enter Email -->
      <template v-if="step === 1">
        <div class="step-header">
          <div class="step-icon">🔐</div>
          <h2>Forgot Password</h2>
          <p class="subtitle">Enter your email address and we'll send you a reset code</p>
        </div>

        <el-form ref="emailFormRef" :model="emailForm" :rules="emailRules" label-position="top">
          <el-form-item label="Email Address" prop="email">
            <el-input v-model="emailForm.email" type="email" placeholder="Enter your registered email" id="forgot-email" size="large" />
          </el-form-item>

          <el-button type="primary" size="large" class="submit-btn" :loading="isLoading" @click="handleSendReset" id="btn-send-reset">
            Send Reset Code
          </el-button>

          <div class="auth-footer">
            <NuxtLink to="/login">← Back to Login</NuxtLink>
          </div>
        </el-form>
      </template>

      <!-- Step 2: Enter Code & New Password -->
      <template v-if="step === 2">
        <div class="step-header">
          <div class="step-icon">✉️</div>
          <h2>Reset Password</h2>
          <p class="subtitle">Enter the code we sent to <strong>{{ emailForm.email }}</strong> and your new password</p>
        </div>

        <el-form ref="resetFormRef" :model="resetForm" :rules="resetRules" label-position="top">
          <el-form-item label="Verification Code" prop="code">
            <el-input v-model="resetForm.code" placeholder="Enter 6-digit code" maxlength="6" size="large" class="code-input" id="reset-code" />
          </el-form-item>

          <el-form-item label="New Password" prop="newPassword">
            <el-input v-model="resetForm.newPassword" type="password" show-password placeholder="Enter new password (min 8 chars)" id="reset-new-password" />
          </el-form-item>

          <el-form-item label="Confirm New Password" prop="confirmPassword">
            <el-input v-model="resetForm.confirmPassword" type="password" show-password placeholder="Confirm new password" id="reset-confirm-password" />
          </el-form-item>

          <el-button type="primary" size="large" class="submit-btn" :loading="isLoading" @click="handleResetPassword" id="btn-reset-password">
            Reset Password
          </el-button>

          <div class="resend-row">
            <span>Didn't receive the code?</span>
            <el-button link type="primary" :disabled="resendCooldown > 0" @click="handleSendReset" id="btn-resend-reset">
              {{ resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend' }}
            </el-button>
          </div>
        </el-form>
      </template>

      <!-- Step 3: Success -->
      <template v-if="step === 3">
        <div class="success-state">
          <div class="success-icon">✅</div>
          <h2>Password Reset!</h2>
          <p class="subtitle">Your password has been updated successfully.</p>
          <el-button type="primary" size="large" class="submit-btn" @click="navigateTo('/login')" id="btn-go-login">
            Go to Login
          </el-button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const step = ref(1)
const isLoading = ref(false)
const resendCooldown = ref(0)
const emailFormRef = ref<FormInstance>()
const resetFormRef = ref<FormInstance>()

const emailForm = reactive({ email: '' })
const resetForm = reactive({ code: '', newPassword: '', confirmPassword: '' })

const emailRules = reactive<FormRules>({
  email: [
    { required: true, message: 'Email is required', trigger: 'blur' },
    { type: 'email', message: 'Please enter a valid email', trigger: 'blur' }
  ]
})

const validateConfirm = (_rule: any, value: any, callback: any) => {
  if (value !== resetForm.newPassword) callback(new Error("Passwords don't match"))
  else callback()
}

const resetRules = reactive<FormRules>({
  code: [{ required: true, message: 'Verification code is required', trigger: 'blur' }],
  newPassword: [
    { required: true, message: 'New password is required', trigger: 'blur' },
    { min: 8, message: 'Password must be at least 8 characters', trigger: 'blur' }
  ],
  confirmPassword: [{ validator: validateConfirm, trigger: 'blur' }]
})

const startResendCountdown = () => {
  resendCooldown.value = 60
  const timer = setInterval(() => {
    resendCooldown.value--
    if (resendCooldown.value <= 0) clearInterval(timer)
  }, 1000)
}

const handleSendReset = async () => {
  if (!emailFormRef.value) return
  await emailFormRef.value.validate(async (valid) => {
    if (!valid) return
    isLoading.value = true
    try {
      await $fetch('/api/auth/forgot-password', {
        method: 'POST',
        body: { email: emailForm.email }
      })
      step.value = 2
      startResendCountdown()
      ElMessage.success('Reset code sent! Check your email.')
    } catch (error: any) {
      ElMessage.error(error.data?.message || error.data?.statusMessage || 'Failed to send reset code')
    } finally {
      isLoading.value = false
    }
  })
}

const handleResetPassword = async () => {
  if (!resetFormRef.value) return
  await resetFormRef.value.validate(async (valid) => {
    if (!valid) return
    isLoading.value = true
    try {
      await $fetch('/api/auth/reset-password', {
        method: 'POST',
        body: {
          email: emailForm.email,
          code: resetForm.code,
          newPassword: resetForm.newPassword
        }
      })
      step.value = 3
    } catch (error: any) {
      ElMessage.error(error.data?.message || error.data?.statusMessage || 'Failed to reset password')
    } finally {
      isLoading.value = false
    }
  })
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
  max-width: 480px;
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

.success-state { text-align: center; animation: slideUp 0.5s ease-out; }
.success-icon { font-size: 4.5rem; margin-bottom: 1.5rem; }

.auth-footer { margin-top: 2.5rem; text-align: center; font-size: 1.05rem; }
.auth-footer a { color: #4f46e5; text-decoration: none; font-weight: 700; }
.auth-footer a:hover { text-decoration: underline; color: #3730a3; }

@media (max-width: 768px) {
  .auth-card { padding: 2.5rem 2rem; }
  h2 { font-size: 1.875rem; }
}
</style>
