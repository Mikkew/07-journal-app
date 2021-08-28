import {
  finishLoading,
  removeError,
  setError,
  startLoading,
} from "../../../redux/actions/ui";
import "@testing-library/jest-dom";
import { types } from "../../../redux/types/types";

describe("Pruebas en ui-actions", () => {
  test("todas deben de funcionar", () => {
    const action = setError("HELP!!!");
    expect(action).toEqual({
      type: types.uiSetError,
      payload: "HELP!!!",
    });
    
    const removeErrorAction = removeError();
    const startLoadingAction = startLoading();
    const finishLoadingAction = finishLoading();
    
    expect(removeErrorAction).toEqual({
      type: types.uiRemoveError
    });
    expect(startLoadingAction).toEqual({
      type: types.uiStartLoading
    });
    expect(finishLoadingAction).toEqual({
      type: types.uiFinishLoading
    })
  });
});
