<template>
  <div class="plan-card" :class="{ 'is-featured': featured }">
    <div v-if="featured" class="featured-badge">Most Popular</div>
    <div class="plan-header">
      <h3 class="plan-name">{{ plan.name }}</h3>
      <div class="plan-price">
        <span class="currency">$</span>
        <span class="amount">{{ plan.price }}</span>
        <span class="period">/year</span>
      </div>
    </div>
    
    <ul class="plan-features">
      <li>
        <el-icon class="check-icon"><Check /></el-icon>
        <span><strong>{{ plan.limit }}</strong></span>
      </li>
      <li>
        <el-icon class="check-icon"><Check /></el-icon>
        <span>Standard News Viewing</span>
      </li>
      <li>
        <el-icon class="check-icon"><Check /></el-icon>
        <span>Personal Center Dashboard</span>
      </li>
      <li v-if="plan.price > 100">
        <el-icon class="check-icon"><Check /></el-icon>
        <span>Priority Support</span>
      </li>
    </ul>

    <el-button 
      :type="featured ? 'primary' : 'default'" 
      size="large" 
      class="select-btn"
      @click="$emit('select', plan)"
    >
      Choose {{ plan.name }}
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { Check } from '@element-plus/icons-vue'

interface Plan {
  id: string
  name: string
  price: number
  limit: string
}

defineProps<{
  plan: Plan
  featured?: boolean
}>()

defineEmits(['select'])
</script>

<style scoped>
.plan-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 2.5rem;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
}

.plan-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  border-color: #3b82f6;
}

.is-featured {
  border: 2px solid #3b82f6;
  scale: 1.05;
  z-index: 1;
}

.featured-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #3b82f6;
  color: white;
  padding: 0.25rem 1rem;
  border-radius: 99px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
}

.plan-header {
  text-align: center;
  margin-bottom: 2rem;
}

.plan-name {
  font-size: 1.5rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 1rem;
}

.plan-price {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.125rem;
}

.currency {
  font-size: 1.5rem;
  font-weight: 600;
  color: #64748b;
}

.amount {
  font-size: 3rem;
  font-weight: 800;
  color: #0f172a;
}

.period {
  color: #64748b;
  font-size: 1rem;
}

.plan-features {
  list-style: none;
  padding: 0;
  margin: 0 0 2.5rem 0;
  flex: 1;
}

.plan-features li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  color: #475569;
}

.check-icon {
  color: #10b981;
  font-size: 1.25rem;
}

.select-btn {
  width: 100%;
  border-radius: 12px;
  font-weight: 700;
}
</style>
