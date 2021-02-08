import { db } from "../firebaseConfig"

export const deleteNoteDB = async(uid, id) => {
  console.log(uid, id);
  await db.doc(`${uid}/journal/notes/${id}`).delete();
}
