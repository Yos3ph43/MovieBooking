import produce from "immer";
import actions from "./type";

const initialState = {
  movies: [],
  cinemas: [],
  movieDetail: null,
  allUser: null,
};

const reducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    switch (type) {
      case actions.SET_MOVIES:
        draft.movies = payload;
        break;
      case actions.SET_MOVIE_DETAIL:
        draft.movieDetail = payload;
        break;
      case actions.SET_CINEMAS:
        draft.cinemas = payload;
        break;
      case actions.SET_ALL_USER_INFO:
        draft.allUser = payload;
        break;
      default:
        return state;
    }
  });
};
export default reducer;
