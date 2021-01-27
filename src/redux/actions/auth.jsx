import {
  firebase,
  googleAuthProvider,
  db,
} from "../../firebase/firebaseConfig";
import Swal from 'sweetalert2';
import { types } from "../types/types";
import { finishLoading, setError, startLoading } from "./ui";

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then( async({ user }) => {
        // console.log(user);


        await db.collection("Usuarios")
          .where("uId", "==", user.uid)
          .get()
          .then((query) => {

            //console.log(query);

            query.forEach((doc) => {

              // console.log(doc.data(), uid, displayName);

              const { lastName, name } = doc.data();
              dispatch(login(user.uid, user.displayName, email, name, lastName));
             
            });
          })
          .catch(error => {
            dispatch(setError(error));
          });


      })
      .catch(error => {
        console.log("Error", error);
        dispatch(setError(error));
        
        Swal.fire( 'Error', error.message, 'error');

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
  return () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({
          displayName: `${name} ${lastName}`,
        });

        await db
          .collection("Usuarios")
          .add({
            uId: user.uid,
            name,
            lastName,
            email,
          })
          .then((userRegister) => {
            console.log("Insersion de Usuario Extitoso", userRegister);
          })
          .catch((error) => {
            console.log("Error", error);
          });
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };
};

export const startLogout = () => {
  return async(dispatch) => {
    await firebase.auth().signOut();
    console.log("Conexion cerrada");
    dispatch( logout() );
  }
};


export const login = (uid, displayName, email, name, lastName) => ({
  type: types.authLogin,
  payload: {
    uid,
    displayName,
    email,
    name,
    lastName
  }
});

export const logout = () => ({
  type: types.authLogout,
});
