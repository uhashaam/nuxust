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
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

.plan-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 24px;
  padding: 3.5rem 2.5rem;
  position: relative;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.08);
  font-family: 'Inter', -apple-system, sans-serif;
}

.plan-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 25px 40px -15px rgba(0, 0, 0, 0.15);
  border-color: #cbd5e1;
}

.is-featured {
  border: 2px solid #4f46e5;
  scale: 1.05;
  z-index: 2;
  box-shadow: 0 25px 50px -12px rgba(79, 70, 229, 0.25);
}

.featured-badge {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #4f46e5 0%, #7e22ce 100%);
  color: white;
  padding: 0.35rem 1.25rem;
  border-radius: 99px;
  font-size: 0.8rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 0 4px 10px rgba(79, 70, 229, 0.3);
}

.plan-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.plan-name {
  font-size: 1.5rem;
  font-weight: 900;
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
  font-weight: 700;
  color: #64748b;
}

.amount {
  font-size: 3.5rem;
  font-weight: 900;
  color: #0f172a;
  line-height: 1;
}

.period {
  color: #64748b;
  font-size: 1rem;
  font-weight: 500;
}

.plan-features {
  list-style: none;
  padding: 0;
  margin: 0 0 3rem 0;
  flex: 1;
}

.plan-features li {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
  color: #475569;
  font-weight: 500;
  font-size: 1.05rem;
}

.check-icon {
  color: #4f46e5;
  font-size: 1.25rem;
  background: rgba(79, 70, 229, 0.1);
  padding: 0.25rem;
  border-radius: 50%;
}

:deep(.select-btn) {
  width: 100%;
  height: 56px;
  border-radius: 14px;
  font-weight: 800;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.is-featured :deep(.select-btn) {
  background: linear-gradient(135deg, #4f46e5 0%, #7e22ce 100%) !important;
  border: none !important;
  box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.4);
  color: white !important;
}

.is-featured :deep(.select-btn:hover) {
  transform: translateY(-2px);
  box-shadow: 0 15px 30px -5px rgba(79, 70, 229, 0.6);
  filter: brightness(1.1);
}

.plan-card:not(.is-featured) :deep(.select-btn) {
  background: #f1f5f9;
  color: #0f172a;
  border: 1px solid #e2e8f0;
}

.plan-card:not(.is-featured) :deep(.select-btn:hover) {
  background: white;
  border-color: #cbd5e1;
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.05);
}

@media (max-width: 768px) {
  .is-featured { scale: 1; z-index: 1; }
  .plan-card { padding: 2.5rem 2rem; }
}
</style>
