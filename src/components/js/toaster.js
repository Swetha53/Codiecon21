import { mapGetters } from 'vuex';

export default {
  name: 'Toaster',
  props: ['message', 'type', 'closeable'],
  computed: {
    ...mapGetters(['getApiFailure']),
  },
  mounted() {
    if (this.closeable) {
      setTimeout(() => {
        this.$store.commit('setApiFailure', '');
      }, 5000);
    }
  },
};
