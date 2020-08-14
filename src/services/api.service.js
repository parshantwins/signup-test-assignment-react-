import axios from "axios";

import { getApiUrl } from "../config/api.config";
import { errorMessages } from "../config/messages.config";

import { localStorageService } from "./localstorage.service";

// declare a request interceptor
axios.interceptors.request.use(
  request => {
    if (request.method.toUpperCase() == "POST") {
      request.headers["Content-Type"] = "application/json";
    }
    // request.headers.source = source;
    const isLoggedIn = localStorageService.isAuthenticated();
    if (isLoggedIn) {
      const token = localStorageService.getAuthorizationToken();
      request.headers.Authorization = `Basic ${token}`;
    }
    return request;
  },
  error => {
    return Promise.reject(error);
  }
);

// declare a response interceptor
axios.interceptors.response.use(
  response => {
    // do something with the response data
    return Promise.resolve(response.data);
  },
  error => {
    // handle the response error
    const { response } = error;
    
    if (response) {
      const { status, data } = response;
      debugger;
      const { errors } = data;
      // place your reentry code
      if (status === 401) {
        return Promise.reject(errors[0].message);
      } else {
        return Promise.reject(errors[0].message);
      }
    } else {
      if (error.message == "Network Error") {
        return Promise.reject(errorMessages.API_NOT_AVAILABLE);
      } else {
        return Promise.reject(error.message);
      }
    }
  }
);

/* api methods */
const get = endpoint => {
  return axios.get(getApiUrl(endpoint));
};

const post = (endpoint, data) => {
  return axios.post(getApiUrl(endpoint), data);
};

export const apiService = {
  get,
  post
};
