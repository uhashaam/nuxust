<template>
  <div class="contact-page">
    <header class="page-hero">
      <div class="hero-glow"></div>
      <div class="container hero-content">
        <span class="tag">Get in Touch</span>
        <h1>Contact Us</h1>
        <p class="subtitle">Have questions? We're here to help you innovate and grow.</p>
      </div>
    </header>

    <div class="container contact-container">
      <div class="contact-grid">
        <!-- Contact Form -->
        <div class="contact-card form-section">
          <h2>Send us a Message</h2>
          <p>Fill out the form below and our team will get back to you within 24 hours.</p>
          
          <el-form :model="contactForm" label-position="top" class="professional-form">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="Full Name">
                  <el-input v-model="contactForm.name" placeholder="John Doe" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Email Address">
                  <el-input v-model="contactForm.email" placeholder="john@example.com" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="Subject">
              <el-input v-model="contactForm.subject" placeholder="How can we help?" />
            </el-form-item>
            <el-form-item label="Message">
              <el-input
                v-model="contactForm.message"
                type="textarea"
                :rows="5"
                placeholder="Tell us more about your inquiry..."
              />
            </el-form-item>
            <el-button type="primary" class="submit-btn" @click="handleSubmit">
              Send Message
            </el-button>
          </el-form>
        </div>

        <!-- Contact Info -->
        <div class="info-section">
          <div class="contact-card info-card">
            <div class="info-item">
              <div class="icon">📍</div>
              <div class="details">
                <h3>Our Office</h3>
                <p>{{ config.contactAddress }}</p>
              </div>
            </div>
            <div class="info-item">
              <div class="icon">📧</div>
              <div class="details">
                <h3>Email Us</h3>
                <p>{{ config.email }}</p>
              </div>
            </div>
            <div class="info-item">
              <div class="icon">📞</div>
              <div class="details">
                <h3>Call Us</h3>
                <p>{{ config.phoneNumber }}</p>
              </div>
            </div>
          </div>

          <div class="contact-card map-card">
            <!-- Professional Map Placeholder -->
            <!-- Professional Map Embed -->
            <div class="map-container">
              <iframe 
                width="100%" 
                height="100%" 
                frameborder="0" 
                scrolling="no" 
                marginheight="0" 
                marginwidth="0" 
                src="https://maps.google.com/maps?q=Building+2,+No.+525+Xizang+North+Road,+Jing'an+District,+Shanghai&t=&z=13&ie=UTF8&iwloc=&output=embed"
                title="Office Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const { config } = useCompanyConfig()

const contactForm = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const handleSubmit = () => {
  if (!contactForm.value.email || !contactForm.value.message) {
    ElMessage.warning('Please fill in required fields')
    return
  }
  ElMessage.success('Thank you! Your message has been sent.')
  contactForm.value = { name: '', email: '', subject: '', message: '' }
}

useHead({
  title: 'Contact Us | ' + config.value.brandName,
  meta: [
    { name: 'description', content: 'Get in touch with us for inquiries and support.' }
  ]
})
</script>

<style scoped>
.contact-page {
  background: #f8fafc;
  min-height: 100vh;
}

.page-hero {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  padding: 8rem 0 6rem;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
}

.tag {
  color: #818cf8;
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: 0.1em;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  display: block;
}

.page-hero h1 {
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.25rem;
  color: #94a3b8;
  max-width: 600px;
  margin: 0 auto;
}

.contact-container {
  margin-top: -4rem;
  padding-bottom: 8rem;
  position: relative;
  z-index: 10;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
}

.contact-card {
  background: white;
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
}

.form-section h2 {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.form-section p {
  color: #64748b;
  margin-bottom: 3rem;
}

.professional-form :deep(.el-form-item__label) {
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.professional-form :deep(.el-input__inner),
.professional-form :deep(.el-textarea__inner) {
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border-color: #e2e8f0;
}

.submit-btn {
  height: 56px;
  width: 100%;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1.125rem;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%) !important;
  border: none !important;
  margin-top: 1rem;
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-card {
  padding: 2.5rem;
}

.info-item {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-item .icon {
  width: 48px;
  height: 48px;
  background: #f1f5f9;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.info-item h3 {
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.info-item p {
  color: #64748b;
  font-size: 1rem;
}

.map-card {
  padding: 0;
  overflow: hidden;
  height: 300px;
}

.map-container {
  width: 100%;
  height: 100%;
}


.map-overlay {
  text-align: center;
  color: #94a3b8;
}

.map-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

@media (max-width: 992px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
  .contact-container {
    margin-top: -2rem;
  }
}
</style>
