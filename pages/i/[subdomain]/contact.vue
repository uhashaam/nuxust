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
.contact-page {
  background: #f8fafc;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

.hero-section {
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  color: white;
  padding: 6rem 0 4rem;
  text-align: center;
}

.hero-section h1 {
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.5rem;
  color: #e0e7ff;
  font-weight: 300;
}

.contact-section {
  padding: 6rem 0;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
}

.contact-info h2 {
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 1rem;
  color: #0f172a;
}

.intro {
  font-size: 1.125rem;
  color: #64748b;
  line-height: 1.8;
  margin-bottom: 3rem;
}

.info-cards {
  display: grid;
  gap: 2rem;
}

.info-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.info-card h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.5rem;
}

.info-card p {
  color: #64748b;
  line-height: 1.6;
  word-break: break-word;
}

.form-card {
  background: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-card h3 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 2rem;
}

@media (max-width: 1024px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2.5rem;
  }
}
</style>
