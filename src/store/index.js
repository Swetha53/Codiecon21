import Vue from 'vue';
import Vuex from 'vuex';
import apiCall from '@/api/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    orderDetails: {
      orderId: 'order123',
      mobile: '9876543210',
    },
    location: {},
    otpDetails: {},
    validationResult: {},
    error: '',
    page: '',
  },
  getters: {
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
      apiCall.makeGetRequestWithoutHeader(`http://x-off2on.qa2-sg.cld/x-off2on/api/delivery/getOtp?orderId=${payload.orderId}&phoneNumber=${payload.phoneNumber}`,
        (response) => {
          if (response.status === 200 || response.body.success) {
            // TODO check response
            commit('setOtp', response);
            success(response);
          } else {
            commit('setApiFailure', 'Some issue in sending otp');
            failure(response);
          }
        },
        (error) => {
          failure(error);
        },
        payload);
    },
    getValidationResult({ commit }, { success, failure, payload }) {
      apiCall.makePostRequest('http://x-off2on.qa2-sg.cld/x-off2on/api/delivery/validate',
        (response) => {
          console.log(response);
          commit('setValidationResult', response);
          success(response);
        },
        (error) => {
          commit('setApiFailure', 'Some issue in validation');
          failure(error);
        },
        payload);
    },
  },
  modules: {
  },
});
