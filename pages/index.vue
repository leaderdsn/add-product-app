<template>
  <div class="index-page">
    <div class="container">
      <AppMobileMenu v-if="isMobileWidth" @showSidebar="showSidebar" />
      <AppSidebar
        :is-mobile-width="isMobileWidth"
        :sidebar-show="sidebarShow"
        @hiddenSidebar='hiddenSidebar'
      />
      <AppProducts />
    </div>
  </div>
</template>

<script>
import AppSidebar from '@/components/AppSidebar.vue';
import AppProducts from '@/components/AppProducts.vue';
import AppMobileMenu from '@/components/AppMobileMenu.vue';
export default {
  name: "IndexPage",
  components: { AppSidebar, AppProducts, AppMobileMenu },
  data() {
    return {
      isMobileWidth: false,
      sidebarShow: false,
      isLoading: false,
      window: {
        width: 0,
        height: 0,
      },
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    showSidebar() {
      this.sidebarShow = true
    },
    hiddenSidebar() {
      this.sidebarShow = false
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
      if (this.window.width <= 991) {
        this.isMobileWidth = true;
      } else {
        this.isMobileWidth = false;
      }
    },
  }
}
</script>
