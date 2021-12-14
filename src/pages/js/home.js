/* eslint-disable no-unused-vars */
import { mapGetters } from 'vuex';
import Toaster from '@/components/Toaster.vue';

export default {
  name: 'Home',
  data() {
    return {
      mobile: 0,
      apiInProgress: false,
    };
  },
  components: {
    Toaster,
  },
  computed: {
    ...mapGetters(['getOrderDetails', 'getApiFailure']),
  },
  mounted() {
    // TODO at mount mobile should be prefilled
    this.mobile = '9876543210';
  },
  methods: {
    sendDetailsForOtp() {
      // eslint-disable-next-line prefer-object-spread
      this.$store.commit('setOrderDetails', Object.assign({}, { tempMobile: this.mobile }, this.getOrderDetails));
      const request = {
        phoneNumber: this.getOrderDetails.tempMobile,
        orderId: this.getOrderDetails.orderId,
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
      // this.$store.dispatch('getOtpDetails', {
      //   success: this.successSendDetailsForOtp,
      //   failure: this.failureSendDetailsForOtp,
      //   payload: request,
      // });
    },
    successSendDetailsForOtp(response) {
      this.apiInProgress = false;
      this.$router.push('/otp-verification');
    },
    // TODO toaster for error
    failureSendDetailsForOtp(error) {
      this.apiInProgress = false;
    },
  },
};
