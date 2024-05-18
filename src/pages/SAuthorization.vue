<template>
    <div class="qwerty">
        <div class="auth">
            <h1>Регистрация</h1>
            <div class="main">
                <h4>Введите логи</h4>
                <input type="text" placeholder="Почта" v-model="login">
                <h4>Введите почту</h4>
                <input type="text" placeholder="Почта" v-model="email">
                <h4>Введите пароль</h4>
                <input type="password" placeholder="Пароль" v-model="password">
                <h4>Подтвердите пароль</h4>
                <input type="password" placeholder="Пароль" v-model="confirmPassword">
                <p v-if="errors.passwordMismatch.value" class="error">Пароли не совпадают</p>
                <p v-if="errors.ErAuthorization.value" class="error">Такой пользователь уже существует</p>
                <p v-if="errors.emailMismatch.value" class="error">Неправильный формат почты</p>
                <button class="mybutton" @click="registerUser">Подтвердить</button>
                <button class="mybutton" @click="routeToLogin">Войти</button>
            </div>
        </div>
    </div>
  </template>

<script lang="ts" setup>
import { ref } from 'vue'
import { axios } from '../plagins/axios'
import { store } from '../store/index'
import { useRouter, RouteLocationRaw } from 'vue-router'

const router = useRouter()

const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

function routeToLogin () {
  router.push('./login' as RouteLocationRaw)
}

const Store = store
const login = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errors = {
  passwordMismatch: ref(false),
  ErAuthorization: ref(false),
  emailMismatch: ref(false)
}

async function registerUser () {
  try {
    if (!emailRegExp.test(email.value)) {
      errors.emailMismatch.value = true
      return
    }

    if (password.value !== confirmPassword.value) {
      errors.passwordMismatch.value = true
      return
    }

    const response = await axios.post(`${Store.state.server}/api/v1/users/registration`, {
      email: email.value,
      login: login.value,
      password: password.value,
      confirm_password: confirmPassword.value
    })

    if (response.data) {
      localStorage.setItem('accessToken', response.data)
      router.push('./main' as RouteLocationRaw)
    }
  } catch (error) {
    console.error(error)
  }
}
</script>

  <style scoped>
  .qwerty {
    display: flex;
    justify-content: center;
    align-items: end;
    margin-top: 250px;
  }
  .auth {
    border: 2px solid black;
    padding: 20px;
    display: inline-block;
    display: flex;
    flex-direction: column;
    height: 450px;
    width: 500px;
  }
  h1 {
      margin-top: 50px;
      display: flex;
      justify-content: center;
  }
  .error {
    display: flex;
    justify-content: left/*  */;
    margin-top: 15px;
    color: red;
  }
  .mybutton {
    margin: 15px;
  background-color: white;
  border: none;
  cursor: pointer;
  }
  .main {
      display: flex;
      align-items: center;
      flex-direction: column;
  }
  h4 {
      margin-top: 10px;
      display: flex;
  }
  input {
    margin-top: 12px;
      width: 200px;
      border: black solid 1px;
      color: black;
  }
  </style>
