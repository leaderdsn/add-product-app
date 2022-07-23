<template>
  <div class="app-mobile-menu">
    <button class="btn-show-sidebar" @click="showSidebar">
      <svg-icon icon-class="circle-plus-solid" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'AppMobileMenu',
  methods: {
    showSidebar() {
      this.$emit('showSidebar', true)
    },
  }

}
</script>

<style lang="sass" scoped>
  .app-mobile-menu
    position: fixed
    top: 10px
    left: -60px
    z-index: 1
    width: 60px
    padding: 10px
    box-sizing: border-box
    margin: 10px
    border-radius: 30px
    height: calc(100% - 42px)
    background: #EEEEEE
    transition: 0.3s
    &:hover
      left: 10px
    .btn-show-sidebar
      width: 40px
      height: 40px
      border-radius: 50%
      border: 0
      padding: 0
      cursor: pointer
      background: #FFFFFF
      color: #7BAE73
      transition: 0.3s
      &:hover
        color: #668361
      .svg-icon
        width: 100%
        height: 100%
</style>
