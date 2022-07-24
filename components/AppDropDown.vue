<template>
  <div class="app-dropdown">
    <button class="app-dropdown-btn">
      <span class="app-dropdown-btn-content">
        {{ sortKey }}
        <span class="app-dropdown-btn-angle-down" :class="{'app-dropdown-btn-angle-down--selected': isDropDownShow }" @click="dropDownShow"></span>
      </span>
      <ul v-if="isDropDownShow" class="app-dropdown-btn-list">
        <li v-for="item in listKey" :key="item" @click.stop="selectItem">{{ item }}</li>
      </ul>
    </button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'AppDropDown',
  data() {
    return {
      isDropDownShow: false,
      sortKey: 'По умолчанию',
      listKey: [
        'По умолчанию',
        'По наименованию',
        'По цене min',
        'По цене max'
      ]
    }
  },
  methods: {
    ...mapMutations({ sortProducts: 'localStorage/sortProducts' }),
    dropDownShow() {
      this.isDropDownShow = !this.isDropDownShow
    },
    selectItem(e) {
      const keyValue = e.target.innerHTML
      this.isDropDownShow = false
      this.sortKey = keyValue
      this.sortProducts(keyValue)
    },
  }
}
</script>

<style lang="sass" scoped>
  .app-dropdown
    width: 140px
    background: #FFFEFB
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1)
    border-radius: 4px
    border: 0
    box-sizing: border-box
    height: auto
    position: relative
    &-btn
      width: 100%
      background: #FFFEFB
      border: 0
      border-radius: 4px
      font-family: 'Source Sans Pro'
      font-weight: 400
      font-size: 12px
      line-height: 15px
      color: #B4B4B4
      box-shadow: none
      padding: 0
      &-content
        display: flex
        grid-gap: 5px
        align-items: center
        padding: 10px 16px
        box-sizing: border-box
        justify-content: center
      &-angle-down
        border-bottom: 1px solid #B4B4B4
        border-right: 1px solid #B4B4B4
        transform: rotate(45deg)
        width: 4.59px
        height: 4.59px
        box-sizing: border-box
        transition: 0.3s
        cursor: pointer
        &--selected
          margin-top: 5px
          transform: rotate(-135deg)
      &-list
        width: 100%
        padding: 0
        margin: 0
        border-top: 1px solid #B4B4B4
        border-radius: 0 0 4px 4px
        position: absolute
        bottom: -145px
        left: 0
        z-index: 1
        background: #FFFEFB
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1)
        li
          font-family: "Source Sans Pro"
          font-weight: 400
          font-size: 12px
          line-height: 15px
          color: #B4B4B4
          list-style-type: none
          height: 36px
          align-items: center
          display: flex
          padding: 0px 16px
          box-sizing: border-box
          white-space: nowrap
          &:last-child
            border-radius: 0 0 4px 4px
          &:hover
            background: #7BAE73
            color: #FFFFFF
</style>
