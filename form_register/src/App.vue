<template>
  <div class="wrapper">
    <div class="container">
      <h1 class="register-title">Регистрация</h1>
      <div class="description-wrap">
        <span class="description">Уже есть аккаунт? <a class="description-link">Войти</a></span>
      </div>
      <form id="formRegistry"
            class="form"
            novalidate="true"
            @submit.prevent="onSubmit"
      >
        <div class="form-row">
          <label class="form-group">
            <span class="form-hint">Имя</span>
            <input class="form-field"
                   :class="!nameIsValid ? 'error-field' : ''"
                   type="text"
                   placeholder="Введите Ваше имя"
                   v-model.lazy="form.name">
          </label>
          <p class="validation" v-if="!nameIsValid">Имя может содержать только буквы, пробел или дефис</p>
        </div>
        <div class="form-row">
          <label class="form-group">
            <span class="form-hint">Email</span>
            <input
                class="form-field"
                :class="!emailIsValid ? 'error-field' : ''"
                type="email"
                placeholder="Введите Ваш email"
                v-model.lazy="form.email"
            >
          </label>
          <p class="validation" v-if="!emailIsValid">Некорректно введен email</p>

        </div>
        <div class="form-row">
          <label class="form-group">
            <span class="form-hint">Номер телефона</span>
            <input
                class="form-field"
                :class="!phoneIsValid ? 'error-field' : ''"
                type="tel"
                placeholder="Введите номер телефона"
                v-model.lazy="form.phone"
            >
          </label>
          <p class="validation" v-if="!phoneIsValid">Некорректный телефон</p>
        </div>
        <div class="form-row" @click="showDropdown">
          <label class="form-group">
            <span class="form-hint">Язык</span>
            <div class="dropdown">
              <div class="dropdown-value">{{form.language}}<span class="dropdown-v"></span></div>
              <ul class="dropdown-list">
                <li class="dropdown-item dropdown-link" @click="check">Русский</li>
                <li class="dropdown-item dropdown-link" @click="check">Английский</li>
                <li class="dropdown-item dropdown-link" @click="check">Китайский</li>
                <li class="dropdown-item dropdown-link" @click="check">Испанский</li>
              </ul>
            </div>
          </label>
        </div>
        <div class="form-row">
          <label class="form-group checkbox-group">
            <input type="checkbox" class="form-checkbox" v-model="form.checkbox">
            <span class="checkbox-text">Принимаю <a href="#">условия</a> использования</span>
            <span class="checkbox-v"></span>
          </label>
        </div>
        <div class="form-row">
          <button
              class="form-submit"
              :class="!formIsValid ? 'btn-disabled' : ''"
              :disabled="!formIsValid"
          >
            Зарегистрироваться
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {
      form: {
        name: null,
        email: null,
        phone: null,
        language: 'Язык',
        checkbox: null
      }
    }
  },
  computed: {
    nameIsValid() {
      const pattern = /^[а-яА-ЯёЁa-zA-Z_-\s]+$/;
      return pattern.test(this.form.name);
    },
    emailIsValid() {
      if (this.form.email == null) {
        return true;
      }
      const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
      return pattern.test(this.form.email);
    },
    phoneIsValid() {
      if (this.form.phone == null) {
        return true;
      }
      const pattern = /^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/;
      return pattern.test(this.form.phone);
    },
    formIsValid() {
      return this.nameIsValid
          && this.emailIsValid
          && this.phoneIsValid
          && this.form.checkbox
          && this.form.language !== 'Язык';
    }
  }
  ,
  methods: {
    onSubmit() {
      if (this.formIsValid) {
        this.submit(this.form)
      }
    }
    ,
    showDropdown(e) {
      if (e.target.classList.contains('dropdown-value')) {
        document.querySelector('.dropdown-list').classList.toggle('dropdown-list--active');
      }
    },
    check(e) {
      this.form.language = e.target.innerText;
      e.target.closest('.dropdown-list').classList.remove('dropdown-list--active');
    },
    submit(data) {
      console.log(data)
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;700&display=swap');

html, body {
  font-family: 'IBM Plex Sans', sans-serif;
}

body {
  background-color: #ececec;
}

input::-moz-placeholder {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 16px;
  line-height: 21px;
  color: #7C9CBF;
}

input::-webkit-input-placeholder {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 16px;
  line-height: 21px;
  color: #7C9CBF;
}

input:focus {
  background: #FFFFFF;
  border: 2px solid #0880AE;
  box-sizing: border-box;
  box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04);
  border-radius: 6px;
}

.wrapper {
  width: 100%;
  padding-top: 50px;
}

.container {
  width: 460px;
  min-width: 360px;
  margin-left: auto;
  margin-right: auto;
  padding: 40px 30px;
  background-color: #fff;
  border-radius: 24px;
  box-sizing: border-box;
  box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04);
}

.register-title {
  font-style: normal;
  font-weight: bold;
  font-size: 34px;
  line-height: 44px;
  margin: 0;
  padding: 0;
}

.description-wrap {
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 58px;
}

.description-link {
  color: #0880AE;
}

.form-row {
  margin-bottom: 34px;
}

.form-group {
  display: block;
}

.form-hint {
  display: block;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  color: #756F86;
}

.form-field, .dropdown-value {
  font-family: "IBM Plex Sans", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 21px;
  color: #2C2738;
  width: 100%;
  padding: 16px;
  background: #FFFFFF;
  border: 1px solid #DBE2EA;
  box-sizing: border-box;
  box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04);
  border-radius: 6px;
}

.dropdown-value {
  position: relative;
}

.dropdown-v::before {
   content: "";
   position: absolute;
   top: 25px;
   right: 20px;
   width: 10px;
   height: 2px;
   background-color: #0880AE;
   transform: rotate(45deg);
 }
.dropdown-v::after {
  content: "";
  position: absolute;
  top: 25px;
  right: 14px;
  width: 10px;
  height: 2px;
  background-color: #0880AE;
  transform: rotate(-45deg);
}


.form-field:focus {
  outline-color: #0880AE;
}

.form-submit {
  font-family: 'IBM Plex Sans', sans-serif;
  display: inline;
  width: 100%;
  padding: 18px;
  background-color: #0880AE;
  color: #EBF4F8;
  border: none;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  border-radius: 6px;
}

.form-submit:focus {
  outline-color: #0880AE;
}

.dropdown {
  position: relative;
}

.dropdown-value {
  color: #7C9CBF;
}

.dropdown-list {
  position: absolute;
  opacity: 0;
  top: 50px;
  left: 0;
  right: 0;
  padding: 0;
  background: #FFFFFF;
  border: 1px solid #DBE2EA;
  box-sizing: border-box;
  box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04);
  border-radius: 6px;
  list-style-type: none;
  transition: all 0.2s ease;
  z-index: -5;

}

.dropdown-list--active {
  opacity: 1;
  z-index: 2;

}

.dropdown-link {
  font-size: 16px;
  line-height: 21px;
  color: #756F86;
  text-decoration: none;

}

.dropdown-item {
  padding: 12px;
}

.dropdown-item:hover {
  background-color: #EBF4F8;
}

.checkbox-group {
  display: block;
  position: relative;
}

.form-checkbox {
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  width: 1px;
}

.checkbox-text {
  display: inline-block;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  color: #756F86;
}

.checkbox-text::before {
  position: relative;
  content: '';
  width: 28px;
  height: 28px;
  border-radius: 4px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 8px;
  border: 2px solid #0880AE;
  box-sizing: border-box;
}

.checkbox-text a {
  color: #0880AE;
  text-decoration: none;
}

.form-checkbox:checked ~ .checkbox-v::before {
  content: "";
  position: absolute;
  top: 14px;
  left: 6px;
  width: 9px;
  height: 2px;
  background-color: #0880AE;
  transform: rotate(45deg);
}

.form-checkbox:checked ~ .checkbox-v::after {
  content: "";
  position: absolute;
  top: 12px;
  left: 11px;
  width: 13px;
  height: 2px;
  background-color: #0880AE;
  transform: rotate(-45deg);
}


.btn-disabled {
  background-color: #DBE2EA;
  color: #B1B5BF;
}

.validation {
  margin: 0;
  padding: 0;
  color: red;
  font-size: 14px;
}

.error-field {
  border-color: red;
}

.error-field:focus {
  outline-color: red;
}
</style>
