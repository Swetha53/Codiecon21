import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      mobile: 0,
    };
  },
  computed: {
    ...mapGetters(['getOrderDetails']),
  },
  methods: {
    sendDetailsForOtp() {
      // eslint-disable-next-line prefer-object-spread
      this.$store.commit('setOrderDetails', Object.assign({}, this.getOrderDetails, { tempMobile: this.mobile }));
      // TODO api call if success then redirect
      const response = {
        otp: '1234',
      };
      this.successSendDetailsForOtp(response);
    },
    // eslint-disable-next-line no-unused-vars
    successSendDetailsForOtp(response) {
      this.$router.push('/otp-verification');
    },
  },
};
