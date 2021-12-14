import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      mobile: 0,
      apiInProgress: false,
    };
  },
  computed: {
    ...mapGetters(['getOrderDetails']),
  },
  mounted() {
    // TODO at mount mobile should be prefilled
    this.mobile = '9876543210';
  },
  methods: {
    sendDetailsForOtp() {
      // eslint-disable-next-line prefer-object-spread
      this.$store.commit('setOrderDetails', Object.assign({}, this.getOrderDetails, { tempMobile: this.mobile }));
      const request = {
        mobile: this.getOrderDetails.tempMobile,
      };
      // TODO api call if success then redirect
      const response = {
        otp: '1234',
      };
      this.apiInProgress = true;
      setTimeout(() => {
        console.log(request);
        this.successSendDetailsForOtp(response);
      }, 5000);
    },
    // eslint-disable-next-line no-unused-vars
    successSendDetailsForOtp(response) {
      this.apiInProgress = false;
      this.$router.push('/otp-verification');
    },
  },
};
