<template>
  <div class="app-products">
    <div class="app-products-panel">
      <button class="app-btn"> По умолчанию <span class="angle-down"></span></button>
    </div>
    <div class="app-products-list">
      <AppCard v-for="product in products" :key="product.id" :product="product"/>
    </div>
  </div>
</template>

<script>
import AppCard from '@/components/AppCard.vue'
export default {
  name: "AppProducts",
  components: {
    AppCard,
  },
  data() {
    return {
      products: [
        {
          id: 1,
          title: 'Наименование товара',
          description: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
          src: 'https://catherineasquithgallery.com/uploads/posts/2021-02/1612606898_85-p-telezhka-na-zelenom-fone-155.png',
          cost: '10 000'
        },
        {
          id: 2,
          title: 'Наименование товара',
          description: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
          src: 'https://catherineasquithgallery.com/uploads/posts/2021-02/1612606898_85-p-telezhka-na-zelenom-fone-155.png',
          cost: '10 000'
        },
        {
          id: 3,
          title: 'Наименование товара',
          description: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
          src: 'https://catherineasquithgallery.com/uploads/posts/2021-02/1612606898_85-p-telezhka-na-zelenom-fone-155.png',
          cost: '10 000'
        },
        {
          id: 4,
          title: 'Наименование товара',
          description: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
          src: 'https://catherineasquithgallery.com/uploads/posts/2021-02/1612606898_85-p-telezhka-na-zelenom-fone-155.png',
          cost: '10 000'
        },
        {
          id: 5,
          title: 'Наименование товара',
          description: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
          src: 'https://catherineasquithgallery.com/uploads/posts/2021-02/1612606898_85-p-telezhka-na-zelenom-fone-155.png',
          cost: '10 000'
        },
      ]
    }
  },
}
</script>

<style lang="sass" scoped>
  .app-products
    display: flex
    flex-grow: 1
    grid-gap: 16px
    flex-direction: column
    &-panel
      display: flex
      justify-content: flex-end
      button
        display: flex
        grid-gap: 5px
        align-items: center
        .angle-down
          border-bottom: 1px solid #B4B4B4
          border-right: 1px solid #B4B4B4
          transform: rotate(45deg)
          width: 4.59px
          height: 4.59px
          box-sizing: border-box
          transition: 0.3s
          &:hover
            border-color: #3F3F3F
            cursor: pointer
    &-list
      display: flex
      flex-grow: 1
      grid-gap: 16px
      flex-wrap: wrap
</style>
