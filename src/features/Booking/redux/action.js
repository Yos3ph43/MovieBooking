import requestor from "app/api";
import { apiPath } from "app/apiPath";
import actions from "./type";

export const fetchBannersAction = async (next) => {
  try {
    const res = await requestor({ method: "GET", url: apiPath.BANNERS });
    next({ type: actions.SET_BANNERS, payload: res.data.content });
  } catch (error) {
    console.log(error);
  }
};

export const fetchMoviesAction = async (next) => {
  try {
    const res = await requestor({
      method: "GET",
      url: apiPath.MOVIES,
    });
    next({ type: actions.SET_MOVIES, payload: res.data.content });
  } catch (error) {
    console.log(error);
  }
};

export const fetchCinemasAction = async (next) => {
  try {
    const res = await requestor({
      method: "GET",
      url: apiPath.CINEMAS,
    });
    next({ type: actions.SET_CINEMAS, payload: res.data.content });
  } catch (error) {
    console.log(error);
  }
};

export const fetchCinemaSchedule = (cinemaId) => async (next) => {
  try {
    const res = await requestor({
      method: "GET",
      url: apiPath.CINEMA_SCHEDULE,
      params: {
        maHeThongRap: cinemaId,
      },
    });
    next({ type: actions.SET_CINEMA_SCHEDULE, payload: res.data.content });
  } catch (error) {
    console.log(error);
  }
};
