<template>
  <div class="home">
    <div class="header-container">
      <div class="header">
        <span class="header-title">{{getOrderDetails.orderId}}</span>
      </div>
      <div class="header-body">
        {{message}}
      </div>
    </div>
    <div class="body" v-if="page !== 'success'">
      <OtpInput
        @storeOtpValue="storeOtpValue"
      />
      <Timer
        :key="timerRestart"
        @resendOtpShow="resendOtpShow"
      />
    </div>
    <div class="footer buttons-footer" v-if="page !== 'success'">
      <a :class="{'disabled': !resendOtpFlag}" @click="resendOtpApiCall">Resend OTP</a>
      <button v-if="page === 'otp'" class="btn blu-btn" @click="otpVerification">
        Confirm Order
      </button>
      <button v-else class="btn blu-btn" @click="otpVerification">Check My Number</button>
    </div>
    <div class="footer" v-else>
      <!-- TODO at click of this button -->
      <button class="btn blu-btn large-btn">Please Review Us</button>
    </div>
  </div>
</template>

<script src="./js/verification.js"/>
