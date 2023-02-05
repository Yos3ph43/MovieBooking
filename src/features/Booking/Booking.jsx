import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { bookingAction, fetchBooking } from "./redux/action";
import { Button } from "antd";
import clsx from "clsx";
import "./Product.css";

const Booking = () => {
  const [list, bookingSeat] = useState([]);
  let newList = [...list];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    dispatch(fetchBooking(params.id));
  }, [params, list]);
  const booking = useSelector((state) => state.booking.booking);
  const userLogin = useSelector((state) => state.user.profile);

  const handleConfirmBooking = () => {
    if (!userLogin)
      return navigate("/login"), alert("Vui lòng đăng nhập để đặt vé");

    const bookedInput = [];
    for (const item of list) {
      const picked = (({ maGhe, giaVe }) => ({ maGhe, giaVe }))(item);
      bookedInput.push(picked);
    }
    if (bookedInput.length <= 0) return alert("Chưa có ghế nào được chọn");
    bookingSeat([]);
    const confirmBookingData = {
      maLichChieu: booking.thongTinPhim.maLichChieu,
      danhSachVe: bookedInput,
    };

    try {
      dispatch(bookingAction(confirmBookingData));
      alert("Đặt vé thành công");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    booking && (
      <div className="container mx-auto">
        <div className="flex">
          <div className=" w-2/3 ">
            <div>
              <h1 className="text-center">{booking.thongTinPhim.tenPhim}</h1>
              <div className="bg-black h-10 max-w-screen-md mx-auto rounded pt-3">
                <h3 className="text-white text-center my-auto">SCREEN</h3>
              </div>
            </div>
            <div className="flex flex-wrap bookingSeat justify-start">
              {booking.danhSachGhe.map((seat) => {
                return (
                  <div className="seats p-1" key={seat.maGhe}>
                    <Button
                      onClick={() => {
                        const index = newList.findIndex(
                          (item) => item.maGhe === seat.maGhe
                        );

                        if (index !== -1) {
                          newList.splice(index, 1);
                        } else {
                          newList.push(seat);
                        }
                        console.log(index);
                        bookingSeat(newList);
                      }}
                      className={clsx("product", {
                        booked: seat.daDat,
                        booking: newList.find(
                          (index) => index.maGhe === seat.maGhe
                        ),
                      })}
                      disabled={seat.daDat}
                    >
                      {seat.tenGhe}
                    </Button>
                    <div></div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-1/3 p-5 mt-24">
            <div className="p-5 result rounded-lg">
              <div>
                <div className="flex justify-between items-center result-row">
                  <b>Cụm rạp:</b>
                  <p>{booking.thongTinPhim.tenCumRap}</p>
                </div>

                <div className="flex justify-between items-center result-row">
                  <b>Địa chỉ:</b>
                  <p>{booking.thongTinPhim.diaChi}</p>
                </div>

                <div className="flex justify-between items-center result-row">
                  <b>Rạp:</b>
                  <p>{booking.thongTinPhim.tenRap}</p>
                </div>

                <div className="flex justify-between items-center result-row">
                  <b>Suất chiếu:</b>
                  <p>
                    {booking.thongTinPhim.ngayChieu}-
                    {booking.thongTinPhim.gioChieu}
                  </p>
                </div>

                <div className="flex justify-between items-center result-row">
                  <b>Tên phim:</b>
                  <p>{booking.thongTinPhim.tenPhim}</p>
                </div>

                <div className="flex justify-between items-center result-row">
                  <b>Ghế đã chọn:</b>
                  <p>
                    {list.map((item) => {
                      return <span key={item.maGhe}>{item.tenGhe},</span>;
                    })}
                  </p>
                </div>
                <div className="flex justify-between items-center ">
                  <b>Tổng tiền (VND)</b>
                  <p>
                    {list.reduce((total, item) => {
                      return (total += item.giaVe);
                    }, 0)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <Button
                  className="mt-5"
                  danger
                  onClick={handleConfirmBooking}
                  size="large"
                >
                  Đặt vé
                </Button>
              </div>
            </div>

            <div className="m-3">
              <div className="m-2">
                <Button className="bg-white" disabled></Button>
                <span className="ml-2 mb-4">Ghế chưa chọn</span>
              </div>
              <div className="m-2">
                <Button className="bg-yellow-500" disabled></Button>
                <span className="ml-2 mb-4">Ghế đang chọn</span>
              </div>
              <div className="m-2">
                <Button className="bg-red-600" disabled></Button>
                <span className="ml-2">Ghế đã chọn</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Booking;
