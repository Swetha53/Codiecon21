/* eslint-disable no-else-return */
/* eslint-disable no-unused-vars */
import { mapGetters } from 'vuex';
import validation from '../../../utilServices/validation';
import Toaster from '../../components/Toaster.vue';
import ProgressBar from '../../components/ProgressBar.vue';

export default {
  name: 'Home',
  data() {
    return {
      mobile: 0,
      apiInProgress: false,
      orderId: this.$route.query.order,
      location: {
        latitude: 0,
        longitude: 0,
      },
      isGeolocation: true,
      validator: {},
      addMessage: 'Please allow us your location for verification',
    };
  },
  components: {
    Toaster,
    ProgressBar,
  },
  computed: {
    ...mapGetters(['getOrderId', 'getOrderDetails', 'getApiFailure', 'getLocation', 'getRedirectedFlag']),
  },
  mounted() {
    this.$store.commit('setOrderId', this.orderId);
    this.$store.commit('setPage', 'home');
    if (this.getLocation && this.getLocation.latitude && this.getLocation.longitude) {
      this.location = this.getLocation;
    }
    if (this.getRedirectedFlag) {
      this.mobile = this.getOrderDetails.tempMobile;
    } else {
      this.getMobileNumber();
    }
    this.createValidation();
  },
  methods: {
    createValidation() {
      validation.validatorObject = {};
      validation.validatorObject.mobileNumber = {
        name: 'mobileNumber',
        validationFun: 'isEmpty',
        isValid: true,
        value1: this.mobile,
      };
      validation.validatorObject.validMobileNumber = {
        name: 'mobileNumber',
        validationFun: 'isValid',
        isValid: true,
        value1: this.mobile,
      };
      validation.validatorObject.latitude = {
        name: 'latitude',
        validationFun: 'isEmpty',
        isValid: true,
        value1: this.location.latitude,
      };
      validation.validatorObject.longitude = {
        name: 'longitude',
        validationFun: 'isEmpty',
        isValid: true,
        value1: this.location.longitude,
      };
      this.validator = { ...validation.validatorObject };
    },
    sendDetailsForOtp() {
      if (this.formValidation()) {
        // eslint-disable-next-line prefer-object-spread
        this.$store.commit('setOrderDetails', Object.assign({}, { tempMobile: this.mobile }, this.getOrderDetails));
        const request = {
          resendOtp: false,
          phoneNumber: this.getOrderDetails.tempMobile,
          orderId: this.getOrderId,
        };
        if (this.getRedirectedFlag) {
          request.resendOtp = true;
        }
        this.apiInProgress = true;
        this.$store.dispatch('getOtpDetails', {
          success: this.successSendDetailsForOtp,
          failure: this.failureSendDetailsForOtp,
          payload: request,
        });
      }
    },
    successSendDetailsForOtp(response) {
      validation.validatorObject = {};
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
    getLocationApiCall() {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'granted') {
          navigator.geolocation.getCurrentPosition(this.successGetLocationApiCall,
            this.failureGetLocationApiCall);
        } else if (result.state === 'prompt') {
          this.addMessage = 'Please select \'allow\' button in the popup above.';
          navigator.geolocation.getCurrentPosition(this.successGetLocationApiCall,
            this.failureGetLocationApiCall);
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
      if (this.isGeolocation) {
        this.location.latitude = response.coords.latitude;
        this.location.longitude = response.coords.longitude;
      } else {
        this.location.latitude = response.lat;
        this.location.longitude = response.lon;
      }
      this.$store.commit('setLocation', this.location);
    },
    failureGetLocationApiCall(error) {
      this.$store.commit('setApiFailure', error);
    },
    isMobileValid() {
      const validate = ['mobileNumber', 'validMobileNumber'];
      validate.forEach((name) => {
        this.fieldValidation(name, this.mobile);
      });
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
        let value = '';
        if (validateName.includes('Number')) {
          value = this.mobile;
        } else {
          value = this.location[validateName];
        }
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
