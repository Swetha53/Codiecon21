import Vue from 'vue';
import Router from 'vue-router';
import Home from '../pages/Home.vue';
import Verification from '../pages/Verification.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/delivery-authentication',
      component: Home,
      name: 'Home',
      props: (route) => ({ order: route.query.order }),
    },
    {
      path: '/otp-verification',
      component: Verification,
      name: 'Verification',
    },
  ],
});

export default router;
