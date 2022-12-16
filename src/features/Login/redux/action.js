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
