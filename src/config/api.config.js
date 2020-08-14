const API_ENDPOINTS = {
  SIGNUP: "signup",
  VERIFYEMAIL: "check-user",
};

export const getApiUrl = key => {
  return process.env.REACT_APP_API_URL + API_ENDPOINTS[key];
};
