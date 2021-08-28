import { types } from "../../../redux/types/types";

describe('Pruebas en los tipos', () => {
  test('debe de tener estos tipos', () => {
    expect(types).toEqual({
      authLogin: "[Auth] Login",
      authLogout: "[Auth] Logout",
    
      uiSetError: "[UI] Set Error",
      uiRemoveError: "[UI] Remove Error",
      uiStartLoading: "[UI] Start Loading",
      uiFinishLoading: "[UI] Finish Loading",
    
      notesAddNew: "[Notes] New Note",
      notesActive: "[Notes] Set Active Note",
      notesLoad: "[Notes] Load Notes",
      notesUpdated: "[Notes] Updated Notes",
      notesFileUrl: "[Notes] Updated Image Url",
      notesDelete: "[Notes] Delete Note",
      notesLogoutCleaning: "[Notes] Logout Cleaning",
    })
  })
  
});
