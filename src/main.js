import * as Vue from 'vue';
import App from './App.vue'

import './assets/main.css'

import { createApp } from 'vue';

import 'swiper/swiper-bundle.css';

import router from './router.js';

import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

const app = createApp(App);

app.use(VCalendar, {})
app.use(router);


app.mount('#app');


