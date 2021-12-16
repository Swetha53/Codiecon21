/* eslint-disable prefer-object-spread */
import Vue from 'vue';
import Vuex from 'vuex';
import apiCall from '../api/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    orderId: '27000523152',
    orderDetails: {},
    location: {},
    otpDetails: {},
    validationResult: {},
    error: '',
    page: '',
  },
  getters: {
    getOrderId(state) {
      return state.orderId;
    },
    getOrderDetails(state) {
      return state.orderDetails;
    },
    getLocation(state) {
      return state.location;
    },
    getOtpDetails(state) {
      return state.otpDetails;
    },
    getValidationResult(state) {
      return state.validationResult;
    },
    getApiFailure(state) {
      return state.error;
    },
    getPage(state) {
      return state.page;
    },
  },
  mutations: {
    setOrderId(state, value) {
      state.orderId = value;
    },
    setOrderDetails(state, value) {
      state.orderDetails = value;
    },
    setLocation(state, value) {
      state.location = value;
    },
    setOtp(state, value) {
      state.otpDetails = value;
    },
    setValidationResult(state, value) {
      state.validationResult = value;
    },
    setApiFailure(state, value) {
      state.error = value;
    },
    setPage(state, value) {
      state.page = value;
    },
  },
  actions: {
    getLocation({ commit }, { success, failure }) {
      apiCall.makeGetRequestWithoutHeader('http://ip-api.com/json/',
        (response) => {
          if (response.status === 200) {
            commit('setLocation', response.data);
            success(response.data);
          } else {
            failure(response);
          }
        },
        (error) => {
          failure(error);
        });
    },
    getOtpDetails({ commit }, { success, failure, payload }) {
      apiCall.makeGetRequest(`/mobile-api/delivery/otp?orderId=${payload.orderId}&phoneNumber=${payload.phoneNumber}`,
        (response) => {
          if (response.data.result === 'true') {
            commit('setOtp', response.data);
            success(response);
          } else {
            commit('setApiFailure', response.data.errorDesc);
            failure(response);
          }
        },
        (error) => {
          failure(error);
        });
    },
    getValidationResult({ commit }, { success, failure, payload }) {
      apiCall.makePostRequest(`/mobile-api/delivery/validate?orderId=${payload.orderId}&phoneNumber=${payload.phoneNumber}&otp=${payload.otp}&address=${payload.address}`,
        (response) => {
          commit('setValidationResult', response.data);
          if (response.data.result !== 'false') {
            success(response);
          } else {
            failure(response);
          }
        },
        (error) => {
          commit('setApiFailure', 'Some issue in validation');
          failure(error);
        });
    },
    getMobileNumber({ commit }, { success, failure, payload }) {
      apiCall.makeGetRequest(`/mobile-api/delivery/getNumber?orderId=${payload.orderId}`,
        (response) => {
          if (response.data.success) {
            commit('setOrderDetails', response.data.value);
            success(response);
          } else {
            commit('setApiFailure', response.data.errorMessage);
            failure(response);
          }
        },
        (error) => {
          commit('setApiFailure', 'Some issue in getting your mobile number please reload.');
          failure(error);
        });
    },
  },
  modules: {
  },
});
