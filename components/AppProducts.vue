<template>
  <div class="app-products">
    <div class="app-products-panel">
      <app-dropdown />
    </div>
    <div class="app-products-list">
      <AppCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppCard from '@/components/AppCard.vue'
import AppDropdown from '@/components/AppDropdown.vue'
export default {
  name: 'AppProducts',
  components: {
    AppCard,
    AppDropdown
  },
  computed: {
    ...mapGetters({ products: 'localStorage/getProducts' })
  }
}
</script>
