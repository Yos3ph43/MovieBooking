import requestor from "app/api";
import { apiPath } from "app/apiPath";

export const fetchCinemaCluster = async (cinemaId) => {
  const res = await requestor({
    method: "GET",
    url: apiPath.CINEMA_CLUSTER,
    params: {
      maHeThongRap: cinemaId,
    },
  });

  return res;
};
