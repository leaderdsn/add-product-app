<template>
  <div class="index-page">
    <AppSidebar />
    <AppProducts />
  </div>
</template>

<script>
import AppSidebar from '@/components/AppSidebar.vue';
import AppProducts from '@/components/AppProducts.vue';
export default {
    name: "IndexPage",
    components: { AppSidebar, AppProducts }
}
</script>

<style lang="sass" scoped>
.index-page
  display: flex
  width: 100%
  max-width: 1400px
  margin: 0 auto
  grid-gap: 16px
  padding: 32px
  box-sizing: border-box
</style>
