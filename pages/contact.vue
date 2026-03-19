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
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

.contact-page {
  background-color: #f8fafc;
  background-image: radial-gradient(circle at 15% 50%, rgba(99, 102, 241, 0.05), transparent 40%),
                    radial-gradient(circle at 85% 30%, rgba(168, 85, 247, 0.05), transparent 40%);
  color: #0f172a;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  min-height: 100vh;
}

.page-hero {
  background: linear-gradient(135deg, #020617 0%, #0f172a 100%);
  padding: 10rem 0 8rem;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60vw;
  height: 60vw;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 60%);
  transform: translate(-50%, -50%);
  z-index: 1;
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 2;
  animation: fadeInUp 0.8s ease-out;
}
@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

.tag {
  color: #818cf8;
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: 0.15em;
  font-size: 0.85rem;
  margin-bottom: 1.5rem;
  display: inline-block;
  padding: 0.5rem 1.25rem;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 99px;
}

.page-hero h1 {
  font-size: clamp(3rem, 5vw, 4.5rem);
  font-weight: 900;
  margin-bottom: 1.5rem;
  background: linear-gradient(to right, #ffffff, #c7d2fe);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.1;
}

.subtitle {
  font-size: 1.25rem;
  color: #cbd5e1;
  max-width: 600px;
  margin: 0 auto;
  font-weight: 500;
  line-height: 1.6;
}

.contact-container {
  margin-top: -5rem;
  padding-bottom: 8rem;
  position: relative;
  z-index: 10;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 3rem;
}

.contact-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 3.5rem;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(226, 232, 240, 0.8);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.contact-card:hover { transform: translateY(-5px); box-shadow: 0 30px 50px -15px rgba(0, 0, 0, 0.12); border-color: #cbd5e1; }

.form-section h2 {
  font-size: 2.25rem;
  font-weight: 900;
  margin-bottom: 1rem;
  color: #020617;
}

.form-section p {
  color: #475569;
  margin-bottom: 3rem;
  font-size: 1.1rem;
}

.professional-form :deep(.el-form-item) { margin-bottom: 1.8rem; }
.professional-form :deep(.el-form-item__label) {
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.professional-form :deep(.el-input__wrapper),
.professional-form :deep(.el-textarea__wrapper) {
  box-shadow: inset 0 0 0 1px #cbd5e1 !important;
  border-radius: 12px;
  background: transparent;
  transition: all 0.3s ease;
}
.professional-form :deep(.el-input__wrapper:hover),
.professional-form :deep(.el-textarea__wrapper:hover) { box-shadow: inset 0 0 0 1px #94a3b8 !important; }
.professional-form :deep(.el-input__wrapper.is-focus),
.professional-form :deep(.el-textarea__wrapper.is-focus) { box-shadow: inset 0 0 0 2px #4f46e5 !important; background: white; }

.professional-form :deep(.el-input__inner),
.professional-form :deep(.el-textarea__inner) {
  padding: 0.5rem 0.5rem;
  font-size: 1rem;
  color: #0f172a;
}

.submit-btn {
  height: 60px;
  width: 100%;
  border-radius: 14px;
  font-weight: 800;
  font-size: 1.15rem;
  background: linear-gradient(135deg, #4f46e5 0%, #7e22ce 100%) !important;
  border: none !important;
  margin-top: 1.5rem;
  box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.4);
  color: white !important;
  transition: all 0.3s ease;
}
.submit-btn:hover { transform: translateY(-2px); box-shadow: 0 15px 35px -5px rgba(79, 70, 229, 0.6); filter: brightness(1.1); }

.info-section { display: flex; flex-direction: column; gap: 2.5rem; }
.info-card { padding: 3rem; }

.info-item { display: flex; gap: 1.5rem; margin-bottom: 2.5rem; }
.info-item:last-child { margin-bottom: 0; }

.info-item .icon {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #e0e7ff 0%, #ede9fe 100%);
  border-radius: 16px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.75rem;
  flex-shrink: 0;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.1);
}

.info-item h3 { font-size: 1.15rem; font-weight: 800; margin-bottom: 0.35rem; color: #0f172a; }
.info-item p { color: #475569; font-size: 1.05rem; line-height: 1.5; font-weight: 500;}

.map-card { padding: 0; overflow: hidden; height: 320px; }
.map-container { width: 100%; height: 100%; filter: grayscale(20%) contrast(1.1); transition: filter 0.5s ease; }
.map-card:hover .map-container { filter: grayscale(0%) contrast(1); }

@media (max-width: 1024px) {
  .contact-grid { grid-template-columns: 1fr; gap: 4rem; }
  .contact-container { margin-top: -3rem; }
}

@media (max-width: 768px) {
  .container { padding: 0 1.5rem; }
  .contact-card { padding: 2rem; }
  .page-hero h1 { font-size: 2.5rem; }
  .page-hero { padding: 8rem 0 6rem; }
  .info-item .icon { width: 48px; height: 48px; font-size: 1.5rem; }
  .info-item h3 { font-size: 1.05rem; }
  .professional-form :deep(.el-col) {
    width: 100% !important;
    max-width: 100% !important;
    flex: 0 0 100% !important;
  }
}
</style>
