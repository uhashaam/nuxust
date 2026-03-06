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
      ElMessage.error(error.data?.statusMessage || 'Failed to send reset code')
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
      ElMessage.error(error.data?.statusMessage || 'Failed to reset password')
    } finally {
      isLoading.value = false
    }
  })
}

definePageMeta({ layout: 'default' })
</script>

<style scoped>
.auth-container {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fff7ed 0%, #f8fafc 100%);
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

.success-state {
  text-align: center;
}

.success-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.auth-footer {
  margin-top: 1.5rem;
  text-align: center;
}

.auth-footer a {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
}
</style>
