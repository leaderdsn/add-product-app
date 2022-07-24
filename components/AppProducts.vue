<template>
  <div class="app-products">
    <div class="app-products-panel">
      <app-drop-down />
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
  name: "AppProducts",
  components: {
    AppCard,
    AppDropDown,
  },
  computed: {
    ...mapGetters({ products: 'localStorage/getProducts' }),
  },
  methods: {}
}
</script>

<style lang="sass" scoped>
  .app-products
    display: flex
    width: calc(100% - 348px)
    margin-left: 348px
    grid-gap: 16px
    flex-direction: column
    position: relative
    &-panel
      position: relative
      background: #FFFFFF
      display: flex
      width: 100%
      align-items: flex-end
      justify-content: flex-end
    &-list
      display: flex
      grid-gap: 16px
      flex-wrap: wrap

  @media (max-width: 991px)
    .app-products
      margin-left: 0px
      width: 100%
      &-panel
        position: relative
        right: 0
        height: auto
        width: 100%
      &-list
        margin-top: 0

  @media (max-width: 575px)
    .app-products
      &-list
        justify-content: center
</style>
