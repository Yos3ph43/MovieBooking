import produce from "immer";
import actions from "./type";

const initialState = {
  profile: null,
};

const reducer = (state = initialState, { type, payload }) => {
  return produce(state, (drafe) => {
    switch (type) {
      case actions.SET_PROFILE:
        drafe.profile = payload;
        break;
      case actions.SET_SIGNUP:
        drafe.profile = payload;
      default:
        break;
    }
  });
};

export default reducer;
