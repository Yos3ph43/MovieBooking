import requestor, { requestorUser } from "app/api";
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

export const createMovieAction = (formData) => async () => {
  try {
    const res = await requestor({
      method: "POST",
      url: apiPath.CREATE_MOVIE,
      data: formData,
    });
    alert("Thêm phim thành công");
    console.log(res.data.content);
  } catch (error) {
    console.log(error);
    alert(error.response?.data.content);
  }
};
export const updateMovieAction = (formData) => async () => {
  try {
    const res = await requestor({
      method: "POST",
      url: apiPath.UPDATE_MOVIE,
      data: formData,
    });
    alert("Cập nhật thành công");
    console.log(res.data.content);
  } catch (error) {
    console.log(error);
    alert(error.response?.data.content);
  }
};

export const setMovieScheduleAction = (data) => async () => {
  try {
    const res = await requestor({
      method: "POST",
      url: apiPath.SET_MOVIE_SCHEDULE,
      data: data,
    });
    console.log(res.data.content);
    alert(res.data.content);
  } catch (error) {
    console.log(error);
    alert(error.response?.data.content);
  }
};

//user
export const fetchAllUserInfo = () => async (next) => {
  try {
    const res = await requestorUser({
      method: "GET",
      url: apiPath.ALL_USER_INFO,
    });
    next({ type: actions.SET_ALL_USER_INFO, payload: res.data.content });
  } catch (error) {
    console.log(error);
  }
};

export const addUserAction = (formData) => async () => {
  try {
    const res = await requestor({
      method: "POST",
      url: apiPath.USER_ADD,
      data: formData,
    });
    console.log(res);
    alert("Thêm thành công");
    console.log(res.data.content);
  } catch (error) {
    throw alert(error.response.data.content);
  }
};

export const deleteUserAction = (userId) => async () => {
  try {
    const res = await requestorUser({
      method: "DELETE",
      url: apiPath.USER_DELETE,
      params: { TaiKhoan: userId },
    });
    alert(res.data.content);
  } catch (error) {
    alert(error.response.data.content);
    throw error;
  }
};

export const fetchProfileByIdAction = (profileId) => {
  return async (next) => {
    try {
      const res = await requestor({
        method: "POST",
        url: apiPath.USER_PROFILE_BY_ID,
        params: { taiKhoan: profileId },
      });
      console.log("alo");
      next({
        type: actions.SET_PROFILE_BY_ID,
        payload: res.data.content,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const editUserAction = (formData) => async () => {
  try {
    await requestor({
      method: "POST",
      url: apiPath.USER_UPDATE_INFO,
      data: formData,
    });
    alert("Cập nhật thành công");
  } catch (error) {
    throw alert(error.response.data.content);
  }
};

export const searchUserAction = (input1, input2) => async (next) => {
  try {
    const res = await requestorUser({
      method: "GET",
      url: apiPath.SEARCH_USER_BY_ID,
      params: { tuKhoa: input1, MaNhom: input2 },
    });

    next({
      type: actions.SET_ALL_USER_INFO,
      payload: res.data.content,
    });
  } catch (error) {
    console.log(error);

    throw alert(error.response.data.content);
  }
};
