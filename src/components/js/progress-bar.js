import { mapGetters } from 'vuex';

export default {
  name: 'ProgressBar',
  computed: {
    ...mapGetters(['getPage']),
  },
  data() {
    return {
      steps: {
        home: 1,
        otp: 2,
        success: 3,
        failure: 3,
      },
    };
  },
};
