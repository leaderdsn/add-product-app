<template>
  <div class="app-card">
    <div class="app-card-image">
      <img :src="product.src" :alt="product.title "/>
    </div>
    <div class="app-card-data">
      <div class="app-card-title">{{ product.title }}</div>
      <div class="app-card-description">{{ product.description }}</div>
      <div class="app-card-cost">{{ product.cost }} руб.</div>
    </div>
    <div class="app-card-btn-remove">
      <svg-icon icon-class="delete" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppCard',
  props: {
    product: {
      type: Object,
      default: () => {}
    }
  }

}
</script>

<style lang="sass" scoped>
  .app-card
    position: relative
    background: #FFFEFB
    box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04), 0px 6px 10px rgba(0, 0, 0, 0.02)
    border-radius: 4px
    flex-basis: 332px
    display: flex
    flex-direction: column
    font-family: 'Source Sans Pro'
    &:hover
      .app-card-btn-remove
        opacity: 1
    &-image
      width: 332px
      height: 200px
      border-radius: 4px 4px 0px 0px
      overflow: hidden
      display: flex
      justify-content: center
      align-items: center
      img
        min-width: 100%
        min-height: 100%
        flex-shrink: 0
    &-data
      display: flex
      flex-grow: 1
      flex-direction: column
      padding: 16px
      box-sizing: border-box
      grid-gap: 16px
    &-title
      font-weight: 600
      font-size: 20px
      line-height: 25px
    &-description
      font-weight: 400
      font-size: 16px
      line-height: 20px
    &-cost
      margin: 16px 0 8px
      font-weight: 600
      font-size: 24px
      line-height: 30px
    &-btn-remove
      position: absolute
      top: -8px
      right: -8px
      width: 32px
      height: 32px
      background: #FF8484
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1)
      border-radius: 10px
      color: #ffffff
      display: flex
      align-items: center
      justify-content: center
      opacity: 0
      transition: 0.3s
      svg
        width: 16px
        height: 16px
</style>
