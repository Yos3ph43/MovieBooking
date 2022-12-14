import produce from "immer";
import actions from "./type";
const initialState = {
  banners: [],
  movies: [],
  cinemas: [],
  cinemaSchedule: [],
  movieDetail: null,
};

const reducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    switch (type) {
      case actions.SET_BANNERS:
        draft.banners = payload;
        break;
      case actions.SET_MOVIES:
        draft.movies = payload;
        break;
      case actions.SET_CINEMAS:
        draft.cinemas = payload;
        break;
      case actions.SET_CINEMA_SCHEDULE:
        draft.cinemaSchedule = payload;
        break;
      case actions.SET_MOVIE_DETAIL:
        draft.movieDetail = payload;
        break;
      default:
        break;
    }
  });
};
export default reducer;
