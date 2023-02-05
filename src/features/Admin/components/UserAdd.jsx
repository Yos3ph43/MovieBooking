import { Button, Input, Select, Form, Spin } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUserAction, fetchAllUserInfo } from "../redux/action";
import actions from "../redux/type";

const UserAdd = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddNew = async (value) => {
    setLoading(true);
    try {
      await dispatch(addUserAction(value));
      setTimeout(() => {
        dispatch(fetchAllUserInfo());
        form.resetFields();
        navigate("/admin/userManage");
      }, 1000);
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <div className="container ">
      <div className="mx-auto mt-10">
        <Spin spinning={loading}>
          <Form
            form={form}
            name="basic"
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 16,
            }}
            onFinish={handleAddNew}
            autoComplete="off"
            className="w-1/2 mx-auto"
          >
            <Form.Item
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
              initialValue="GP"
              label="Group number"
              name="maNhom"
              rules={[
                { message: "Please input user group number", required: true },
                {
                  message: "Group number not valid (GP00-GP10)!",
                  pattern: /GP(0[0-9])|GP10/g,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              initialValue="KhachHang"
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
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </div>
    </div>
  );
};

export default UserAdd;
