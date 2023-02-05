import {
  CaretDownFilled,
  CaretUpFilled,
  DatabaseFilled,
  UpCircleFilled,
} from "@ant-design/icons";
import { Button, Input, Form } from "antd";
import { fetchProfileAction, logoutAction } from "features/Login/redux/action";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserAction } from "./redux/action";

const UserInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProfileAction);
  }, []);
  const userInfo = useSelector((state) => state.user.profile);
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
  const handleLogout = async () => {
    try {
      await dispatch(logoutAction());
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    userInfo && (
      <div>
        {/* user info */}
        <div className="container text-center mx-auto pb-20">
          <div className="w-3/5 mx-auto">
            <p className="text-3xl font-semibold mt-20">Thông tin người dùng</p>
            {
              <Form
                name="basic"
                labelCol={{
                  span: 5,
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={async (input) => {
                  await handleUpdateUser(input);
                  dispatch(fetchProfileAction);
                }}
                autoComplete="off"
                style={{ border: "solid 1px" }}
                className="p-10 rounded-lg border-neutral-300 w-full mx-auto"
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

                <div className="flex justify-center">
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className="mr-5"
                  >
                    Update
                  </Button>
                  <Button
                    type="primary"
                    size="large"
                    danger
                    onClick={() => {
                      if (
                        !window.confirm("Đăng xuất và trở về trang đăng nhập?")
                      )
                        return;
                      navigate("/login");
                      handleLogout();
                    }}
                  >
                    Logout
                  </Button>
                </div>
              </Form>
            }
          </div>
        </div>
        {/* lịch sử đặt vé */}
        <div className="bg-neutral-50 pt-2">
          <div className="container text-center mx-auto pb-32 ">
            <div className=" w-4/5 mx-auto">
              <p className="text-3xl font-semibold mt-20">Lịch sử đặt vé</p>
              <table
                className="mx-auto border-collapse border border-slate-900 rounded"
                style={{ minWidth: "100%" }}
              >
                <thead style={{ borderBottom: "solid 1px" }}>
                  <tr>
                    <th className="p-5 text-xl font-semibold">Mã vé</th>
                    <th className="p-5 text-xl font-semibold">Ngày Đặt</th>
                    <th className="p-5 text-xl font-semibold">Tên Phim</th>
                    <th className="p-5 text-xl font-semibold">Chi tiết</th>
                  </tr>
                </thead>
                <tbody>
                  {userInfo.thongTinDatVe &&
                    userInfo.thongTinDatVe.map((seatInfo) => {
                      console.log(seatInfo);
                      return (
                        <tr
                          key={seatInfo.maVe}
                          className="border-slate-300"
                          style={{ borderBottom: "solid 1px" }}
                        >
                          <td>
                            <p>{seatInfo.maVe}</p>
                          </td>
                          <td>
                            <p>
                              {moment(seatInfo.ngayDat).format(
                                "DD / MM / YYYY"
                              )}
                            </p>
                          </td>

                          <td>
                            <p className="font-semibold">{seatInfo.tenPhim}</p>
                          </td>

                          <td>
                            <div
                              id={`btn-${seatInfo.maVe}`}
                              className="w-20 mx-auto"
                            >
                              <Button
                                type="primary"
                                onClick={() => {
                                  document.getElementById(
                                    `seatInfo-${seatInfo.maVe}`
                                  ).style.display = "block";
                                  document.getElementById(
                                    `btn-${seatInfo.maVe}`
                                  ).style.display = "none";
                                }}
                                size="small"
                              >
                                <CaretDownFilled />
                              </Button>
                            </div>

                            {/*table Chi tiết vé */}
                            <div
                              className="border-solid border-neutral-400 rounded w-full my-2 "
                              id={`seatInfo-${seatInfo.maVe}`}
                              style={{ display: "none", border: "1px" }}
                            >
                              <div
                                className="flex flex-wrap flex-col w-full "
                                // style={{ maxWidth: "224px" }}
                              >
                                {seatInfo.danhSachGhe.map((seat) => {
                                  console.log(seat);
                                  return (
                                    <div
                                      key={seat.maGhe}
                                      className=" flex justify-around items-center border-neutral-300"
                                      style={{ borderTop: "solid 1px" }}
                                    >
                                      <p>{seat.tenCumRap}</p>

                                      <p>Số ghế:{seat.tenGhe}</p>

                                      <p>{seat.tenHeThongRap}</p>
                                    </div>
                                  );
                                })}
                              </div>
                              <div className="text-center">
                                <Button
                                  type="primary"
                                  size="small"
                                  danger
                                  onClick={() => {
                                    document.getElementById(
                                      `seatInfo-${seatInfo.maVe}`
                                    ).style.display = "none";
                                    document.getElementById(
                                      `btn-${seatInfo.maVe}`
                                    ).style.display = "block";
                                  }}
                                  className="m-2"
                                >
                                  <CaretUpFilled />
                                </Button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default UserInfo;
