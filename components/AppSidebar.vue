<template>
  <div class="app-sidebar" :class="{'sidebar-show' : sidebarShow && isMobileWidth}">
    <h1>
      <button class="btn-close-sidebar" @click="hiddenSidebar">
        <svg-icon icon-class="close" />
      </button>
      Добавление товара
    </h1>
    <form class="form" @submit="onSubmit">
      <label class="form-textfield">
        Наименование товара
        <input v-model="form.name" placeholder="Введите наименование товара" type="text"/>
        <small v-if="errors.name !== null">{{ errors.name }}</small>
      </label>
      <label class="form-textfield">
        Введите описание товара
        <textarea v-model="form.description" placeholder="Введите описание товара"></textarea>
      </label>
      <label class="form-textfield">
        Ссылка на изображение товара
        <input v-model="form.src" type="text" placeholder="Введите ссылку"/>
        <small v-if="errors.src !== null">{{ errors.src }}</small>
      </label>
      <label class="form-textfield">
        Цена товара
        <input
          v-model="cost"
          type="text"
          placeholder="Введите цену товара"
          onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"
          @blur="thousandSeparatorBlur"
          @change="thousandSeparator"
        />
        <small v-if="errors.cost !== null">{{ errors.cost }}</small>
      </label>
      <button class="app-btn-primary form-btn" type="submit">Добавить товар</button>
    </form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'AppSidebar',
  props: {
    isMobileWidth: {
      type: Boolean,
      default: () => false
    },
    sidebarShow: {
      type: Boolean,
      default: () => false
    },
  },
  data() {
    return {
      form: {},
      GUID: null,
      errors: {
        name: null,
        src: null,
        cost: null,
      },
      cost: '',
    }
  },
  methods: {
    ...mapMutations({ addProduct: 'localStorage/addProduct' }),
    thousandSeparator(e) {
      this.form.cost = e.target.value
    },
    thousandSeparatorBlur(e) {
      const str = e.target.value
      this.cost = str.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    },
    hiddenSidebar() {
      this.$emit('hiddenSidebar', false)
    },
    createNewUUID() {
      this.GUID = this.generateUUID();
    },
    generateUUID() {
        let d = new Date().getTime();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
            d += performance.now();
        }
        const newGuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });

        return newGuid;
    },
    onSubmit(e) {
      e.preventDefault();
      const { name, src, cost } = this.form
      if (name && src && cost) {
        this.createNewUUID()
        this.form.id = this.GUID
        this.addProduct(this.form)
        this.form = {}
        this.cost = ''
      }

      this.errors = {
        name: null,
        src: null,
        cost: null,
      };

      if (!name) {
        this.errors.name = 'Требуется указать наименование товара'
      }
      if (!src) {
        this.errors.src = 'Требуется указать ссылку на изображение товара'
      }
      if (!cost) {
        this.errors.cost = 'Требуется указать стоимость товара'
      }
    },
  }
}
</script>

<style lang="sass" scoped>
  .app-sidebar
    display: flex
    position: fixed
    width: 332px
    min-width: 250px
    grid-gap: 16px
    flex-direction: column
    .btn-close-sidebar
      display: none
      cursor: pointer
      background: transparent
      border: 0
      padding: 0
      color: #3F3F3F
  .form
    display: flex
    flex-grow: 1
    flex-basis: 100%
    flex-direction: column
    grid-gap: 16px
    max-height: 440px
    background: #FFFEFB
    box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04), 0px 6px 10px rgba(0, 0, 0, 0.02)
    border-radius: 4px
    padding: 24px
    box-sizing: border-box
    &-textfield
      display: flex
      flex-grow: 1
      flex-basis: 100%
      flex-direction: column
      grid-gap: 4px
    &-btn
      border-radius: 10px
      font-family: 'Inter'
      font-weight: 600
      text-align: center
      letter-spacing: -0.02em
      margin-top: 8px

  label
    position: relative
    font-family: 'Source Sans Pro'
    font-weight: 400
    font-size: 10px
    line-height: 13px
    letter-spacing: -0.02em
    color: #49485E

  small
    position: absolute
    bottom: -14px
    font-family: 'Source Sans Pro'
    font-weight: 400
    font-size: 8px
    line-height: 10px
    letter-spacing: -0.02em
    color: #FF8484

  input,
  textarea
    background: #FFFEFB
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1)
    border-radius: 4px
    border: 0
    height: 36px
    text-indent: 16px
    font-family: 'Source Sans Pro'
    font-weight: 400
    font-size: 12px
    line-height: 15px
    color: #B4B4B4
    padding: 0
    box-sizing: border-box
    &:focus
      outline: none

  textarea
    height: 108px
    padding-top: 16px
    box-sizing: border-box
    resize: none

  @media (max-width: 991px)
    .app-sidebar
      top: 0
      left: -991px
      z-index: 2
      width: 100%
      flex-basis: 100%
      min-width: 280px
      background: #FFFEFB
      grid-gap: 0
      height: 100%
      overflow: auto
      transition: 0.3s
      h1
        position: sticky
        top: 0
        padding: 10px 0
        box-sizing: border-box
        text-align: center
        border-bottom: 1px solid #EEEEEE
        background: #FFFEFB
        .btn-close-sidebar
          display: flex
          position: absolute
          left: 24px
      form
        border-radius: 0
        box-shadow: none
  .sidebar-show
    left: 0
</style>
