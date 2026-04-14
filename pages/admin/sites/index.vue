<template>
  <div class="site-manager">
    <div class="page-header">
      <div class="header-left">
        <h2>🌐 Site Manager</h2>
        <p>Manage all subdomain sites, Cloudflare credentials, SEO & AI news</p>
      </div>
      <button class="btn-primary" @click="navigateTo('/admin/sites/create')">
        ➕ Add New Site
      </button>
    </div>

    <!-- Stats Row -->
    <div class="stats-row">
      <div class="mini-stat">
        <span class="mini-stat-value">{{ sites.length }}</span>
        <span class="mini-stat-label">Total Sites</span>
      </div>
      <div class="mini-stat">
        <span class="mini-stat-value">{{ cfConfiguredCount }}</span>
        <span class="mini-stat-label">CF Connected</span>
      </div>
      <div class="mini-stat">
        <span class="mini-stat-value">{{ aiEnabledCount }}</span>
        <span class="mini-stat-label">AI Active</span>
      </div>
      <div class="mini-stat">
        <span class="mini-stat-value">{{ avgSeoScore }}</span>
        <span class="mini-stat-label">Avg SEO Score</span>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading sites...</p>
    </div>

    <!-- Sites Table -->
    <div v-else class="sites-table-wrapper">
      <table class="sites-table">
        <thead>
          <tr>
            <th>Subdomain</th>
            <th>Industry</th>
            <th>CF Status</th>
            <th>AI News</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="site in sites" :key="site.id" class="site-row">
            <td>
              <div class="subdomain-cell">
                <span class="subdomain-name">{{ site.subdomain }}</span>
                <a :href="`https://${site.subdomain}.b-2b.com`" target="_blank" class="subdomain-link">.b-2b.com ↗</a>
              </div>
            </td>
            <td>
              <span class="industry-badge">{{ site.industryName || '—' }}</span>
            </td>
            <td>
              <span class="status-badge" :class="site.cfConfigured ? 'badge-success' : 'badge-warning'">
                {{ site.cfConfigured ? '✅ Connected' : '⚠️ Not Set' }}
              </span>
            </td>
            <td>
              <span class="status-badge" :class="site.aiNewsEnabled ? 'badge-success' : 'badge-muted'">
                {{ site.aiNewsEnabled ? `🤖 ${site.aiNewsCount}/day` : '⏸ Off' }}
              </span>
            </td>
            <td>
              <span class="status-badge" :class="site.isActive ? 'badge-success' : 'badge-muted'">
                {{ site.isActive ? 'Active' : 'Inactive' }}
              </span>
            </td>
            <td>
              <div class="action-buttons">
                <button class="btn-sm btn-edit" @click="navigateTo(`/admin/sites/${site.id}`)">
                  ✏️ Edit
                </button>
                <button class="btn-sm btn-view" @click="openSite(site.subdomain)">
                  👁️
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="sites.length === 0">
            <td colspan="7" class="empty-state">
              <div class="empty-content">
                <span class="empty-icon">🌐</span>
                <p>No sites yet. Click "Add New Site" to get started.</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })

const loading = ref(true)
const sites = ref<any[]>([])

const cfConfiguredCount = computed(() => sites.value.filter(s => s.cfConfigured).length)
const aiEnabledCount = computed(() => sites.value.filter(s => s.aiNewsEnabled).length)
const avgSeoScore = computed(() => {
  // Placeholder — real score comes from site detail API
  return '—'
})

const fetchSites = async () => {
  loading.value = true
  try {
    const res = await $fetch<any>('/api/admin/sites')
    sites.value = res.sites || []
  } catch (e) {
    console.error('Failed to fetch sites:', e)
  } finally {
    loading.value = false
  }
}

const openSite = (subdomain: string) => {
  window.open(`https://${subdomain}.b-2b.com`, '_blank')
}

onMounted(fetchSites)
</script>

<style scoped>
.site-manager {
  max-width: 1400px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.page-header h2 {
  margin: 0 0 0.5rem;
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
}

.page-header p {
  margin: 0;
  color: #64748b;
}

.btn-primary {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

/* Stats Row */
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.mini-stat {
  background: white;
  border-radius: 12px;
  padding: 1.25rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  border: 1px solid #f1f5f9;
}

.mini-stat-value {
  display: block;
  font-size: 1.75rem;
  font-weight: 800;
  color: #1e293b;
}

.mini-stat-label {
  font-size: 0.8rem;
  color: #64748b;
  font-weight: 500;
}

/* Table */
.sites-table-wrapper {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}

.sites-table {
  width: 100%;
  border-collapse: collapse;
}

.sites-table thead {
  background: linear-gradient(135deg, #f8fafc, #f1f5f9);
}

.sites-table th {
  padding: 1rem 1.25rem;
  text-align: left;
  font-size: 0.8rem;
  font-weight: 700;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 2px solid #e2e8f0;
}

.sites-table td {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #f1f5f9;
  font-size: 0.9rem;
  color: #334155;
}

.site-row {
  transition: background 0.2s;
}

.site-row:hover {
  background: #f8fafc;
}

.subdomain-cell {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.subdomain-name {
  font-weight: 700;
  color: #1e293b;
  font-size: 0.95rem;
}

.subdomain-link {
  font-size: 0.75rem;
  color: #3b82f6;
  text-decoration: none;
}

.industry-badge {
  background: linear-gradient(135deg, #ede9fe, #ddd6fe);
  color: #6d28d9;
  padding: 0.3rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.status-badge {
  padding: 0.3rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
}

.badge-success { background: #dcfce7; color: #166534; }
.badge-warning { background: #fef3c7; color: #92400e; }
.badge-muted { background: #f1f5f9; color: #64748b; }

.promo-link {
  color: #3b82f6;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
}

.promo-link:hover { text-decoration: underline; }
.text-muted { color: #94a3b8; }

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.btn-sm {
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-edit {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
}

.btn-edit:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(59,130,246,0.3);
}

.btn-view {
  background: #f1f5f9;
  color: #475569;
}

.btn-view:hover {
  background: #e2e8f0;
}

/* Loading */
.loading-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #64748b;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e2e8f0;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin { to { transform: rotate(360deg); } }

.empty-state {
  text-align: center;
  padding: 3rem;
}

.empty-content {
  color: #94a3b8;
}

.empty-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .page-header { flex-direction: column; gap: 1rem; }
  .stats-row { grid-template-columns: repeat(2, 1fr); }
  .sites-table-wrapper { overflow-x: auto; }
}
</style>
