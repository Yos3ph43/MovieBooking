import requestor from "app/api";
import { apiPath } from "app/apiPath";
import actions from "./type";

export const fetchMovies = async (next) => {
  try {
    const res = await requestor({ method: "GET", url: apiPath.MOVIES });
    next({ type: actions.SET_MOVIES, payload: res.data.content });
  } catch (error) {
    console.log(error);
  }
};

export const fetchDetail = (id) => async (next) => {
  try {
    const res = await requestor({
      method: "GET",
      url: apiPath.MOVIE_DETAIL,
      params: {
        MaPhim: id,
      },
    });
    next({ type: actions.SET_MOVIE_DETAIL, payload: res.data.content });
  } catch (error) {
    console.log(error);
  }
};
export const fetchCinemas = async (next) => {
  try {
    const res = await requestor({ method: "GET", url: apiPath.CINEMAS });
    next({ type: actions.SET_CINEMAS, payload: res.data.content });
  } catch (error) {
    console.log(error);
  }
};

export const deleteSeletedMovie = (id) => async (next) => {
  try {
    const res = await requestor({
      method: "DELETE",
      url: apiPath.DELETE_MOVIE,
      params: {
        MaPhim: id,
      },
    });
    console.log(res.data.content);
  } catch (error) {
    console.log(error);
  }
};

export const creatMovieAction = (formData) => async () => {
  try {
    const res = await requestor({
      method: "POST",
      url: apiPath.CREATE_MOVIE,
      params: {
        frm: formData,
      },
    });
    alert("Thêm phim thành công");
    console.log(res.data.content);
  } catch (error) {
    console.log(error.response.data.content);
  }
};