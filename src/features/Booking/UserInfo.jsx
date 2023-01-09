import { Button, Input, Form } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAction } from "./redux/action";

const UserInfo = () => {
  const userInfo = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();
  console.log(userInfo);
  const handleUpdateUser = async (value) => {
    console.log(value);
    try {
      await dispatch(updateUserAction(value));
      alert("Cập nhật tài khoản thành công");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container text-center mx-auto">
      <div>
        <h1>Thông tin người dùng</h1>
        {userInfo && (
          <Form
            className="container mx-auto"
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={handleUpdateUser}
            autoComplete="off"
          >
            <Form.Item
              initialValue={userInfo?.taiKhoan}
              label="Username"
              name="taiKhoan"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input disabled={true} />
            </Form.Item>

            <Form.Item
              initialValue={userInfo?.matKhau}
              label="Password"
              name="matKhau"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              initialValue={userInfo?.email}
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
                {
                  pattern:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Email not valid",
                },
              ]}
            >
              <Input placeholder="...@gmail.com" />
            </Form.Item>
            <Form.Item
              initialValue={userInfo?.soDT}
              label="Phone"
              name="soDT"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            {/* group hidden  */}
            <Form.Item
              hidden="false"
              label="Group number"
              name="maNhom"
              initialValue={userInfo?.maNhom}
            >
              <Input disabled={true} />
            </Form.Item>
            <Form.Item
              hidden="false"
              label="User Type"
              name="maLoaiNguoiDung"
              initialValue={userInfo?.maLoaiNguoiDung}
            >
              <Input disabled={true} />
            </Form.Item>
            {/* group number hidden end */}

            <Form.Item
              initialValue={userInfo?.hoTen}
              label="Name"
              name="hoTen"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <Input placeholder="Nguyễn Văn A" />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
      <h1>Lịch sử đặt vé</h1>
      {userInfo?.thongTinDatVe.map((seatInfo) => {
        console.log(seatInfo);
        return (
          <div key={seatInfo.maVe} className="">
            <div>
              <h1>{seatInfo.tenPhim}</h1>
              <p>Ngày Đặt:{seatInfo.ngayDat}</p>
              <p>{seatInfo.maVe}</p>
            </div>
            <>
              <h1>Chi tiết vé đã đặt</h1>
              {seatInfo?.danhSachGhe.map((seat) => {
                console.log(seat);
                return (
                  <div key={seat.maGhe}>
                    <p>{seat.tenCumRap}</p>
                    <p>Số ghế: {seat.tenGhe}</p>
                    <p>Giá vé: {seatInfo.giaVe}</p>
                    <p>Thời lượng: {seatInfo.thoiLuongPhim}</p>
                    <p>{seat.tenHeThongRap}</p>
                  </div>
                );
              })}
            </>
          </div>
        );
      })}
    </div>
  );
};

export default UserInfo;
