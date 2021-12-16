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
      <div class="body__mobile">
        <label for="mobile">Mobile Number</label>
        <input type="tel" name="mobile" id="mobile" pattern="[0-9]" v-model="mobile"
          :disabled="apiInProgress" autocomplete="off" @change="isMobileValid"
          :class="{'error-border': validator &&
          ((validator['mobileNumber'] && !validator['mobileNumber'].isValid) ||
          (validator['validMobileNumber'] && !validator['validMobileNumber'].isValid))}"/>
        <span class="error-message"
          v-if="validator['mobileNumber'] && !validator['mobileNumber'].isValid">
          Please enter your Mobile Number.
        </span>
        <span class="error-message"
          v-else-if="validator['validMobileNumber'] && !validator['validMobileNumber'].isValid">
          Please enter a valid Mobile Number.
        </span>
      </div>
      <div class="body__location">
        <label for="location">{{addMessage}}</label>
        <div class="body__location-input">
          <input type="text" :disabled="true" v-model="location.latitude"
            :class="{'error-border': validator &&
            (validator['latitude'] && !validator['latitude'].isValid)}"/>
          <input type="text" :disabled="true" v-model="location.longitude"
            :class="{'error-border': validator &&
            (validator['longitude'] && !validator['longitude'].isValid)}"/>
          <button class="btn blu-btn" @click="getLocationApiCall"
            :disabled="apiInProgress" :class="{'disabled': apiInProgress}">
            Check Location
          </button>
        </div>
        <span class="error-message"
          v-if="(validator['latitude'] && !validator['latitude'].isValid) ||
          (validator['longitude'] && !validator['longitude'].isValid)">
          Please allow us to capture your location.
        </span>
      </div>
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
