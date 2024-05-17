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
                <p v-if="errors.passwordMismatch" class="error">Пароли не совпадают</p>
                <p v-if="errors.ErAuthorization" class="error">Такой пользователь уже существует</p>
                <p v-if="errors.emailMismatch" class="error">Неправильный формат почты</p>
                <button class="mybutton" >Подтвердить</button>
                <button class="mybutton" @click="routerLogin">Войти</button>
            </div>
        </div>
    </div>
  </template>
  
<script lang="ts" setup>
  const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  import {ref} from 'vue';
  import {axios} from '@/plagins/axios';
  
  const login = ref('');
  const email = ref('');
  const password= ref('');
  const confirmPassword= ref('');
  const mas= ref('');
  const errors = {
    passwordMismatch: false,
    ErAuthorization: false,
    emailMismatch: false,
  }

  function routerLogin() {
    this.$router.push('/login')
  }

  function registerUser() {
    const data = ({email, login, password, confirmPassword})
      axios.post('/api/v1/users/reistraion', data)
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
    height: 370px;
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