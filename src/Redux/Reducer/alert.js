import * as types from "../Actions/actionTypes";

const initialState = null;

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.SET_ALERT:
      return {
        ...payload,
      };
    case types.REMOVE_ALERT:
      return null;
    default:
      return state;
  }
}
