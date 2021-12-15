/* eslint-disable no-unused-vars */
import { mapGetters } from 'vuex';
import Timer from '@/components/Timer.vue';
import OtpInput from '@/components/OtpInput.vue';
import Toaster from '@/components/Toaster.vue';
import ProgressBar from '@/components/ProgressBar.vue';

export default {
  name: 'Verification',
  components: {
    Timer,
    OtpInput,
    Toaster,
    ProgressBar,
  },
  data() {
    return {
      timerRestart: 0,
      otpValue: '',
      resendOtpFlag: false,
      message: 'Please check your mobile phone for the OTP.',
      apiInProgress: false,
      location: '',
      isGeolocation: true,
    };
  },
  computed: {
    ...mapGetters(['getOrderId', 'getOrderDetails', 'getLocation', 'getApiFailure', 'getPage']),
  },
  mounted() {
    this.$store.commit('setPage', 'otp');
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
      this.$store.commit('setPage', 'otp');
      const request = {
        phoneNumber: this.getOrderDetails.tempMobile,
        orderId: this.getOrderId,
      };
      this.resendOtpFlag = false;
      this.$store.dispatch('getOtpDetails', {
        success: this.successResendOtpApiCall,
        failure: this.failureResendOtpApiCallure,
        payload: request,
      });
    },
    successResendOtpApiCall(repsonse) {
      this.timerRestart += 1;
    },
    failureResendOtpApiCallure(error) {
      console.log(error);
    },
    otpVerification() {
      this.apiInProgress = true;
      const request = {
        phoneNumber: this.getOrderDetails.tempMobile,
        otp: this.otpValue,
        address: this.location,
        orderId: this.getOrderId,
      };
      this.$store.dispatch('getValidationResult', {
        success: this.successOtpVerification,
        failure: this.failureOtpVerifcation,
        payload: request,
      });
    },
    successOtpVerification(response) {
      this.apiInProgress = false;
      this.message = 'Successfully authenticated. Thank you for your patience!!';
      this.$store.commit('setPage', 'success');
    },
    failureOtpVerifcation(error) {
      this.apiInProgress = false;
      this.message = 'There seems to be some issue please click on resend OTP to get OTP once again or click confirm phone number to change your mobile number.';
      this.$store.commit('setPage', 'failure');
    },
    getLocationApiCall() {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'granted') {
          navigator.geolocation.getCurrentPosition(this.successGetLocationApiCall,
            this.failureGetLocationApiCall);
        } else if (result.state === 'prompt') {
          navigator.geolocation.getCurrentPosition(this.successGetLocationApiCall,
            this.getLocationApiCall);
        } else {
          this.isGeolocation = false;
          this.$store.dispatch('getLocation', {
            success: this.successGetLocationApiCall,
            failure: this.failureGetLocationApiCall,
          });
        }
      });
    },
    successGetLocationApiCall(response) {
      console.log(response);
      if (this.isGeolocation) {
        this.location = `${response.coords.latitude}, ${response.coords.longitude}`;
      } else {
        this.location = `${response.lat}, ${response.lon}`;
      }
    },
    failureGetLocationApiCall(error) {
      console.log(error);
    },
    redirect() {
      this.$router.push('/delivery-authentication');
    },
  },
};
