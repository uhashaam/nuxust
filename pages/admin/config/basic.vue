<template>
  <div class="config-page">
    <div class="page-header">
      <h2>Basic Information Configuration</h2>
      <p>Configure your website's basic information and contact details</p>
    </div>

      <form class="config-form" @submit.prevent="handleSave">
        <div class="form-section">
          <h3>Company Information</h3>
          <div class="form-grid">
            <div class="form-group">
              <label for="companyFullName">Company Full Name *</label>
              <input
                id="companyFullName"
                v-model="formData.companyFullName"
                type="text"
                required
                placeholder="Enter full company name"
              />
            </div>

            <div class="form-group">
              <label for="companyAbbr">Company Abbreviation *</label>
              <input
                id="companyAbbr"
                v-model="formData.companyAbbreviation"
                type="text"
                required
                placeholder="Enter abbreviation"
              />
            </div>

            <div class="form-group">
              <label for="brandName">Brand Name *</label>
              <input
                id="brandName"
                v-model="formData.brandName"
                type="text"
                required
                placeholder="Enter brand name"
              />
            </div>
          </div>
        </div>

        <div class="form-section">
          <h3>Contact Information</h3>
          <div class="form-grid">
            <div class="form-group">
              <label for="contactNumber">Contact Number</label>
              <input
                id="contactNumber"
                v-model="formData.contactNumber"
                type="tel"
                placeholder="+86-371-57114484"
              />
            </div>

            <div class="form-group">
              <label for="faxNumber">Fax Number</label>
              <input
                id="faxNumber"
                v-model="formData.faxNumber"
                type="tel"
                placeholder="+86-371-57114484"
              />
            </div>

            <div class="form-group">
              <label for="phoneNumber">Phone Number</label>
              <input
                id="phoneNumber"
                v-model="formData.phoneNumber"
                type="tel"
                placeholder="+8613526958007"
              />
              <small>This is for sending inquiry SMS messages</small>
            </div>

            <div class="form-group">
              <label for="email">Email *</label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                required
                placeholder="info@company.com"
              />
              <small>Multiple email addresses can be set up to receive inquiry emails</small>
            </div>

            <div class="form-group">
              <label for="customerServiceQQ">Customer Service QQ</label>
              <input
                id="customerServiceQQ"
                v-model="formData.customerServiceQQ"
                type="text"
                placeholder="Enter QQ number"
              />
            </div>

            <div class="form-group">
              <label for="postalCode">Postal Code</label>
              <input
                id="postalCode"
                v-model="formData.postalCode"
                type="text"
                placeholder="450041"
              />
            </div>
          </div>

          <div class="form-group full-width">
            <label for="contactAddress">Contact Address</label>
            <textarea
              id="contactAddress"
              v-model="formData.contactAddress"
              rows="3"
              placeholder="Enter full contact address"
            ></textarea>
          </div>
        </div>

        <div class="form-section">
          <h3>Website Content</h3>
          <div class="form-grid">
            <div class="form-group full-width">
              <label for="watermarkText">Watermark Text</label>
              <input
                id="watermarkText"
                v-model="formData.watermarkText"
                type="text"
                placeholder="Enter watermark text for images"
              />
            </div>

            <div class="form-group full-width">
              <label for="copyrightText">Copyright Text</label>
              <textarea
                id="copyrightText"
                v-model="formData.copyrightText"
                rows="2"
                placeholder="Copyright © Company Name. All rights reserved."
              ></textarea>
            </div>
          </div>
        </div>

        <div class="form-section">
          <h3>Mobile Website QR Code Image</h3>
          <div class="form-group">
            <label for="qrCode">QR Code URL</label>
            <input
              id="qrCode"
              v-model="formData.qrCodeImage"
              type="url"
              placeholder="https://example.com/qr-code.jpg"
            />
            <small>Image formats supported: jpg, gif, bmp, and vector. Maximum size: 240 KB</small>
          </div>
          <div v-if="formData.qrCodeImage" class="qr-preview">
            <img :src="formData.qrCodeImage" alt="QR Code Preview" />
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="btn-secondary" @click="handleReset">
            Reset to Defaults
          </button>
          <button type="submit" class="btn-primary">
            💾 Save Configuration
          </button>
        </div>
      </form>

      <div v-if="saveMessage" class="save-notification" :class="{ success: saveSuccess }">
        {{ saveMessage }}
      </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const { config, updateConfig, resetConfig } = useCompanyConfig()

const formData = ref({ ...config.value })

const saveMessage = ref('')
const saveSuccess = ref(false)

watch(() => config.value, (newConfig) => {
  formData.value = { ...newConfig }
}, { deep: true })

const handleSave = () => {
  updateConfig(formData.value)
  saveMessage.value = 'Configuration saved successfully!'
  saveSuccess.value = true
  
  setTimeout(() => {
    saveMessage.value = ''
  }, 3000)
}

const handleReset = () => {
  if (confirm('Are you sure you want to reset all settings to defaults?')) {
    resetConfig()
    formData.value = { ...config.value }
    saveMessage.value = 'Configuration reset to defaults'
    saveSuccess.value = false
    
    setTimeout(() => {
      saveMessage.value = ''
    }, 3000)
  }
}
</script>

<style scoped>
.config-page {
  max-width: 1200px;
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
  background: linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%);
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

input,
textarea {
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
  background: white;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

small {
  font-size: 0.75rem;
  color: #64748b;
  font-style: italic;
}

.qr-preview {
  margin-top: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
  text-align: center;
}

.qr-preview img {
  max-width: 200px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(59, 130, 246, 0.4);
}

.btn-secondary {
  background: white;
  color: #64748b;
  border: 2px solid #e2e8f0;
}

.btn-secondary:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
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

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  button {
    width: 100%;
    justify-content: center;
  }
}
</style>
