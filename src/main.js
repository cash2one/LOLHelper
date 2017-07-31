import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js';
import store from './store/index.js';

new Vue({
  el: '#app',
  router : router,
  store : store,
  render: h => h(App)
})
