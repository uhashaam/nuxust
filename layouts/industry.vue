<template>
  <div class="industry-layout">
    <!-- Dynamic Header -->
    <div v-if="siteData">
      <component 
        :is="headerComponent" 
        :industry-name="siteData.industryName"
        :site-domain="'b-2b.com'"
        :subdomain="subdomain"
      />
    </div>
    <TheHeader v-else-if="!pending" :subdomain="subdomain" />

    <main class="page-content">
      <slot />
    </main>

    <!-- Dynamic Footer -->
    <div v-if="siteData">
      <component 
        :is="footerComponent" 
        :industry-name="siteData.industryName"
        :site-domain="'b-2b.com'"
        :brand-name="siteData.industryName"
        :subdomain="subdomain"
      />
    </div>
    <TheFooter v-else-if="!pending" :subdomain="subdomain" />
  </div>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import { useRoute, useAsyncData, resolveComponent } from '#imports'
import TheHeader from '~/components/TheHeader.vue'
import TheFooter from '~/components/TheFooter.vue'

const route = useRoute()
const subdomain = computed(() => route.params.subdomain as string)

const { data, pending } = await useAsyncData(`layout-site-${subdomain.value}`, () => 
  $fetch(`/api/industry-sites/${subdomain.value}`)
, {
  watch: [subdomain]
})

const siteData = computed(() => data.value?.site as any)

const headerComponent = computed(() => {
  if (!siteData.value) return TheHeader
  const idValue = siteData.value.headerStyleId || 1
  return resolveComponent(`Header${String(idValue).padStart(2, '0')}`)
})

const footerComponent = computed(() => {
  if (!siteData.value) return TheFooter
  const idValue = siteData.value.footerStyleId || 1
  return resolveComponent(`Footer${String(idValue).padStart(2, '0')}`)
})

provide('industrySiteData', siteData)
</script>

<style scoped>
.industry-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

:global(body) {
  margin: 0 !important;
  padding: 0 !important;
  overflow-x: hidden;
  background: #f8fafc;
}

.page-content {
  flex: 1;
}
</style>
