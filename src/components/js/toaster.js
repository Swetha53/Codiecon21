import { mapGetters } from 'vuex';

export default {
  name: 'Toaster',
  computed: {
    ...mapGetters(['getApiFailure']),
  },
  mounted() {
    setTimeout(() => {
      this.$store.commit('setApiFailure', '');
    }, 2000);
  },
};
