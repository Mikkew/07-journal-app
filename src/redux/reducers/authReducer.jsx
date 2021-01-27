import { types } from "../types/types";

const initialState = {
  uid: null,
  displayName: null,
  email: null,
  name: null,
  lastName: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authLogin:
      return {
        uid: action.payload.uid,
        displayName: action.payload.displayName,
        email: action.payload.email,
        name: action.payload.name,
        lastName: action.payload.lastName,
      };
    case types.authLogout:
      return initialState;
    default:
      return state;
  }
};
