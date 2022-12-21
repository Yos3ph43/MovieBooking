import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBooking } from "./redux/action";

const Booking = () => {
  const dispatch = useDispatch();
  const params = useParams();
  console.log(params);
  useEffect(() => {
    dispatch(fetchBooking(params.id));
  }, [params]);
  const booking = useSelector((state) => state.booking.booking);
  return (
    booking && (
      <div className="container mx-auto">
        <div className="">
          <h1>{booking.thongTinPhim.tenPhim}</h1>
        </div>
        <div>
          <button>{booking.danhSachGhe.map(() => {})}</button>
        </div>
      </div>
    )
  );
};

export default Booking;
