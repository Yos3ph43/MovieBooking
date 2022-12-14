import { Button, Rate, Tabs } from "antd";
import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMovieDetail } from "./redux/action";

const Detail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    const movieId = params.id;
    dispatch(fetchMovieDetail(movieId));
  }, [params]);
  const movie = useSelector((state) => state.booking.movieDetail);
  console.log(movie);
  return (
    movie && (
      <div className="bg-gray-900 pt-20 h-100">
        <div className="container mx-auto ">
          <div className="flex">
            <div className="w-1/4">
              <img alt="" src={movie.hinhAnh} className="w-full" />
            </div>
            <div className="w-3/4 pl-10 text-slate-200">
              <h1>{movie.tenPhim}</h1>
              <p>{movie.moTa}</p>
              <p>
                Khởi Chiếu: {moment(movie.ngayKhoiChieu).format("DD/MM/YYYY")}
              </p>
              <p>Đánh giá: {movie.danhGia}/10</p>

              <p>
                <Button>Trailer</Button>
              </p>
              <h4>Lịch Chiếu:</h4>
              <Tabs
                tabPosition="left"
                items={movie.heThongRapChieu.map((item) => {
                  return {
                    key: item.maHeThongRap,
                    label: (
                      <div>
                        <img alt="" src={item.logo} className="w-14" />
                      </div>
                    ),
                    children: (
                      <div>
                        {item.cumRapChieu.map((itemCinema) => (
                          <div className="text-slate-200">
                            <p>{itemCinema.tenCumRap}</p>
                            <div>
                              {itemCinema.lichChieuPhim.map((itemSchedule) => (
                                <div key={itemSchedule.maLichChieu}>
                                  <Button>
                                    {itemSchedule.ngayChieuGioChieu}
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ),
                  };
                })}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Detail;
