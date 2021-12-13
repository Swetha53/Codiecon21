import axios from 'axios';

const headers = {};

export default {
  makeGetRequest(path, callback, fail, stopLoader = false) {
    headers['Content-Type'] = 'application/json;charset=UTF-8';
    headers['User-Agent'] = 'instore-byok-web-ui';
    headers['Stop-Loader'] = stopLoader;
    axios
      .get(path, { withCredentials: true, headers })
      .then((response) => { callback(response); })
      .catch(fail);
  },
  makePostRequest(path, callback, fail, payload, stopLoader = false) {
    headers['Content-Type'] = 'application/json;charset=UTF-8';
    headers['User-Agent'] = 'instore-byok-web-ui';
    headers['Stop-Loader'] = stopLoader;
    axios
      .post(path, payload, { withCredentials: true, headers })
      .then(callback)
      .catch(fail);
  },
  makePutRequest(path, callback, fail, payload, stopLoader = false) {
    headers['Content-Type'] = 'application/json;charset=UTF-8';
    headers['User-Agent'] = 'instore-byok-web-ui';
    headers['Stop-Loader'] = stopLoader;
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
