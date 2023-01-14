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

export const fetchMovieDetail = (movieId) => async (next) => {
  try {
    const res = await requestor({
      method: "GET",
      url: apiPath.MOVIE_DETAIL,
      params: {
        MaPhim: movieId,
      },
    });
    next({ type: actions.SET_MOVIE_DETAIL, payload: res.data.content });
  } catch (error) {
    console.log(error);
  }
};

export const fetchBooking = (movieId) => async (next) => {
  try {
    const res = await requestor({
      method: "GET",
      url: apiPath.BOOKING,
      params: {
        MaLichChieu: movieId,
      },
    });
    next({ type: actions.SET_BOOKING, payload: res.data.content });
  } catch (error) {
    console.log(error);
  }
};

export const bookingAction = (inputData) => async (next) => {
  try {
    const res = await requestor({
      method: "POST",
      url: apiPath.BOOKING_SEAT,
      data: inputData,
    });
    next({ type: actions.SET_BOOKING_SEAT, payload: res.data.content });
  } catch (error) {
    console.log(error);
  }
};

export const updateUserAction = (userInput) => {
  return async (next) => {
    try {
      const res = await requestor({
        method: "PUT",
        url: apiPath.USER_UPDATE_INFO,
        data: userInput,
      });
      next({
        type: actions.SET_USER_UPDATE_INFO,
        payload: res.data.content,
      });
    } catch (error) {
      throw error;
    }
  };
};
