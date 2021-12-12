export default {
  name: 'OtpInput',
  data() {
    return {
      otpValue: [],
      inputs: [],
    };
  },
  mounted() {
    this.inputs = document.getElementsByClassName('otp-input__box');
    this.eventListener();
  },
  methods: {
    eventListener() {
      for (let i = 0; i < this.inputs.length; i += 1) {
        this.inputs[i].addEventListener('keydown', (event) => this.checkButtonClicked(event, i));
      }
    },
    checkButtonClicked(event, position) {
      if (event.key === 'Backspace') {
        if (this.inputs[position].value === '') {
          if (position !== 0) {
            this.inputs[position - 1].focus();
          }
        } else {
          this.inputs[position].value = '';
          this.otpValue[position] = '';
        }
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
  destroyed() {
    const inputs = document.getElementsByClassName('otp-input__box');
    for (let i = 0; i < inputs.length; i += 1) {
      inputs[i].removeEventListener('keydown');
    }
  },
};
