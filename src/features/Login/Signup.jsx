import { Button, Input, Form } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUpAction } from "./redux/action";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddNew = async (value) => {
    console.log(value);
    try {
      await dispatch(signUpAction(value));
      navigate("/login");
    } catch (error) {
      window.alert(error.response.data.content);
    }
  };
  return (
    <div className="container mx-auto">
      <div className="flex justify-center mt-10">
        <Form
          name="basic"
          labelCol={{
            span: 5,
          }}
          // wrapperCol={{
          //   span: 16,
          // }}
          initialValues={{
            remember: true,
          }}
          onFinish={handleAddNew}
          autoComplete="off"
          style={{ border: "solid 1px", minWidth: "40%" }}
          className="p-10 rounded-lg border-neutral-300"
        >
          <Form.Item
            label="Username"
            name="taiKhoan"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
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
            label="Phone"
            name="soDt"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          {/* group number hidden  */}
          <Form.Item
            hidden="false"
            label="Group number"
            name="maNhom"
            initialValue="GP10"
          >
            <Input disabled={true} />
          </Form.Item>
          <Form.Item
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

          <div
            className="flex justify-center mt-10 "
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" size="large">
              Register
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
