const TOKEN_KEY = "token";
const USER_KEY = "user";
const CLASS_KEY = "class";
const ANNOUNCEMENT_KEY = "announcement";

export const setToken = (data) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(data));
};
export const getToken = () => {
  return JSON.parse(localStorage.getItem(TOKEN_KEY));
};
export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const setUser = (data) => {
  localStorage.setItem(USER_KEY, JSON.stringify(data));
};
export const getUser = () => {
  return JSON.parse(localStorage.getItem(USER_KEY));
};
export const clearUser = () => {
  localStorage.removeItem(USER_KEY);
};

export const setClass = (data) => {
  localStorage.setItem(CLASS_KEY, JSON.stringify(data));
};
export const getClass = () => {
  return JSON.parse(localStorage.getItem(CLASS_KEY));
};
export const clearClass = () => {
  localStorage.removeItem(CLASS_KEY);
};

export const setAnnouncement = (data) => {
  localStorage.setItem(ANNOUNCEMENT_KEY, JSON.stringify(data));
};
export const getAnnouncement = () => {
  return JSON.parse(localStorage.getItem(ANNOUNCEMENT_KEY));
};
export const clearAnnouncement = () => {
  localStorage.removeItem(ANNOUNCEMENT_KEY);
};