<template>
  <div class="home">
    <div class="header-container">
      <div class="header">
        <span class="header-title">Order: {{getOrderId}}</span>
      </div>
      <ProgressBar/>
      <div class="header-body">
        {{message}}
      </div>
      <Toaster v-if="getApiFailure" :closeable="true" :message="getApiFailure" :type="'error'"/>
    </div>
    <div class="body body-verification" v-if="getPage === 'otp'">
      <OtpInput
        :disabled="apiInProgress"
        @storeOtpValue="storeOtpValue"
      />
      <div class="error-message" v-if="validator['otp'] && !validator['otp'].isValid">
        Please enter the OTP.
      </div>
      <div class="error-message"
        v-else-if="validator['validOtp'] && !validator['validOtp'].isValid">
        Please enter a valid OTP.
      </div>
      <Timer
        :key="timerRestart"
        @resendOtpShow="resendOtpShow"
      />
    </div>
    <div class="body" v-else>
      <Toaster class="toaster__message" :closeable="false"
        :message="getValidationResult.errorMessage"
        v-if="getPage === 'failure' && getValidationResult.errorMessage" :type="'error'"/>
      <Toaster class="toaster__message" v-if="getPage === 'success'"
        :closeable="false" :type="'success'"
        :message2="[`You package has been `,
        `delivered to ${getValidationResult.value.address} `,
        `address which is approx. `,
        `${getValidationResult.value.distance} km`,
        ` away from the delivery location mentioned in the order.`]"
        :message="`Thank you for receiving the goods and it is received by person with` +
          ` mobile number ${getOrderDetails.tempMobile}`"/>
    </div>
    <div class="footer buttons-footer" v-if="getPage !== 'success'">
      <a :class="{'disabled': (!resendOtpFlag && getPage !== 'failure')}" @click="resendOtpApiCall">
        Resend OTP
      </a>
      <button v-if="getPage === 'otp'" class="btn blu-btn"
      :class="{'disabled': apiInProgress}" @click="otpVerification">
        Confirm Order
      </button>
      <button v-else class="btn blu-btn" @click="redirect">Check My Number</button>
    </div>
    <div class="footer" v-else>
      <!-- TODO at click of this button -->
      <!-- TODO autofill otp -->
      <button class="btn blu-btn large-btn">Please Review Us!</button>
    </div>
  </div>
</template>

<script src="./js/verification.js"/>
