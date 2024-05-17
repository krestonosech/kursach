import { createApp } from 'vue';
import { createYmaps } from 'vue-yandex-maps';
import App from './App.vue';
import router from '@/router';
import store from '@/store';
import 'v-calendar/style.css';
import VCalendar from 'v-calendar';
import { createPinia } from 'pinia';
import { vuetify } from '@/plagins/vuetify';

const app = createApp(App);
app.use(router);
export const pinia = createPinia();
app.use(store);
app.use(vuetify);
app.use(pinia);
app.use(VCalendar, {});
app.use(createYmaps({
  apikey: '2344aa66-cfc5-439d-90e1-47cb3f72d475',
}));
app.mount('#app');