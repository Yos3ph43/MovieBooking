import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProfileAction, loginAction } from "./redux/action";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const navToSignUp = () => navigate("/signup");
  const handleLogin = async (value) => {
    console.log(value);
    try {
      await dispatch(loginAction(value));
      navigate("/");
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
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={handleLogin}
          // onFinishFailed={}
          autoComplete="off"
          style={{ border: "solid 1px" }}
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

          <div className="flex justify-center">
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </div>
          <div className="flex justify-center">
            <Button
              type="link"
              htmlType="button"
              danger
              onClick={() => {
                navigate("/signup");
              }}
            >
              Don't have account?
            </Button>
          </div>
        </Form>
      </div>
      <div className="text-center text-neutral-400">
        <span>baoadmin</span>
        <br />
        <span>123123</span>
      </div>
    </div>
  );
};

export default Login;
