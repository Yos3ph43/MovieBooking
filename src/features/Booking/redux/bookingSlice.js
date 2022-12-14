import produce from "immer";
import actions from "./type";
const initialState = {
  banners: [],
};

const reducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    switch (type) {
      case actions.SET_BANNERS:
        draft.banners = payload;
        break;

      default:
        break;
    }
  });
};
export default reducer;
