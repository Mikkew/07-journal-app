import { storage } from "../firebaseConfig";

export const deleteFile = async(uid, fileName) => {
  
  const path = `${uid}/journal/notes/${fileName}`;

  const deletePicture = storage.ref().child(path);
  
  await deletePicture.delete();

};
