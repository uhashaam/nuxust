
<template>
  <div class="upgrade-page">
    <header class="page-header">
      <h1>Upgrade Your Plan</h1>
      <p class="subtitle">Unlock more publishing power and exclusive features</p>
    </header>

    <div v-if="pending" class="loading">
      <el-skeleton :rows="5" animated />
    </div>

    <div v-else-if="error" class="error-state">
      <el-result icon="error" title="Failed to load plans" sub-title="Please try again later">
        <template #extra>
          <el-button type="primary" @click="refresh">Retry</el-button>
        </template>
      </el-result>
    </div>

    <div v-else class="pricing-grid">
      <el-card v-for="plan in plans" :key="plan.id" class="pricing-card" :class="{ 'featured': plan.name === 'VIP2' }">
        <div class="plan-header">
          <h3>{{ plan.name }}</h3>
          <div class="price">
            <span class="currency">$</span>
            <span class="amount">{{ plan.price }}</span>
            <span class="period">/year</span>
          </div>
        </div>

        <ul class="features-list">
          <li>
            <el-icon><Check /></el-icon>
            {{ plan.limit }} Publish Limit
          </li>
          <li>
            <el-icon><Check /></el-icon>
            Priority Support
          </li>
          <li>
            <el-icon><Check /></el-icon>
            Advanced Analytics
          </li>
        </ul>

        <div class="plan-footer">
          <el-button 
            type="primary" 
            size="large" 
            class="action-btn" 
            :plain="plan.name !== 'VIP2'"
            @click="handleSelectPlan(plan)"
          >
            Upgrade to {{ plan.name }}
          </el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Check } from '@element-plus/icons-vue'

interface Plan {
  id: string
  name: string
  price: number
  limit: string
  status: string
}

const { data, pending, error, refresh } = await useFetch('/api/plans')

// Typing the response if needed, or trusting the API
const plans = computed(() => (data.value as any)?.data || [])

const { fetchUser } = useAuth()

const handleSelectPlan = async (plan: any) => {
  try {
    await ElMessageBox.confirm(
      `You are selecting ${plan.name} for $${plan.price}/year. Proceed to checkout?`,
      'Confirm Upgrade',
      {
        confirmButtonText: 'Proceed',
        cancelButtonText: 'Cancel',
        type: 'info',
      }
    )
    
    // Call the real API to update Lark Base
    await $fetch('/api/auth/update-plan', {
      method: 'POST',
      body: { planId: plan.id }
    })
    
    await fetchUser() // Refresh local auth state
    
    ElMessage({
      type: 'success',
      message: `Successfully upgraded to ${plan.name}! Your limits have been updated.`,
    })
    
    navigateTo('/dashboard')
  } catch (error: any) {
    if (error !== 'cancel') {
      ElMessage.error(error.message || 'Failed to process upgrade')
    }
  }
}

definePageMeta({
  layout: 'default', // Or dashboard layout
  middleware: 'auth'
})
</script>

<style scoped>
.upgrade-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.125rem;
  color: #64748b;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.pricing-card {
  border-radius: 16px;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
}

.pricing-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.featured {
  border: 2px solid #3b82f6;
  position: relative;
}

.plan-header {
  text-align: center;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 1.5rem;
}

.plan-header h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 0.5rem;
}

.price {
  display: flex;
  justify-content: center;
  align-items: baseline;
  color: #0f172a;
}

.currency {
  font-size: 1.5rem;
  font-weight: 600;
  margin-right: 2px;
}

.amount {
  font-size: 3rem;
  font-weight: 700;
}

.period {
  color: #64748b;
  margin-left: 0.5rem;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
  flex: 1;
}

.features-list li {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  color: #475569;
}

.features-list li .el-icon {
  color: #10b981;
  margin-right: 0.75rem;
}

.action-btn {
  width: 100%;
}
</style>
