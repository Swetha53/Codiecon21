/* eslint-disable no-unused-vars */
import { mapGetters } from 'vuex';
import Toaster from '../../components/Toaster.vue';
import ProgressBar from '../../components/ProgressBar.vue';

export default {
  name: 'Home',
  data() {
    return {
      mobile: 0,
      apiInProgress: false,
      orderId: this.$route.query.order,
    };
  },
  components: {
    Toaster,
    ProgressBar,
  },
  computed: {
    ...mapGetters(['getOrderId', 'getOrderDetails', 'getApiFailure']),
  },
  mounted() {
    // TODO mobile api not working
    this.$store.commit('setOrderId', this.orderId);
    this.$store.commit('setPage', 'home');
    this.getMobileNumber();
  },
  methods: {
    sendDetailsForOtp() {
      // eslint-disable-next-line prefer-object-spread
      this.$store.commit('setOrderDetails', Object.assign({}, { tempMobile: this.mobile }, this.getOrderDetails));
      const request = {
        phoneNumber: this.getOrderDetails.tempMobile,
        orderId: this.getOrderId,
      };
      this.apiInProgress = true;
      this.$store.dispatch('getOtpDetails', {
        success: this.successSendDetailsForOtp,
        failure: this.failureSendDetailsForOtp,
        payload: request,
      });
    },
    successSendDetailsForOtp(response) {
      this.apiInProgress = false;
      this.$router.push('/otp-verification');
    },
    failureSendDetailsForOtp(error) {
      this.apiInProgress = false;
    },
    getMobileNumber() {
      this.apiInProgress = true;
      const request = {
        orderId: this.getOrderId,
      };
      this.$store.dispatch('getMobileNumber', {
        success: this.successGetMobileNumber,
        failure: this.failureGetMobileNumber,
        payload: request,
      });
    },
    successGetMobileNumber(response) {
      this.apiInProgress = false;
      this.mobile = response.data.value.phoneNumber;
    },
    failureGetMobileNumber(error) {
      this.apiInProgress = false;
      this.mobile = '';
    },
  },
};
