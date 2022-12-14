import { Button, Input, Select, Form } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUserAction } from "../redux/action";

const UserAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const handleAddNew = (value) => {
    dispatch(addUserAction(value));
    setCurrent(current + 1);
  };
  return (
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
          onFinish={handleAddNew}
          autoComplete="off"
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
            labelCol={{ span: 9 }}
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
                  label: "Kh??ch h??ng",
                  name: "KhachHang",
                },
                {
                  value: "QuanTri",
                  label: "Qu???n tr???",
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
            <Input placeholder="Nguy???n V??n A" />
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
      </div>
    </div>
  );
};

export default UserAdd;
