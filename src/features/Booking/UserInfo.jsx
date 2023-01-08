import React from "react";
import { useSelector } from "react-redux";

const UserInfo = () => {
  const userInfo = useSelector((state) => state.user.profile);
  console.log(userInfo);
  return (
    <div>
      <div>
        <h1>Thông tin người dùng</h1>
        <p>Tên:{userInfo?.hoTen}</p>
        <p>Email:{userInfo?.email}</p>
        <p>Số điện thoại:{userInfo?.soDT}</p>
      </div>
      <h1>Thông tin vé đã đặt</h1>
      {userInfo?.thongTinDatVe.map((seatInfo) => {
        console.log(seatInfo);
        return (
          <>
            <div>
              <h1>{seatInfo.tenPhim}</h1>
              <p>Ngày Đặt:{seatInfo.ngayDat}</p>
              <p></p>
            </div>
            <>
              <h1>Chi tiết vé</h1>
              {seatInfo?.danhSachGhe.map((seat) => {
                console.log(seat);
                return (
                  <>
                    <p>Rạp:{seat.tenCumRap}</p>
                  </>
                );
              })}
            </>
          </>
        );
      })}
    </div>
  );
};

export default UserInfo;
