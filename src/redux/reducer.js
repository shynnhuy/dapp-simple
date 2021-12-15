const initialState = {
  user: null,
  balance: 0,
  tokenData: {
    name: "",
    symbol: "",
  },
  txBeingSent: null,
};

export const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_USER":
      return { ...state, user: payload };

    case "SET_TOKEN":
      return { ...state, token: payload };

    case "SET_TOKEN_DATA":
      return { ...state, tokenData: payload };

    case "SET_BALANCE":
      return { ...state, balance: payload };

    case "SET_TRANSACTION":
      return { ...state, txBeingSent: payload };
    default:
      return state;
  }
};
