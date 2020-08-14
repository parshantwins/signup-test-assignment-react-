const LOCALSTORAGE_AUTH_USER = "AuthUser";
const LOCALSTORAGE_TOKEN_KEY = "AuthToken";
const LOCALSTORAGE_EXPIRES_AT = "ExpiresAt";

const getUserDetail = () => {
  let userDetailData = localStorage.getItem(LOCALSTORAGE_AUTH_USER);

  if (userDetailData) return JSON.parse(userDetailData);

  return null;
};

const storeAuthToken = token => {
  localStorage(this.LOCALSTORAGE_TOKEN_KEY, token);
};

const removeAuthToken = () => {
  localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY);
};

const getAuthorizationToken = () => {
  return localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
};

const isAuthenticated = () => {
  if (localStorage.getItem(LOCALSTORAGE_AUTH_USER)) {
    if (localStorage.getItem(LOCALSTORAGE_EXPIRES_AT)) {
      const expirtyTime = Number(localStorage.getItem(LOCALSTORAGE_EXPIRES_AT));
      const currentTime = new Date().getTime();

      if (expirtyTime > currentTime) return true;

      return false;
    } else {
      return true;
    }
  }
  return false;
};

const storeAuthUser = (data, remember) => {
  debugger;
  localStorage.setItem(LOCALSTORAGE_AUTH_USER, JSON.stringify(data));
  localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, data.Data.token);

  const currentDate = new Date();
  if (remember == true) {
    currentDate.setDate(currentDate.getDate() + 15);
    const expiryMiliseconds = currentDate.getTime();
    localStorage.setItem(LOCALSTORAGE_EXPIRES_AT, String(expiryMiliseconds));
  } else {
    currentDate.setMinutes(currentDate.getMinutes() + 15);
  }
};

const clearLocalStorage = () => {
  localStorage.clear();
};

export const localStorageService = {
  getUserDetail,
  getAuthorizationToken,
  isAuthenticated,
  storeAuthUser,
  clearLocalStorage
};
