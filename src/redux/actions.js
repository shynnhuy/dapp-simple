export const setUser = (user) => ({
  type: "SET_USER",
  payload: user,
});
export const setTokenContract = (payload) => ({
  type: "SET_TOKEN",
  payload,
});
export const setTokenData = (token) => ({
  type: "SET_TOKEN_DATA",
  payload: token,
});
export const setBalance = (payload) => ({
  type: "SET_BALANCE",
  payload,
});
export const setTransaction = (payload) => ({
  type: "SET_TRANSACTION",
  payload,
});
