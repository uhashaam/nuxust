<template>
  <div class="contact-page">
    <section class="hero-section">
      <div class="container">
        <h1>Contact {{ siteData?.industryName || 'Us' }}</h1>
        <p class="subtitle">Get in touch with our {{ siteData?.industryName || 'industry' }} news team</p>
      </div>
    </section>

    <section class="contact-section">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-info">
            <h2>Reach Out</h2>
            <p class="intro">
              Have a news tip, story suggestion, or partnership inquiry? 
              We'd love to hear from you.
            </p>

            <div class="info-cards">
              <div class="info-card">
                <div class="icon">📧</div>
                <h3>Email</h3>
                <p>{{ siteData?.industryName?.toLowerCase() }}@b-2b.com</p>
              </div>

              <div class="info-card">
                <div class="icon">🌐</div>
                <h3>Website</h3>
                <p>{{ subdomain }}.b-2b.com</p>
              </div>

              <div class="info-card">
                <div class="icon">📰</div>
                <h3>News Tips</h3>
                <p>tips@{{ subdomain }}.b-2b.com</p>
              </div>
            </div>
          </div>

          <div class="contact-form-wrapper">
            <div class="form-card">
              <h3>Send a Message</h3>
              
              <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
                <el-form-item label="Your Name" prop="name">
                  <el-input v-model="form.name" placeholder="Enter your name" />
                </el-form-item>

                <el-form-item label="Email Address" prop="email">
                  <el-input v-model="form.email" type="email" placeholder="your@email.com" />
                </el-form-item>

                <el-form-item label="Subject" prop="subject">
                  <el-input v-model="form.subject" placeholder="What is this about?" />
                </el-form-item>

                <el-form-item label="Message" prop="message">
                  <el-input 
                    v-model="form.message" 
                    type="textarea" 
                    :rows="6" 
                    placeholder="Your message..." />
                </el-form-item>

                <el-button type="primary" size="large" style="width: 100%;" @click="submitForm">
                  Send Message
                </el-button>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, inject, computed } from 'vue'
import { useRoute } from 'nuxt/app'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'

const route = useRoute()
const subdomain = computed(() => route.params.subdomain as string)
const siteData = inject('industrySiteData')

const formRef = ref<FormInstance>()
const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const rules: FormRules = {
  name: [{ required: true, message: 'Please enter your name', trigger: 'blur' }],
  email: [
    { required: true, message: 'Please enter your email', trigger: 'blur' },
    { type: 'email', message: 'Please enter a valid email', trigger: 'blur' }
  ],
  subject: [{ required: true, message: 'Please enter a subject', trigger: 'blur' }],
  message: [{ required: true, message: 'Please enter your message', trigger: 'blur' }]
}

const submitForm = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate((valid) => {
    if (valid) {
      ElMessage.success('Thank you! We will get back to you soon.')
      formRef.value?.resetFields()
    }
  })
}

useHead({
  title: computed(() => `Contact ${siteData?.value?.industryName || 'Us'} - B2B News`),
  meta: [
    { name: 'description', content: computed(() => `Contact the ${siteData?.value?.industryName || 'industry'} news team for inquiries, partnerships, or news tips.`) }
  ]
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

.contact-page {
  background-color: #f8fafc;
  background-image: radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.04), transparent 50%),
                    radial-gradient(circle at 90% 80%, rgba(168, 85, 247, 0.04), transparent 50%);
  color: #0f172a;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  min-height: 100vh;
}

.container { max-width: 1280px; margin: 0 auto; padding: 0 2rem; }

.hero-section {
  background: linear-gradient(135deg, #020617 0%, #0f172a 100%);
  color: white;
  padding: 8rem 0 6rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-section::after {
  content: '';
  position: absolute;
  top: -50%; left: -50%;
  width: 200%; height: 200%;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 60%);
  pointer-events: none;
}

.hero-section h1 {
  font-size: clamp(3rem, 5vw, 4rem);
  font-weight: 900;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #ffffff, #c7d2fe);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.1;
  position: relative;
  z-index: 2;
  animation: fadeInUp 0.8s ease-out;
}
@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

.subtitle {
  font-size: 1.35rem;
  color: #cbd5e1;
  font-weight: 500;
  position: relative;
  z-index: 2;
  animation: fadeInUp 1s ease-out;
}

.contact-section { padding: 6rem 0 8rem; }

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4.5rem;
  align-items: start;
}

.contact-info h2 {
  font-size: 2.75rem;
  font-weight: 900;
  margin-bottom: 1rem;
  color: #020617;
  letter-spacing: -0.02em;
}

.intro {
  font-size: 1.15rem;
  color: #475569;
  line-height: 1.7;
  margin-bottom: 3.5rem;
}

.info-cards { display: grid; gap: 1.5rem; }

.info-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 15px -5px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(226, 232, 240, 0.8);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.info-card:hover {
  transform: translateX(10px) translateY(-2px);
  box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.1);
  border-color: #cbd5e1;
  background: white;
}

.icon {
  font-size: 2rem;
  margin-bottom: 1.25rem;
  background: linear-gradient(135deg, #e0e7ff 0%, #ede9fe 100%);
  width: 60px; height: 60px;
  border-radius: 16px;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.1);
}

.info-card h3 { font-size: 1.25rem; font-weight: 800; color: #020617; margin-bottom: 0.5rem; }
.info-card p { color: #64748b; line-height: 1.6; word-break: break-word; font-weight: 500; font-size: 1.05rem; }

.form-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 3.5rem;
  border-radius: 24px;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(226, 232, 240, 0.8);
  transition: all 0.4s ease;
}
.form-card:hover { box-shadow: 0 30px 50px -15px rgba(0, 0, 0, 0.12); border-color: #cbd5e1; }

.form-card h3 { font-size: 2rem; font-weight: 900; color: #020617; margin-bottom: 2.5rem; }

:deep(.el-form-item) { margin-bottom: 1.8rem; }
:deep(.el-form-item__label) { font-weight: 700; color: #0f172a; padding-bottom: 0.5rem; font-size: 0.95rem; }

:deep(.el-input__wrapper), :deep(.el-textarea__wrapper) {
  box-shadow: inset 0 0 0 1px #cbd5e1 !important;
  border-radius: 12px;
  background: transparent;
  transition: all 0.3s ease;
}
:deep(.el-input__wrapper:hover), :deep(.el-textarea__wrapper:hover) { box-shadow: inset 0 0 0 1px #94a3b8 !important; }
:deep(.el-input__wrapper.is-focus), :deep(.el-textarea__wrapper.is-focus) { box-shadow: inset 0 0 0 2px #4f46e5 !important; background: white; }

:deep(.el-input__inner), :deep(.el-textarea__inner) { padding: 0.5rem 0.5rem; font-size: 1rem; color: #0f172a; }

.el-button {
  height: 60px;
  border-radius: 14px;
  font-weight: 800;
  font-size: 1.15rem;
  background: linear-gradient(135deg, #4f46e5 0%, #7e22ce 100%) !important;
  border: none !important;
  margin-top: 1rem;
  box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.4);
  color: white !important;
  transition: all 0.3s ease;
}
.el-button:hover { transform: translateY(-2px); box-shadow: 0 15px 35px -5px rgba(79, 70, 229, 0.6); filter: brightness(1.1); }

@media (max-width: 1024px) {
  .contact-grid { grid-template-columns: 1fr; gap: 4rem; }
  .form-card { padding: 2.5rem; }
}

@media (max-width: 768px) {
  .container { padding: 0 1.5rem; }
  .hero-section { padding: 6rem 0 4rem; }
  .hero-section h1 { font-size: 2.5rem; }
  .contact-section { padding: 4rem 0; }
  .form-card { padding: 2rem; }
}
</style>
