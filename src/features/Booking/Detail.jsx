import { Button, Modal, Rate, Tabs } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchMovieDetail } from "./redux/action";

const Detail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    const movieId = params.id;
    dispatch(fetchMovieDetail(movieId));
  }, [params]);
  const movie = useSelector((state) => state.booking.movieDetail);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const videoTrailer = useRef();
  const handleCancel = () => {
    setIsModalOpen(false);
    let iframe = videoTrailer.current;
    if (iframe !== null) {
      let iframeSrc = iframe.src;
      iframe.src = iframeSrc;
    }
  };

  let trailer = "";
  trailer =
    movie &&
    movie.trailer.includes("watch?v=") &&
    movie.trailer.replace("watch?v=", "embed/");

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
                <Button
                  className="bg-indigo-900 text-slate-200 m-1"
                  onClick={showModal}
                >
                  Trailer
                </Button>
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
                          <div
                            className="text-slate-200"
                            key={itemCinema.maCumRap}
                          >
                            <p>{itemCinema.tenCumRap}</p>
                            <div>
                              {itemCinema.lichChieuPhim.map((itemSchedule) => (
                                <div key={itemSchedule.maLichChieu}>
                                  <Link
                                    to={`/booking/${itemSchedule.maLichChieu}`}
                                  >
                                    <Button className="bg-indigo-900 text-slate-200 m-1">
                                      {itemSchedule.ngayChieuGioChieu}
                                    </Button>
                                  </Link>
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
        <Modal
          open={isModalOpen}
          onCancel={handleCancel}
          width="70%"
          className="bg-black"
          footer={[
            <Button
              key="back"
              onClick={handleCancel}
              className="bg-indigo-900 text-slate-200 m-1"
            >
              Close
            </Button>,
          ]}
        >
          <iframe
            ref={videoTrailer}
            width="100%"
            height="580"
            src={trailer}
            title={movie.tenPhim}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Modal>
      </div>
    )
  );
};

export default Detail;
