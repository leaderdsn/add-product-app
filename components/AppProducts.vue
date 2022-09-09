<template>
  <div class="app-products">
    <div class="app-products-panel">
      <AppDropDown :isPoducts="products.length !== 0"/>
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
import AppDropDown from '@/components/AppDropDown.vue'
export default {
  name: 'AppProducts',
  components: {
    AppCard,
    AppDropDown
  },
  computed: {
    ...mapGetters({ products: 'localStorage/getProducts' })
  }
}
</script>
