<template>
    <div class="qwerty">
        <div class="login">
            <h1>Вход</h1>
            <div class="login__authorization">
                <h4>Введите почту</h4>
                <input type="text" placeholder="Почта" v-model="login">
                <h4>Введите пароль</h4>
                <input type="password" placeholder="Пароль" v-model="password">
                <p v-if="errors.passwordMismatch" class="error">Неправильный логил или пароль</p>
                <p v-if="errors.emailMismatch" class="error">Неправильная почта</p>
                <button class="login__authorization__mybutton" @click="authorizateUser">Подтвердить</button>
                <button class="login__authorization__mybutton" @click="routeToAuthorization">Зарегестрироваться</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { axios } from '../plagins/axios'
import { store } from '../store/index'
/* const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ */
import { useRouter, RouteLocationRaw } from 'vue-router'

const router = useRouter()

function routeToAuthorization () {
  router.push('./authorization' as RouteLocationRaw)
}

const Store = store
const login = ref('')
const password = ref('')
const errors = {
  passwordMismatch: false,
  ErAuthorization: false,
  emailMismatch: false
}

async function authorizateUser () {
  try {
    const response = await axios.post(`${Store.state.server}/api/v1/users/login`, {
      login: login.value,
      password: password.value
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
.error {
  display: flex;
  justify-content: left;
  margin-top: 15px;
  color: red;
}

.login {
    height: 370px;
    width: 500px;
  border: 2px solid black;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

h1 {
    margin-top: 50px;
    display: flex;
    justify-content: center;
}

.login__authorization__mybutton {
  margin: 15px;
  background-color: white;
  border: none;
  cursor: pointer;
}

.login__authorization {
    display: flex;
    justify-content: center;
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
