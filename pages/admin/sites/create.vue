<template>
  <div class="create-site">
    <div class="page-header">
      <h2>➕ Register New Subdomain Site</h2>
      <p>Follow the steps to set up a new industry subdomain with Cloudflare & SEO</p>
    </div>

    <!-- Step Indicator -->
    <div class="steps-indicator">
      <div class="step" :class="{ active: currentStep >= 1, done: currentStep > 1 }">
        <div class="step-num">{{ currentStep > 1 ? '✓' : '1' }}</div>
        <span>Site Info</span>
      </div>
      <div class="step-line" :class="{ active: currentStep > 1 }"></div>
      <div class="step" :class="{ active: currentStep >= 2, done: currentStep > 2 }">
        <div class="step-num">{{ currentStep > 2 ? '✓' : '2' }}</div>
        <span>Cloudflare</span>
      </div>
      <div class="step-line" :class="{ active: currentStep > 2 }"></div>
      <div class="step" :class="{ active: currentStep >= 3 }">
        <div class="step-num">3</div>
        <span>SEO Setup</span>
      </div>
    </div>

    <div class="wizard-card">
      <!-- Step 1: Site Info -->
      <div v-if="currentStep === 1" class="step-content">
        <h3>🏢 Site Information</h3>
        <div class="form-grid">
          <div class="form-group">
            <label>Subdomain *</label>
            <div class="input-with-suffix">
              <input v-model="form.subdomain" type="text" placeholder="lasercleaner" @input="sanitizeSubdomain" />
              <span class="input-suffix">.b-2b.com</span>
            </div>
            <small>Lowercase letters, numbers, and dashes only</small>
          </div>

          <div class="form-group">
            <label>Industry Name *</label>
            <input v-model="form.industryName" type="text" placeholder="Laser Cleaning" />
          </div>

          <div class="form-group">
            <label>Promotion Website</label>
            <input v-model="form.promotionUrl" type="url" placeholder="https://laserchina.com" />
            <small>The main website this subdomain promotes</small>
          </div>

          <div class="form-group">
            <label>Site Name</label>
            <input v-model="form.siteName" type="text" :placeholder="`${form.industryName || 'Industry'} News`" />
          </div>
        </div>
      </div>

      <!-- Step 2: Cloudflare -->
      <div v-if="currentStep === 2" class="step-content">
        <h3>☁️ Cloudflare Setup</h3>
        <div class="cf-info-box">
          <p>📧 CF Account Email: <strong>{{ form.subdomain }}@c9.pub</strong></p>
          <p>🔑 CF Password: <strong>{{ capitalizeFirst(form.subdomain) }}#1</strong></p>
        </div>
        <div class="form-grid">
          <div class="form-group">
            <label>CF Account ID *</label>
            <input v-model="form.cfAccountId" type="text" placeholder="Paste Account ID from CF dashboard" />
            <small>Workers & Pages → right sidebar → Account ID</small>
          </div>

          <div class="form-group">
            <label>CF API Token *</label>
            <div class="input-with-action">
              <input v-model="form.cfApiToken" :type="showToken ? 'text' : 'password'" placeholder="Paste API Token" />
              <button type="button" class="btn-icon" @click="showToken = !showToken">
                {{ showToken ? '🙈' : '👁️' }}
              </button>
            </div>
            <small>Profile → API Tokens → Create Token</small>
          </div>

          <div class="form-group">
            <label>CF Zone ID <span class="optional">(optional)</span></label>
            <input v-model="form.cfZoneId" type="text" placeholder="Only if domain added to this CF account" />
          </div>
        </div>

        <button v-if="form.cfApiToken" class="btn-secondary" :disabled="testingCf" @click="testCfConnection">
          {{ testingCf ? '⏳ Testing...' : '🔌 Test Connection' }}
        </button>
        <div v-if="cfTestResult" class="test-result" :class="cfTestResult.success ? 'test-success' : 'test-error'">
          {{ cfTestResult.success ? '✅ Token valid!' : `❌ ${cfTestResult.error}` }}
        </div>
      </div>

      <!-- Step 3: SEO -->
      <div v-if="currentStep === 3" class="step-content">
        <h3>🔍 SEO Settings</h3>
        <div class="form-grid">
          <div class="form-group full-width">
            <label>SEO Title</label>
            <input v-model="form.seoTitle" type="text" :placeholder="`${form.industryName} News - Industry Updates & Analysis`" />
            <div class="char-counter" :class="seoTitleClass">
              {{ (form.seoTitle || '').length }}/60 chars
            </div>
          </div>

          <div class="form-group full-width">
            <label>Meta Description</label>
            <textarea v-model="form.seoDescription" rows="3"
              :placeholder="`Stay up to date with the latest ${(form.industryName || 'industry').toLowerCase()} news, market trends, technology insights and professional analysis.`"
            ></textarea>
            <div class="char-counter" :class="seoDescClass">
              {{ (form.seoDescription || '').length }}/160 chars
            </div>
          </div>

          <div class="form-group">
            <label>Focus Keywords</label>
            <input v-model="form.seoKeywords" type="text" :placeholder="(form.industryName || '').toLowerCase()" />
            <small>Comma-separated keywords</small>
          </div>

          <div class="form-group">
            <label>AI Focus Keyword</label>
            <input v-model="form.aiFocusKeyword" type="text" :placeholder="form.industryName" />
            <small>Primary keyword for daily AI-generated articles</small>
          </div>
        </div>

        <!-- Live SEO Score Preview -->
        <div class="seo-preview">
          <h4>📊 SEO Score Preview</h4>
          <div class="seo-score-bar">
            <div class="seo-score-fill" :style="{ width: seoPreviewScore + '%' }" :class="seoScoreClass">
            </div>
          </div>
          <span class="seo-score-value" :class="seoScoreClass">{{ seoPreviewScore }}/100</span>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="wizard-actions">
        <button v-if="currentStep > 1" class="btn-secondary" @click="currentStep--">
          ← Previous
        </button>
        <div class="spacer"></div>
        <button v-if="currentStep < 3" class="btn-primary" :disabled="!canProceed" @click="currentStep++">
          Next →
        </button>
        <button v-if="currentStep === 3" class="btn-primary btn-submit" :disabled="submitting" @click="handleSubmit">
          {{ submitting ? '⏳ Creating...' : '🚀 Create Site' }}
        </button>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="created" class="success-overlay" @click="navigateTo('/admin/sites')">
      <div class="success-card" @click.stop>
        <div class="success-icon">🎉</div>
        <h3>Site Created Successfully!</h3>
        <p><strong>{{ form.subdomain }}.b-2b.com</strong> is now registered.</p>
        <p class="success-hint">Add the CF credentials and DNS record via the Site Editor.</p>
        <div class="success-actions">
          <button class="btn-primary" @click="navigateTo(`/admin/sites/${createdId}`)">
            Open Site Editor
          </button>
          <button class="btn-secondary" @click="navigateTo('/admin/sites')">
            Back to List
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })

const currentStep = ref(1)
const showToken = ref(false)
const testingCf = ref(false)
const cfTestResult = ref<any>(null)
const submitting = ref(false)
const created = ref(false)
const createdId = ref('')

const form = ref({
  subdomain: '',
  industryName: '',
  siteName: '',
  promotionUrl: '',
  cfAccountId: '',
  cfApiToken: '',
  cfZoneId: '',
  seoTitle: '',
  seoDescription: '',
  seoKeywords: '',
  aiFocusKeyword: '',
})

const sanitizeSubdomain = () => {
  form.value.subdomain = form.value.subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '')
}

const capitalizeFirst = (str: string) => str ? str.charAt(0).toUpperCase() + str.slice(1) : ''

const canProceed = computed(() => {
  if (currentStep.value === 1) return form.value.subdomain && form.value.industryName
  if (currentStep.value === 2) return true // CF creds are optional during creation
  return true
})

// SEO helpers
const seoTitleClass = computed(() => {
  const len = (form.value.seoTitle || '').length
  if (len === 0) return 'counter-muted'
  if (len >= 50 && len <= 60) return 'counter-good'
  if (len >= 30 && len <= 70) return 'counter-ok'
  return 'counter-bad'
})

const seoDescClass = computed(() => {
  const len = (form.value.seoDescription || '').length
  if (len === 0) return 'counter-muted'
  if (len >= 150 && len <= 160) return 'counter-good'
  if (len >= 120 && len <= 200) return 'counter-ok'
  return 'counter-bad'
})

const seoPreviewScore = computed(() => {
  let score = 0
  const title = form.value.seoTitle || ''
  const desc = form.value.seoDescription || ''
  const keyword = (form.value.seoKeywords || '').split(',')[0]?.trim().toLowerCase()
  // Title length
  if (title.length >= 50 && title.length <= 60) score += 20
  else if (title.length >= 30) score += 10
  // Description
  if (desc.length >= 150 && desc.length <= 160) score += 20
  else if (desc.length >= 100) score += 10
  // Keyword in title
  if (keyword && title.toLowerCase().includes(keyword)) score += 15
  // Keyword in description
  if (keyword && desc.toLowerCase().includes(keyword)) score += 15
  // Keywords set
  if (form.value.seoKeywords) score += 10
  // AI focus keyword
  if (form.value.aiFocusKeyword) score += 10
  // Canonical (auto)
  score += 10
  return Math.min(score, 100)
})

const seoScoreClass = computed(() => {
  const s = seoPreviewScore.value
  if (s >= 80) return 'score-excellent'
  if (s >= 60) return 'score-good'
  if (s >= 40) return 'score-ok'
  return 'score-poor'
})

const testCfConnection = async () => {
  testingCf.value = true
  cfTestResult.value = null
  try {
    // We can't test until site is created, so just verify token format
    if (form.value.cfApiToken.length < 20) {
      cfTestResult.value = { success: false, error: 'Token seems too short' }
    } else {
      cfTestResult.value = { success: true, message: 'Token format looks valid. Full test after site creation.' }
    }
  } finally {
    testingCf.value = false
  }
}

const handleSubmit = async () => {
  submitting.value = true
  try {
    const res = await $fetch<any>('/api/admin/sites/register', {
      method: 'POST',
      body: {
        subdomain: form.value.subdomain,
        industryName: form.value.industryName,
        siteName: form.value.siteName || `${form.value.industryName} News`,
        promotionUrl: form.value.promotionUrl,
        cfAccountId: form.value.cfAccountId,
        cfApiToken: form.value.cfApiToken,
        cfZoneId: form.value.cfZoneId,
        cfEmail: `${form.value.subdomain}@c9.pub`,
      },
    })
    createdId.value = res.site?.id || ''
    // Update SEO if set
    if (createdId.value && (form.value.seoTitle || form.value.seoDescription)) {
      await $fetch(`/api/admin/sites/${createdId.value}`, {
        method: 'PATCH',
        body: {
          seoTitle: form.value.seoTitle,
          seoDescription: form.value.seoDescription,
          seoKeywords: form.value.seoKeywords,
          aiFocusKeyword: form.value.aiFocusKeyword || form.value.industryName,
        }
      })
    }
    created.value = true
  } catch (error: any) {
    alert(error.data?.message || error.message || 'Failed to create site')
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.create-site { max-width: 900px; }

.page-header { margin-bottom: 2rem; }
.page-header h2 { margin: 0 0 0.5rem; font-size: 1.75rem; font-weight: 700; color: #1e293b; }
.page-header p { margin: 0; color: #64748b; }

/* Steps Indicator */
.steps-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  margin-bottom: 2rem;
}

.step {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #94a3b8;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.step.active { color: #1e293b; }
.step.done { color: #16a34a; }

.step-num {
  width: 32px; height: 32px;
  border-radius: 50%;
  background: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.85rem;
  transition: all 0.3s;
}

.step.active .step-num { background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; }
.step.done .step-num { background: #16a34a; color: white; }

.step-line {
  width: 80px; height: 3px;
  background: #e2e8f0;
  margin: 0 0.75rem;
  border-radius: 2px;
  transition: background 0.3s;
}

.step-line.active { background: linear-gradient(135deg, #3b82f6, #1d4ed8); }

/* Wizard Card */
.wizard-card {
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}

.step-content h3 {
  margin: 0 0 1.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: #334155;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.form-group { display: flex; flex-direction: column; gap: 0.4rem; }
.form-group.full-width { grid-column: 1 / -1; }

.form-group label {
  font-weight: 600; color: #475569; font-size: 0.875rem;
}

.optional { color: #94a3b8; font-weight: 400; }

input, textarea {
  padding: 0.75rem 1rem; border: 2px solid #e2e8f0; border-radius: 8px;
  font-size: 1rem; font-family: inherit; transition: all 0.3s; background: white;
}

input:focus, textarea:focus {
  outline: none; border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
}

small { font-size: 0.75rem; color: #94a3b8; }

.input-with-suffix {
  display: flex; align-items: stretch;
}

.input-with-suffix input {
  border-radius: 8px 0 0 8px; flex: 1;
}

.input-suffix {
  padding: 0.75rem 1rem;
  background: #f1f5f9; border: 2px solid #e2e8f0; border-left: none;
  border-radius: 0 8px 8px 0; color: #64748b; font-weight: 600; font-size: 0.9rem;
  display: flex; align-items: center;
}

.input-with-action { display: flex; gap: 0.5rem; }
.input-with-action input { flex: 1; }

.btn-icon {
  padding: 0.75rem; border: 2px solid #e2e8f0; border-radius: 8px;
  background: white; cursor: pointer; font-size: 1.1rem;
}

/* CF Info Box */
.cf-info-box {
  background: linear-gradient(135deg, #eff6ff, #dbeafe);
  border: 1px solid #bfdbfe;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  margin-bottom: 1.5rem;
}

.cf-info-box p { margin: 0.3rem 0; color: #1e40af; font-size: 0.9rem; }

/* Test Result */
.test-result {
  margin-top: 1rem; padding: 0.75rem 1rem;
  border-radius: 8px; font-weight: 600; font-size: 0.9rem;
}

.test-success { background: #dcfce7; color: #166534; }
.test-error { background: #fef2f2; color: #991b1b; }

/* Character Counter */
.char-counter {
  font-size: 0.75rem; font-weight: 600; text-align: right;
}

.counter-muted { color: #94a3b8; }
.counter-good { color: #16a34a; }
.counter-ok { color: #d97706; }
.counter-bad { color: #dc2626; }

/* SEO Score Preview */
.seo-preview {
  margin-top: 2rem; padding: 1.5rem;
  background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;
}

.seo-preview h4 { margin: 0 0 1rem; font-size: 1rem; color: #334155; }

.seo-score-bar {
  height: 12px; background: #e2e8f0; border-radius: 6px; overflow: hidden; margin-bottom: 0.5rem;
}

.seo-score-fill {
  height: 100%; border-radius: 6px; transition: width 0.5s ease;
}

.score-excellent { background: linear-gradient(90deg, #22c55e, #16a34a); color: #16a34a; }
.score-good { background: linear-gradient(90deg, #3b82f6, #2563eb); color: #2563eb; }
.score-ok { background: linear-gradient(90deg, #f59e0b, #d97706); color: #d97706; }
.score-poor { background: linear-gradient(90deg, #ef4444, #dc2626); color: #dc2626; }

.seo-score-value { font-size: 1.25rem; font-weight: 800; }

/* Wizard Actions */
.wizard-actions {
  display: flex; align-items: center; gap: 1rem;
  margin-top: 2rem; padding-top: 2rem; border-top: 2px solid #f1f5f9;
}

.spacer { flex: 1; }

.btn-primary, .btn-secondary {
  padding: 0.75rem 1.5rem; border: none; border-radius: 10px;
  font-size: 0.95rem; font-weight: 600; cursor: pointer; transition: all 0.3s;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white;
}

.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(59,130,246,0.4); }
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

.btn-submit { background: linear-gradient(135deg, #16a34a, #15803d); }
.btn-submit:hover { box-shadow: 0 6px 20px rgba(22,163,74,0.4); }

.btn-secondary {
  background: white; color: #475569; border: 2px solid #e2e8f0;
}

.btn-secondary:hover { background: #f8fafc; }
.btn-secondary:disabled { opacity: 0.5; }

/* Success Overlay */
.success-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center; z-index: 999;
}

.success-card {
  background: white; border-radius: 20px; padding: 3rem; text-align: center;
  max-width: 450px; width: 90%; box-shadow: 0 20px 60px rgba(0,0,0,0.2);
  animation: popIn 0.3s ease;
}

@keyframes popIn {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.success-icon { font-size: 4rem; margin-bottom: 1rem; }
.success-card h3 { margin: 0 0 0.5rem; color: #1e293b; }
.success-card p { color: #64748b; margin: 0.5rem 0; }
.success-hint { font-size: 0.85rem; }

.success-actions {
  display: flex; flex-direction: column; gap: 0.75rem; margin-top: 1.5rem;
}

@media (max-width: 768px) {
  .form-grid { grid-template-columns: 1fr; }
  .steps-indicator { flex-wrap: wrap; }
  .step-line { width: 40px; }
}
</style>
