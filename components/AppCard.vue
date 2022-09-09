<template>
  <app-spinner v-if="isLoading" />
  <div v-else class="app-card">
    <div class="app-card-image">
      <img
        :src="urlImg"
        :alt="product.name"
        @error="onErrorImage"
      />
    </div>
    <div class="app-card-data">
      <div class="app-card-title">{{ product.name }}</div>
      <div class="app-card-description">{{ product.description }}</div>
      <div class="app-card-cost">{{ thousandSeparator }} руб.</div>
    </div>
    <div class="app-card-btn-remove" @click="removeProduct(product.id)">
      <app-svg-icon icon-class="delete" />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import AppSpinner from '@/components/AppSpinner.vue'
export default {
  name: 'AppCard',
  components: { AppSpinner },
  props: {
    product: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isLoading: true,
      urlImg: null,
      isNotFoundImage: false
    }
  },
  computed: {
    thousandSeparator() {
      return this.product.cost.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    }
  },
  async mounted() {
    await this.loadImage(this.product.url)
  },
  methods: {
    ...mapMutations({ removeProduct: 'localStorage/removeProduct' }),
    onErrorImage(e) {
      return e.target.src = require('~/assets/img/not-found.webp')
    },
    async loadImage(url) {
      this.isLoading = true
      await fetch(url, {mode: 'no-cors'})
        .then(() => {
          this.urlImg = url
          this.isLoading = false
        })
    }
  }
}
</script>
