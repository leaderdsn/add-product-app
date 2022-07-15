import AppSidebar from '@/components/AppSidebar.vue';
<template>
  <div class="app-sidebar">
    <h1>Добавление товара</h1>
    <form class="form">
      <label class="form-textfield">
        Наименование товара
        <input v-model="form.name" placeholder="Введите наименование товара" type="text"/>
      </label>
      <label class="form-textfield">
        Введите описание товара
        <textarea v-model="form.description" placeholder="Введите описание товара"></textarea>
      </label>
      <label class="form-textfield">
        Ссылка на изображение товара
        <input v-model="form.src" type="text" placeholder="Введите ссылку"/>
      </label>
      <label class="form-textfield">
        Цена товара
        <input v-model="form.cost" type="text" placeholder="Введите цену товара"/>
      </label>
      <button class="app-btn-primary form-btn" type="submit" disabled>Добавить товар</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AppSidebar',
  data() {
    return {
      form: {}
    }
  }

}
</script>

<style lang="sass" scoped>
  .app-sidebar
    width: 100%
    max-width: 332px
    grid-gap: 16px
  .form
    display: flex
    flex-grow: 1
    flex-basis: 100%
    flex-direction: column
    grid-gap: 16px
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

  label
    font-family: 'Source Sans Pro'
    font-weight: 400
    font-size: 10px
    line-height: 13px
    letter-spacing: -0.02em
    color: #49485E

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
    &:focus
      outline: none

  textarea
    padding-top: 16px
    height: 108px
    resize: none
</style>
