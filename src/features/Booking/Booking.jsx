import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { bookingAction, fetchBooking } from "./redux/action";
import { Button } from "antd";
import clsx from "clsx";
import "./Product.css";

const Booking = () => {
  const handleConfirmBooking = async (value) => {
    try {
      await dispatch(bookingAction(value));
      console.log(value);
    } catch (error) {
      console.log(error);
    }
  };
  const [list, bookingSeat] = useState([]);
  // const [seat, pendingSeat] = useState([list]);
  let newList = [...list];
  // console.log(list);
  const handleChoosingSeat = () => {};

  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    dispatch(fetchBooking(params.id));
  }, [params]);
  const booking = useSelector((state) => state.booking.booking);
  console.log(booking);
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
                    // className="h-14 w-14 text-center"
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
                      return <span>{item.tenGhe},</span>;
                    })}
                  </td>
                  <td>
                    {list.map((item) => {
                      //banh xác conti
                      const total = item.giaVe;
                      console.log(item.giaVe);
                      return <>{total}</>;
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
            <Button>Đặt vé</Button>
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
