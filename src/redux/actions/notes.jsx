import Swal from "sweetalert2";
import { db } from "../../firebase/firebaseConfig";
import { deleteFile } from "../../firebase/helpers/deleteFile";
import { deleteNoteDB } from "../../firebase/helpers/deleteNoteDB";
import { fileUpload } from "../../firebase/helpers/fileUpload";
import { loadNotes } from "../../firebase/helpers/loadNotes";
import { types } from "../types/types";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      date: new Date(),
    };

    const doc = await db.collection(`${uid}/journal/notes`).add(newNote);
    dispatch(activeNote(doc.id, newNote));
    dispatch(addNewNote(doc.id, newNote));
  };
};

export const startLoadingNotes = (user) => {
  return async (dispatch) => {
    const notes = await loadNotes(user.uid);
    dispatch(setNotes(notes));
  };
};

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

export const addNewNote = (id, note) => ({
  type: types.addNewNote,
  payload: {
    id,
    ...note
  }
});


export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes,
});

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!note.url) {
      delete note.url;
    }

    const noteToFirestore = { ...note };
    delete noteToFirestore.id;
    delete noteToFirestore.uid;
    delete note.uid;

    await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);
    dispatch(refreshNote(note.id, note));
    Swal.fire("Saved", note.title, "success");
  };
};

export const refreshNote = (id, note) => ({
  type: types.notesUpdated,
  payload: {
    id,
    note: {
      id,
      ...note,
    },
  },
});

export const startUploading = (picture) => {
  return (dispatch, getState) => {
    const { active: activeNote } = getState().notes;
    const { uid } = getState().auth;

    Swal.fire({
      title: "Uploading...",
      html: "Please wait...",
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    fileUpload(picture, uid, activeNote, dispatch, startSaveNote);
  };
};

export const startDeleting = (id, imageName) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    console.log(id);
    deleteFile(uid, imageName );
    deleteNoteDB(uid, id);
    dispatch( deleteNote(id) )
  };
};

export const deleteNote = (id) => ({
  type: types.notesDelete,
  payload: id,
});

export const noteLogout = () => ({
  type: types.notesLogoutCleaning,
});
