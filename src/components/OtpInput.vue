<template>
  <div class="otp-input">
    <input type="tel" class="otp-input__box"
      v-for="i in 6" :key="i" pattern="[0-9]" maxlength="1" :disabled="disabled"
      v-model="otpValue[i-1]" @input="sendOtp(i)" @keydown="checkButtonClicked($event, i - 1)"/>
  </div>
</template>

<script src="./js/otp-input.js"/>
