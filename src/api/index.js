/* eslint-disable dot-notation */
import axios from 'axios';

const headers = {};

export default {
  makeGetRequest(path, callback, fail) {
    headers['Content-Type'] = 'application/json;charset=UTF-8';
    axios
      .get(path, { headers })
      .then((response) => { callback(response); })
      .catch(fail);
  },
  makePostRequest(path, callback, fail, payload) {
    headers['Content-Type'] = 'application/json;charset=UTF-8';
    axios
      .post(path, payload)
      .then(callback)
      .catch(fail);
  },
  makeGetRequestWithoutHeader(path, callback, fail) {
    axios
      .get(path)
      .then((response) => { callback(response); })
      .catch(fail);
  },
};
