/* eslint-disable no-new */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import sanitize from './sanitize';

Vue.config.productionTip = false;

new Vue({
  el: '#module-delivery-authentication',
  router,
  store,
  sanitize,
  render: (h) => h(App),
});
