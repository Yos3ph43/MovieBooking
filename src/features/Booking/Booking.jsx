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
        <div>
          <h1 className="text-center">{booking.thongTinPhim.tenPhim}</h1>
        </div>
        <div className="flex">
          <div className="flex flex-row flex-wrap w-2/3 bookingSeat">
            {booking.danhSachGhe.map((seat) => {
              return (
                <div key={seat.maGhe}>
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
                </div>
              );
            })}
          </div>
          <div className="w-1/3">
            <table className="table-auto border-solid">
              <thead>
                <tr>
                  <th>Cụm rạp</th>
                  <th>Địa chỉ</th>
                  <th>Rạp</th>
                  <th>Suất chiếu</th>
                  <th>Tên phim</th>
                  <th>Ghế đã chọn</th>
                  <th>Tổng tiền</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{booking.thongTinPhim.tenCumRap}</td>
                  <td>{booking.thongTinPhim.diaChi}</td>
                  <td>{booking.thongTinPhim.tenRap}</td>
                  <td>
                    {booking.thongTinPhim.ngayChieu}-
                    {booking.thongTinPhim.gioChieu}
                  </td>
                  <td>{booking.thongTinPhim.tenPhim}</td>
                  <td>
                    {list.map((item) => {
                      return <span key={item.maGhe}>{item.tenGhe},</span>;
                    })}
                  </td>
                  <td>
                    {list.reduce((total, item) => {
                      return (total += item.giaVe);
                    }, 0)}
                  </td>
                </tr>
              </tbody>
            </table>
            <Button danger onClick={handleConfirmBooking}>
              Đặt vé
            </Button>
            <div className="m-3">
              <div className="m-2">
                <Button className="bg-white" disabled></Button>
                <span className="ml-2 mb-4">Ghế chưa chọn</span>
              </div>
              <div className="m-2">
                <Button className="bg-yellow-500" disabled></Button>
                <span>Ghế đang chọn</span>
              </div>
              <div className="m-2">
                <Button className="bg-red-600" disabled></Button>
                <span>Ghế đã chọn</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Booking;
