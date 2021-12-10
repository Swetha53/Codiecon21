/* eslint-disable no-param-reassign */
// TODO use sanitize as v-sanitize in mobile and otp input
import Vue from 'vue';

export default Vue.directive('sanitize', {
  bind(el, vnode) {
    el.addEventListener('blur', (event) => {
      try {
        el.value = vnode.context.$sanitize(event.target.value);
        vnode.elm.dispatchEvent(new CustomEvent('input')); // Dispatching custom input event to reflect new changes in v-modal
      } catch (e) {
        console.error('Error in sanitize directive : ', e);
      }
    });
  },
});
