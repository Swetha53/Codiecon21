import axios from 'axios';

const headers = {};

export default {
  makeGetRequest(path, callback, fail) {
    headers['Content-Type'] = 'application/json;charset=UTF-8';
    headers['User-Agent'] = 'instore-byok-web-ui';
    axios
      .get(path, { withCredentials: true, headers })
      .then((response) => { callback(response); })
      .catch(fail);
  },
  makePostRequest(path, callback, fail, payload) {
    axios
      .post(path, payload)
      .then(callback)
      .catch(fail);
  },
  makePutRequest(path, callback, fail, payload) {
    headers['Content-Type'] = 'application/json;charset=UTF-8';
    headers['User-Agent'] = 'instore-byok-web-ui';
    axios
      .put(path, payload, { withCredentials: true, headers })
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
