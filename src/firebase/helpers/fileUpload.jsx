import Swal from "sweetalert2";
import { storage } from "../firebaseConfig";

export const fileUpload = (file, uid, activeNote, dispatch, startSaveNote) => {
  const path = `${uid}/journal/notes/${file.name}`;

  const picture = storage.ref(path);

  if (picture.fullPath !== path) {
    const uploadPicture = picture.put(file);
    uploadPicture.on(
      "state_changed",
      (snapshot) => {
        // console.log(snapshot);
      },
      (error) => {
        console.log(error);
      },
      () => {
        uploadPicture.snapshot.ref.getDownloadURL().then((downloadURL) => {
          // console.log('File available at', downloadURL);
          activeNote.url = downloadURL;
          activeNote.imageName = file.name;
          dispatch(startSaveNote(activeNote));
        });
      }
    );
  } else {
    Swal.fire({
      icon: "error",
      title: "Ya existe",
      text: `El archivo ${file.name} ya existe`,
    });
  }
};
