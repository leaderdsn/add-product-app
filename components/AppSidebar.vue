<template>
  <div
    class="app-sidebar"
    :class="{ 'sidebar-show': sidebarShow && isMobileWidth }"
  >
    <h1>
      <button
        v-if="isMobileWidth"
        class="app-btn-mobile app-sidebar-btn-close"
        @click="hiddenSidebar"
      >
        <app-svg-icon icon-class="close" />
      </button>
      Добавление товара
    </h1>
    <form class="form" @submit.prevent="onSubmit">
      <div class="form-group">
        <label class="form-label required" for="name"
          >Наименование товара</label
        >
        <input
          v-model="form.name"
          type="text"
          name="name"
          maxlength="40"
          placeholder="Введите наименование товара"
          class="form-control"
          :class="{ 'is-invalid': $v.form.name.$error }"
        />
        <small
          v-if="$v.form.name.$error && !$v.form.name.required"
          class="invalid-feedback"
        >
          Поле является обязательным
        </small>
        <small
          v-if="$v.form.name.$error && !$v.form.name.minLength"
          class="invalid-feedback"
        >
          Длина наименование не может быть меньше 3-х
        </small>
      </div>
      <div class="form-group">
        <label class="form-label" for="description"
          >Введите описание товара</label
        >
        <textarea
          v-model="form.description"
          name="description"
          placeholder="Введите описание товара"
          maxlength="200"
          class="form-control form-control--area"
        ></textarea>
      </div>
      <div class="form-group">
        <label class="form-label required" for="url"
          >Ссылка на изображение товара</label
        >
        <input
          v-model="form.url"
          type="text"
          name="url"
          placeholder="Введите ссылку"
          class="form-control"
          :class="{ 'is-invalid': $v.form.url.$error }"
        />
        <small
          v-if="$v.form.url.$error && !$v.form.url.required"
          class="invalid-feedback"
        >
          Поле является обязательным
        </small>
        <small
          v-if="$v.form.url.$error && !$v.form.url.url"
          class="invalid-feedback"
        >
          Некоректный URL
        </small>
      </div>
      <div class="form-group">
        <label class="form-label required" for="cost">Цена товара</label>
        <input
          v-model.number="form.cost"
          type="text"
          name="cost"
          maxlength="11"
          placeholder="Введите цену товара"
          class="form-control"
          :class="{ 'is-invalid': $v.form.cost.$error }"
          onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"
          @change="thousandSeparator"
        />
        <small
          v-if="$v.form.cost.$error && !$v.form.cost.required"
          class="invalid-feedback"
        >
          Поле является обязательным
        </small>
      </div>
      <button
        class="app-btn app-btn-primary form-btn"
        type="submit"
        :disabled="invalid"
      >
        Добавить товар
      </button>
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
    }
  },
  data() {
    return {
      form: {},
      GUID: null
    }
  },
  validations: {
    form: {
      name: { required, minLength: minLength(3) },
      url: { required, url },
      cost: { required }
    }
  },
  computed: {
    invalid() {
      let res = true
      for (const i in this.form) {
        if (this.form[i] !== '') {
          res = false
        }
      }
      return res
    }
  },
  methods: {
    ...mapMutations({ addProduct: 'localStorage/addProduct' }),
    thousandSeparator(e) {
      this.form.cost = e.target.value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    },
    hiddenSidebar() {
      this.$emit('hiddenSidebar', false)
    },
    createNewUUID() {
      this.GUID = this.generateUUID()
    },
    generateUUID() {
      let d = new Date().getTime()
      if (
        typeof performance !== 'undefined' &&
        typeof performance.now === 'function'
      ) {
        d += performance.now()
      }
      const newGuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function (c) {
          const r = (d + Math.random() * 16) % 16 | 0
          d = Math.floor(d / 16)
          return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
        }
      )

      return newGuid
    },
    onSubmit() {
      this.$v.form.$touch()
      if (!this.$v.form.$invalid) {
        this.createNewUUID()
        this.form.id = this.GUID
        this.addProduct(this.form)
        this.form = {}
        this.$v.form.$reset()
      }
    }
  }
}
</script>
