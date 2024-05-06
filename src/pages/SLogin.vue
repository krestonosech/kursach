<template>
    <div class="qwerty">
        <div class="login">
            <h1>Вход</h1>
            <div class="login__authorization">
                <h4>Введите почту</h4>
                <input type="text" placeholder="Почта" v-model="email">
                <h4>Введите пароль</h4>
                <input type="password" placeholder="Пароль" v-model="password">
                <p v-if="errors.passwordMismatch" class="error">Неправильный логил или пароль</p>
                <p v-if="errors.emailMismatch" class="error">Неправильная почта</p>
                <button class="login__authorization__mybutton" @click.prevent="CheckUser(mas)">Подтвердить</button>
                <button class="login__authorization__mybutton" @click="routerAuthorization">Зарегестрироваться</button>
            </div>
        </div>
    </div>
</template>

<script>
const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default {
    data() {
        return {
            password: '',
            email: '',
            mas: this.$store.state.jojo,
            emailRegExp: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            errors: {
            passwordMismatch: false,
            emailMismatch: false,
            },
        };
    },
  methods: {
    routerAuthorization() {
        this.$router.push('/authorization')
    },
    CheckUser() {
        this.errors.passwordMismatch = false;
        this.errors.emailMismatch = false;
        if (!emailRegExp.test(this.email)) {
            this.errors.emailMismatch = true;
        } else {
        // eslint-disable-next-line max-len
            const foundUse = this.$store.state.jojo.find((user) => user.email === this.email && user.password === this.password);
            if (foundUse) {
            const atIndex = this.email.indexOf('@');
            const nickName = atIndex !== -1 ? this.email.slice(0, atIndex) : this.email;
            this.$store.state.NickName = nickName;
            this.$store.state.authorization = true;
            this.$router.push('/main');
            } else {
            this.errors.passwordMismatch = true;
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