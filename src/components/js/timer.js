export default {
  name: 'Timer',
  data() {
    return {
      isTimer: '',
      count: {
        time: 30,
        minute: '00',
        second: '00',
      },
    };
  },
  mounted() {
    this.setTimer();
  },
  methods: {
    setTimer() {
      this.isTimer = setInterval(() => {
        this.count.time -= 1;
        const minute = Math.floor(this.count.time / 60);
        const second = Math.floor(this.count.time % 60);
        this.count.minute = minute < 10 ? `0${minute}` : `${minute}`;
        this.count.second = second < 10 ? `0${second}` : `${second}`;
        if (this.count.time <= 0) {
          this.$emit('resendOtpShow');
          clearInterval(this.isTimer);
        }
      }, 1000);
    },
  },
};
