/* eslint-disable no-unused-vars */
import { mapGetters } from 'vuex';
import Timer from '@/components/Timer.vue';
import OtpInput from '@/components/OtpInput.vue';

export default {
  name: 'Verification',
  components: {
    Timer,
    OtpInput,
  },
  data() {
    return {
      timerRestart: 0,
      otpValue: '',
      resendOtpFlag: false,
      message: 'Please check your mobile phone for the OTP.',
      page: 'otp',
    };
  },
  computed: {
    ...mapGetters(['getOrderDetails']),
  },
  mounted() {
    this.getLocationApiCall();
  },
  methods: {
    storeOtpValue(otpValue) {
      this.otpValue = '';
      for (let i = 0; i < otpValue.length; i += 1) {
        if (otpValue[i]) {
          this.otpValue = `${this.otpValue}${otpValue[i]}`;
        }
      }
    },
    resendOtpShow() {
      console.log('here');
      this.resendOtpFlag = true;
    },
    resendOtpApiCall() {
      // TODO api call for getting otp with mobile number
      this.page = 'otp';
      this.successResendOtpApiCall('');
    },
    successResendOtpApiCall(repsonse) {
      this.resendOtpFlag = false;
      this.timerRestart += 1;
    },
    // TODO toaster
    failureResendOtpApiCallure(error) {
      // TODO open toaster with error message
      // TODO check if timer restarts
    },
    otpVerification() {
      // TODO send geolocation in request
      // api call whose success gives success message and error gives error message
      this.failureOtpVerifcation('');
    },
    successOtpVerification(response) {
      this.message = 'Successfully authenticated. Thank you for your patience!!';
      this.page = 'success';
    },
    failureOtpVerifcation(error) {
      this.message = 'There seems to be some issue please click on resend OTP to get OTP once again or click confirm phone number to change your mobile number.';
      this.page = 'failure';
    },
    getLocationApiCall() {
      this.$store.dispatch('getLocation', {
        success: this.successGetLocationApiCall,
        failure: this.failureGetLocationApiCall,
      });
    },
    successGetLocationApiCall(response) {
      console.log(response);
    },
    failureGetLocationApiCall(error) {
      console.log(error);
    },
    redirect() {
      this.$router.push('/delivery-authentication');
    },
  },
};
