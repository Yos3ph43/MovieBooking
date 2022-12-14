import { Col, Card, Button } from "antd";
import moment from "moment/moment";
import React from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "./MovieList.css";

const MovieList = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    customPaging: (i) => <div className="mt-10 slick-dots">{i + 1}</div>,
  };
  const movies = useSelector((state) => state.booking.movies);
  return (
    <div className="container mx-auto mb-10">
      <h2 className="text-4xl text-center font-medium text-slate-100">
        Danh sách phim
      </h2>
      <Slider {...settings}>
        {movies.map((item) => (
          <div
            key={item.maPhim}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <div className="border-solid border-indigo-900 hover:border-indigo-500 m-3 p-5 rounded-md">
              <img
                className="h-72 max-w-full object-cover object-left-top mx-auto"
                alt=""
                src={item.hinhAnh}
              />
              <h2 className="text-slate-200 text-xl text-center">
                {item.tenPhim}
              </h2>
              <p className="text-slate-400 m-1">
                Khởi Chiếu:{" "}
                {moment(item.ngayKhoiChieu).format("DD/MM/YYYY h:mm a")}
              </p>
              <p className="text-slate-400 m-1">Đánh giá: {item.danhGia}/10</p>
              <div className="mt-5 text-right">
                <Button size="" className="bg-indigo-900 text-slate-200">
                  Đặt vé
                </Button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MovieList;
