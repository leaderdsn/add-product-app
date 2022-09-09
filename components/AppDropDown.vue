<template>
  <div class="app-dropdown">
    <button class="app-btn app-dropdown-btn" @click.stop="toggleDropDown">
      <span class="app-dropdown-btn-content">
        {{ sortKey }}
        <span
          class="app-dropdown-btn-angle-down"
          :class="{ 'app-dropdown-btn-angle-down--selected': isDropDown }"
        ></span>
      </span>
      <ul v-if="isDropDown" class="app-dropdown-btn-list">
        <li v-for="item in listKey" :key="item" @click.stop="selectItem">
          {{ item }}
        </li>
      </ul>
    </button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'AppDropDown',
  props: {
    isPoducts: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      isDropDown: false,
      sortKey: 'По умолчанию',
      listKey: ['По умолчанию', 'По наименованию', 'По цене min', 'По цене max']
    }
  },
  mounted() {
    if (this.isDropDown) {
      document.addEventListener('click', () => this.hiddenDropdown())
    }
  },
  methods: {
    ...mapMutations({ sortProducts: 'localStorage/sortProducts' }),
    toggleDropDown() {
      this.isDropDown = !this.isDropDown
    },
    hiddenDropDown() {
      this.isDropDown = false
    },
    selectItem(e) {
      const keyValue = e.target.innerHTML.trim()
      this.isDropDown = false
      this.sortKey = keyValue
      if (this.isPoducts) {
        this.sortProducts(keyValue)
      }
    }
  }
}
</script>
