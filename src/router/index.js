import Vue from 'vue';
import Router from 'vue-router';
import Home from '../pages/Home.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/delivery-authentication',
      component: Home,
      name: 'Home',
    },
    {
      path: '/otp-verification',
      component: Home,
      name: 'Home',
    },
  ],
});

export default router;
