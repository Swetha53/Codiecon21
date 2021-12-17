/* eslint-disable no-else-return */
/* eslint-disable no-unused-vars */
import { mapGetters } from 'vuex';
import validation from '../../../utilServices/validation';
import Timer from '../../components/Timer.vue';
import OtpInput from '../../components/OtpInput.vue';
import Toaster from '../../components/Toaster.vue';
import ProgressBar from '../../components/ProgressBar.vue';

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
      validator: {},
    };
  },
  computed: {
    ...mapGetters(['getOrderId', 'getOrderDetails', 'getLocation', 'getApiFailure', 'getPage', 'getValidationResult']),
  },
  mounted() {
    this.$store.commit('setPage', 'otp');
    this.createValidation();
  },
  methods: {
    createValidation() {
      validation.validatorObject.otp = {
        name: 'mobileNumber',
        validationFun: 'isEmpty',
        isValid: true,
        value1: this.otpValue,
      };
      validation.validatorObject.validOtp = {
        name: 'mobileNumber',
        validationFun: 'isValid',
        isValid: true,
        value1: this.otpValue,
      };
      this.validator = { ...validation.validatorObject };
    },
    storeOtpValue(otpValue) {
      this.otpValue = '';
      for (let i = 0; i < otpValue.length; i += 1) {
        if (otpValue[i]) {
          this.otpValue = `${this.otpValue}${otpValue[i]}`;
        }
      }
    },
    resendOtpShow() {
      this.resendOtpFlag = true;
    },
    resendOtpApiCall() {
      this.$store.commit('setPage', 'otp');
      const request = {
        resendOtp: true,
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
      if (this.formValidation()) {
        this.apiInProgress = true;
        const request = {
          phoneNumber: this.getOrderDetails.tempMobile,
          otp: this.otpValue,
          address: `${this.getLocation.latitude},${this.getLocation.longitude}`,
          orderId: this.getOrderId,
        };
        this.$store.dispatch('getValidationResult', {
          success: this.successOtpVerification,
          failure: this.failureOtpVerifcation,
          payload: request,
        });
      }
    },
    successOtpVerification(response) {
      this.apiInProgress = false;
      this.message = 'Successfully authenticated. Thank you for your patience!!';
      this.$store.commit('setLocation', {});
      this.$store.commit('setPage', 'success');
    },
    failureOtpVerifcation(error) {
      this.apiInProgress = false;
      this.message = 'There seems to be some issue please click on resend OTP to get OTP once again or click confirm phone number to change your mobile number.';
      this.$store.commit('setPage', 'failure');
    },
    redirect() {
      validation.validatorObject = {};
      this.$store.commit('isResendOtp', true);
      this.$router.push(`/delivery-authentication?order=${this.getOrderId}`);
    },
    fieldValidation(validateName, value1) {
      validation.validatorObject[validateName].value1 = value1;
      this.validator = { ...validation.validatorObject };
      const validationState = validation.validateFieldData(this.validator[validateName].value1, '', this.validator[validateName].validationFun);
      this.validator[validateName].isValid = validationState[validationState.validationState];
      return validationState[validationState.validationState];
    },
    formValidation() {
      let result = false;
      Object.keys(this.validator).every((validateName) => {
        const value = this.otpValue;
        result = this.fieldValidation(validateName, value);
        if (result === false) {
          return false;
        } else {
          return true;
        }
      });
      return result;
    },
  },
};
