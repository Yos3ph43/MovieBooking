const { default: requestor } = require("app/api");
const { apiPath } = require("app/apiPath");
const { default: actions } = require("./type");

export const loginAction = (userLogin) => {
  return async (next) => {
    try {
      const res = await requestor({
        method: "POST",
        url: apiPath.LOGIN,
        data: userLogin,
      });
      next({
        type: actions.SET_PROFILE,
        payload: res.data.content,
      });
      localStorage.setItem("token", res.data.content.accessToken);
    } catch (error) {
      throw error;
    }
  };
};

export const signUpAction = (userInput) => {
  return async () => {
    try {
      await requestor({
        method: "POST",
        url: apiPath.SIGNUP,
        data: userInput,
      });
    } catch (error) {
      throw error;
    }
  };
};
export const fetchProfileAction = async (next) => {
  try {
    const res = await requestor({
      method: "POST",
      url: apiPath.USER_PROFILE,
    });
    next({
      type: actions.SET_PROFILE,
      payload: res.data.content,
    });
  } catch (error) {
    console.log(error);
  }
};
export const logoutAction = () => {
  return async (next) => {
    next({
      type: actions.SET_PROFILE,
      payload: null,
    });
    localStorage.setItem("token", null);
  };
};
