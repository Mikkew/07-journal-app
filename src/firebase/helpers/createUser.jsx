import { db } from "../firebaseConfig";

export const createUser = async (user, name, lastName, dispatch, login) => {
  await db
    .collection(`${user.uid}`)
    .doc("perfil")
    .set({
      uId: user.uid,
      name,
      lastName,
      email: user.email,
    })
    .then((userRegister) => {
      console.log("Insersion de Usuario Extitoso", userRegister);
      dispatch(
        login(
          userRegister.uid,
          userRegister.displayName,
          userRegister.email,
          name,
          lastName
        )
      );
    })
    .catch((error) => {
      console.log("Error", error);
    });
};
