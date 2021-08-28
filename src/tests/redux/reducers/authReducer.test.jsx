import "@testing-library/jest-dom";

import { authReducer } from "../../../redux/reducers/authReducer";
import { types } from "../../../redux/types/types";

describe("Pruebas en authReducer", () => {
  const initialState = {
    uid: null,
    displayName: null,
    email: null,
    name: null,
    lastName: null,
  };
  test("debe de retornar el estado por defecto", () => {
    const state = authReducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  test("debe de realizar el Login", () => {
    const stateLogin = {
      uid: 1273732,
      displayName: "ussd",
      email: "mss@gmail.com",
      name: "Jaimico",
      lastName: "Mandrileño",
    };

    const action = {
      type: types.authLogin,
      payload: stateLogin,
    };
    const state = authReducer({}, action);
    expect(state).toEqual(stateLogin);
  });

  test("debe de realizar el Logout", () => {
    const stateLogin = {
      uid: 1273732,
      displayName: "ussd",
      email: "mss@gmail.com",
      name: "Jaimico",
      lastName: "Mandrileño",
    };
    const state = authReducer(stateLogin, {type: types.authLogout});
    expect(state).toEqual(initialState);
  });
});
