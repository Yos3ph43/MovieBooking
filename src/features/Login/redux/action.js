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
  return async (next) => {
    try {
      const res = await requestor({
        method: "POST",
        url: apiPath.SIGNUP,
        data: userInput,
      });
      next({
        type: actions.SET_SIGNUP,
        payload: res.data.content,
      });
    } catch (error) {
      throw error;
    }
  };
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
