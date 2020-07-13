import { types } from "../types/types";

export const authReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.login:
      return {
        ...payload,
        logged: true,
      };
    case types.logout:
      return {
        ...payload,
        logged: false,
      };
    case types.expired:
      return {
        ...payload,
        logged: false,
      };
    default:
      return state;
  }
};
