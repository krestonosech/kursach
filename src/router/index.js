import { createRouter, createWebHistory } from 'vue-router';
import Main from '../pages/SMain.vue';
import Login from '../pages/SLogin.vue';
import Authorization from '../pages/SAuthorization.vue'

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', component: Login },
        { path: '/main', component: Main },
        { path: '/authorization', component: Authorization },
    ],
  });