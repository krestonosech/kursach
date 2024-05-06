<template>
    <div class="qwerty">
        <div class="auth">
            <h1>Регистрация</h1>
            <div class="main">
                <h4>Введите почту</h4>
                <input type="text" placeholder="Почта" v-model="email">
                <h4>Введите пароль</h4>
                <input type="password" placeholder="Пароль" v-model="password">
                <h4>Подтвердите пароль</h4>
                <input type="password" placeholder="Пароль" v-model="confirmPassword">
                <p v-if="errors.passwordMismatch" class="error">Пароли не совпадают</p>
                <p v-if="errors.ErAuthorization" class="error">Такой пользователь уже существует</p>
                <p v-if="errors.emailMismatch" class="error">Неправильный формат почты</p>
                <button class="mybutton" @click.prevent="addUser()">Подтвердить</button>
                <button class="mybutton" @click="routerLogin">Войти</button>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  export default {
    data() {
        return {
            email: '',
            password: '',
            confirmPassword: '',
            mas: this.$store.state.jojo,
            errors: {
                passwordMismatch: false,
                ErAuthorization: false,
                emailMismatch: false,
            },
        };
    },
    methods: {
        routerLogin() {
            this.$router.push('/login')
        },
        addUser() {
            this.errors.ErAuthorization = false;
            this.errors.passwordMismatch = false;
            this.errors.emailMismatch = false;
            if (!emailRegExp.test(this.email)) {
            this.errors.emailMismatch = true;
            } else {
            const CheckProfile = this.$store.state.jojo.find((user) => 
            user.email === this.email && 
            user.password === this.password && 
            user.password === this.confirmPassword);
            if (CheckProfile) {
                this.errors.ErAuthorization = true;
                return;
            }
            if (this.password === this.confirmPassword && this.password != null) {
                this.$store.commit('addUser', { email: this.email, password: this.password });
            } else {
                this.errors.passwordMismatch = true;
            }
            const foundUse = this.$store.state.jojo.find((user) => 
            user.email === this.email && 
            user.password === this.password);
            if (foundUse) {
                const atIndex = this.email.indexOf('@');
                const nickName = atIndex !== -1 ? this.email.slice(0, atIndex) : this.email;
                this.$store.state.NickName = nickName;
                this.$store.state.authorization = true;
                this.$router.push('/main');
            }
            }
        },
    },
  };
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