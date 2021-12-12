<template>
  <div class="otp-input">
    <input type="text" class="otp-input__box" :class="{'filled-box': otpValue[i-1]}"
      v-for="i in 4" :key="i" pattern="\d*" maxlength="1"
      v-model="otpValue[i-1]" @input="sendOtp(i)"/>
  </div>
</template>

<script src="./js/otp-input.js"/>
