<template>
  <div class="home">
    <div class="header-container">
      <div class="header">
        <span class="header-title">{{getOrderId}}</span>
      </div>
      <ProgressBar/>
      <div class="header-body">
        {{message}}
      </div>
      <Toaster v-if="getApiFailure" :closeable="true" :message="getApiFailure" :type="'error'"/>
    </div>
    <div class="body" v-if="getPage === 'otp'">
      <OtpInput
        :disabled="apiInProgress"
        @storeOtpValue="storeOtpValue"
      />
      <Timer
        :key="timerRestart"
        @resendOtpShow="resendOtpShow"
      />
    </div>
    <div class="body" v-else>
      <Toaster class="toaster__message" v-if="getPage === 'failure'" :closeable="false"
        :message="getValidationResult.errorDesc" :type="'error'"/>
      <Toaster class="toaster__message" v-if="getPage === 'success'" :closeable="false"
        :message="getValidationResult.errorDesc" :type="'success'"/>
    </div>
    <div class="footer buttons-footer" v-if="getPage !== 'success'">
      <a :class="{'disabled': (!resendOtpFlag && getPage !== 'failure')}" @click="resendOtpApiCall">
        Resend OTP
      </a>
      <button v-if="getPage === 'otp'" class="btn blu-btn"
      :class="{'disabled': otpValue.length !== 6 || apiInProgress}" @click="otpVerification">
        Confirm Order
      </button>
      <button v-else class="btn blu-btn" @click="redirect">Check My Number</button>
    </div>
    <div class="footer" v-else>
      <!-- TODO at click of this button -->
      <!-- TODO autofill otp -->
      <button class="btn blu-btn large-btn">Please Review Us</button>
    </div>
  </div>
</template>

<script src="./js/verification.js"/>
