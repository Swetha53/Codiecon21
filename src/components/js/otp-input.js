export default {
  name: 'OtpInput',
  data() {
    return {
      otpValue: [],
      inputs: [],
    };
  },
  props: ['disabled'],
  mounted() {
    this.inputs = document.getElementsByClassName('otp-input__box');
  },
  methods: {
    checkButtonClicked(event, position) {
      if (event.key === 'Backspace') {
        this.otpValue[position] = '';
        if (this.inputs[position].value === '') {
          if (position !== 0) {
            this.inputs[position - 1].focus();
          }
        } else {
          this.inputs[position].value = '';
        }
        this.$emit('storeOtpValue', this.otpValue);
      } else if (event.key === 'ArrowLeft' && position !== 0) {
        this.inputs[position - 1].focus();
      } else if (event.key === 'ArrowRight' && position !== this.inputs.length - 1) {
        this.inputs[position + 1].focus();
      }
    },
    sendOtp(position) {
      if (this.inputs[position - 1].value !== '' && position !== this.inputs.length) {
        this.inputs[position].focus();
      }
      this.$emit('storeOtpValue', this.otpValue);
    },
  },
};
