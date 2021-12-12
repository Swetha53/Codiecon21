import Timer from '@/components/Timer.vue';
import OtpInput from '@/components/OtpInput.vue';

export default {
  name: 'Home',
  components: {
    Timer,
    OtpInput,
  },
  data() {
    return {
      otpValue: '',
    };
  },
  methods: {
    storeOtpValue(otpValue) {
      this.otpValue = '';
      for (let i = 0; i < otpValue.length; i += 1) {
        this.otpValue = `${this.otpValue}${i}`;
      }
    },
  },
};
