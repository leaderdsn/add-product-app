<template>
  <div class="index-page">
    <div class="container">
      <AppMobileMenu v-if="isMobileWidth" @showSidebar="showSidebar" />
      <AppSidebar :is-mobile-width="isMobileWidth" :sidebar-show="sidebarShow" @addProduct="addProduct" @hiddenSidebar='hiddenSidebar' />
      <AppProducts :products="products" @removeProduct="removeProduct" />
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
      window: {
        width: 0,
        height: 0,
      },
      products: [
        {
          id: '1',
          name: 'Наименование товара',
          description: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
          src: 'https://catherineasquithgallery.com/uploads/posts/2021-02/1612606898_85-p-telezhka-na-zelenom-fone-155.png',
          cost: '10 000'
        },
        {
          id: '2',
          name: 'Наименование товара',
          description: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
          src: 'https://catherineasquithgallery.com/uploads/posts/2021-02/1612606898_85-p-telezhka-na-zelenom-fone-155.png',
          cost: '10 000'
        },
        {
          id: '3',
          name: 'Наименование товара',
          description: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
          src: 'https://catherineasquithgallery.com/uploads/posts/2021-02/1612606898_85-p-telezhka-na-zelenom-fone-155.png',
          cost: '10 000'
        },
        {
          id: '4',
          name: 'Наименование товара',
          description: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
          src: 'https://catherineasquithgallery.com/uploads/posts/2021-02/1612606898_85-p-telezhka-na-zelenom-fone-155.png',
          cost: '10 000'
        },
        {
          id: '5',
          name: 'Наименование товара',
          description: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
          src: 'https://catherineasquithgallery.com/uploads/posts/2021-02/1612606898_85-p-telezhka-na-zelenom-fone-155.png',
          cost: '10 000'
        },
      ]
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
    async addProduct(product) {
      await this.products.push(product)
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

// @media (max-width: 1439px)
//   .index-page
//     .container
//       flex-grow: 1

@media (max-width: 991px)
  .container
    padding: 20px
</style>
