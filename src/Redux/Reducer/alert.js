import * as types from "../Actions/actionContents";

const initialState = null;

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.SET_ALERT:
      return {
        ...payload,
        closeModal: true,
      };
    case types.REMOVE_ALERT:
      return null;
    default:
      return state;
  }
}
