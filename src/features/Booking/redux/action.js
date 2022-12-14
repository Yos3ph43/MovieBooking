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
