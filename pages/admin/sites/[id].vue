<template>
  <div class="site-editor">
    <div class="page-header">
      <div class="header-left">
        <button class="btn-back" @click="navigateTo('/admin/sites')">← Back</button>
        <h2>{{ site?.site_name || 'Loading...' }}</h2>
        <p v-if="site">{{ site.subdomain }}.b-2b.com</p>
      </div>
      <button class="btn-primary" :disabled="saving" @click="handleSave">
        {{ saving ? '⏳ Saving...' : '💾 Save All Changes' }}
      </button>
    </div>

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading site details...</p>
    </div>

    <template v-else-if="site">
      <!-- Tab Navigation -->
      <div class="tab-nav">
        <button v-for="tab in tabs" :key="tab.id" class="tab-btn" :class="{ active: activeTab === tab.id }" @click="activeTab = tab.id">
          <span class="tab-icon">{{ tab.icon }}</span>
          <span class="tab-label">{{ tab.label }}</span>
        </button>
      </div>

      <div class="tab-content">
        <!-- TAB 1: Site Info -->
        <div v-if="activeTab === 'info'" class="tab-panel">
          <div class="form-section">
            <h3>Basic Information</h3>
            <div class="form-grid">
              <div class="form-group">
                <label>Subdomain</label>
                <input :value="form.subdomain" type="text" disabled class="input-disabled" />
              </div>
              <div class="form-group">
                <label>Site Name</label>
                <input v-model="form.siteName" type="text" placeholder="Site display name" />
              </div>
              <div class="form-group">
                <label>Site Title</label>
                <input v-model="form.siteTitle" type="text" placeholder="Browser tab title" />
              </div>
              <div class="form-group">
                <label>Industry Name</label>
                <input v-model="form.industryName" type="text" placeholder="e.g. Laser Cleaning" />
              </div>
              <div class="form-group">
                <label>Status</label>
                <select v-model="form.siteStatus">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
            </div>
          </div>
          <div class="form-section">
            <h3>Contact Information</h3>
            <div class="form-grid">
              <div class="form-group">
                <label>Contact Email</label>
                <input v-model="form.contactEmail" type="email" placeholder="info@company.com" />
              </div>
              <div class="form-group">
                <label>Contact Phone</label>
                <input v-model="form.contactPhone" type="tel" placeholder="+86-..." />
              </div>
              <div class="form-group full-width">
                <label>Address</label>
                <input v-model="form.address" type="text" placeholder="Full address" />
              </div>
              <div class="form-group full-width">
                <label>About Text</label>
                <textarea v-model="form.aboutText" rows="4" placeholder="About this industry site..."></textarea>
              </div>
            </div>
          </div>
        </div>

        <!-- TAB 2: Cloudflare -->
        <div v-if="activeTab === 'cloudflare'" class="tab-panel">
          <div class="form-section">
            <h3>Cloudflare Account Credentials</h3>
            <div class="cf-info-box">
              <p>📧 Email: <strong>{{ form.cfEmail || `${form.subdomain}@c9.pub` }}</strong></p>
            </div>
            <div class="form-grid">
              <div class="form-group">
                <label>CF Account ID</label>
                <input v-model="form.cfAccountId" type="text" placeholder="Paste Account ID" />
              </div>
              <div class="form-group">
                <label>CF API Token</label>
                <div class="input-with-action">
                  <input v-model="form.cfApiToken" :type="showToken ? 'text' : 'password'" placeholder="API Token" />
                  <button type="button" class="btn-icon" @click="showToken = !showToken">{{ showToken ? '🙈' : '👁️' }}</button>
                </div>
              </div>
              <div class="form-group">
                <label>CF Zone ID <span class="optional">(optional)</span></label>
                <input v-model="form.cfZoneId" type="text" placeholder="Zone ID" />
              </div>
              <div class="form-group">
                <label>CF Email</label>
                <input v-model="form.cfEmail" type="email" :placeholder="`${form.subdomain}@c9.pub`" />
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3>Actions</h3>
            <div class="cf-actions">
              <button class="btn-action" :disabled="!form.cfApiToken || testingCf" @click="testCfToken">
                {{ testingCf ? '⏳ Testing...' : '🔌 Test CF Connection' }}
              </button>
              <button class="btn-action btn-action-dns" :disabled="!form.cfApiToken || creatingDns" @click="createDnsRecord">
                {{ creatingDns ? '⏳ Creating...' : '🌐 Create DNS Record' }}
              </button>
            </div>
            <div v-if="cfMessage" class="action-result" :class="cfSuccess ? 'result-success' : 'result-error'">
              {{ cfMessage }}
            </div>
            <div class="dns-status">
              <span class="status-badge" :class="form.cfDnsCreated ? 'badge-success' : 'badge-warning'">
                DNS: {{ form.cfDnsCreated ? '✅ CNAME created' : '⚠️ Not yet created' }}
              </span>
            </div>
          </div>
        </div>

        <!-- TAB 3: SEO Settings -->
        <div v-if="activeTab === 'seo'" class="tab-panel">
          <!-- SEO Score Panel -->
          <div class="seo-score-panel" :class="`grade-${seoGrade}`">
            <div class="score-circle">
              <span class="score-number">{{ seoPercentage }}</span>
              <span class="score-label">/ 100</span>
            </div>
            <div class="score-details">
              <h4>SEO Score: {{ seoGradeLabel }}</h4>
              <div class="score-bar-wrapper">
                <div class="score-bar-bg">
                  <div class="score-bar-fill" :style="{ width: seoPercentage + '%' }"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3>Title & Description</h3>
            <div class="form-grid">
              <div class="form-group full-width">
                <label>SEO Title</label>
                <input v-model="form.seoTitle" type="text" placeholder="Custom SEO title for search engines" />
                <div class="char-counter" :class="charClass(form.seoTitle, 50, 60)">
                  {{ (form.seoTitle || '').length }}/60 chars
                </div>
              </div>
              <div class="form-group full-width">
                <label>Meta Description</label>
                <textarea v-model="form.seoDescription" rows="3" placeholder="150-160 character description for search results"></textarea>
                <div class="char-counter" :class="charClass(form.seoDescription, 150, 160)">
                  {{ (form.seoDescription || '').length }}/160 chars
                </div>
              </div>
              <div class="form-group full-width">
                <label>Focus Keywords</label>
                <input v-model="form.seoKeywords" type="text" placeholder="keyword1, keyword2, keyword3" />
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3>Open Graph</h3>
            <div class="form-grid">
              <div class="form-group">
                <label>OG Title</label>
                <input v-model="form.ogTitle" type="text" placeholder="Social sharing title" />
              </div>
              <div class="form-group">
                <label>OG Description</label>
                <input v-model="form.ogDescription" type="text" placeholder="Social sharing description" />
              </div>
              <div class="form-group">
                <label>OG Image URL</label>
                <input v-model="form.ogImage" type="url" placeholder="https://..." />
              </div>
              <div class="form-group">
                <label>Canonical URL</label>
                <input v-model="form.canonicalUrl" type="url" :placeholder="`https://${form.subdomain}.b-2b.com`" />
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3>Advanced</h3>
            <div class="form-grid">
              <div class="form-group">
                <label>Robots Meta</label>
                <select v-model="form.robotsMeta">
                  <option value="index,follow">index, follow (default)</option>
                  <option value="noindex,follow">noindex, follow</option>
                  <option value="index,nofollow">index, nofollow</option>
                  <option value="noindex,nofollow">noindex, nofollow</option>
                </select>
              </div>
              <div class="form-group">
                <label>Schema Type</label>
                <select v-model="form.schemaType">
                  <option value="NewsMediaOrganization">NewsMediaOrganization</option>
                  <option value="Organization">Organization</option>
                  <option value="LocalBusiness">LocalBusiness</option>
                  <option value="WebSite">WebSite</option>
                </select>
              </div>
            </div>
          </div>

          <!-- SEO Checklist -->
          <div class="seo-checklist">
            <h3>📋 SEO Checklist</h3>
            <div v-for="check in seoChecks" :key="check.id" class="check-item" :class="`check-${check.status}`">
              <span class="check-icon">{{ check.status === 'pass' ? '✅' : check.status === 'warn' ? '⚠️' : '❌' }}</span>
              <span class="check-label">{{ check.label }}</span>
              <span class="check-msg">{{ check.message }}</span>
            </div>
          </div>
        </div>

        <!-- TAB 4: AI News -->
        <div v-if="activeTab === 'ai'" class="tab-panel">
          <div class="form-section">
            <h3>AI News Automation</h3>
            <div class="form-grid">
              <div class="form-group">
                <label>Enable AI News</label>
                <div class="toggle-wrapper">
                  <label class="toggle">
                    <input v-model="form.aiNewsEnabled" type="checkbox" />
                    <span class="toggle-slider"></span>
                  </label>
                  <span class="toggle-label">{{ form.aiNewsEnabled ? '🤖 Active' : '⏸ Disabled' }}</span>
                </div>
              </div>
              <div class="form-group">
                <label>Articles Per Day</label>
                <input v-model.number="form.aiNewsCount" type="number" min="1" max="10" placeholder="2" />
              </div>
              <div class="form-group">
                <label>AI Focus Keyword</label>
                <input v-model="form.aiFocusKeyword" type="text" :placeholder="form.industryName || 'Industry keyword'" />
                <small>Primary keyword for AI to focus on when generating articles</small>
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3>Manual Generation</h3>
            <div class="ai-manual">
              <button class="btn-action btn-generate" :disabled="generating" @click="generateNow">
                {{ generating ? '⏳ Generating...' : '⚡ Generate Articles Now' }}
              </button>
              <p class="ai-hint">Generates {{ form.aiNewsCount || 2 }} articles for "{{ form.industryName || 'this site' }}"</p>
            </div>
            <div v-if="generateMessage" class="action-result" :class="generateSuccess ? 'result-success' : 'result-error'">
              {{ generateMessage }}
            </div>
            <div v-if="form.aiLastRun" class="last-run">
              Last AI run: {{ new Date(form.aiLastRun).toLocaleString() }}
            </div>
          </div>
        </div>

        <!-- TAB 5: Appearance -->
        <div v-if="activeTab === 'appearance'" class="tab-panel">
          <div class="form-section">
            <h3>Template Selection</h3>
            <div class="form-grid">
              <div class="form-group">
                <label>Header Style</label>
                <select v-model="form.headerStyleId">
                  <option value="header-01">Header 01 — Classic</option>
                  <option value="header-02">Header 02 — Modern</option>
                  <option value="header-03">Header 03 — Minimal</option>
                </select>
              </div>
              <div class="form-group">
                <label>Footer Style</label>
                <select v-model="form.footerStyleId">
                  <option value="footer-01">Footer 01 — Standard</option>
                  <option value="footer-02">Footer 02 — Compact</option>
                </select>
              </div>
              <div class="form-group">
                <label>Banner Style</label>
                <select v-model="form.bannerStyleId">
                  <option value="banner-01">Banner 01 — Hero</option>
                  <option value="banner-02">Banner 02 — Slider</option>
                </select>
              </div>
              <div class="form-group">
                <label>News List Style</label>
                <select v-model="form.newsListStyleId">
                  <option value="news-list-01">News List 01 — Grid</option>
                  <option value="news-list-02">News List 02 — Cards</option>
                </select>
              </div>
              <div class="form-group">
                <label>News Detail Style</label>
                <select v-model="form.newsDetailStyleId">
                  <option value="news-detail-01">News Detail 01 — Standard</option>
                  <option value="news-detail-02">News Detail 02 — Magazine</option>
                </select>
              </div>
            </div>
          </div>
          <div class="form-section">
            <h3>Custom CSS</h3>
            <div class="form-group full-width">
              <textarea v-model="form.customCss" rows="8" placeholder="/* Custom CSS for this site */" class="code-textarea"></textarea>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- Save notification -->
    <div v-if="saveMsg" class="save-notification" :class="{ success: saveOk }">
      {{ saveMsg }}
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })

const route = useRoute()
const siteId = computed(() => route.params.id as string)

const loading = ref(true)
const saving = ref(false)
const saveMsg = ref('')
const saveOk = ref(false)
const site = ref<any>(null)
const seoAnalysis = ref<any>(null)
const showToken = ref(false)
const testingCf = ref(false)
const creatingDns = ref(false)
const cfMessage = ref('')
const cfSuccess = ref(false)
const generating = ref(false)
const generateMessage = ref('')
const generateSuccess = ref(false)

const activeTab = ref('info')
const tabs = [
  { id: 'info', icon: '🏢', label: 'Site Info' },
  { id: 'cloudflare', icon: '☁️', label: 'Cloudflare' },
  { id: 'seo', icon: '🔍', label: 'SEO' },
  { id: 'ai', icon: '🤖', label: 'AI News' },
  { id: 'appearance', icon: '🎨', label: 'Appearance' },
]

const form = ref<any>({})

// SEO computed values
const seoPercentage = computed(() => seoAnalysis.value?.percentage || 0)
const seoGrade = computed(() => seoAnalysis.value?.grade || 'poor')
const seoGradeLabel = computed(() => {
  const g = seoGrade.value
  if (g === 'excellent') return 'Excellent'
  if (g === 'good') return 'Good'
  if (g === 'needs-work') return 'Needs Work'
  return 'Poor'
})
const seoChecks = computed(() => seoAnalysis.value?.checks || [])

const charClass = (val: string | null | undefined, min: number, max: number) => {
  const len = (val || '').length
  if (len === 0) return 'counter-muted'
  if (len >= min && len <= max) return 'counter-good'
  if (len >= min - 30 && len <= max + 40) return 'counter-ok'
  return 'counter-bad'
}

const fetchSite = async () => {
  loading.value = true
  try {
    const res = await $fetch<any>(`/api/admin/sites/${siteId.value}`)
    site.value = res.site
    seoAnalysis.value = res.seoAnalysis
    // Populate form from site data
    const s = res.site
    form.value = {
      subdomain: s.subdomain || s.sub_domain,
      siteName: s.site_name,
      siteTitle: s.site_title,
      industryName: s.industry_name,
      contactEmail: s.contact_email,
      contactPhone: s.contact_phone,
      address: s.address,
      aboutText: s.about_text,
      siteStatus: s.site_status || 'active',
      isActive: s.is_active,
      // CF
      cfAccountId: s.cf_account_id || '',
      cfApiToken: s.cf_api_token || '',
      cfZoneId: s.cf_zone_id || '',
      cfEmail: s.cf_email || '',
      cfDnsCreated: !!s.cf_dns_created,
      // AI
      aiNewsEnabled: !!s.ai_news_enabled,
      aiNewsCount: s.ai_news_count || 2,
      aiFocusKeyword: s.ai_focus_keyword || '',
      aiLastRun: s.ai_last_run ? Number(s.ai_last_run) : null,
      // SEO
      seoTitle: s.seo_title || '',
      seoDescription: s.seo_description || '',
      seoKeywords: s.seo_keywords || '',
      ogTitle: s.og_title || '',
      ogDescription: s.og_description || '',
      ogImage: s.og_image || '',
      canonicalUrl: s.canonical_url || '',
      robotsMeta: s.robots_meta || 'index,follow',
      schemaType: s.schema_type || 'NewsMediaOrganization',
      // Appearance
      headerStyleId: s.header_style_id || 'header-01',
      footerStyleId: s.footer_style_id || 'footer-01',
      bannerStyleId: s.banner_style_id || 'banner-01',
      newsListStyleId: s.news_list_style_id || 'news-list-01',
      newsDetailStyleId: s.news_detail_style_id || 'news-detail-01',
      customCss: s.custom_css || '',
    }
  } catch (e: any) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

const handleSave = async () => {
  saving.value = true
  saveMsg.value = ''
  try {
    await $fetch(`/api/admin/sites/${siteId.value}`, {
      method: 'PATCH',
      body: form.value,
    })
    saveMsg.value = '✅ All changes saved!'
    saveOk.value = true
    // Refresh SEO analysis
    const res = await $fetch<any>(`/api/admin/sites/${siteId.value}`)
    seoAnalysis.value = res.seoAnalysis
  } catch (e: any) {
    saveMsg.value = '❌ ' + (e.data?.message || e.message || 'Save failed')
    saveOk.value = false
  } finally {
    saving.value = false
    setTimeout(() => { saveMsg.value = '' }, 4000)
  }
}

const testCfToken = async () => {
  // Save first so token is in DB
  await handleSave()
  testingCf.value = true
  cfMessage.value = ''
  try {
    const res = await $fetch<any>(`/api/admin/sites/${siteId.value}/test-cf`, { method: 'POST' })
    cfSuccess.value = !!res.success
    cfMessage.value = res.success ? '✅ Token is valid!' : `❌ ${res.error || 'Invalid token'}`
  } catch (e: any) {
    cfSuccess.value = false
    cfMessage.value = '❌ ' + (e.data?.message || e.message)
  } finally {
    testingCf.value = false
  }
}

const createDnsRecord = async () => {
  await handleSave()
  creatingDns.value = true
  cfMessage.value = ''
  try {
    const res = await $fetch<any>(`/api/admin/sites/${siteId.value}/create-dns`, { method: 'POST' })
    cfSuccess.value = !!res.success
    cfMessage.value = res.success ? `✅ ${res.message}` : `❌ ${res.message}`
    if (res.success) form.value.cfDnsCreated = true
  } catch (e: any) {
    cfSuccess.value = false
    cfMessage.value = '❌ ' + (e.data?.message || e.message)
  } finally {
    creatingDns.value = false
  }
}

const generateNow = async () => {
  generating.value = true
  generateMessage.value = ''
  try {
    const config = useRuntimeConfig()
    const res = await $fetch<any>('/api/cron/generate-news', {
      params: { secret: 'b2b-cron-secure-956746' }
    })
    generateSuccess.value = true
    generateMessage.value = `✅ Generated ${res.summary?.totalGenerated || 0} articles`
  } catch (e: any) {
    generateSuccess.value = false
    generateMessage.value = '❌ ' + (e.data?.message || e.message)
  } finally {
    generating.value = false
  }
}

onMounted(fetchSite)
</script>

<style scoped>
.site-editor { max-width: 1100px; }

.page-header {
  display: flex; justify-content: space-between; align-items: flex-start;
  margin-bottom: 1.5rem;
}

.header-left { display: flex; flex-direction: column; gap: 0.25rem; }

.btn-back {
  background: none; border: none; color: #3b82f6; font-weight: 600;
  cursor: pointer; padding: 0; font-size: 0.9rem; align-self: flex-start;
  margin-bottom: 0.5rem;
}

.btn-back:hover { text-decoration: underline; }

.page-header h2 { margin: 0; font-size: 1.5rem; font-weight: 700; color: #1e293b; }
.page-header p { margin: 0; color: #64748b; font-size: 0.9rem; }

.btn-primary {
  padding: 0.75rem 1.5rem; background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white; border: none; border-radius: 10px; font-weight: 600; cursor: pointer;
  transition: all 0.3s; font-size: 0.95rem;
}

.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(59,130,246,0.4); }
.btn-primary:disabled { opacity: 0.5; transform: none; cursor: not-allowed; }

/* Tab Nav */
.tab-nav {
  display: flex; gap: 0; background: white; border-radius: 14px 14px 0 0;
  overflow: hidden; box-shadow: 0 -2px 8px rgba(0,0,0,0.04);
}

.tab-btn {
  flex: 1; padding: 1rem; border: none; background: white;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  gap: 0.5rem; font-weight: 600; font-size: 0.9rem; color: #64748b;
  transition: all 0.3s; border-bottom: 3px solid transparent;
}

.tab-btn:hover { background: #f8fafc; color: #334155; }

.tab-btn.active {
  color: #1d4ed8; border-bottom-color: #3b82f6;
  background: linear-gradient(180deg, #eff6ff, white);
}

.tab-icon { font-size: 1.1rem; }

/* Tab Content */
.tab-content {
  background: white; border-radius: 0 0 16px 16px; padding: 2rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06); min-height: 400px;
}

.form-section {
  margin-bottom: 2rem; padding-bottom: 2rem; border-bottom: 1px solid #f1f5f9;
}

.form-section:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }

.form-section h3 {
  margin: 0 0 1.25rem; font-size: 1.1rem; font-weight: 700; color: #334155;
  display: flex; align-items: center; gap: 0.5rem;
}

.form-section h3::before {
  content: ''; width: 4px; height: 1.25rem;
  background: linear-gradient(180deg, #3b82f6, #1d4ed8); border-radius: 2px;
}

.form-grid {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem;
}

.form-group { display: flex; flex-direction: column; gap: 0.4rem; }
.form-group.full-width { grid-column: 1 / -1; }

label { font-weight: 600; color: #475569; font-size: 0.85rem; }
.optional { color: #94a3b8; font-weight: 400; }

input, textarea, select {
  padding: 0.7rem 1rem; border: 2px solid #e2e8f0; border-radius: 8px;
  font-size: 0.95rem; font-family: inherit; transition: all 0.3s; background: white;
}

input:focus, textarea:focus, select:focus {
  outline: none; border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
}

.input-disabled { background: #f8fafc; color: #94a3b8; cursor: not-allowed; }

small { font-size: 0.75rem; color: #94a3b8; }

.input-with-action { display: flex; gap: 0.5rem; }
.input-with-action input { flex: 1; }
.btn-icon { padding: 0.7rem; border: 2px solid #e2e8f0; border-radius: 8px; background: white; cursor: pointer; font-size: 1rem; }

/* CF section */
.cf-info-box {
  background: linear-gradient(135deg, #eff6ff, #dbeafe); border: 1px solid #bfdbfe;
  border-radius: 10px; padding: 0.75rem 1.25rem; margin-bottom: 1.25rem;
}

.cf-info-box p { margin: 0.2rem 0; color: #1e40af; font-size: 0.85rem; }

.cf-actions { display: flex; gap: 1rem; margin-bottom: 1rem; }

.btn-action {
  padding: 0.7rem 1.25rem; border: 2px solid #e2e8f0; border-radius: 10px;
  background: white; font-weight: 600; cursor: pointer; transition: all 0.3s; font-size: 0.9rem;
}

.btn-action:hover { background: #f8fafc; border-color: #3b82f6; color: #1d4ed8; }
.btn-action:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-action-dns { border-color: #22c55e; color: #16a34a; }
.btn-action-dns:hover { background: #f0fdf4; }

.action-result {
  padding: 0.75rem 1rem; border-radius: 8px; font-weight: 600; font-size: 0.9rem; margin-bottom: 1rem;
}

.result-success { background: #dcfce7; color: #166534; }
.result-error { background: #fef2f2; color: #991b1b; }

.dns-status { margin-top: 0.75rem; }
.status-badge { padding: 0.3rem 0.75rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600; }
.badge-success { background: #dcfce7; color: #166534; }
.badge-warning { background: #fef3c7; color: #92400e; }

/* SEO Score Panel */
.seo-score-panel {
  display: flex; align-items: center; gap: 2rem;
  padding: 1.5rem; border-radius: 14px; margin-bottom: 2rem;
}

.grade-excellent { background: linear-gradient(135deg, #f0fdf4, #dcfce7); border: 1px solid #86efac; }
.grade-good { background: linear-gradient(135deg, #eff6ff, #dbeafe); border: 1px solid #93c5fd; }
.grade-needs-work { background: linear-gradient(135deg, #fffbeb, #fef3c7); border: 1px solid #fcd34d; }
.grade-poor { background: linear-gradient(135deg, #fef2f2, #fecaca); border: 1px solid #fca5a5; }

.score-circle { text-align: center; min-width: 80px; }
.score-number { font-size: 2.5rem; font-weight: 800; color: #1e293b; }
.score-label { font-size: 0.9rem; color: #64748b; display: block; }

.score-details { flex: 1; }
.score-details h4 { margin: 0 0 0.75rem; color: #334155; }

.score-bar-bg { height: 10px; background: #e2e8f0; border-radius: 5px; overflow: hidden; }

.score-bar-fill {
  height: 100%; border-radius: 5px; transition: width 0.5s ease;
  background: linear-gradient(90deg, #22c55e, #16a34a);
}

.grade-good .score-bar-fill { background: linear-gradient(90deg, #3b82f6, #2563eb); }
.grade-needs-work .score-bar-fill { background: linear-gradient(90deg, #f59e0b, #d97706); }
.grade-poor .score-bar-fill { background: linear-gradient(90deg, #ef4444, #dc2626); }

.char-counter { font-size: 0.75rem; font-weight: 600; text-align: right; }
.counter-muted { color: #94a3b8; }
.counter-good { color: #16a34a; }
.counter-ok { color: #d97706; }
.counter-bad { color: #dc2626; }

/* SEO Checklist */
.seo-checklist {
  padding: 1.5rem; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;
}

.seo-checklist h3 { margin: 0 0 1rem; font-size: 1rem; }
.seo-checklist h3::before { display: none; }

.check-item {
  display: flex; align-items: center; gap: 0.75rem;
  padding: 0.6rem 0; border-bottom: 1px solid #f1f5f9;
}

.check-item:last-child { border: none; }
.check-icon { font-size: 1rem; width: 24px; text-align: center; }
.check-label { font-weight: 600; color: #334155; font-size: 0.9rem; min-width: 180px; }
.check-msg { color: #64748b; font-size: 0.85rem; }

/* AI Section */
.toggle-wrapper { display: flex; align-items: center; gap: 1rem; }

.toggle {
  position: relative; display: inline-block; width: 52px; height: 28px;
}

.toggle input { opacity: 0; width: 0; height: 0; }

.toggle-slider {
  position: absolute; inset: 0; background: #cbd5e1; border-radius: 28px;
  cursor: pointer; transition: 0.3s;
}

.toggle-slider::before {
  content: ''; position: absolute; left: 3px; top: 3px;
  width: 22px; height: 22px; background: white; border-radius: 50%;
  transition: 0.3s; box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.toggle input:checked + .toggle-slider { background: linear-gradient(135deg, #3b82f6, #1d4ed8); }
.toggle input:checked + .toggle-slider::before { transform: translateX(24px); }

.toggle-label { font-weight: 600; font-size: 0.9rem; color: #334155; }

.btn-generate {
  background: linear-gradient(135deg, #8b5cf6, #6d28d9); color: white;
  border: none; padding: 0.75rem 1.5rem; border-radius: 10px;
  font-weight: 600; cursor: pointer; transition: all 0.3s;
}

.btn-generate:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(139,92,246,0.4); }
.btn-generate:disabled { opacity: 0.5; transform: none; }

.ai-hint { color: #64748b; font-size: 0.85rem; margin-top: 0.75rem; }
.last-run { color: #94a3b8; font-size: 0.85rem; margin-top: 0.75rem; font-style: italic; }

/* Appearance */
.code-textarea {
  font-family: 'Courier New', monospace; font-size: 0.85rem;
  background: #1e293b; color: #e2e8f0; border: none; padding: 1rem;
}

/* Save notification */
.save-notification {
  position: fixed; bottom: 2rem; right: 2rem; padding: 1rem 1.5rem;
  background: #ef4444; color: white; border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2); font-weight: 600;
  animation: slideIn 0.3s ease; z-index: 1000;
}

.save-notification.success { background: linear-gradient(135deg, #10b981, #059669); }

@keyframes slideIn {
  from { transform: translateX(400px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

/* Loading */
.loading-state { text-align: center; padding: 4rem; color: #64748b; }
.spinner {
  width: 40px; height: 40px; border: 3px solid #e2e8f0; border-top-color: #3b82f6;
  border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 1rem;
}
@keyframes spin { to { transform: rotate(360deg); } }

@media (max-width: 768px) {
  .tab-nav { flex-wrap: wrap; }
  .tab-label { display: none; }
  .form-grid { grid-template-columns: 1fr; }
  .page-header { flex-direction: column; gap: 1rem; }
  .cf-actions { flex-direction: column; }
}
</style>
