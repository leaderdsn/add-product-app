<template>
  <div class="app-mobile-menu">
    <button class="app-btn-mobile app-mobile-menu-btn" @click="showSidebar">
      <app-svg-icon icon-class="circle-plus-solid" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'AppMobileMenu',
  methods: {
    showSidebar() {
      this.$emit('showSidebar', true)
    }
  }
}
</script>
