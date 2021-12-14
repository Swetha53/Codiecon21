<template>
  <div class="home">
    <div class="header-container">
      <div class="header">
        <span class="header-title">{{getOrderDetails.orderId}}</span>
      </div>
      <div class="header-body">
        Please confirm your mobile number, so that we can send you the OTP
        to make sure the order has been delivered.
      </div>
    </div>
    <div class="body">
      <input type="tel" name="mobile" id="mobile" v-model="mobile" :disabled="apiInProgress"/>
    </div>
    <div class="footer">
      <button class="btn blu-btn" @click="sendDetailsForOtp"
      :disabled="apiInProgress" :class="{'disabled': apiInProgress}">
        Send OTP
      </button>
    </div>
  </div>
</template>

<script src="./js/home.js"/>
