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
  },
  getters: {
    getOrderDetails(state) {
      return state.orderDetails;
    },
    getLocation(state) {
      return state.location;
    },
  },
  mutations: {
    setOrderDetails(state, value) {
      state.orderDetails = value;
    },
    setLocation(state, value) {
      state.location = value;
    },
  },
  actions: {
    getLocation({ commit }, { success, failure }) {
      apiCall.makeGetRequestWithoutHeader('http://ip-api.com/json/',
        (response) => {
          if (response.status === 200) {
            commit('setLocation', response.data);
            success(response);
          } else {
            failure(response);
          }
        },
        (error) => {
          failure(error);
        });
    },
  },
  modules: {
  },
});
