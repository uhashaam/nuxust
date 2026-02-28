<template>
  <div class="pricing-page">
    <div class="container py-20">
      <div class="text-center mb-16">
        <h1 class="text-4xl font-extrabold text-slate-900 mb-4">Membership Packages</h1>
        <p class="text-lg text-slate-600 max-w-2xl mx-auto">
          Choose the right plan to boost your presence in the industrial network.
        </p>
      </div>

      <div class="plans-grid">
        <PlanCard 
          v-for="(plan, index) in plans" 
          :key="plan.id"
          :plan="plan"
          :featured="index === 1"
          @select="handleSelect"
        />
      </div>

      <div class="mt-20 bg-slate-50 rounded-3xl p-12 text-center">
        <h2 class="text-2xl font-bold text-slate-900 mb-4">Need a Custom Solution?</h2>
        <p class="text-slate-600 mb-8">Contact our sales team for enterprise-level publishing needs and multi-industry support.</p>
        <el-button type="primary" size="large" @click="navigateTo('/contact')">Contact Sales</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PlanCard from '~/components/PlanCard.vue'

const { data: plansData, pending } = await useAsyncData('plans', () => 
  $fetch('/api/plans')
)

const plans = computed(() => plansData.value?.plans || [])

const { user } = useAuth()

const handleSelect = (plan: any) => {
  if (user.value) {
    // Already logged in — go straight to the upgrade flow in the dashboard
    navigateTo(`/dashboard/upgrade?plan=${plan.id}`)
  } else {
    // Guest — go to register, pre-selecting the desired plan
    navigateTo(`/register?plan=${plan.id}`)
  }
}

definePageMeta({
  layout: 'default'
})

useHead({
  title: 'Membership Packages - B2B Network'
})
</script>

<style scoped>
.pricing-page {
  background: white;
  min-height: 100vh;
}

.plans-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.py-20 {
  padding-top: 5rem;
  padding-bottom: 5rem;
}

.text-center { text-align: center; }
.mb-16 { margin-bottom: 4rem; }
.text-4xl { font-size: 2.5rem; }
.font-extrabold { font-weight: 800; }
.text-slate-900 { color: #0f172a; }
.mb-4 { margin-bottom: 1rem; }
.text-lg { font-size: 1.125rem; }
.text-slate-600 { color: #64748b; }
.max-w-2xl { max-width: 42rem; }
.mx-auto { margin-left: auto; margin-right: auto; }
</style>
