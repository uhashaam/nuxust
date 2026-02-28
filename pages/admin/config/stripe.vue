<template>
  <div class="config-page">
    <div class="page-header">
      <h2>Stripe Payment Configuration</h2>
      <p>Configure your Stripe API keys and Webhook secrets for handling subscription upgrades</p>
    </div>

      <form class="config-form" @submit.prevent="handleSave">
        <!-- Loading State -->
        <div v-if="pending" class="loading-state">
            <el-skeleton :rows="4" animated />
        </div>
        
        <div v-else>
            <div class="form-section">
            <h3>API Credentials</h3>
            <div class="form-grid">
                <div class="form-group full-width">
                <label for="stripePublishableKey">Publishable Key</label>
                <input
                    id="stripePublishableKey"
                    v-model="formData.stripe_publishable_key"
                    type="text"
                    placeholder="pk_test_... or pk_live_..."
                />
                <small>Used for frontend Stripe elements if needed in the future.</small>
                </div>

                <div class="form-group full-width">
                <label for="stripeSecretKey">Secret Key *</label>
                <input
                    id="stripeSecretKey"
                    v-model="formData.stripe_secret_key"
                    type="password"
                    required
                    placeholder="Enter Secret Key (leave as ******** to keep current)"
                />
                <small>Critical: Keeps this absolutely secure. Example: sk_test_... or sk_live_...</small>
                </div>
            </div>
            </div>

            <div class="form-section">
            <h3>Webhook Security</h3>
            <div class="form-grid">
                <div class="form-group full-width">
                <label for="stripeWebhookSecret">Webhook Signing Secret *</label>
                <input
                    id="stripeWebhookSecret"
                    v-model="formData.stripe_webhook_secret"
                    type="password"
                    required
                    placeholder="Enter Webhook Secret (leave as ******** to keep current)"
                />
                <small>Required to verify that payment confirmations actually come from Stripe. Example: whsec_...</small>
                </div>
            </div>
            </div>

            <div class="form-actions">
            <button type="submit" class="btn-primary" :disabled="isSaving">
                {{ isSaving ? 'Saving...' : '💳 Save Stripe Credentials' }}
            </button>
            </div>
        </div>
      </form>

      <div v-if="saveMessage" class="save-notification" :class="{ success: saveSuccess }">
        {{ saveMessage }}
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const formData = ref({
    stripe_publishable_key: '',
    stripe_secret_key: '',
    stripe_webhook_secret: ''
})

const saveMessage = ref('')
const saveSuccess = ref(false)
const isSaving = ref(false)

// Fetch initial data
const { data, pending } = await useFetch('/api/admin/stripe')

if (data.value && data.value.config) {
    formData.value = { ...formData.value, ...data.value.config }
}

const handleSave = async () => {
  isSaving.value = true
  try {
      await $fetch('/api/admin/stripe', {
          method: 'POST',
          body: formData.value
      })

      saveMessage.value = 'Stripe Configuration saved successfully!'
      saveSuccess.value = true
  } catch (err: any) {
      saveMessage.value = err.message || 'Failed to save configuration.'
      saveSuccess.value = false
  } finally {
      isSaving.value = false
      setTimeout(() => {
        saveMessage.value = ''
      }, 3000)
  }
}
</script>

<style scoped>
.config-page {
  max-width: 900px;
}

.page-header {
  margin-bottom: 2rem;
}

.page-header h2 {
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
}

.page-header p {
  margin: 0;
  color: #64748b;
  font-size: 1rem;
}

.config-form {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.form-section {
  margin-bottom: 2.5rem;
  padding-bottom: 2.5rem;
  border-bottom: 2px solid #f1f5f9;
}

.form-section:last-of-type {
  border-bottom: none;
}

.form-section h3 {
  margin: 0 0 1.5rem 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #334155;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.form-section h3::before {
  content: '';
  width: 4px;
  height: 1.5rem;
  background: linear-gradient(180deg, #6366f1 0%, #4f46e5 100%);
  border-radius: 2px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

label {
  font-weight: 600;
  color: #475569;
  font-size: 0.875rem;
}

input {
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
  background: white;
}

input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

small {
  font-size: 0.75rem;
  color: #64748b;
  font-style: italic;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px solid #f1f5f9;
}

button {
  padding: 0.875rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary {
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  box-shadow: 0 4px 6px rgba(99, 102, 241, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(99, 102, 241, 0.4);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.save-notification {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 1rem 1.5rem;
  background: #ef4444;
  color: white;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  font-weight: 600;
  animation: slideIn 0.3s ease;
  z-index: 1000;
}

.save-notification.success {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

@keyframes slideIn {
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
