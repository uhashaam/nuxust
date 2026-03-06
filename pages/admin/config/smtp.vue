<template>
  <div class="config-page">
    <div class="page-header">
      <h2>SMTP Email Configuration</h2>
      <p>Configure your outgoing email server settings for system notifications</p>
    </div>

      <form class="config-form" @submit.prevent="handleSave">
        <!-- Loading State -->
        <div v-if="pending" class="loading-state">
            <el-skeleton :rows="5" animated />
        </div>
        
        <div v-else>
            <div class="form-section">
            <h3>Mail Server Settings</h3>
            <div class="form-grid">
                <div class="form-group full-width" style="background: #f8fafc; padding: 16px; border-radius: 8px; border-left: 4px solid #3b82f6;">
                    <label for="resendApiKey" style="color: #1e40af; font-weight: 700;">Resend API Key (Recommended for Cloudflare)</label>
                    <input
                        id="resendApiKey"
                        v-model="formData.resend_api_key"
                        type="password"
                        placeholder="re_..."
                    />
                    <small style="margin-top: 4px; color: #475569;">Because Cloudflare blocks standard SMTP, using <a href="https://resend.com" target="_blank">Resend.com</a> is highly recommended. If provided, this will securely override standard SMTP.</small>
                </div>

                <div class="form-group full-width" style="margin-top: 1rem;">
                    <h4 style="margin: 0 0 10px 0; color: #64748b;">Or use Legacy SMTP (Works locally, fails on Cloudflare)</h4>
                </div>
                
                <div class="form-group full-width">
                <label for="smtpHost">SMTP Host Server *</label>
                <input
                    id="smtpHost"
                    v-model="formData.smtp_host"
                    type="text"
                    required
                    placeholder="e.g. smtp.gmail.com or smtp.resend.com"
                />
                </div>

                <div class="form-group">
                <label for="smtpPort">SMTP Port *</label>
                <input
                    id="smtpPort"
                    v-model="formData.smtp_port"
                    type="number"
                    required
                    placeholder="e.g. 465 or 587"
                />
                </div>

                <div class="form-group">
                <label for="smtpUser">SMTP Username / Email *</label>
                <input
                    id="smtpUser"
                    v-model="formData.smtp_user"
                    type="text"
                    required
                    placeholder="e.g. admin@b-2b.com or Resend API Key"
                />
                </div>

                <div class="form-group full-width">
                <label for="smtpPassword">SMTP Password / App Password *</label>
                <input
                    id="smtpPassword"
                    v-model="formData.smtp_password"
                    type="password"
                    placeholder="Enter password (leave as ******** to keep current)"
                />
                <small>For security, Google requires an App Password, not your standard account password.</small>
                </div>
            </div>
            </div>

            <div class="form-section">
            <h3>Sender Details</h3>
            <div class="form-grid">
                <div class="form-group">
                <label for="smtpFromName">Default From Name</label>
                <input
                    id="smtpFromName"
                    v-model="formData.smtp_from_name"
                    type="text"
                    placeholder="e.g. B2B News Network"
                />
                </div>

                <div class="form-group">
                <label for="smtpFromEmail">Default From Email</label>
                <input
                    id="smtpFromEmail"
                    v-model="formData.smtp_from_email"
                    type="email"
                    placeholder="e.g. no-reply@b-2b.com"
                />
                <small>Must be authorized by your SMTP provider.</small>
                </div>
            </div>
            </div>

            <div class="form-actions">
            <!-- Test Email Button could go here optionally -->
            <button type="submit" class="btn-primary" :disabled="isSaving">
                {{ isSaving ? 'Saving...' : '💾 Save SMTP Settings' }}
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
    smtp_host: '',
    smtp_port: '465',
    smtp_user: '',
    smtp_password: '',
    smtp_from_name: '',
    smtp_from_email: '',
    resend_api_key: ''
})

const saveMessage = ref('')
const saveSuccess = ref(false)
const isSaving = ref(false)

// Fetch initial data
const { data, pending } = await useFetch('/api/admin/smtp')

if (data.value && data.value.config) {
    formData.value = { ...formData.value, ...data.value.config }
}

const handleSave = async () => {
  isSaving.value = true
  try {
      await $fetch('/api/admin/smtp', {
          method: 'POST',
          body: formData.value
      })

      saveMessage.value = 'SMTP Configuration saved successfully!'
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
  background: linear-gradient(180deg, #10b981 0%, #059669 100%);
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
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
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
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(16, 185, 129, 0.4);
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
