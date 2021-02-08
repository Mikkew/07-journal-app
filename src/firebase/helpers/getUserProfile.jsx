import { db } from "../firebaseConfig";

export const getUserProfile = (user, dispatch, login) => {
  const { uid, displayName, email } = user;
  const perfilSnap = db.collection(user.uid).doc("perfil");

  perfilSnap.onSnapshot( perfil => {
    const {name, lastName} = perfil.data();
    dispatch(login(uid, displayName, email, name, lastName ));
  });
};
