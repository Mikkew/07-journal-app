import { firebase, googleAuthProvider } from "../../firebase/firebaseConfig";
import Swal from "sweetalert2";
import { types } from "../types/types";
import { finishLoading, setError, startLoading } from "./ui";
import { createUser } from "../../firebase/helpers/createUser";
import { getUserProfile } from "../../firebase/helpers/getUserProfile";

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        // console.log(user);

        getUserProfile(user, dispatch, login);
      })
      .catch((error) => {
        console.log("Error", error);
        dispatch(setError(error));

        Swal.fire("Error", error.message, "error");
      })
      .finally(() => {
        dispatch(finishLoading());
      });
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        const { displayName, uid, email } = user;
        console.log(displayName, uid, email);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };
};

export const startRegisterWithEmailPasswordName = (
  name,
  lastName,
  email,
  password
) => {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({
          displayName: `${name} ${lastName}`,
        });

        createUser(user, name, lastName, dispatch, login);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();
    console.log("Conexion cerrada");
    dispatch(logout());
  };
};

export const login = (uid, displayName, email, name, lastName) => ({
  type: types.authLogin,
  payload: {
    uid,
    displayName,
    email,
    name,
    lastName,
  },
});

export const logout = () => ({
  type: types.authLogout,
});
