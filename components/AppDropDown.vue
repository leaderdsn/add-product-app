<template>
  <div class="app-dropdown">
    <button class="app-btn app-dropdown-btn" @click.stop="toggleDropdown">
      <span class="app-dropdown-btn-content">
        {{ sortKey }}
        <span class="app-dropdown-btn-angle-down" :class="{'app-dropdown-btn-angle-down--selected': isDropdown }"></span>
      </span>
      <ul v-if="isDropdown" class="app-dropdown-btn-list">
        <li v-for="item in listKey" :key="item" @click.stop="selectItem">{{ item }}</li>
      </ul>
    </button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'AppDropdown',
  data() {
    return {
      isDropdown: false,
      sortKey: 'По умолчанию',
      listKey: [
        'По умолчанию',
        'По наименованию',
        'По цене min',
        'По цене max'
      ]
    }
  },
  mounted() {
    document.addEventListener('click', () => this.hiddenDropdown())
  },
  methods: {
    ...mapMutations({ sortProducts: 'localStorage/sortProducts' }),
    toggleDropdown() {
      this.isDropdown = !this.isDropdown
    },
    hiddenDropdown() {
      this.isDropdown = false
    },
    selectItem(e) {
      const keyValue = e.target.innerHTML
      this.isDropdown = false
      this.sortKey = keyValue
      this.sortProducts(keyValue)
    },
  }
}
</script>
