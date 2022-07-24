<template>
  <div class="index-page">
    <div class="container">
      <AppMobileMenu v-if="isMobileWidth" @showSidebar="showSidebar" />
      <AppSidebar
        :is-mobile-width="isMobileWidth"
        :sidebar-show="sidebarShow"
        @addProduct="addProduct"
        @hiddenSidebar='hiddenSidebar'
      />
      <AppProducts
        :products="filteredProducts"
        @removeProduct="removeProduct"
        @selectItem="selectItem"
      />
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
      typeSort: 'По умолчанию',
      isLoading: false,
      window: {
        width: 0,
        height: 0,
      },
      products: [
        {
          id: '1',
          name: 'Наименование товара 1',
          description: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
          src: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          cost: '12000'
        },
        {
          id: '2',
          name: 'Наименование товара 2',
          description: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
          src: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          cost: '5000'
        },
        {
          id: '3',
          name: 'Наименование товара 3',
          description: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
          src: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          cost: '3000'
        },
        {
          id: '4',
          name: 'Наименование товара 4',
          description: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
          src: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          cost: '8000'
        },
        {
          id: '5',
          name: 'Наименование товара 5',
          description: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
          src: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          cost: '10000'
        },
      ]
    }
  },
  computed: {
    filteredProducts() {
      const { products, typeSort } = this
      let sortedProducts = products

      if (typeSort === 'По цене min') {
        sortedProducts = sortedProducts.sort((a,b) => {
          return a.cost - b.cost
        })
      } else if (typeSort === 'По цене max') {
        sortedProducts = sortedProducts.sort((a,b) => {
          return b.cost - a.cost
        })
      } else if (typeSort === 'По наименованию') {
        sortedProducts = sortedProducts.sort((a,b) => {
          const fa = a.name.toLowerCase()
          const fb = b.name.toLowerCase()
          if (fa < fb) {
            return -1
          }
          if (fa > fb) {
            return 1
          }
          return 0
        })
      }
      return sortedProducts
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
    selectItem(item) {
      this.typeSort = item
    },
    showSidebar() {
      this.sidebarShow = true
    },
    hiddenSidebar() {
      this.sidebarShow = false
    },
    addProduct(product) {
      this.products.push(product)
    },
    removeProduct(id) {
      this.products = this.products.filter((item) => {
        return item.id !== id
      })
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

<style lang="sass" scoped>
.index-page
  width: 100%
  .container
    display: flex
    width: 100%
    max-width: 1440px
    margin: 0 auto
    grid-gap: 16px
    padding: 32px
    box-sizing: border-box

@media (max-width: 991px)
  .container
    padding: 20px
</style>
