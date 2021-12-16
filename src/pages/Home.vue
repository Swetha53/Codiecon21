<template>
  <div class="home">
    <div class="header-container">
      <div class="header">
        <span class="header-title">{{getOrderId}}</span>
      </div>
      <ProgressBar/>
      <div class="header-body">
        Please confirm your mobile number, so that we can send you the OTP
        to make sure the order has been delivered.
      </div>
      <Toaster v-if="getApiFailure" :closeable="true" :message="getApiFailure" :type="'error'"/>
    </div>
    <div class="body">
      <input type="tel" name="mobile" id="mobile" pattern="[0-9]" v-model="mobile"
        :disabled="apiInProgress"/>
    </div>
    <div class="footer">
      <button class="btn blu-btn" @click="sendDetailsForOtp"
      :disabled="apiInProgress || !mobile" :class="{'disabled': apiInProgress || !mobile}">
        Send OTP
      </button>
    </div>
  </div>
</template>

<script src="./js/home.js"/>
