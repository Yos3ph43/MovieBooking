import { Button, Form, Input, Select } from "antd";
import Item from "antd/es/list/Item";
import { fetchProfileAction } from "features/Login/redux/action";
import { current } from "immer";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteProfileByIdAction,
  editUserAction,
  fetchAllUserInfo,
  fetchProfileByIdAction,
} from "../redux/action";
import actions from "../redux/type";

const UserEdit = () => {
  const profile = useSelector((state) => state.admin.profileById);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfileByIdAction(params.id));
    return () => {
      dispatch({ type: actions.SET_PROFILE_BY_ID, payload: null });
    };
  }, [params]);
  const handleSubmit = async (value) => {
    await dispatch(editUserAction(value));
    navigate("/admin/userManage");
  };

  return (
    profile && (
      <div className="container ">
        <div className="flex justify-center mt-10">
          <Form
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
            onFinish={handleSubmit}
            autoComplete="off"
          >
            <Form.Item
              initialValue={profile?.taiKhoan}
              label="Username"
              name="taiKhoan"
              rules={[
                {
                  required: true,
                  message: "Please input user username!",
                },
              ]}
            >
              <Input placeholder="Username" />
            </Form.Item>

            <Form.Item
              initialValue={profile?.matKhau}
              label="Password"
              name="matKhau"
              rules={[
                {
                  required: true,
                  message: "Please input user password!",
                },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item
              initialValue={profile?.email}
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input user email!",
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
              initialValue={profile?.soDT}
              label="Phone"
              name="soDt"
              rules={[
                {
                  required: true,
                  message: "Please input user phone number!",
                },
              ]}
            >
              <Input placeholder="Phone number" />
            </Form.Item>

            <Form.Item
              labelCol={{ span: 9 }}
              initialValue={profile?.maNhom}
              label="Group number"
              name="maNhom"
              rules={[
                {
                  message: "Please input user group number",
                  required: true,
                },
                {
                  message: "Group number not valid (GP00-GP10)!",
                  pattern: /GP(0[0-9])|GP10/g,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              initialValue={profile?.maLoaiNguoiDung}
              label="User type"
              name="maLoaiNguoiDung"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                rules={[
                  {
                    required: true,
                  },
                ]}
                style={{
                  width: 120,
                }}
                options={[
                  {
                    value: "KhachHang",
                    label: "Khách hàng",
                    name: "KhachHang",
                  },
                  {
                    value: "QuanTri",
                    label: "Quản trị",
                    name: "QuanTri",
                  },
                ]}
              />
            </Form.Item>

            <Form.Item
              initialValue={profile?.hoTen}
              label="Name"
              name="hoTen"
              rules={[
                {
                  required: true,
                  message: "Please input user name!",
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
                Confirm Edit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  );
};

export default UserEdit;
