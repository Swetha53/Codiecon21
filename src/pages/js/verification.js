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
      apiInProgress: false,
      location: '',
    };
  },
  computed: {
    ...mapGetters(['getOrderDetails', 'getLocation']),
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
      const request = {
        phoneNumber: this.getOrderDetails.tempMobile,
        orderId: this.getOrderDetails.orderId,
      };
      const response = {
        otp: '1234',
      };
      this.resendOtpFlag = false;
      setTimeout(() => {
        console.log(request);
        this.successResendOtpApiCall(response);
      }, 5000);
      // this.$store.dispatch('getOtpDetails', {
      //   success: this.successResendOtpApiCall,
      //   failure: this.failureResendOtpApiCallure,
      //   payload: request,
      // });
    },
    successResendOtpApiCall(repsonse) {
      this.timerRestart += 1;
    },
    // TODO toaster
    failureResendOtpApiCallure(error) {
      // TODO check if timer restarts
    },
    otpVerification() {
      // TODO check if otp needs to be checked in front end as well
      this.apiInProgress = true;
      const request = {
        mobileNo: this.getOrderDetails.tempMobile,
        otp: this.otpValue,
        address: this.location,
        time: new Date(),
        orderId: this.getOrderDetails.orderId,
      };
      const response = {
        success: true,
        errorMessage: '',
      };
      setTimeout(() => {
        console.log(request);
        this.successOtpVerification(response);
      }, 5000);
      // this.$store.dispatch('getValidationResult', {
      //   success: this.successOtpVerification,
      //   failure: this.failureOtpVerifcation,
      //   payload: request,
      // });
    },
    successOtpVerification(response) {
      this.apiInProgress = false;
      this.message = 'Successfully authenticated. Thank you for your patience!!';
      this.page = 'success';
    },
    failureOtpVerifcation(error) {
      this.apiInProgress = false;
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
      this.location = `Latitude: ${response.lat}, Longitude: ${response.lon}`;
    },
    failureGetLocationApiCall(error) {
      console.log(error);
    },
    redirect() {
      this.$router.push('/delivery-authentication');
    },
  },
};
