import { createRouter, createWebHistory } from 'vue-router';
import Main from '../pages/SMain.vue';
import Login from '../pages/SLogin.vue';

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Main },
        { path: '/login', component: Login },
    ],
  });