<template>
  <app-spinner v-if="isLoading" />
  <div v-else class="app-card">
    <div class="app-card-image">
      <img :src="srcImg" :alt="product.name"/>
    </div>
    <div class="app-card-data">
      <div class="app-card-title">{{ product.name }}</div>
      <div class="app-card-description">{{ product.description }}</div>
      <div class="app-card-cost">{{ thousandSeparator }} руб.</div>
    </div>
    <div class="app-card-btn-remove" @click="removeProduct(product.id)">
      <svg-icon icon-class="delete" />
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
    },
  },
  data() {
    return {
      isLoading: true,
      srcImg: null,
    }
  },
  computed: {
    thousandSeparator() {
      return this.product.cost.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    },
  },
  async mounted() {
    await this.loadImage(this.product.src)
  },
  methods: {
    ...mapMutations({ removeProduct: 'localStorage/removeProduct' }),
    async loadImage(src) {
      this.isLoading = true
      const notFoundImage = 'https://avatars.mds.yandex.net/i?id=9ff166a0628906bb1acb5b3f20031f9d-5485004-images-thumbs&n=13'
      await this.httpGet(`${src}`)
        .then(() => {
          this.srcImg = src
          this.isLoading = false
        })
        .catch(() => {
          this.srcImg = notFoundImage
          this.isLoading = false
        })
    },
    httpGet(url) {
      return new Promise(function(resolve, reject) {

        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onload = function() {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            const error = new Error(this.statusText);
            error.code = this.status;
            reject(error);
          }
        };

        xhr.onerror = function() {
          reject(new Error("Network Error"));
        };

        xhr.send();
      })
    },
  }
}
</script>

<style lang="sass" scoped>
  .app-card
    position: relative
    background: #FFFEFB
    box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04), 0px 6px 10px rgba(0, 0, 0, 0.02)
    border-radius: 4px
    height: 423px
    flex-basis: 48%
    min-width: 180px
    max-width: 332px
    display: flex
    flex-direction: column
    font-family: 'Source Sans Pro'
    color: #3F3F3F
    &:hover
      .app-card-btn-remove
        opacity: 1
    &-image
      position: relative
      &::after
        display: block
        content: ''
        padding-bottom: 56.25%
      img
        position: absolute
        left: 0
        top: 0px
        width: 100%
        height: 100%
        border-radius: 4px 4px 0 0
    &-data
      display: flex
      flex-grow: 1
      flex-direction: column
      padding: 16px
      box-sizing: border-box
      grid-gap: 16px
      height: 100%
      max-height: 248px
    &-title
      font-weight: 600
      font-size: 20px
      line-height: 25px
      overflow: hidden
      text-overflow: ellipsis
      white-space: pre-wrap
    &-description
      font-weight: 400
      font-size: 16px
      line-height: 20px
      overflow: hidden
      text-overflow: ellipsis
      white-space: pre-wrap
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
      cursor: pointer
      svg
        width: 16px
        height: 16px

  @media (max-width: 991px)
    .app-card
      flex-basis: 32%

  @media (max-width: 667px)
    .app-card
      flex-basis: 48%

  @media (max-width: 575px)
    .app-card
      flex-basis: 100%

</style>
