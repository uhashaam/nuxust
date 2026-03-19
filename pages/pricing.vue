<template>
  <div class="pricing-page">
    <div class="pricing-hero">
      <div class="hero-glow"></div>
      <div class="container hero-content">
        <span class="tag">Pricing</span>
        <h1>Membership Packages</h1>
        <p class="subtitle">
          Choose the right plan to boost your presence in the industrial network.
        </p>
      </div>
    </div>

    <div class="container">
      <div class="plans-grid">
        <PlanCard 
          v-for="(plan, index) in plans" 
          :key="plan.id"
          :plan="plan"
          :featured="index === 1"
          @select="handleSelect"
        />
      </div>

      <div class="custom-solution-card">
        <div class="custom-content">
          <h2>Need a Custom Solution?</h2>
          <p>Contact our sales team for enterprise-level publishing needs and multi-industry support.</p>
        </div>
        <el-button type="primary" size="large" class="sales-btn" @click="navigateTo('/contact')">Contact Sales</el-button>
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
    navigateTo(`/dashboard/upgrade?plan=${plan.id}`)
  } else {
    navigateTo(`/register?plan=${plan.id}`)
  }
}

definePageMeta({ layout: 'default' })

useHead({ title: 'Membership Packages - B2B Network' })
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

.pricing-page {
  background-color: #f8fafc;
  background-image: radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.04), transparent 50%),
                    radial-gradient(circle at 90% 80%, rgba(168, 85, 247, 0.04), transparent 50%);
  color: #0f172a;
  font-family: 'Inter', -apple-system, sans-serif;
  min-height: 100vh;
}

.pricing-hero {
  background: linear-gradient(135deg, #020617 0%, #0f172a 100%);
  padding: 8rem 0 6rem;
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

.pricing-hero h1 {
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
  font-size: 1.35rem;
  color: #cbd5e1;
  max-width: 600px;
  margin: 0 auto;
  font-weight: 500;
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.plans-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  margin-top: -4rem;
  position: relative;
  z-index: 10;
  padding-bottom: 6rem;
}

.custom-solution-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 4rem;
  border-radius: 24px;
  text-align: center;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(226, 232, 240, 0.8);
  margin-bottom: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.custom-content h2 {
  font-size: 2.25rem;
  font-weight: 900;
  color: #0f172a;
  margin-bottom: 1rem;
}

.custom-content p {
  font-size: 1.15rem;
  color: #475569;
  margin-bottom: 2rem;
  max-width: 600px;
}

.sales-btn {
  height: 60px;
  padding: 0 3rem;
  border-radius: 14px;
  font-weight: 800;
  font-size: 1.15rem;
  background: linear-gradient(135deg, #4f46e5 0%, #7e22ce 100%) !important;
  border: none !important;
  box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.4);
  color: white !important;
  transition: all 0.3s ease;
}
.sales-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 30px -5px rgba(79, 70, 229, 0.6);
  filter: brightness(1.1);
}

@media (max-width: 768px) {
  .container { padding: 0 1.5rem; }
  .pricing-hero { padding: 6rem 0 5rem; }
  .pricing-hero h1 { font-size: 2.5rem; }
  .plans-grid { grid-template-columns: 1fr; margin-top: -2rem; gap: 2rem; }
  .custom-solution-card { padding: 3rem 2rem; }
}
</style>
