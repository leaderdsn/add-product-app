<template>
  <div class="app-sidebar" :class="{'sidebar-show' : sidebarShow && isMobileWidth}">
    <h1>
      <button class="btn-close-sidebar" @click="hiddenSidebar">
        <svg-icon icon-class="close" />
      </button>
      Добавление товара
    </h1>
    <form class="form" @submit.prevent="onSubmit">
      <div class="form-group">
        <label class="control-label required" for="name">Наименование товара</label>
        <input v-model="form.name" type="text" name="name" placeholder="Введите наименование товара" class="form-control" :class="{'is-invalid': $v.form.name.$error}">
        <small v-if="$v.form.name.$error && !$v.form.name.required" class="invalid-feedback"> Поле является обязательным </small>
        <small v-if="$v.form.name.$error && !$v.form.name.minLength" class="invalid-feedback"> Длина наименование не может быть меньше 3-х </small>
      </div>
      <div class="form-group">
        <label class="control-label" for="description">Введите описание товара</label>
        <textarea v-model="form.description" name="description" placeholder="Введите описание товара" maxlength="1000" class="form-control"></textarea>
      </div>
      <div class="form-group">
        <label class="control-label required" for="url">Ссылка на изображение товара</label>
        <input v-model="form.url" type="text" name="url" placeholder="Введите ссылку" class="form-control" :class="{'is-invalid': $v.form.url.$error}">
        <small v-if="$v.form.url.$error && !$v.form.url.required" class="invalid-feedback"> Поле является обязательным </small>
        <small v-if="$v.form.url.$error && !$v.form.url.url" class="invalid-feedback"> Некоректный URL </small>
      </div>
      <div class="form-group">
        <label class="control-label required" for="cost">Цена товара</label>
        <input
          v-model.number="form.cost"
          type="text"
          name="cost"
          placeholder="Введите цену товара"
          class="form-control"
          :class="{'is-invalid': $v.form.cost.$error}"
          onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"
          @change="thousandSeparator"
        >
        <small v-if="$v.form.cost.$error && !$v.form.cost.required" class="invalid-feedback"> Поле является обязательным </small>
      </div>
      <button class="app-btn-primary form-btn" type="submit" :disabled="invalid">Добавить товар</button>
    </form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, minLength, url } from 'vuelidate/lib/validators'
export default {
  name: 'AppSidebar',
  mixins: [validationMixin],
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
    }
  },
  validations: {
    form: {
      name: { required, minLength: minLength(3) },
      url: { required, url },
      cost: { required },
    }
  },
  computed: {
    invalid() {
      let res = true
      for (const i in this.form) {
        if(this.form[i] !== '' ) {
          res = false
        }
      }
      return res
    }
  },
  methods: {
    ...mapMutations({ addProduct: 'localStorage/addProduct' }),
    thousandSeparator(e) {
      this.form.cost = e.target.value.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
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
      this.$v.form.$touch()
      if (!this.$v.form.$invalid) {
        this.createNewUUID()
        this.form.id = this.GUID
        this.addProduct(this.form)
        this.form = {}
        this.$v.form.$reset()
        alert('Товар добавлен успешно!')
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
    &-group
      position: relative
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
    display: flex
    flex-wrap: nowrap
    &.required
      &:after
        content: ""
        width: 4px
        height: 4px
        background: #FF8484
        border-radius: 4px

  input,
  textarea
    background: #FFFEFB
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1)
    border-radius: 4px
    border: 0
    height: 36px
    font-family: 'Source Sans Pro'
    font-weight: 400
    font-size: 12px
    line-height: 15px
    color: #B4B4B4
    padding: 10px 16px
    box-sizing: border-box
    &:focus
      outline: none

  textarea
    height: 108px
    padding-top: 16px
    box-sizing: border-box
    resize: none
  .invalid-feedback
    position: absolute
    bottom: -14px
    font-family: 'Source Sans Pro'
    font-weight: 400
    font-size: 8px
    line-height: 10px
    letter-spacing: -0.02em
    color: #FF8484

  .is-invalid
    border: 1px solid #FF8484

  .form-required
    // position: absolute
    width: 4px
    height: 4px
    // left: 151px;
    // top: 48px;
    background: #FF8484
    border-radius: 4px

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
