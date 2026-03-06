<template>
  <div class="coupons-page">
    <div class="page-header">
      <h1>Coupon Distribution</h1>
      <p class="subtitle">Send promotional coupons to users via email</p>
    </div>

    <div class="tabs-wrapper">
      <el-tabs v-model="activeTab" type="border-card">
        <!-- Bulk Distribution Tab -->
        <el-tab-pane label="📢 Bulk Distribution" name="bulk">
          <div class="tab-content">
            <div class="section-info">
              <h3>Bulk Send by User Type</h3>
              <p>Automatically send a coupon to all users matching a specific plan tier.</p>
            </div>

            <el-form ref="bulkFormRef" :model="bulkForm" :rules="bulkRules" label-position="top" class="dist-form">
              <el-form-item label="Target User Type" prop="userType">
                <el-select v-model="bulkForm.userType" placeholder="Select user type" style="width: 100%" id="bulk-user-type">
                  <el-option label="All Users" value="all" />
                  <el-option label="VIP 1" value="vip1" />
                  <el-option label="VIP 2" value="vip2" />
                  <el-option label="VIP 3" value="vip3" />
                  <el-option label="VIP 4" value="vip4" />
                  <el-option label="Regular Users" value="user" />
                </el-select>
              </el-form-item>

              <el-form-item label="Coupon Code" prop="couponCode">
                <el-input v-model="bulkForm.couponCode" placeholder="e.g. SUMMER30" id="bulk-coupon-code" />
              </el-form-item>

              <div class="two-col">
                <el-form-item label="Discount (%)">
                  <el-input-number v-model="bulkForm.discountPercent" :min="0" :max="100" placeholder="e.g. 30" style="width: 100%" id="bulk-discount" />
                </el-form-item>
                <el-form-item label="Valid Until">
                  <el-date-picker v-model="bulkForm.expiryDate" type="date" placeholder="Pick a date" style="width: 100%" id="bulk-expiry" value-format="YYYY-MM-DD" />
                </el-form-item>
              </div>

              <el-form-item label="Custom Message (Optional)">
                <el-input v-model="bulkForm.message" type="textarea" :rows="3" placeholder="Add a personal message to the email..." id="bulk-message" />
              </el-form-item>

              <el-button type="primary" size="large" :loading="bulkLoading" @click="handleBulkSend" id="btn-bulk-send">
                Send to All Matching Users
              </el-button>
            </el-form>

            <div v-if="bulkResult" class="result-card" :class="bulkResult.success ? 'success' : 'error'">
              <p>✅ Sent to <strong>{{ bulkResult.sent }}</strong> / {{ bulkResult.targeted }} users
                <span v-if="bulkResult.errors > 0" class="error-note">({{ bulkResult.errors }} failed)</span>
              </p>
            </div>
          </div>
        </el-tab-pane>

        <!-- Manual Distribution Tab -->
        <el-tab-pane label="🎯 Manual Distribution" name="manual">
          <div class="tab-content">
            <div class="section-info">
              <h3>Send to Specific User</h3>
              <p>Enter a user's email or username to send them a targeted coupon.</p>
            </div>

            <el-form ref="manualFormRef" :model="manualForm" :rules="manualRules" label-position="top" class="dist-form">
              <el-form-item label="User Email or Username" prop="userId">
                <el-input v-model="manualForm.userId" placeholder="user@example.com or username" id="manual-user-id" />
              </el-form-item>

              <el-form-item label="Coupon Code" prop="couponCode">
                <el-input v-model="manualForm.couponCode" placeholder="e.g. VIP2025" id="manual-coupon-code" />
              </el-form-item>

              <div class="two-col">
                <el-form-item label="Discount (%)">
                  <el-input-number v-model="manualForm.discountPercent" :min="0" :max="100" style="width: 100%" id="manual-discount" />
                </el-form-item>
                <el-form-item label="Valid Until">
                  <el-date-picker v-model="manualForm.expiryDate" type="date" placeholder="Pick a date" style="width: 100%" id="manual-expiry" value-format="YYYY-MM-DD" />
                </el-form-item>
              </div>

              <el-form-item label="Personal Message (Optional)">
                <el-input v-model="manualForm.message" type="textarea" :rows="3" placeholder="Add a personal note..." id="manual-message" />
              </el-form-item>

              <el-button type="primary" size="large" :loading="manualLoading" @click="handleManualSend" id="btn-manual-send">
                Send Coupon
              </el-button>
            </el-form>

            <div v-if="manualResult" class="result-card" :class="manualResult.success ? 'success' : 'error'">
              <p>{{ manualResult.success ? '✅' : '❌' }} {{ manualResult.message }}</p>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

definePageMeta({ layout: 'default', middleware: ['auth'] })

const activeTab = ref('bulk')

// Bulk form
const bulkFormRef = ref<FormInstance>()
const bulkLoading = ref(false)
const bulkResult = ref<any>(null)
const bulkForm = reactive({
  userType: '',
  couponCode: '',
  discountPercent: 0,
  expiryDate: '',
  message: ''
})
const bulkRules: FormRules = {
  userType: [{ required: true, message: 'Please select a user type', trigger: 'change' }],
  couponCode: [{ required: true, message: 'Coupon code is required', trigger: 'blur' }]
}

// Manual form
const manualFormRef = ref<FormInstance>()
const manualLoading = ref(false)
const manualResult = ref<any>(null)
const manualForm = reactive({
  userId: '',
  couponCode: '',
  discountPercent: 0,
  expiryDate: '',
  message: ''
})
const manualRules: FormRules = {
  userId: [{ required: true, message: 'User email or username is required', trigger: 'blur' }],
  couponCode: [{ required: true, message: 'Coupon code is required', trigger: 'blur' }]
}

const handleBulkSend = async () => {
  if (!bulkFormRef.value) return
  await bulkFormRef.value.validate(async (valid) => {
    if (!valid) return
    bulkLoading.value = true
    bulkResult.value = null
    try {
      const result = await $fetch('/api/admin/coupons/bulk-send', {
        method: 'POST',
        body: bulkForm
      })
      bulkResult.value = result
      ElMessage.success(`Coupon sent to ${(result as any).sent} users!`)
    } catch (error: any) {
      ElMessage.error(error.data?.message || 'Failed to send coupons')
    } finally {
      bulkLoading.value = false
    }
  })
}

const handleManualSend = async () => {
  if (!manualFormRef.value) return
  await manualFormRef.value.validate(async (valid) => {
    if (!valid) return
    manualLoading.value = true
    manualResult.value = null
    try {
      const result = await $fetch('/api/admin/coupons/manual-send', {
        method: 'POST',
        body: manualForm
      })
      manualResult.value = result
      ElMessage.success('Coupon sent successfully!')
    } catch (error: any) {
      manualResult.value = { success: false, message: error.data?.message || 'Failed to send coupon' }
      ElMessage.error(error.data?.message || 'Failed to send coupon')
    } finally {
      manualLoading.value = false
    }
  })
}
</script>

<style scoped>
.coupons-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

.page-header {
  margin-bottom: 2rem;
}

.page-header h1 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.25rem;
}

.subtitle {
  color: #64748b;
}

.tabs-wrapper {
  border-radius: 12px;
  overflow: hidden;
}

.tab-content {
  padding: 1.5rem 0.5rem;
}

.section-info {
  margin-bottom: 1.5rem;
}

.section-info h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 0.25rem;
}

.section-info p {
  color: #64748b;
  font-size: 0.875rem;
}

.dist-form {
  max-width: 600px;
}

.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.result-card {
  margin-top: 1.5rem;
  padding: 1rem 1.25rem;
  border-radius: 8px;
  font-weight: 500;
}

.result-card.success {
  background: #f0fdf4;
  border: 1px solid #86efac;
  color: #166534;
}

.result-card.error {
  background: #fef2f2;
  border: 1px solid #fca5a5;
  color: #991b1b;
}

.error-note {
  color: #dc2626;
  margin-left: 0.5rem;
}
</style>
